import { asset } from "$fresh/runtime.ts";
import { forwardRef } from "preact/compat";
import { useContext } from "preact/hooks";
import { getItemById } from "@/islands/TierlistHandlers.ts";
import { TierlistSignalContext } from "@/islands/Tierlist.tsx";
import { ITierableItem } from "@/types.d.ts";

export const Item = forwardRef<
  HTMLDivElement,
  { id: ITierableItem["id"]; fake: boolean }
>(
  ({ id, fake, style, ...props }, ref) => {
    const tierlistSignal = useContext(
      TierlistSignalContext,
    );
    if (!tierlistSignal?.value.items) return null;

    const item = getItemById(tierlistSignal.value, id);
    if (!item) return null;

    const { name, image } = item;

    return (
      <div
        ref={ref}
        {...props}
        style={{
          ...style,
          opacity: fake ? 0.3 : 1,
          width: "150px",
          height: "150px",
          backgroundImage: `url(${asset(`/img/tierlist-items/${image}`)})`,
          userSelect: "none",
        }}
      >
        {name}
      </div>
    );
  },
);
