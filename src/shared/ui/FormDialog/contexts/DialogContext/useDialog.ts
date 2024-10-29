import { useContext } from "react";
import { DialogContext } from "./DialogContext.ts";
import { DialogContextValue } from "./DialogContextValue.ts";

/** @private */
export const useDialog = <T>() => {
  return useContext(DialogContext) as DialogContextValue<T>;
};
