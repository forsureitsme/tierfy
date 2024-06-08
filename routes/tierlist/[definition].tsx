import { PageProps } from "$fresh/server.ts";
import { FreshContext } from "$fresh/src/server/types.ts";
import { ITierlist } from "@/types.d.ts";
import { Tierlist } from "@/islands/Tierlist.tsx";
import { getTierlistDefinition } from "@/services/tierlist.ts";

interface State {
  definition: ITierlist;
}

export async function handler(_req: Request, ctx: FreshContext<State>) {
  const { definition } = ctx.params;
  
  ctx.state.definition = getTierlistDefinition(definition);

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
