import type { AlertProps, ButtonProps } from "@mui/material";
import { Alert, Button } from "@mui/material";
import {
  DialogActions,
  createDialogStore,
  DialogHeader,
} from "@mukhindev/mui-dialog";
import type { ReactElement, ReactNode } from "react";

export const { dialogStore: confirmStore, openDialog } = createDialogStore();

type ConfirmParams<Error> = {
  enabled?: boolean;
  title?: ReactNode;
  description: ReactNode;
  severity?: AlertProps["severity"];
  cancelButton?: ReactElement<ButtonProps> | null;
  applyButton?: ReactElement<ButtonProps> | null;
  inProgress?: boolean;
  onApply?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
  getErrorMessage?: (error: Error) => ReactNode;
};

/**
 * Быстрый вызов диалога типа confirm,
 * без добавления компонентов и хуков в исходном компоненте.
 *
 * Возвращает Promise<true> — если было подтверждение,
 * Promise<false> — если не было.
 *
 * Либо используются асинхронные параметры onApply и onCancel,
 * они позволяют дождаться результата и повторить попытку.
 * */
export function openConfirm<Error>(params: ConfirmParams<Error>) {
  let initialDescription: ConfirmParams<Error>["description"];
  let initialSeverity: ConfirmParams<Error>["severity"];

  const {
    enabled = true,
    title,
    description,
    severity = "info",
    cancelButton,
    applyButton,
    onCancel,
    onApply,
    getErrorMessage,
  } = params;

  const { promise, resolve } = createPromiseWithResolvers<boolean>();

  // Если confirm не активен, то считать что подтверждено
  if (!enabled) {
    return Promise.resolve(true);
  }

  openDialog<
    Pick<ConfirmParams<Error>, "description" | "severity" | "inProgress">
  >({
    dialog: {
      title: title ?? "Требуется подтверждение",
    },
    initialState: {
      description,
      severity,
      inProgress: false,
    },
    renderContent: (state, updateState) => {
      if (!initialDescription) {
        initialDescription = state.description;
      }

      if (!initialSeverity) {
        initialSeverity = state.severity;
      }

      const showError = (message: ReactNode) => {
        updateState({
          description: message,
          severity: "error",
        });
      };

      const startProgress = () => {
        updateState({
          inProgress: true,
        });
      };

      const endProgress = () => {
        updateState({
          inProgress: false,
        });
      };

      const handleConfirm = async (
        confirmResult: boolean,
        callback?: () => void | Promise<void>,
      ) => {
        updateState({
          description: initialDescription,
          severity: initialSeverity,
        });

        resolve(confirmResult);

        // Если нет соответствующего callback, просто закрыть диалог
        if (!callback) {
          confirmStore.close();
          return;
        }

        // Если callback есть, вызываем асинхронно и обрабатываем ошибку
        try {
          startProgress();
          await callback();
          // Закрыть диалог если callback разрешился
          confirmStore.close();
        } catch (error) {
          // Если нет получателя сообщения ошибки, выкидываем ошибку выше
          if (!getErrorMessage) {
            // Выкидываем ошибку выше
            throw error;
          }

          // Показываем ошибку внутри confirm диалога
          showError(getErrorMessage(error as Error));
        } finally {
          endProgress();
        }
      };

      const handleCancel = async () => await handleConfirm(false, onCancel);
      const handleApply = async () => await handleConfirm(true, onApply);

      const CancelButton = cancelButton?.type ?? Button;
      const ApplyButton = applyButton?.type ?? Button;

      return (
        <>
          <DialogHeader
            title={state.dialogProps.title}
            inProgress={state.inProgress}
            disableClose={state.inProgress}
          />
          <Alert severity={state.severity}>{state.description}</Alert>
          <DialogActions>
            {cancelButton !== null && (
              <CancelButton
                variant="contained"
                color="inherit"
                disabled={state.inProgress}
                {...cancelButton?.props}
                onClick={handleCancel}
              >
                {cancelButton?.props.children ?? "Отмена"}
              </CancelButton>
            )}
            {applyButton !== null && (
              <ApplyButton
                variant="contained"
                color="primary"
                disabled={state.inProgress}
                {...applyButton?.props}
                onClick={handleApply}
              >
                {applyButton?.props.children ?? "Применить"}
              </ApplyButton>
            )}
          </DialogActions>
        </>
      );
    },
  });

  return promise;
}

function createPromiseWithResolvers<T>() {
  let resolve: unknown;
  let reject: unknown;

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return {
    promise,
    resolve: resolve as (value: T | PromiseLike<T>) => void,
    reject: reject as (reason?: unknown) => void,
  };
}
