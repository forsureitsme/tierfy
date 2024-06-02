import { ITierableItem } from "@/types.d.ts";
import { type FunctionComponent } from "preact";
import { Item } from "@/components/Item.tsx";
import { UniqueIdentifier, useDroppable } from "$dnd";

export const ItemList: FunctionComponent<
  { id: UniqueIdentifier; items: ITierableItem[] }
> = (
  { items, id },
) => {
  const { _, setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef}>
      {items.map((item) => (
        <Item
          key={`draggable-item-${item.id}`}
          {...item}
        />
      ))}
    </div>
  );
};
