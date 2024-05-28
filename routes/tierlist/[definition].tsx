import { PageProps } from "$fresh/server.ts";
import { existsSync } from "$std/fs/exists.ts";
import { join } from "$std/path/join.ts";

export default function Page(props: PageProps) {
  const { definition } = props.params;
  const filePath = join(
    Deno.cwd(),
    "static",
    "tierlists",
    "definitions",
    `${definition}.json`
  );
  if (!existsSync(filePath)) {
    throw new Error(`Tierlist definition not found: ${filePath}`);
  }

  const tierlistDefinition = JSON.parse(Deno.readTextFileSync(filePath));

  console.log(tierlistDefinition);

  return <div>You are on the page '{props.url.href}'.</div>;
}
