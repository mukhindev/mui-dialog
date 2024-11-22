import { Dispatch, SetStateAction } from "react";

export type DialogContextValue<T = unknown> = {
  submitData?: (data: T) => Promise<void> | void;
  close?: () => void;
  cancel?: () => void;
  inProgress: boolean;
  setInProgress: Dispatch<SetStateAction<boolean>>;
  disabled: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  valid: boolean;
  setValid: Dispatch<SetStateAction<boolean>>;
};
