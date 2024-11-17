import { useContext } from "react";
import { DialogContext } from "./DialogContext";
import { DialogContextValue } from "./DialogContextValue";

/** @private */
export const useDialog = <T>() => {
  return useContext(DialogContext) as DialogContextValue<T>;
};
