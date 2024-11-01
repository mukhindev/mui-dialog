import { ReactNode } from "react";
import { DialogActionsContextValue } from "./DialogActionsContextValue.ts";
import { DialogActionsContext } from "./DialogActionsContext.ts";

interface DialogActionsProviderProps {
  children: ReactNode;
  value: DialogActionsContextValue;
}

export function DialogActionsProvider(props: DialogActionsProviderProps) {
  const { children, value } = props;

  return (
    <DialogActionsContext.Provider value={value}>
      {children}
    </DialogActionsContext.Provider>
  );
}
