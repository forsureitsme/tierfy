import { type FunctionComponent } from "preact";
import { useDraggable } from "$dnd";
import { ITierableItem } from "@/types.d.ts";
import { asset } from "$fresh/runtime.ts";

export const Item: FunctionComponent<ITierableItem> = ({ id, name, image }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  return (
    <button
      type="button"
      ref={setNodeRef}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : "",
        width: "200px",
        height: "200px",
        backgroundImage: `url(${asset(`/img/tierlist-items/${image}`)})`,
        userSelect: "none",
      }}
      {...listeners}
      {...attributes}
    >
      {/* {name} */}
    </button>
  );
};
