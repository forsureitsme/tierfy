import { ITierableItem, ITierlist } from "@/types.d.ts";

export const getItemById = (tierlist: ITierlist, itemId: ITierableItem["id"]) =>
  tierlist.items.find((item) => item.id === itemId) || null;
