import { ITier, ITierableItem, ITierlist } from "@/types.d.ts";

export const getItemById = (
  tierlist: ITierlist,
  itemId: ITierableItem["id"],
) => tierlist?.items.find((item) => item.id === itemId) || null;

export const moveItem = (
  tierlist: ITierlist,
  sourceTierId: ITier["id"],
  sourceItemId: ITierableItem["id"],
  targetTierId: ITier["id"],
  targetItemId: ITierableItem["id"],
) => {
  const newTierlist = { ...tierlist };

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

  return newTierlist;
};

export const moveTier = (
  tierlist: ITierlist,
  sourceTierId: ITier["id"],
  targetTierId: ITier["id"],
) => {
  const newTierlist = { ...tierlist };

  swapTiers(newTierlist.tiers, sourceTierId, targetTierId);

  return newTierlist;
};

const swapTiers = (
  tiers: ITierlist["tiers"],
  sourceTierId: ITier["id"],
  targetTierId: ITier["id"],
) => {
  const sourceTier = tiers.splice(
    tiers.findIndex((tier) => tier.id === sourceTierId),
    1,
  )[0];

  let targetTierIndex = tiers.length;
  if (targetTierId) {
    targetTierIndex = tiers.findIndex((tier) => tier.id === targetTierId);
  }

  if (targetTierIndex < 0) {
    targetTierIndex = tiers.length;
  }

  tiers.splice(
    targetTierIndex,
    0,
    sourceTier,
  );
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
  tierlist: ITierlist,
  itemId: ITierableItem["id"],
  itemProps: Record<string, unknown>,
) => {
  const { items } = tierlist;
  const itemIndex = items.findIndex((item) => item.id === itemId);
  if (itemIndex < 0) return;

  const newItem = { ...items[itemIndex] } as ITierableItem;
  Object.entries(itemProps).forEach(([key, value]) => {
    newItem[key] = value;
  });

  items.splice(itemIndex, 1, newItem);

  return { ...tierlist };
};
