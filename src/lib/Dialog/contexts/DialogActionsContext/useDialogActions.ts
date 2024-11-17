import { useContext } from "react";
import { DialogActionsContext } from "./DialogActionsContext";

/** @private */
export const useDialogActions = () => {
  return useContext(DialogActionsContext);
};
