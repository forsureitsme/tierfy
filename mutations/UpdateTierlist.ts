import { UseMutationOptions } from "@tanstack/react-query";
import { slug } from "https://deno.land/x/slug@v1.1.0/mod.ts";
import { ITierlist } from "@/types.d.ts";
import { getQueryClient } from "@/islands/Providers.tsx";

const queryClient = getQueryClient();
const UpdateTierlist: UseMutationOptions = {
  mutationFn: async (newTierlist: ITierlist) =>
    await fetch(`/api/tierlists/${slug(newTierlist.name)}`, {
      method: "PUT",
      body: JSON.stringify(newTierlist),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json()),

  onMutate: async (newTierlist: ITierlist) => {
    await queryClient.cancelQueries({
      queryKey: ["tierlist", slug(newTierlist.name)],
    });

    queryClient.setQueryData(
      ["tierlist", slug(newTierlist.name)],
      newTierlist,
    );
  },
};

export default UpdateTierlist;
