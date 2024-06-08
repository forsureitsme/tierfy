import { type FunctionComponent } from "preact";

import { ItemList } from "@/islands/ItemList.tsx";
import { ITier } from "@/types.d.ts";

export const Tier: FunctionComponent<ITier> = (
  { id, label, backgroundColor },
) => {
  return (
    <div className="grid grid-cols-[128px_1fr] border-b border-b-transparent">
      <div
        style={{ backgroundColor }}
        className={`min-h-32 text-center flex flex-col justify-center items-center`}
        contentEditable={true}
      >
        {label}
      </div>
      <div className="bg-black">
        <ItemList tierId={id} />
      </div>
    </div>
  );
};
