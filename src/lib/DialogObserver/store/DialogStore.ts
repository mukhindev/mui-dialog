import { ReactNode } from "react";
import { DialogProps } from "../../Dialog";

export type StoredDialogProps = Omit<DialogProps, "open">;

export type DialogState<T = unknown> = {
  open: boolean;
  dialogProps: StoredDialogProps;
} & T;

export type RenderDialogContent<T = unknown> = (
  state: DialogState<T>,
  updateState: (data: Partial<DialogState<T>>) => void,
) => ReactNode;

export class DialogStore {
  private state: DialogState = {
    open: false,
    dialogProps: {},
  };

  renderContent?: RenderDialogContent = undefined;
  private initialState = this.state;
  private changeStore?: () => void;

  subscribe = (onStoreChange: () => void): (() => void) => {
    this.changeStore = onStoreChange;
    return () => {
      this.changeStore = undefined;
      this.state = { ...this.initialState };
    };
  };

  getSnapshot = (): DialogState => {
    return this.state;
  };

  updateState = <T>(data: Partial<DialogState<T>>) => {
    this.state = { ...this.state, ...data };
    this.changeStore?.();
  };

  open = <T>(params: {
    dialog: Partial<DialogProps>;
    initialState: Omit<DialogState<T>, "open" | "dialogProps">;
    renderContent: RenderDialogContent<T>;
    onClose?: () => void;
  }) => {
    const { dialog, initialState, renderContent, onClose } = params;

    this.renderContent = renderContent as RenderDialogContent;
    this.onClose = onClose;

    this.state = { ...this.initialState };

    this.updateState({
      ...initialState,
      open: true,
      dialogProps: dialog as StoredDialogProps,
    });
  };

  close = () => {
    this.onClose?.();
    this.updateState({ open: false });
  };

  onClose?: () => void = undefined;
}

export const createDialogStore = () => {
  const dialogStore = new DialogStore();

  const openDialog: DialogStore["open"] = (params) => {
    dialogStore.open?.(params);
  };

  return {
    dialogStore,
    openDialog,
  };
};
