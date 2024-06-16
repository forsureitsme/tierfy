import { PageProps } from "$fresh/server.ts";
import { ITierlist } from "@/types.d.ts";
import { Tierlist } from "@/islands/Tierlist.tsx";
import Providers from "@/islands/Providers.tsx";

interface Params {
  slug: ITierlist["name"];
}

export default function Page(props: PageProps) {
  const { slug } = props.params as unknown as Params;

  return (
    <Providers>
      <section className="min-h-screen bg-black text-white">
        <Tierlist slug={slug} />
      </section>
    </Providers>
  );
}
