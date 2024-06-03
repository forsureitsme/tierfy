import { type FunctionComponent } from "preact";
import { useSortable } from "$esm/@dnd-kit/sortable@8.0.0?alias=react:preact/compat&external=preact";
import { ITierableItem } from "@/types.d.ts";
import { asset } from "$fresh/runtime.ts";
import { TierlistContext } from "@/islands/Tierlist.tsx";
import { useContext } from "preact/hooks";

export const Item: FunctionComponent<{ id: ITierableItem["id"] }> = (
  { id },
) => {
  const tierlist = useContext(TierlistContext);
  const { attributes, listeners, setNodeRef, transform } = useSortable({ id });

  if (!tierlist?.items) return null;

  const item = tierlist?.items.find((item) => item.id === id);

  if (!item) return null;

  const { name, image } = item;

  return (
    <button
      type="button"
      ref={setNodeRef}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : "",
        width: "150px",
        height: "150px",
        backgroundImage: `url(${asset(`/img/tierlist-items/${image}`)})`,
        userSelect: "none",
      }}
      {...listeners}
      {...attributes}
    >
      {name}
    </button>
  );
};
