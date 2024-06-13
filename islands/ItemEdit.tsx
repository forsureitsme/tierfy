import { ITierableItem } from "@/types.d.ts";
import { useContext, useRef } from "preact/hooks";
import { type FunctionComponent } from "preact";
import { TierlistSignalContext } from "@/islands/Tierlist.tsx";
import { getItemById, updateItem } from "@/islands/TierlistHandlers.ts";
import { Icon } from "$esm/@iconify-icon/react@2.1.0?alias=react:preact/compat&deps=preact";
import TablerEdit from "$esm/@iconify-icons/tabler@1.2.95/edit";

const ItemEdit: FunctionComponent<{ id: ITierableItem["id"] }> = ({ id }) => {
  const dialogRef = useRef(null as HTMLDialogElement | null);
  const formRef = useRef(null as HTMLFormElement | null);
  const tierlistSignal = useContext(TierlistSignalContext);

  if (!tierlistSignal) return null;

  const item = getItemById(tierlistSignal, id);

  const onDialogClosed = () => {
    if (!formRef.current) return;

    updateItem(tierlistSignal, id, Object.fromEntries(new FormData(formRef.current)));
  };

  return (
    <div>
      <button
        type="button"
        className="appearance-none absolute right-0 top-0 p-1 text-white drop-shadow-sm"
        onClick={() => dialogRef.current?.showModal()}
      >
        <Icon icon={TablerEdit} />
      </button>
      <dialog
        ref={dialogRef}
        className="backdrop:bg-black backdrop:opacity-70"
        onClose={onDialogClosed}
      >
        <form method="dialog" className="p-6" ref={formRef}>
          <label class="block mb-2" for={`item-${id}-edit-name`}>
            Name
          </label>
          <input
            required
            class="appearance-none border rounded w-full py-2 px-3"
            id={`item-${id}-edit-name`}
            name="name"
            type="text"
            value={item?.name}
          />
        </form>
      </dialog>
    </div>
  );
};

export default ItemEdit;
