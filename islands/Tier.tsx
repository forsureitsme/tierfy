import { ItemList } from "@/islands/ItemList.tsx";
import { ITier } from "@/types.d.ts";
import { forwardRef } from "preact/compat";
import { useContext } from "preact/hooks";
import { TierlistContext } from "@/islands/Tierlist.tsx";
import chroma from "npm:chroma-js";

export const Tier = forwardRef<
  HTMLDivElement,
  {
    id: ITier["id"];
    fake: boolean;
    className: string;
  } & Element["attributes"]
>(
  ({ id, fake, className, ...props }, ref) => {
    const tierlist = useContext(TierlistContext);
    if (!tierlist) return null;

    const tier = tierlist.tiers.find((tier) => tier.id === id);
    if (!tier) return null;

    const { backgroundColor, label } = tier;

    return (
      <div
        ref={ref}
        {...props}
        class={`${
          fake ? `opacity-30` : ""
        } select-none overflow-hidden grid grid-cols-[128px_1fr] mb-1 ${className}`}
        style={{ backgroundColor }}
      >
        <div
          class={`text-center flex flex-col justify-center items-center ${
            chroma(backgroundColor).luminance() < 0.5
              ? "text-white"
              : "text-black"
          }`}
          contentEditable={true}
        >
          {label}
        </div>
        <div style={{ backgroundColor }}>
          <div class="backdrop-brightness-50">
            <ItemList tierId={id} />
          </div>
        </div>
      </div>
    );
  },
);
