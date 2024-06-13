import { ITier, ITierableItem, ITierlist } from "@/types.d.ts";
import { Signal } from "@preact/signals";

export const getItemById = (
  tierlistSignal: Signal<ITierlist>,
  itemId: ITierableItem["id"],
) => tierlistSignal.value.items.find((item) => item.id === itemId) || null;

export const moveItem = (
  tierlistSignal: Signal<ITierlist>,
  sourceTierId: ITier["id"],
  sourceItemId: ITierableItem["id"],
  targetTierId: ITier["id"],
  targetItemId: ITierableItem["id"],
): void => {
  const newTierlist = { ...tierlistSignal.value };

  if (
    sourceTierId.startsWith("untiered") && targetTierId.startsWith("untiered")
  ) {
    swapUntieredItems(newTierlist.items, sourceItemId, targetItemId);
  } else if (
    !sourceTierId.startsWith("untiered") && targetTierId.startsWith("untiered")
  ) {
    untierItem(newTierlist.tiers, sourceItemId, sourceTierId);
    swapUntieredItems(newTierlist.items, sourceItemId, targetItemId);
  } else if (
    sourceTierId.startsWith("untiered") && !targetTierId.startsWith("untiered")
  ) {
    tierItem(
      newTierlist.tiers,
      sourceItemId,
      targetItemId,
      targetTierId,
    );
  } else if (
    !sourceTierId.startsWith("untiered") && !targetTierId.startsWith("untiered")
  ) {
    untierItem(newTierlist.tiers, sourceItemId, sourceTierId);
    tierItem(
      newTierlist.tiers,
      sourceItemId,
      targetItemId,
      targetTierId,
    );
  }

  tierlistSignal.value = newTierlist;
};

const swapUntieredItems = (
  untieredItems: ITierlist["items"],
  sourceItemId: ITierableItem["id"],
  targetItemId: ITierableItem["id"],
) => {
  const sourceItem = untieredItems.splice(
    untieredItems.findIndex((item) => item.id === sourceItemId),
    1,
  )[0];

  untieredItems.splice(
    targetItemId
      ? untieredItems.findIndex((item) => item.id === targetItemId)
      : untieredItems.length,
    0,
    sourceItem,
  );
};

const untierItem = (
  tiers: ITierlist["tiers"],
  sourceItemId: ITierableItem["id"],
  sourceTierId: ITierableItem["id"],
) => {
  const tier = tiers.find((tier) => tier.id === sourceTierId);

  tier?.items.splice(
    tier.items.findIndex((itemId) => itemId === sourceItemId),
    1,
  );
};

const tierItem = (
  tiers: ITierlist["tiers"],
  sourceItemId: ITierableItem["id"],
  targetItemId: ITierableItem["id"],
  targetTierId: ITier["id"],
) => {
  const tier = tiers.find((tier) => tier.id === targetTierId);

  tier?.items.splice(
    targetItemId
      ? tier.items.findIndex((itemId) => itemId === targetItemId)
      : tier.items.length,
    0,
    sourceItemId,
  );
};

export const updateItem = (
  tierlistSignal: Signal<ITierlist>,
  itemId: ITierableItem["id"],
  props: Record<string, unknown>,
) => {
  const { items } = tierlistSignal.value;
  const itemIndex = items.findIndex((item) => item.id === itemId);
  if (itemIndex < 0) return;

  const newItem = { ...items[itemIndex] } as ITierableItem;
  Object.entries(props).forEach(([key, value]) => {
    newItem[key] = value;
  });

  items.splice(itemIndex, 1, newItem);
  tierlistSignal.value = { ...tierlistSignal.value };
};
