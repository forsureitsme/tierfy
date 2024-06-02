import { type FunctionComponent } from "preact";
import { ITierlist } from "@/types.d.ts";
import { Tier } from "@/components/Tier.tsx";
import { ItemList } from "@/components/ItemList.tsx";
import { DndContext, DragEndEvent } from "$dnd";

export const Tierlist: FunctionComponent<ITierlist> = (
  { name, items, tiers },
) => {
  const handleDragEnd = (e: DragEndEvent) => {
    console.log(e);
  };

  return (
    <div>
      <h2>{name}</h2>
      <DndContext onDragEnd={handleDragEnd}>
        <div>{tiers.map((tier) => <Tier {...tier} />)}</div>
        <div>
          <ItemList id={crypto.randomUUID()} items={items} />
        </div>
      </DndContext>
    </div>
  );
};
