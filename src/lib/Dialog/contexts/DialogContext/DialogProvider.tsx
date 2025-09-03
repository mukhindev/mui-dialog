import { ReactNode } from "react";
import { DialogContext } from "./DialogContext";
import { DialogContextValue } from "./DialogContextValue";

interface DialogProviderProps {
  children: ReactNode;
  value: DialogContextValue;
}

export function DialogProvider(props: DialogProviderProps) {
  const { children, value } = props;

  return (
    <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
  );
}
