import { createContext } from "react";
import { DialogContextValue } from "./DialogContextValue";

export const DialogContext = createContext<DialogContextValue | null>(null);
