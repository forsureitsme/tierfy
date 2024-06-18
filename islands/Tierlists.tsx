import TierlistsQuery from "@/components/queries/Tierlists.ts";
import { useQuery } from "@tanstack/react-query";
import { ITierlist } from "@/types.d.ts";
import Loading from "@/components/Loading.tsx";
import Error from "@/components/Error.tsx";

export default function Tierlists() {
  const { data, isPending, isError, error } = useQuery(TierlistsQuery);
  const tierlists = data as Array<ITierlist & { slug: string }>;

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <Error error={error} />;
  }

  return (
    <div class="container mx-auto">
      <h2 className="text-5xl font-bold tracking-tighter p-10 text-center">
        Tierlists
      </h2>
      <section>
        <h3 className="text-4xl font-bold tracking-tighter p-10 text-center">
          Local
        </h3>
        {tierlists.map((tierlist) => (
          <a key={tierlist.id} href={`/tierlists/${tierlist.slug}`}>
            <div>
              {tierlist.name}
            </div>
          </a>
        ))}
      </section>
    </div>
  );
}
