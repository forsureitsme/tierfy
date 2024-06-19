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
import { Icon } from "@iconify-icon/react";
import { makeTier } from "@/services/tierlist.ts";
import UpdateTierlist from "@/components/mutations/UpdateTierlist.ts";
import { useMutation } from "@tanstack/react-query";

const Tiers: FunctionComponent = () => {
  const droppableRef = useRef<HTMLDivElement | null>(null);
  const tierDraggedOver = useSignal<ITier["id"] | null>(null);
  const { mutate: updateTierlistMutation } = useMutation(UpdateTierlist);

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

  const addTier = () => {
    const newTier = makeTier();

    const newTierlist = { ...tierlist };
    newTierlist.tiers.push(newTier);

    updateTierlistMutation(newTierlist);
  };

  return (
    <div ref={droppableRef} className="pb-5 flex flex-col">
      {tierlist.tiers.map((tier) => (
        <DraggableTier
          key={tier.id}
          id={tier.id}
        />
      ))}

      {tierDraggedOver.value && <Tier fake id={tierDraggedOver.value} />}

      <button
        type="button"
        className="
          w-full text-center text-white bg-gray-700 py-2 px-4 rounded-lg text-2xl border-b-gray-800 border-b-[2px]
          hover:border-b-[1px] hover:translate-y-[1px] hover:mb-[1px] hover:opacity-95
          active:border-b-0 active:translate-y-[2px] active:mb-[2px]
        "
        onClick={() => addTier()}
      >
        <Icon icon="ci:add-row" />
      </button>
    </div>
  );
};

export default Tiers;
