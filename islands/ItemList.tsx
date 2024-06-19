import { ITier, ITierableItem } from "@/types.d.ts";
import { type FunctionComponent } from "preact";
import { DraggableItem } from "./DraggableItem.tsx";
import { useContext } from "preact/hooks";
import { CryptoUUID } from "@/types.d.ts";
import { dropTargetForElements } from "$esm/@atlaskit/pragmatic-drag-and-drop@1.1.10/element/adapter";
import { useRef } from "preact/hooks";
import { useEffect } from "preact/hooks";
import {
  BaseEventPayload,
  DropTargetLocalizedData,
  ElementDragType,
} from "$esm/v135/@atlaskit/pragmatic-drag-and-drop@1.1.10/dist/types/internal-types.d.ts";
import { useSignal } from "@preact/signals";
import { Item } from "@/islands/Item.tsx";
import { TierlistContext } from "@/islands/Tierlist.tsx";

export const ItemList: FunctionComponent<
  { tierId: CryptoUUID }
> = (
  { tierId },
) => {
  const droppableRef = useRef<HTMLDivElement | null>(null);
  const itemDraggedOver = useSignal<ITierableItem["id"] | null>(null);

  const tierlist = useContext(
    TierlistContext,
  );
  if (!tierlist?.items) return null;

  const onDropTargetChange = (
    { source, location }:
      & BaseEventPayload<ElementDragType>
      & DropTargetLocalizedData,
  ) => {
    const data = source.data as { id: ITierableItem["id"] };
    if (
      location.current.dropTargets.length > 1 ||
      !location.current.dropTargets[0]?.data.tierId
    ) {
      onDragLeave();
      return;
    }
    itemDraggedOver.value = data.id;
  };
  const onDragLeave = () => {
    itemDraggedOver.value = null;
  };
  useEffect(() => {
    const el = droppableRef.current;
    if (!el) {
      return;
    }

    return dropTargetForElements({
      element: el,
      getData: (): { tierId: ITier["id"] } => ({ tierId }),
      canDrop: ({ source }) => source.data.type === "item",
      onDropTargetChange,
      onDrop: onDragLeave,
      onDragLeave,
    });
  }, []);

  const items = tierId.startsWith("untiered")
    ? tierlist.items.reduce((
      untieredItems,
      untieredItem,
    ) => [
      ...untieredItems,
      ...tierlist.tiers.some((tier) =>
          tier.items.some((tierItem) => tierItem === untieredItem.id)
        )
        ? []
        : [untieredItem.id],
    ], [] as ITier["items"])
    : tierlist.tiers.find((tier) => tier.id === tierId)?.items;

  return (
    <div
      ref={droppableRef}
      class="flex flex-wrap h-full relative min-h-32"
    >
      {items?.map((itemId: ITierableItem["id"]) => (
        <DraggableItem
          key={itemId}
          id={itemId}
          tierId={tierId}
        />
      ))}
      {itemDraggedOver.value && <Item fake id={itemDraggedOver.value} />}
    </div>
  );
};
