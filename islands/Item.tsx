import { asset } from "$fresh/runtime.ts";
import { forwardRef } from "preact/compat";
import { useContext } from "preact/hooks";
import { getItemById } from "@/islands/TierlistHandlers.ts";
import { TierlistSignalContext } from "@/islands/Tierlist.tsx";
import { ITierableItem } from "@/types.d.ts";

export const Item = forwardRef<
  HTMLDivElement,
  {
    id: ITierableItem["id"];
    fake: boolean;
    className: string;
  } | Element["attributes"]
>(
  ({ id, fake, className, ...props }, ref) => {
    const tierlistSignal = useContext(
      TierlistSignalContext,
    );
    if (!tierlistSignal?.value.items) return null;

    const item = getItemById(tierlistSignal, id);
    if (!item) return null;

    const { name, image } = item;

    return (
      <div
        ref={ref}
        {...props}
        style={{
          backgroundImage: `url(${asset(`/img/tierlist-items/${image}`)})`,
        }}
        className={`${
          fake && `opacity-30`
        } grid justify-center content-end select-none bg-cover size-32 overflow-hidden ${className}`}
        title={!fake ? name : undefined}
      />
    );
  },
);
