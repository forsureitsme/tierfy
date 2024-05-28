import { dirname } from "$std/path/dirname.ts";
import { existsSync } from "$std/fs/exists.ts";
import { join } from "$std/path/join.ts";
import { ScrapedItem, TierableItem } from "../types.d.ts";
import { TierList } from "../types.d.ts";
import { extname } from "$std/path/extname.ts";
import { delay } from "$std/async/delay.ts";

const downloadFileToPath = async (url: URL, filePath: string) => {
  await delay(50);
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  const localDir = dirname(filePath);

  if (!existsSync(localDir)) {
    Deno.mkdirSync(localDir, { recursive: true });
  }

  Deno.writeFileSync(filePath, new Uint8Array(buffer));
};

const processItemImages = async (items: Array<TierableItem>) => {
  return await Promise.allSettled(
    items.map((item) => {
      const picturePath = join(Deno.cwd(), "static", "img", item.image);
      if (!existsSync(picturePath)) {
        downloadFileToPath(new URL(item.remoteImage), picturePath);
      }
    }),
  );
};

export const saveTierListInfo = async (
  tierListName: string,
  items: Array<TierableItem>,
) => {
  const tierList: TierList = { name: tierListName, items };
  Deno.writeTextFileSync(
    join(
      Deno.cwd(),
      "static",
      "tierlists",
      `${encodeURIComponent(tierListName)}.json`,
    ),
    JSON.stringify(tierList),
  );

  return await processItemImages(items);
};

export const makeTierableItem = (
  tierListName: string,
  item: ScrapedItem,
): TierableItem => {
  const imageUrl = new URL(item.remoteImage);
  const extension = extname(imageUrl.pathname);
  const memberName = item.name;
  const fileName = `${memberName}${extension}`;
  return {
    name: memberName,
    image: `${encodeURIComponent(tierListName)}/${fileName}`,
    remoteImage: imageUrl.href,
  };
};
