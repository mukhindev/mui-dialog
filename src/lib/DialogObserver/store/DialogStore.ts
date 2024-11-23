import { ReactNode } from "react";
import { DialogProps } from "../../Dialog";

export type StoredDialogProps = Omit<DialogProps, "open">;

export type DialogState<T = unknown> = {
  isOpen: boolean;
  dialogProps: StoredDialogProps;
} & T;

export type RenderDialogContent<T = unknown> = (
  state: DialogState<T>,
  updateState: (data: Partial<DialogState<T>>) => void,
) => ReactNode;

export class DialogStore {
  private state: DialogState = {
    isOpen: false,
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
    enabled?: boolean;
    dialog: Partial<DialogProps<T>>;
    initialState: Omit<DialogState<T>, "isOpen" | "dialogProps">;
    renderContent: RenderDialogContent<T>;
  }) => {
    const { dialog, initialState, renderContent } = params;

    this.renderContent = renderContent as RenderDialogContent;

    this.state = { ...this.initialState };

    this.updateState({
      ...initialState,
      isOpen: true,
      dialogProps: dialog as StoredDialogProps,
    });
  };

  close = () => {
    this.updateState({ isOpen: false });
  };
}

export const createDialogStore = () => {
  const dialogStore = new DialogStore();

  const openDialog: DialogStore["open"] = (params) => {
    if (params.enabled ?? true) {
      dialogStore.open?.(params);
    }
  };

  return {
    dialogStore,
    openDialog,
  };
};
