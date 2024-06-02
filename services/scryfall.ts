import { ITierableItem } from "@/types.d.ts";
import { makeTierableItem, saveTierListDefinition } from "./tierlist.ts";
import { Cards } from "npm:scryfall-sdk";

const cardListName = "Basic land arts";
const cards: Array<ITierableItem> = [];

for await (
  const card of Cards.search("t:basic", {
    unique: "art",
    order: "released",
    dir: "desc",
  }).all()
) {
  if (!card.image_uris?.art_crop) {
    continue;
  }

  const name = `${card.name} (${card.set}) ${card.collector_number}`;
  console.log(name+'\n');

  cards.push(makeTierableItem(cardListName, {
    name,
    remoteImage: card.image_uris.art_crop,
  }));
}

await saveTierListDefinition(cardListName, cards);
