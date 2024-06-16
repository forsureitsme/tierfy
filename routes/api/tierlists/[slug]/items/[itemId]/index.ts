import { FreshContext } from "$fresh/server.ts";
import { getTierlistDefinition } from "@/services/tierlist.ts";
import { join } from "$std/path/join.ts";
import { dirname } from "$std/path/dirname.ts";
import { existsSync } from "$std/fs/exists.ts";
import { updateItem } from "@/islands/TierlistHandlers.ts";
import { ITierableItem } from "@/types.d.ts";

export const handler = {
  async PATCH(req: Request, ctx: FreshContext) {
    const { slug, itemId } = ctx.params as {
      slug: string;
      itemId: ITierableItem["id"];
    };

    const itemProps = (await req.json()) as ITierableItem;
    const oldTierlist = getTierlistDefinition(slug);
    if (!oldTierlist) {
      return ctx.renderNotFound();
    }

    const newTierlist = updateItem(oldTierlist, itemId, itemProps);
    if (!newTierlist) {
      return ctx.renderNotFound();
    }

    const filePath = join(
      Deno.cwd(),
      "data",
      "tierlists",
      `${slug}.json`,
    );
    const localDir = dirname(filePath);

    if (!existsSync(localDir)) {
      Deno.mkdirSync(localDir, { recursive: true });
    }

    Deno.writeTextFileSync(
      filePath,
      JSON.stringify(newTierlist),
    );

    return new Response(
      JSON.stringify(newTierlist.items.find((item) => item.id === itemId)),
    );
  },
};
