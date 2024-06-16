import { PageProps } from "$fresh/server.ts";
import { ITierlist } from "@/types.d.ts";
import { Tierlist } from "@/islands/Tierlist.tsx";
import Providers from "@/islands/Providers.tsx";

export default function Page(props: PageProps) {
  const { slug } = props.params as unknown as {
    slug: ITierlist["name"];
  };

  return (
    <Providers>
      <section>
        <Tierlist slug={slug} />
      </section>
    </Providers>
  );
}
