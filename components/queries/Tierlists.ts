import { ITierlist } from "@/types.d.ts";

export const fetchTierlists = async () =>
  await fetch(`/api/tierlists`).then((res) =>
    res.json() as unknown as Array<ITierlist & { slug: string }>
  );
export const Tierlists = {
  queryFn: fetchTierlists,
  queryKey: ["tierlists"],
};

export default Tierlists;
