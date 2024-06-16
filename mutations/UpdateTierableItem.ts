import { UseMutationOptions } from "@tanstack/react-query";
import { ITierableItem } from "@/types.d.ts";
import { getQueryClient } from "@/islands/Providers.tsx";

interface Variables {
  slug: string;
  itemId: ITierableItem["id"];
  itemProps: ITierableItem;
}

const queryClient = getQueryClient();

const UpdateTierableItem: UseMutationOptions = {
  mutationFn: async ({ slug, itemId, itemProps }: Variables) =>
    await fetch(`/api/tierlists/${slug}/items/${itemId}`, {
      method: "PATCH",
      body: JSON.stringify(itemProps),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json()),

  onMutate: async ({ slug }: Variables) => {
    await queryClient.cancelQueries({
      queryKey: ["tierlist", slug],
    });
  },
  onSettled: (_data, _error, { slug }: Variables) => {
    queryClient.invalidateQueries({ queryKey: ["tierlist", slug] });
  },
};

export default UpdateTierableItem;
