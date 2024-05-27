import { CheerioAPI, load } from "npm:cheerio";
import { KpopGroup, KpopGroupMember } from "../types.d.ts";
import { dirname } from "$std/path/dirname.ts";
import { extname } from "$std/path/extname.ts";
import { join } from "$std/path/join.ts";
import { existsSync } from "$std/fs/exists.ts";

const baseUrl = "https://kpopping.com";

const response = await fetch(Deno.args[0]);
const body = await response.text();
const $ = load(body);

const $encyclopedia = $(".encyclopedia");
const groupName = $(".group-pose figcaption h1", $encyclopedia).text().trim();

const getGroupMembers = ($: CheerioAPI) => {
  const members: Array<KpopGroupMember> = [];
  $(".members .member img", $encyclopedia).each((_, element): void => {
    const imageUrl = new URL($(element).attr("src") || "", baseUrl);
    const extension = extname(imageUrl.pathname);
    const memberName = $(element).attr("alt") || "";
    const fileName = `${memberName}${extension}`;
    members.push({
      name: memberName,
      image: `img/${groupName}/${fileName}`,
      remoteImage: imageUrl.href,
    });
  });
  return members;
};

const saveGroupInfo = (members: Array<KpopGroupMember>) => {
  const group: KpopGroup = { name: groupName, members };
  Deno.writeTextFileSync(
    join(Deno.cwd(), "static", "tierlists", `${groupName}.json`),
    JSON.stringify(group),
  );
};

const downloadFileToPath = async (url: URL, filePath: string) => {
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  const localDir = dirname(filePath);

  if (!existsSync(localDir)) {
    Deno.mkdirSync(localDir, { recursive: true });
  }
  
  Deno.writeFileSync(filePath, new Uint8Array(buffer));
};

const processMemberImages = async (members: Array<KpopGroupMember>) => {
  return await Promise.allSettled(
    members.map((member) => {
      const picturePath = join(Deno.cwd(), "static", member.image);
      if (!existsSync(picturePath)) {
        downloadFileToPath(new URL(member.remoteImage), picturePath);
      }
    }),
  );
};

try {
  const members = getGroupMembers($);
  saveGroupInfo(members);
  processMemberImages(members);
} catch (err) {
  console.error("Error:", err);
}
