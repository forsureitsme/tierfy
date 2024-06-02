import { dirname } from "$std/path/dirname.ts";
import { existsSync } from "$std/fs/exists.ts";
import { join } from "$std/path/join.ts";
import { IScrapedItem, ITierableItem } from "@/types.d.ts";
import { ITierList } from "@/types.d.ts";
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

const processItemImages = async (items: Array<ITierableItem>) => {
  return await Promise.allSettled(
    items.map((item) => {
      const picturePath = join(Deno.cwd(), "static", "img", "tierlist-items", item.image);
      if (!existsSync(picturePath)) {
        downloadFileToPath(new URL(item.remoteImage), picturePath);
      }
    }),
  );
};

export const saveTierListDefinition = async (
  tierlistName: string,
  items: Array<ITierableItem>,
) => {
  const tierlist: ITierList = { name: tierlistName, items };

  const filePath = join(
    Deno.cwd(),
    "static",
    "tierlists",
    "definitions",
    `${encodeURIComponent(tierlistName)}.json`,
  );
  const localDir = dirname(filePath);

  if (!existsSync(localDir)) {
    Deno.mkdirSync(localDir, { recursive: true });
  }

  Deno.writeTextFileSync(
    filePath,
    JSON.stringify(tierlist),
  );

  return await processItemImages(items);
};

export const makeTierableItem = (
  tierlistName: string,
  item: IScrapedItem,
): ITierableItem => {
  const imageUrl = new URL(item.remoteImage);
  const extension = extname(imageUrl.pathname);
  const memberName = item.name;
  const fileName = `${memberName}${extension}`;
  return {
    name: memberName,
    image: `${encodeURIComponent(tierlistName)}/${fileName}`,
    remoteImage: imageUrl.href,
  };
};
