import { type FunctionComponent } from "preact";
import { signal } from "$esm/@preact/signals@1.2.3";
import { ITierableItem, ITierlist } from "@/types.d.ts";
import { Tier } from "@/islands/Tier.tsx";
import { ItemList } from "@/islands/ItemList.tsx";
import { createContext } from "preact";
import { useEffect } from "preact/hooks";
import { monitorForElements } from "$esm/@atlaskit/pragmatic-drag-and-drop@1.1.10/element/adapter";
import { Signal } from "$esm/@preact/signals@1.2.3";

export const TierlistSignalContext = createContext<Signal<ITierlist> | null>(
  null,
);

export const Tierlist: FunctionComponent<ITierlist> = (
  { id, name, items, tiers },
) => {
  const tierlistSignal = signal<ITierlist>({ id, name, items, tiers });

  useEffect(() => {
    return monitorForElements({
      canMonitor: ({ source }) => source.data.type === "item",
      onDragStart: () => console.log("something was dragged"),
      onDrop: ({ source, location }) => {
        console.log({ source, location });

        if (
          !(location.current.dropTargets.length > 0 ||
            location.current.dropTargets[0].data.id === source.data.id)
        ) {
          return;
        }
      },
    });
  }, []);

  const untieredItems = () =>
    items.reduce(
      (untieredItems: ITierableItem["id"][], item: ITierableItem) =>
        !tiers.some((tier) => tier.items.includes(item.id))
          ? [...untieredItems, item.id]
          : untieredItems,
      [],
    );

  return (
    <TierlistSignalContext.Provider value={tierlistSignal}>
      <div>
        <h2>{name}</h2>
        <div>{tiers.map((tier) => <Tier {...tier} />)}</div>
        <div>
          <ItemList
            id={`untiered-${id}`}
            items={untieredItems()}
          />
        </div>
      </div>
    </TierlistSignalContext.Provider>
  );
};
