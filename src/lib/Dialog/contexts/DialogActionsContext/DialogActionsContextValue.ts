import { Dispatch, ReactNode, SetStateAction } from "react";

export type DialogActionsContextValue = {
  setActionsNode?: Dispatch<SetStateAction<ReactNode>>;
};
