import {
  useForm,
  SubmitHandler,
  FieldValues,
  FormProvider,
  UseFormProps,
} from "react-hook-form";
import Dialog, { DialogProps } from "../../Dialog";
import { ReactNode, useEffect } from "react";
import { DialogContextValue } from "../../contexts/DialogContext";

export interface FormDialogProps<T extends FieldValues> extends DialogProps<T> {
  children?: ReactNode | ((dialog: DialogContextValue<T>) => ReactNode);
  formParams?: UseFormProps<T>;
}

export default function FormDialog<T extends FieldValues>(
  props: FormDialogProps<T>,
) {
  const { children, formParams, ...dialogProps } = props;

  const form = useForm<T>(formParams);

  const onSubmit: SubmitHandler<T> = async (data) => {
    await dialogProps.onDataSubmit?.(data);
    dialogProps.onClose?.();
  };

  useEffect(() => {
    if (dialogProps.open) {
      form.reset();
    }
  }, [dialogProps.open, form]);

  return (
    <Dialog form onSubmit={form.handleSubmit(onSubmit)} {...dialogProps}>
      {typeof children === "function" ? (
        (dialog) => <FormProvider {...form}>{children(dialog)}</FormProvider>
      ) : (
        <FormProvider {...form}>{children}</FormProvider>
      )}
    </Dialog>
  );
}
