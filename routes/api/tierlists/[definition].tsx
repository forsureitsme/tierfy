import { FreshContext } from "$fresh/server.ts";
import { getTierlistDefinition } from "@/services/tierlist.ts";

export const handler = {
  GET(_req: Request, ctx: FreshContext) {
    const { definition } = ctx.params;

    return new Response(
      JSON.stringify(getTierlistDefinition(definition)),
    );
  },
};
