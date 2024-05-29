import { load } from "npm:cheerio";
import { ITierableItem } from "../types.d.ts";
import { makeTierableItem, saveTierListDefinition } from "./tierList.ts";

const baseUrl = "https://kpopping.com";

const response = await fetch(Deno.args[0]);
const body = await response.text();
const $ = load(body);

const $encyclopedia = $(".encyclopedia");
const groupName = $(".group-pose figcaption h1", $encyclopedia).text().trim();

const members: Array<ITierableItem> = [];
$(".members .member img", $encyclopedia).each((_, element): void => {
  members.push(makeTierableItem(groupName, {
    name: $(element).attr("alt") || "",
    remoteImage: new URL($(element).attr("src") || "", baseUrl).href,
  }));
});

await saveTierListDefinition(groupName, members);
