import { ReactNode } from "react";
import { DialogContext } from "./DialogContext";
import { DialogContextValue } from "./DialogContextValue";

interface DialogProviderProps<T> {
  children: ReactNode;
  value: DialogContextValue<T>;
}

export function DialogProvider<T>(props: DialogProviderProps<T>) {
  const { children, value } = props;

  return (
    <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
  );
}
