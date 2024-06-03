import { ITierableItem } from "@/types.d.ts";
import { type FunctionComponent } from "preact";
import { Item } from "@/islands/Item.tsx";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "$esm/@dnd-kit/sortable@8.0.0?alias=react:preact/compat&external=preact";
import { useDroppable } from "$esm/@dnd-kit/core@6.1.0?alias=react:preact/compat&external=preact";
import { CryptoUUID } from "@/types.d.ts";

export const ItemList: FunctionComponent<
  { id: CryptoUUID; items: ITierableItem["id"][] }
> = (
  { id, items },
) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <SortableContext items={items} strategy={horizontalListSortingStrategy}>
      <div ref={setNodeRef} style={{ height: "100%" }}>
        {items.map((itemId) => (
          <Item
            key={`draggable-item-${itemId}`}
            id={itemId}
          />
        ))}
      </div>
    </SortableContext>
  );
};
