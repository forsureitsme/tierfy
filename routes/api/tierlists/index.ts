import { join } from "$std/path/join.ts";
import { extname } from "$std/path/extname.ts";
import { basename } from "$std/path/basename.ts";
import { getTierlistDefinition } from "@/services/tierlist.ts";

export const handler = {
  GET() {
    const tierlistsPath = join(Deno.cwd(), "data", "tierlists");
    const entries = Deno.readDirSync(tierlistsPath);
    const tierlists = [];

    for (const entry of entries) {
      if (!entry.isFile || extname(entry.name) !== ".json") {
        continue;
      }

      const slug = basename(entry.name, ".json");

      const { name, id } = getTierlistDefinition(slug);

      tierlists.push({
        id,
        name,
        slug,
      });
    }

    return new Response(
      JSON.stringify(tierlists),
    );
  },
};
