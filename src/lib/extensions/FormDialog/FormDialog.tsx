import {
  useForm,
  SubmitHandler,
  FieldValues,
  FormProvider,
  UseFormProps,
} from "react-hook-form";
import Dialog, { DialogProps } from "../../Dialog/Dialog";
import { ReactNode, useEffect, useState } from "react";
import { DialogContextValue } from "../../Dialog/contexts/DialogContext";

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
    disabled: isExternalDisabled = false,
    valid: isExternalValid = true,
    ...dialogProps
  } = props;

  const form = useForm<T>(formParams);

  const [isInternalInProgress, setIsInternalInProgress] = useState(isExternalInProgress); // prettier-ignore
  const inProgress = isInternalInProgress || isExternalInProgress;

  const [isInternalDisabled, setIsInternalDisabled] = useState(isExternalDisabled); // prettier-ignore
  const disabled = isInternalDisabled || isExternalDisabled;

  const valid = isExternalValid;

  const onSubmit: SubmitHandler<T> = async (data) => {
    setIsInternalInProgress(true);
    setIsInternalDisabled(true);

    try {
      await dialogProps.onDataSubmit?.(data);
    } finally {
      setIsInternalInProgress(false);
      setIsInternalDisabled(false);
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
      disabled={disabled}
      valid={valid}
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
