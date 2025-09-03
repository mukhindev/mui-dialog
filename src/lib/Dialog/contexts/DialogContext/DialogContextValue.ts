import { AsyncSubmitCallback } from "../../types/AsyncSubmitCallback";

export type DialogContextValue = {
  close: () => void;
  cancel: () => void;
  registerOnSubmit: (handler: AsyncSubmitCallback) => void;
};
