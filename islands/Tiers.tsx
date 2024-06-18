import { FunctionComponent } from "preact";
import { DraggableTier } from "@/islands/DraggableTier.tsx";
import { useContext, useEffect, useRef } from "preact/hooks";
import { TierlistContext } from "@/islands/Tierlist.tsx";
import { useSignal } from "@preact/signals";
import { ITier, ITierlist } from "@/types.d.ts";
import { dropTargetForElements } from "$esm/@atlaskit/pragmatic-drag-and-drop@1.1.10/element/adapter";
import {
  BaseEventPayload,
  DropTargetLocalizedData,
  ElementDragType,
} from "$esm/v135/@atlaskit/pragmatic-drag-and-drop@1.1.10/dist/types/internal-types.d.ts";
import { Tier } from "@/islands/Tier.tsx";

const Tiers: FunctionComponent = () => {
  const droppableRef = useRef<HTMLDivElement | null>(null);
  const tierDraggedOver = useSignal<ITier["id"] | null>(null);

  const tierlist = useContext(
    TierlistContext,
  );
  if (!tierlist?.tiers) return null;

  const onDropTargetChange = (
    { source, location }:
      & BaseEventPayload<ElementDragType>
      & DropTargetLocalizedData,
  ) => {
    const data = source.data as { id: ITier["id"] };

    if (
      location.current.dropTargets.length > 1 ||
      location.current.dropTargets[0]?.data.id !== tierlist.id
    ) {
      onDragLeave();
      return;
    }
    tierDraggedOver.value = data.id;
  };
  const onDragLeave = () => {
    tierDraggedOver.value = null;
  };

  useEffect(() => {
    const el = droppableRef.current;
    if (!el) {
      return;
    }

    return dropTargetForElements({
      element: el,
      getData: (): { id: ITierlist["id"] } => ({ id: tierlist.id }),
      canDrop: ({ source }) => source.data.type === "tier",
      onDropTargetChange,
      onDrop: onDragLeave,
      onDragLeave,
    });
  }, []);

  return (
    <div ref={droppableRef} className="pb-5 flex flex-col">
      {tierlist.tiers.map((tier) => <DraggableTier
        key={tier.id}
        id={tier.id}
      />)}

      {tierDraggedOver.value && <Tier fake id={tierDraggedOver.value} />}
    </div>
  );
};

export default Tiers;
