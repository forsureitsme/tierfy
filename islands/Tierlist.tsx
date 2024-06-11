import { type FunctionComponent } from "preact";
import { useSignal } from "@preact/signals";
import { ITier, ITierableItem, ITierlist } from "@/types.d.ts";
import { Tier } from "@/islands/Tier.tsx";
import { ItemList } from "@/islands/ItemList.tsx";
import { createContext } from "preact";
import { useEffect } from "preact/hooks";
import { monitorForElements } from "$esm/@atlaskit/pragmatic-drag-and-drop@1.1.10/element/adapter";
import { Signal } from "@preact/signals";
import { moveItem } from "@/islands/TierlistHandlers.ts";

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
      onDrop: ({ source, location }) => {
        if (!location.current.dropTargets.length) {
          return;
        }

        const sourceItemId = source.data.id as ITierableItem["id"];
        const sourceTierId = source.data.tierId as ITier["id"];
        const targetItemId = location.current.dropTargets[0].data
          .id as ITierableItem["id"];
        const targetTierId = location.current.dropTargets[0].data
          .tierId as ITier["id"];

        moveItem(tierlistSignal, sourceTierId, sourceItemId, targetTierId, targetItemId);
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
