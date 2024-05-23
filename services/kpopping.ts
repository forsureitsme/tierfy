import { CheerioAPI, load } from "npm:cheerio";
import { parse } from "node:url";
import { extname, join } from "node:path";
import { existsSync } from "node:fs";

let $: CheerioAPI;
const baseUrl = "https://kpopping.com";

const response = await fetch(Deno.args[0]);
const body = await response.text();
$ = load(body);
const $encyclopedia = $(".encyclopedia");
const groupName = $(".group-pose figcaption h1", $encyclopedia).text().trim();

interface Member {
  name: string;
  image: string;
}

const members: Array<Member> = [];
$(".members .member img", $encyclopedia).each(
  async (_, element) => {
    const imageUrl = `${baseUrl}${$(element).attr("src")}`;
    const extension = extname(parse(imageUrl).pathname || "");
    const groupPath = join(
      `img`,
      groupName,
    );
    const memberName = $(element).attr("alt") || '';
    const fileName = `${memberName}${extension}`;
    const member: Member = { name: memberName, image: `img/${groupName}/${fileName}` };
    const picturePath = join(Deno.cwd(), "static", groupPath, fileName);
    members.push(member);

    if (!existsSync(picturePath)) {
      const response = await fetch(imageUrl);
      const data = await response.arrayBuffer();
      Deno.mkdirSync(join(Deno.cwd(), "static", groupPath), { recursive: true });
      Deno.writeFileSync(
        picturePath,
        new Uint8Array(data),
      );
    }
  },
);

Deno.writeTextFileSync(
  join(Deno.cwd(), "static", "tierlists", groupName + ".json"),
  JSON.stringify({
    name: groupName,
    members,
  }),
);
