import { UseQueryOptions } from "@tanstack/react-query";
import { ITierlist } from "@/types.d.ts";

export const Tierlist = (slug: string): UseQueryOptions => ({
  queryFn: async () => await fetchTierlist(slug),
  queryKey: ["tierlist", slug],
});

export const fetchTierlist = async (slug: string) =>
  await fetch(`/api/tierlists/${slug}`).then((res) =>
    res.json() as unknown as ITierlist
  );

export default Tierlist;
