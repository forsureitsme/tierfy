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
