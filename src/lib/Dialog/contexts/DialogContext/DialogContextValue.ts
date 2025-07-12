import { Dispatch, SetStateAction } from "react";
import { AsyncSubmitCallback } from "../../types/AsyncSubmitCallback";

export type DialogContextValue<T = unknown> = {
  /** v1 */
  submitData?: (data: T) => Promise<void> | void;
  close?: () => void;
  cancel?: () => void;
  inProgress: boolean;
  setInProgress: Dispatch<SetStateAction<boolean>>;
  disabled: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  valid: boolean;
  setValid: Dispatch<SetStateAction<boolean>>;
  /** v2 */
  registerOnSubmit: (handler: AsyncSubmitCallback) => void;
};
