import Dialog from "../Dialog";
import { useSyncExternalStore } from "react";
import { DialogState, DialogStore } from "./store/DialogStore.ts";

interface DialogObserverProps {
  dialogStore: DialogStore;
}

export default function DialogObserver(props: DialogObserverProps) {
  const { dialogStore } = props;

  const { subscribe, getSnapshot } = dialogStore;
  const state = useSyncExternalStore<DialogState>(subscribe, getSnapshot);

  return (
    <Dialog
      open={state.isOpen}
      onClose={() => dialogStore.close()}
      {...state.dialogProps}
    >
      {dialogStore.renderContent?.(state, dialogStore.updateState)}
    </Dialog>
  );
}
