import { ITier, ITierableItem, ITierlist } from "@/types.d.ts";
import { Signal } from "@preact/signals";

export const getItemById = (
  tierlistSignal: Signal<ITierlist>,
  itemId: ITierableItem["id"],
) => tierlistSignal.value.items.find((item) => item.id === itemId) || null;

export const moveItemToTier = (
  tierlistSignal: Signal<ITierlist>,
  itemId: ITierableItem["id"],
  tierlistId: ITier["id"],
): void => {
  const newTierlist = { ...tierlistSignal.value };

  newTierlist.tiers = [...newTierlist.tiers.map((tier: ITier) => {
    tier.items = tier.items.filter((tierItemId) => tierItemId !== itemId);

    if (tier.id === tierlistId) {
      tier.items.push(itemId);
    }

    return tier;
  })];

  if (tierlistId.startsWith("untiered")) {
    newTierlist.items.push(
      newTierlist.items.splice(
        newTierlist.items.findIndex((tierableItem) =>
          tierableItem.id === itemId
        ),
        1,
      )[0],
    );

    newTierlist.items = [...newTierlist.items];
  }

  tierlistSignal.value = newTierlist;
  return;
};
