import { type FunctionComponent } from "preact";
import { signal } from "$esm/@preact/signals@1.2.3";
import { ITierableItem, ITierlist } from "@/types.d.ts";
import { Tier } from "@/islands/Tier.tsx";
import { ItemList } from "@/islands/ItemList.tsx";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "$esm/@dnd-kit/core@6.1.0?alias=react:preact/compat&external=preact";
import { createContext } from "preact";

export const TierlistContext = createContext<ITierlist | null>(null);

export const Tierlist: FunctionComponent<ITierlist> = (
  { id, name, items, tiers },
) => {
  const activeItem = signal<ITierableItem["id"] | null>(null);
  const handleDragEnd = (e: DragEndEvent) => {
    activeItem.value = null;
    // const { active, over } = e;

    // if (over && active.id !== over.id) {
    //   setItems((items) => {
    //     const oldIndex = items.indexOf(active.id);
    //     const newIndex = items.indexOf(over.id);

    //     return arrayMove(items, oldIndex, newIndex);
    //   });
    // }
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    activeItem.value = active.id as ITierableItem["id"];
  };

  const untieredItems = () =>
    items.reduce(
      (untieredItems: ITierableItem["id"][], item: ITierableItem) =>
        !tiers.some((tier) => tier.items.includes(item.id))
          ? [...untieredItems, item.id]
          : untieredItems,
      [],
    );

  return (
    <TierlistContext.Provider value={{ id, name, items, tiers }}>
      <div>
        <h2>{name}</h2>
        <DndContext
          onDragEnd={handleDragEnd}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
        >
          {
            <>
              <div>{tiers.map((tier) => <Tier {...tier} />)}</div>
              <div>
                <ItemList
                  id={`untiered-${id}`}
                  items={untieredItems()}
                />
              </div>
              <DragOverlay>
                {activeItem.value ? <Item id={activeItem.value} /> : null}
              </DragOverlay>
            </>
          }
        </DndContext>
      </div>
    </TierlistContext.Provider>
  );
};
