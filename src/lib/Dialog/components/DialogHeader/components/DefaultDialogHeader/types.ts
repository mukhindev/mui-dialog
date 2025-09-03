import { ReactNode } from "react";

export interface DialogHeaderProps {
  title?: ReactNode;
  children?: ReactNode;
  disableClose?: boolean;
  inProgress?: boolean;
  onClose?: () => void;
}
