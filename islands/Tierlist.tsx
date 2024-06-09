import { type FunctionComponent } from "preact";
import { useSignal } from "@preact/signals";
import { ITierlist } from "@/types.d.ts";
import { Tier } from "@/islands/Tier.tsx";
import { ItemList } from "@/islands/ItemList.tsx";
import { createContext } from "preact";
import { useEffect } from "preact/hooks";
import { monitorForElements } from "$esm/@atlaskit/pragmatic-drag-and-drop@1.1.10/element/adapter";
import { Signal } from "@preact/signals";
import { moveItemToTier } from "@/islands/TierlistHandlers.ts";

export const TierlistSignalContext = createContext<Signal<ITierlist> | null>(
  null,
);

export const Tierlist: FunctionComponent<ITierlist> = (
  { id, name, items, tiers },
) => {
  const tierlistSignal = useSignal<ITierlist>({ id, name, items, tiers });

  useEffect(() => {
    return monitorForElements({
      canMonitor: ({ source }) => source.data.type === "item",
      onDragStart: () => console.log("something was dragged"),
      onDrop: ({ source, location }) => {
        console.log({ source, location });

        if (!location.current.dropTargets.length) {
          return;
        }

        const tierId = location.current.dropTargets[0].data.tierId;
        const itemId = source.data.id;

        if (tierId) {
          moveItemToTier(tierlistSignal, itemId, tierId);
        }
      },
    });
  }, []);

  return (
    <TierlistSignalContext.Provider value={tierlistSignal}>
      <div>
        <h2>{name}</h2>
        <div>{tiers.map((tier) => <Tier {...tier} />)}</div>
        <div>
          <ItemList
            tierId={`untiered-${id}`}
          />
        </div>
      </div>
    </TierlistSignalContext.Provider>
  );
};
