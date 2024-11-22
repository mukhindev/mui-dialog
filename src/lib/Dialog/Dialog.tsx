import {
  DialogTitle as MuiDialogTitle,
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
  IconButton,
  LinearProgress,
} from "@mui/material";
import { ReactNode, useCallback, useMemo, useRef, useState } from "react";
import DialogBody from "./components/DialogBody";
import { DialogProvider, DialogContextValue } from "./contexts/DialogContext";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

export interface DialogProps<T = unknown>
  extends Omit<MuiDialogProps, "title" | "onClose" | "children"> {
  /** Диалог является формой и должен реагировать на событие onSubmit */
  form?: boolean;
  title?: ReactNode;
  /** В отличие от title не создаёт `<h>` контейнер */
  header?: ReactNode;
  /** Показать что идёт процесс связанный с диалогом */
  inProgress?: boolean;
  /** Заблокировать активные элементы диалога */
  disabled?: boolean;
  /** Отметить что содержимое валидно (по-умолчанию true) */
  valid?: boolean;
  children?: ReactNode | ((dialog: DialogContextValue<T>) => ReactNode);
  /** Отправка данных из диалога */
  onDataSubmit?: (data: T) => Promise<void> | void;
  onClose?: () => Promise<void> | void;
  onCancel?: () => Promise<void> | void;
}

export default function Dialog<T>(props: DialogProps<T>) {
  const {
    form,
    title,
    header,
    inProgress: isExternalInProgress = false,
    disabled: isExternalDisabled = false,
    valid: isExternalValid = true,
    children,
    PaperProps,
    onDataSubmit,
    onClose,
    onCancel,
    ...dialogProps
  } = props;

  const [isInternalInProgress, setIsInternalInProgress] = useState(isExternalInProgress); // prettier-ignore
  const inProgress = isInternalInProgress || isExternalInProgress;

  const [isInternalDisabled, setIsInternalDisabled] = useState(isExternalDisabled); // prettier-ignore
  const disabled = isInternalDisabled || isExternalDisabled;

  const [isInternalValid, setIsInternalValid] = useState(isExternalValid); // prettier-ignore
  const valid = isInternalValid || isExternalValid;

  const onDataSubmitRef = useRef(onDataSubmit);
  onDataSubmitRef.current = onDataSubmit;

  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const onCancelRef = useRef(onCancel);
  onCancelRef.current = onCancel;

  const handleDataSubmit = useCallback(async (data: T) => {
    setIsInternalInProgress(true);
    setIsInternalDisabled(true);

    try {
      await onDataSubmitRef.current?.(data);
    } finally {
      setIsInternalInProgress(false);
      setIsInternalDisabled(false);
    }
  }, []);

  const dialogContextValue = useMemo<DialogContextValue<T>>(() => {
    return {
      submitData: handleDataSubmit,
      close: onCloseRef.current,
      // Если на Dialog не определён onCancel, cancel срабатывает как закрытие
      cancel: onCancelRef.current ?? onCloseRef.current,
      inProgress,
      setInProgress: setIsInternalInProgress,
      disabled,
      setDisabled: setIsInternalDisabled,
      valid,
      setValid: setIsInternalValid,
    };
  }, [disabled, handleDataSubmit, inProgress, valid]);

  const handleClose = () => {
    onClose?.();
  };

  return (
    <MuiDialog
      fullWidth
      maxWidth="xs"
      PaperProps={form ? { component: "form", ...PaperProps } : undefined}
      onClose={handleClose}
      {...dialogProps}
    >
      {inProgress && (
        <LinearProgress
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
          }}
        />
      )}

      <DialogProvider value={dialogContextValue}>
        {header}
        {title && (
          <MuiDialogTitle
            sx={{
              p: 2,
              // Зарезервировать отступ для кнопки закрыть
              pr: onClose ? 7 : undefined,
              "&+.MuiDialogContent-root": {
                pt: 2,
              },
            }}
          >
            {title}
          </MuiDialogTitle>
        )}
        {onClose && (
          <IconButton
            aria-label="Закрыть"
            disabled={disabled}
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
            }}
            onClick={handleClose}
          >
            <CloseOutlinedIcon />
          </IconButton>
        )}
        <DialogBody>
          {typeof children === "function"
            ? children(dialogContextValue)
            : children}
        </DialogBody>
      </DialogProvider>
    </MuiDialog>
  );
}
