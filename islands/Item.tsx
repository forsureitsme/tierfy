import { type FunctionComponent } from "preact";
import { draggable } from "$esm/@atlaskit/pragmatic-drag-and-drop@1.1.10/element/adapter";
import { ITier, ITierableItem, ITierlist } from "@/types.d.ts";
import { asset } from "$fresh/runtime.ts";
import { TierlistSignalContext } from "@/islands/Tierlist.tsx";
import { useContext } from "preact/hooks";
import { useEffect } from "preact/hooks";
import { useRef } from "preact/hooks";
import { combine } from "$esm/@atlaskit/pragmatic-drag-and-drop@1.1.10/combine";
import { dropTargetForElements } from "$esm/@atlaskit/pragmatic-drag-and-drop@1.1.10/element/adapter";

import {
  BaseEventPayload,
  DropTargetLocalizedData,
  ElementDragType,
} from "$esm/v135/@atlaskit/pragmatic-drag-and-drop@1.1.10/dist/types/internal-types.d.ts";
import { forwardRef } from "preact/compat";
import { useSignal } from "@preact/signals";

export const Item: FunctionComponent<
  { tierId: ITier["id"]; id: ITierableItem["id"] }
> = (
  { id, tierId },
) => {
  const tierlistSignal = useContext(
    TierlistSignalContext,
  );
  const draggableRef = useRef<HTMLDivElement | null>(null);
  const droppableRef = useRef<HTMLDivElement | null>(null);
  const itemDraggedOver = useSignal<ITierableItem | null>(null);
  const isDraggingItem = useSignal<boolean>(false);

  if (!tierlistSignal?.value.items) return null;

  const getItemById = (itemId: ITierableItem["id"]) =>
    tierlistSignal.value.items.find((item) => item.id === itemId) || null;

  const item = getItemById(id);
  if (!item) return null;

  const onDragEnter = (
    { source }: BaseEventPayload<ElementDragType> & DropTargetLocalizedData,
  ) => {
    const data = source.data as { id: ITierableItem["id"] };
    if (data.id === id) {
      return;
    }
    itemDraggedOver.value = getItemById(data.id);
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
        onDragEnter,
        onDragLeave,
        onDrop: onDragLeave,
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
      {itemDraggedOver.value && (
        <div
          style={{
            opacity: .25,
          }}
        >
          <PresentationalItem {...itemDraggedOver.value} />
        </div>
      )}

      <PresentationalItem
        ref={draggableRef}
        {...item}
        style={{
          display: isDraggingItem.value ? "none" : "",
        }}
      />
    </div>
  );
};

const PresentationalItem = forwardRef(
  ({ name, image, style, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      style={{
        ...style,
        width: "150px",
        height: "150px",
        backgroundImage: `url(${asset(`/img/tierlist-items/${image}`)})`,
        userSelect: "none",
      }}
    >
      {name}
    </div>
  ),
);
