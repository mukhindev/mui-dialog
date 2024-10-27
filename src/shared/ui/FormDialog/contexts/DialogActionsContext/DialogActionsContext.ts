import { createContext, Dispatch, ReactNode, SetStateAction } from "react";

export type DialogActionsContextValue = {
  setActionsNode?: Dispatch<SetStateAction<ReactNode>>;
};

/**
 * @private Контекст для внедрения панели действий
 * в диалог в заранее определённое место.
 * */
export const DialogActionsContext = createContext<DialogActionsContextValue>(
  {},
);
