import {
  useForm,
  SubmitHandler,
  FieldValues,
  FormProvider,
  UseFormProps,
} from "react-hook-form";
import Dialog, { DialogProps } from "../../Dialog.tsx";
import { ReactNode, useEffect, useState } from "react";
import { DialogContextValue } from "../../contexts/DialogContext";

export interface FormDialogProps<T extends FieldValues> extends DialogProps<T> {
  children?: ReactNode | ((dialog: DialogContextValue<T>) => ReactNode);
  formParams?: UseFormProps<T>;
}

export default function FormDialog<T extends FieldValues>(
  props: FormDialogProps<T>,
) {
  const {
    children,
    formParams,
    inProgress: isExternalInProgress = false,
    ...dialogProps
  } = props;

  const form = useForm<T>(formParams);
  const [isInternalInProgress, setIsInternalInProgress] = useState(isExternalInProgress ?? false); // prettier-ignore
  const inProgress = isInternalInProgress || isExternalInProgress;

  const onSubmit: SubmitHandler<T> = async (data) => {
    setIsInternalInProgress(true);

    try {
      await dialogProps.onDataSubmit?.(data);
    } finally {
      setIsInternalInProgress(false);
    }
  };

  useEffect(() => {
    if (dialogProps.open) {
      form.reset();
    }
  }, [dialogProps.open, form]);

  return (
    <Dialog
      form
      inProgress={inProgress}
      onSubmit={form.handleSubmit(onSubmit)}
      {...dialogProps}
    >
      {typeof children === "function" ? (
        (dialog) => <FormProvider {...form}>{children(dialog)}</FormProvider>
      ) : (
        <FormProvider {...form}>{children}</FormProvider>
      )}
    </Dialog>
  );
}
