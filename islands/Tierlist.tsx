import { type FunctionComponent } from "preact";
import { ITier, ITierableItem, ITierlist } from "@/types.d.ts";
import { Tier } from "@/islands/Tier.tsx";
import { ItemList } from "@/islands/ItemList.tsx";
import { createContext } from "preact";
import { useEffect } from "preact/hooks";
import { monitorForElements } from "$esm/@atlaskit/pragmatic-drag-and-drop@1.1.10/element/adapter";
import { moveItem } from "@/islands/TierlistHandlers.ts";
import Loading from "@/components/Loading.tsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import UpdateTierlist from "@/components/mutations/UpdateTierlist.ts";
import TierlistQuery from "@/components/queries/Tierlist.ts";
import Error from "@/components/Error.tsx";

export const TierlistContext = createContext<ITierlist | null>(
  null,
);

export const Tierlist: FunctionComponent<{ slug: string }> = (
  { slug },
) => {
  const UpdateTierlistMutation = useMutation(UpdateTierlist);
  const { data, isPending, isError, error } = useQuery(
    TierlistQuery(slug),
  );
  const tierlist = data as ITierlist;

  useEffect(() => {
    return monitorForElements({
      canMonitor: ({ source }) => source.data.type === "item",
      onDrop: ({ source, location }) => {
        if (!location.current.dropTargets.length || !tierlist) {
          return;
        }

        const sourceItemId = source.data.id as ITierableItem["id"];
        const sourceTierId = source.data.tierId as ITier["id"];
        const targetItemId = location.current.dropTargets[0].data
          .id as ITierableItem["id"];
        const targetTierId = location.current.dropTargets[0].data
          .tierId as ITier["id"];

        const newTierlist = moveItem(
          tierlist,
          sourceTierId,
          sourceItemId,
          targetTierId,
          targetItemId,
        );

        UpdateTierlistMutation.mutate(newTierlist);
      },
    });
  }, [tierlist]);

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <Error error={error} />;
  }

  return (
    <TierlistContext.Provider value={tierlist}>
      <div className="container mx-auto">
        <h2 className="text-5xl font-bold tracking-tighter p-10 text-center">
          {tierlist.name}
        </h2>
        <div>{tierlist.tiers.map((tier) => <Tier {...tier} />)}</div>
        <div className="mt-5">
          <ItemList
            tierId={`untiered-${tierlist.id}`}
          />
        </div>
      </div>
    </TierlistContext.Provider>
  );
};
