import { type FunctionComponent } from "preact";

import { ItemList } from "@/islands/ItemList.tsx";
import { ITier } from "@/types.d.ts";

export const Tier: FunctionComponent<ITier> = (
  { id, label, backgroundColor, items },
) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 11fr",
      }}
    >
      <div
        style={{
          backgroundColor,
          minHeight: "50px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        contentEditable={true}
      >
        {label}
      </div>
      <div
        style={{
          backgroundColor: "black",
        }}
      >
        <ItemList id={`tier-${id}-items`} items={items} />
      </div>
    </div>
  );
};
