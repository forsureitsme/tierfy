import { ITierableItem } from "@/types.d.ts";
import { type FunctionComponent } from "preact";
import { Item } from "@/islands/Item.tsx";
import { DropIndicator } from "$esm/@atlaskit/pragmatic-drag-and-drop-react-drop-indicator@1.1.1/box";
import { CryptoUUID } from "@/types.d.ts";
import { dropTargetForElements } from "$esm/@atlaskit/pragmatic-drag-and-drop@1.1.10/element/adapter";
import { useRef } from "preact/hooks";
import { useEffect } from "preact/hooks";

export const ItemList: FunctionComponent<
  { id: CryptoUUID; items: ITierableItem["id"][] }
> = (
  { id, items },
) => {
  const droppableRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = droppableRef.current;
    if (!el) {
      return;
    }

    return dropTargetForElements({
      element: el,
      getData: () => ({ id }),
      canDrop: ({ source }) => source.data.type === "item",
    });
  }, []);

  return (
    <div
      ref={droppableRef}
      style={{ display: "flex", height: "100%", border: "1px solid red", position: "relative" }}
    >
      {items.map((itemId) => (
        <Item
          key={`item-${itemId}`}
          id={itemId}
          tierId={id}
        />
      ))}
      <DropIndicator edge="left" />
    </div>
  );
};
