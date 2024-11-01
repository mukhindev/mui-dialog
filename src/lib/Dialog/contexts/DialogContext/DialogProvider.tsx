import { ReactNode } from "react";
import { DialogContext } from "./DialogContext.ts";
import { DialogContextValue } from "./DialogContextValue.ts";

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
