import { type FunctionComponent } from "preact";
// import { useSortable } from "$esm/@dnd-kit/sortable@8.0.0?alias=react:preact/compat&external=preact";
import { draggable } from "$esm/@atlaskit/pragmatic-drag-and-drop@1.1.10/element/adapter";
import { ITier, ITierableItem, ITierlist } from "@/types.d.ts";
import { asset } from "$fresh/runtime.ts";
import { TierlistSignalContext } from "@/islands/Tierlist.tsx";
import { useContext } from "preact/hooks";
import { useEffect } from "preact/hooks";
import { useRef } from "preact/hooks";
import { combine } from "$esm/@atlaskit/pragmatic-drag-and-drop@1.1.10/combine";
import { dropTargetForElements } from "$esm/@atlaskit/pragmatic-drag-and-drop@1.1.10/element/adapter";
import { DropIndicator } from "$esm/@atlaskit/pragmatic-drag-and-drop-react-drop-indicator@1.1.1/box";

export const Item: FunctionComponent<
  { tierId: ITier["id"]; id: ITierableItem["id"] }
> = (
  { id, tierId },
) => {
  const tierlistSignal = useContext(
    TierlistSignalContext,
  );
  // const { attributes, listeners, setNodeRef, transform } = useSortable({ id });
  const draggableRef = useRef<HTMLDivElement | null>(null);
  const droppableRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!draggableRef.current) {
      return;
    }

    if (!droppableRef.current) {
      return;
    }

    return combine(
      draggable({
        element: draggableRef?.current,
        getInitialData: () => ({
          id,
          tierId,
          type: "item",
        }),
      }),
      dropTargetForElements({
        element: droppableRef.current,
        getData: () => ({ id }),
        canDrop: ({ source }) => source.data.type === "item",
      }),
    );
  }, []);

  if (!tierlistSignal?.value.items) return null;

  const item = tierlistSignal.value.items.find((item) => item.id === id);

  if (!item) return null;

  const { name, image } = item;

  return (
    <>
      <div
        ref={droppableRef}
      >
        <DropIndicator edge="left" gap="150px" />

        <div
          type="button"
          ref={draggableRef}
          style={{
            // transform: transform
            //   ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            //   : "",
            width: "150px",
            height: "150px",
            backgroundImage: `url(${asset(`/img/tierlist-items/${image}`)})`,
            userSelect: "none",
          }}
          // {...listeners}
          // {...attributes}
        >
          {name}
        </div>
      </div>
    </>
  );
};
