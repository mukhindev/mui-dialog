import { useContext } from "react";
import { DialogContext } from "./DialogContext";

export const useDialog = () => {
  const contextValue = useContext(DialogContext);

  if (!contextValue) {
    throw new Error("useDialog must be used within Dialog");
  }

  return contextValue;
};
