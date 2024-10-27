import {
  DialogTitle as MuiDialogTitle,
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
} from "@mui/material";
import { ReactNode } from "react";
import DialogBody from "./components/DialogBody";

export interface DialogProps extends Omit<MuiDialogProps, "title"> {
  /** Диалог является формой и должен реагировать на событие onSubmit */
  form?: boolean;
  title?: ReactNode;
}

export default function Dialog(props: DialogProps) {
  const { form, title, children, PaperProps, ...dialogProps } = props;

  return (
    <MuiDialog
      fullWidth
      maxWidth="xs"
      PaperProps={form ? { component: "form", ...PaperProps } : undefined}
      onSubmit={(evt) => {
        evt.preventDefault();
        console.log("OnSubmit", evt);
      }}
      {...dialogProps}
    >
      {title && <MuiDialogTitle>{title}</MuiDialogTitle>}
      <DialogBody>{children}</DialogBody>
    </MuiDialog>
  );
}
