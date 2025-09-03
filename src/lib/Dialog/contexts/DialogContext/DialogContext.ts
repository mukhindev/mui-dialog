import { createContext } from "react";
import { DialogContextValue } from "./DialogContextValue.ts";

export const DialogContext = createContext<DialogContextValue | null>(null);
