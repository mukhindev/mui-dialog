import { useContext } from "react";
import { DialogActionsContext } from "./DialogActionsContext.ts";

/** @private */
export const useFormDialogActions = () => useContext(DialogActionsContext);
