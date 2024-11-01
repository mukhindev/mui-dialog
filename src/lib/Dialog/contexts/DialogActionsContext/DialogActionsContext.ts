import { createContext } from "react";
import { DialogActionsContextValue } from "./DialogActionsContextValue.ts";

/**
 * @private Контекст для внедрения панели действий
 * в диалог в заранее определённое место.
 * */
export const DialogActionsContext = createContext<DialogActionsContextValue>(
  {},
);