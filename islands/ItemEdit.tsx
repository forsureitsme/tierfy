import { ITierableItem } from "@/types.d.ts";
import { useContext, useRef } from "preact/hooks";
import { type FunctionComponent } from "preact";
import { TierlistSignalContext } from "@/islands/Tierlist.tsx";
import { getItemById, updateItem } from "@/islands/TierlistHandlers.ts";
import { Icon } from "@iconify-icon/react";

const ItemEdit: FunctionComponent<{ id: ITierableItem["id"] }> = ({ id }) => {
  const dialogRef = useRef(null as HTMLDialogElement | null);
  const formRef = useRef(null as HTMLFormElement | null);
  const tierlistSignal = useContext(TierlistSignalContext);
  const nameInputRef = useRef(null as HTMLInputElement | null);

  if (!tierlistSignal) return null;

  const item = getItemById(tierlistSignal, id);

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const onDialogClosed = () => {
    if (!formRef.current) return;

    if (formRef.current.matches(":invalid")) {
      openDialog();
      return;
    }

    updateItem(
      tierlistSignal,
      id,
      Object.fromEntries(new FormData(formRef.current)),
    );
  };

  // TODO: Verify if this `<dialog />` autofocus bug is still present
  const moveCursorToEnd = () => {
    if (!nameInputRef.current) return;
    nameInputRef.current.selectionStart =
      nameInputRef.current.selectionEnd =
        nameInputRef.current.value.length;
  };

  return (
    <div>
      <button
        type="button"
        className="appearance-none absolute right-0 top-0 p-1 text-white drop-shadow-sm"
        onClick={openDialog}
      >
        <Icon icon="tabler:edit" />
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
            ref={nameInputRef}
            autofocus
            onFocus={moveCursorToEnd}
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
