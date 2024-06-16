import { FreshContext } from "$fresh/server.ts";
import { getTierlistDefinition } from "@/services/tierlist.ts";
import { ITierlist } from "@/types.d.ts";
import { join } from '$std/path/join.ts';
import { dirname } from '$std/path/dirname.ts';
import { existsSync } from '$std/fs/exists.ts';

export const handler = {
  GET(_req: Request, ctx: FreshContext) {
    const { slug } = ctx.params;

    return new Response(
      JSON.stringify(getTierlistDefinition(slug)),
    );
  },
  async PUT(req: Request, ctx: FreshContext) {
    const { slug } = ctx.params;

    const newTierlist = (await req.json()) as ITierlist;

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

    return new Response(JSON.stringify(newTierlist));
  },
};
