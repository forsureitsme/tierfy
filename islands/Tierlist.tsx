import { type FunctionComponent } from "preact";
import { ITier, ITierableItem, ITierlist } from "@/types.d.ts";
import { ItemList } from "@/islands/ItemList.tsx";
import { createContext } from "preact";
import { useEffect } from "preact/hooks";
import { monitorForElements } from "$esm/@atlaskit/pragmatic-drag-and-drop@1.1.10/element/adapter";
import { moveItem, moveTier } from "@/islands/TierlistHandlers.ts";
import Loading from "@/components/Loading.tsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import UpdateTierlist from "@/components/mutations/UpdateTierlist.ts";
import TierlistQuery from "@/components/queries/Tierlist.ts";
import Error from "@/components/Error.tsx";
import Tiers from "@/islands/Tiers.tsx";

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
      canMonitor: ({ source }) =>
        ["item", "tier"].includes(source.data.type as string),
      onDrop: ({ source, location }) => {
        if (!location.current.dropTargets.length || !tierlist) {
          return;
        }

        if (source.data.type === "item") {
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
        } else if (source.data.type === "tier") {
          const sourceTierId = source.data.id as ITier["id"];
          const targetTierId = location.current.dropTargets[0].data
            .id as ITier["id"];

          const newTierlist = moveTier(
            tierlist,
            sourceTierId,
            targetTierId,
          );
          UpdateTierlistMutation.mutate(newTierlist);
        }
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
      <h2 class="text-5xl font-bold tracking-tighter p-10 text-center">
        {tierlist.name}
      </h2>
      <Tiers />
      <div>
        <ItemList
          tierId={`untiered-${tierlist.id}`}
        />
      </div>
    </TierlistContext.Provider>
  );
};
