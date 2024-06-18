import { type FunctionComponent } from "preact";
import { draggable } from "$esm/@atlaskit/pragmatic-drag-and-drop@1.1.10/element/adapter";
import { ITier } from "@/types.d.ts";
import { useEffect, useContext } from 'preact/hooks';
import { useRef } from "preact/hooks";
import { combine } from "$esm/@atlaskit/pragmatic-drag-and-drop@1.1.10/combine";
import { dropTargetForElements } from "$esm/@atlaskit/pragmatic-drag-and-drop@1.1.10/element/adapter";

import {
  BaseEventPayload,
  DropTargetLocalizedData,
  ElementDragType,
} from "$esm/v135/@atlaskit/pragmatic-drag-and-drop@1.1.10/dist/types/internal-types.d.ts";
import { useSignal } from "@preact/signals";
import { Tier } from "@/islands/Tier.tsx";
import { TierlistContext } from "@/islands/Tierlist.tsx";

export const DraggableTier: FunctionComponent<
  { id: ITier["id"] }
> = (
  { id },
) => {
  const draggableRef = useRef<HTMLDivElement | null>(null);
  const droppableRef = useRef<HTMLDivElement | null>(null);
  const tierDraggedOver = useSignal<ITier["id"] | null>(null);
  const isDraggingTier = useSignal<boolean>(false);
  const tierlist = useContext(TierlistContext);

  const onDropTargetChange = (
    { source }: BaseEventPayload<ElementDragType> & DropTargetLocalizedData,
  ) => {
    const data = source.data as { id: ITier["id"] };
    if (data.id === id) {
      return;
    }
    tierDraggedOver.value = data.id;
  };
  const onDragLeave = () => {
    tierDraggedOver.value = null;
  };

  useEffect(() => {
    if (!draggableRef.current || !droppableRef.current) {
      return;
    }

    return combine(
      draggable({
        element: draggableRef.current,
        getInitialData: () => ({
          id,
          type: "tier",
        }),
        onDragStart: () => {
          isDraggingTier.value = true;
        },
        onDrop: () => {
          isDraggingTier.value = false;
        },
      }),
      dropTargetForElements({
        element: droppableRef.current,
        getData: () => ({ id }),
        canDrop: ({ source }) => source.data.type === "tier",
        onDrop: onDragLeave,
        onDropTargetChange,
        onDragLeave,
      }),
    );
  }, [tierlist]);


  return (
    <div
      ref={droppableRef}
      className="flex flex-col relative cursor-grab active:cursor-row-resize"
    >
      {tierDraggedOver.value && <Tier fake id={tierDraggedOver.value} />}

      <Tier
        ref={draggableRef}
        id={id}
        className={`${isDraggingTier.value && `hidden`}`}
      />
    </div>
  );
};
