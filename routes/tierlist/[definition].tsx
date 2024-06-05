import { PageProps } from "$fresh/server.ts";
import { existsSync } from "$std/fs/exists.ts";
import { join } from "$std/path/join.ts";
import { FreshContext } from "$fresh/src/server/types.ts";
import { ITierlist } from "@/types.d.ts";
import { Tierlist } from "@/islands/Tierlist.tsx";

interface State {
  definition: ITierlist;
}

export async function handler(_req: Request, ctx: FreshContext<State>) {
  const { definition } = ctx.params;
  const filePath = join(
    Deno.cwd(),
    "static",
    "tierlists",
    "definitions",
    `${definition}.json`,
  );
  if (!existsSync(filePath)) {
    throw new Deno.errors.NotFound();
  }

  ctx.state.definition = JSON.parse(Deno.readTextFileSync(filePath));

  return await ctx.render();
}

export default function Page(props: PageProps) {
  const { definition } = props.state as unknown as State;

  return (
    <section>
      <Tierlist {...definition} />
    </section>
  );
}
