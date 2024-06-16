import { load } from "npm:cheerio";
import { ITierableItem } from "@/types.d.ts";
import {
  makeTierableItem,
  saveTierListDefinition,
} from "@/services/tierlist.ts";

class Kpopping {
  static baseUrl = "https://kpopping.com";

  static async makeTierlistWithGroupSlug(groupSlug: string) {
    const response = await fetch(`${this.baseUrl}/profiles/group/${groupSlug}`);
    const body = await response.text();
    const $ = load(body);

    const $encyclopedia = $(".encyclopedia");
    const groupName = $(".group-pose figcaption h1", $encyclopedia).text()
      .trim();

    const members: Array<ITierableItem> = [];
    $(".members .member img", $encyclopedia).each((_, element): void => {
      members.push(makeTierableItem(groupName, {
        name: $(element).attr("alt") || "",
        remoteImage: new URL($(element).attr("src") || "", this.baseUrl).href,
      }));
    });

    await saveTierListDefinition(groupName, members);
  }
}

export default Kpopping;
