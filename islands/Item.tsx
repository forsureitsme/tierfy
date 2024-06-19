import { asset } from "$fresh/runtime.ts";
import { forwardRef } from "preact/compat";
import { useContext } from "preact/hooks";
import { getItemById } from "@/islands/TierlistHandlers.ts";
import { TierlistContext } from "@/islands/Tierlist.tsx";
import { ITierableItem } from "@/types.d.ts";

export const Item = forwardRef<
  HTMLDivElement,
  {
    id: ITierableItem["id"];
    fake: boolean;
    className: string;
  } & Element["attributes"]
>(
  ({ id, fake, className, ...props }, ref) => {
    const tierlist = useContext(
      TierlistContext,
    );
    if (!tierlist?.items) return null;

    const item = getItemById(tierlist, id);
    if (!item) return null;
    
    const { name, image } = item;

    return (
      <div
        ref={ref}
        {...props}
        class={`${
          fake ? `opacity-30` : ""
        } select-none bg-cover size-32 overflow-hidden ${className}`}
        title={!fake ? name : undefined}
        style={{
          backgroundImage: `url(${asset(`/img/tierlist-items/${image}`)})`,
        }}
      />
    );
  },
);
