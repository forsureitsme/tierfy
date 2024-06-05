import { type FunctionComponent } from "preact";
import { draggable } from "$esm/@atlaskit/pragmatic-drag-and-drop@1.1.10/element/adapter";
import { ITier, ITierableItem } from "@/types.d.ts";
import { useEffect } from "preact/hooks";
import { useRef } from "preact/hooks";
import { combine } from "$esm/@atlaskit/pragmatic-drag-and-drop@1.1.10/combine";
import { dropTargetForElements } from "$esm/@atlaskit/pragmatic-drag-and-drop@1.1.10/element/adapter";

import {
  BaseEventPayload,
  DropTargetLocalizedData,
  ElementDragType,
} from "$esm/v135/@atlaskit/pragmatic-drag-and-drop@1.1.10/dist/types/internal-types.d.ts";
import { useSignal } from "@preact/signals";
import { Item } from "@/islands/Item.tsx";
import { getItemById } from "@/islands/TierlistHandlers.ts";

export const DraggableItem: FunctionComponent<
  { tierId: ITier["id"]; id: ITierableItem["id"] }
> = (
  { id, tierId },
) => {
  const draggableRef = useRef<HTMLDivElement | null>(null);
  const droppableRef = useRef<HTMLDivElement | null>(null);
  const itemDraggedOver = useSignal<ITierableItem["id"] | null>(null);
  const isDraggingItem = useSignal<boolean>(false);

  const onDropTargetChange = (
    { source }: BaseEventPayload<ElementDragType> & DropTargetLocalizedData,
  ) => {
    const data = source.data as { id: ITierableItem["id"] };
    if (data.id === id) {
      return;
    }
    itemDraggedOver.value = data.id;
  };
  const onDragLeave = () => {
    itemDraggedOver.value = null;
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
          tierId,
          type: "item",
        }),
        onDragStart: () => {
          isDraggingItem.value = true;
        },
        onDrop: () => {
          isDraggingItem.value = false;
        },
      }),
      dropTargetForElements({
        element: droppableRef.current,
        getData: () => ({ id }),
        canDrop: ({ source }) => source.data.type === "item",
        onDrop: onDragLeave,
        onDropTargetChange,
        onDragLeave,
      }),
    );
  }, []);

  return (
    <div
      ref={droppableRef}
      style={{
        position: "relative",
        border: "1px solid red",
        display: "flex",
      }}
    >
      {itemDraggedOver.value && <Item fake id={itemDraggedOver.value} />}

      <Item
        ref={draggableRef}
        id={id}
        style={{
          display: isDraggingItem.value ? "none" : "",
        }}
      />
    </div>
  );
};
