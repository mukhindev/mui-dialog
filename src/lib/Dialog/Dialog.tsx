import {
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
} from "@mui/material";
import { FormEvent, ReactNode, useCallback, useMemo, useRef } from "react";
import DialogComposer from "./components/DialogComposer";
import { DialogProvider, DialogContextValue } from "./contexts/DialogContext";
import { AsyncSubmitCallback } from "./types/AsyncSubmitCallback";
import { OnCloseWithReason } from "./types/OnCloseWithReason.ts";

type MuiDialogPropsWithExtentsOnClose = Omit<
  MuiDialogProps,
  "title" | "onClose" | "children"
> & { onClose?: OnCloseWithReason };

export interface DialogProps extends MuiDialogPropsWithExtentsOnClose {
  /**
   * Заголовок в шапке по-умолчанию. Шапка по умолчанию может быть переопределена
   * через <DialogHeader> в контексте <Dialog>.
   * */
  title?: ReactNode;
  /** Превратить обёртку над содержимым диалога в <form> элемент */
  form?: true;
  /** Не использовать валидацию на форме (когда используется для props.form) */
  noValidate?: boolean;
  /** Запретить клик вне диалога (который в свою очередь закрывает диалог) */
  disableBackdropClick?: boolean;
  children?: ReactNode;
}

/**
 * Диалог (расширение для MUI Dialog), помогающий реализовать подход,
 * когда содержимое диалога монтируется только в момент открытия.
 *
 * Доступ к управлению диалогом при этом осуществляется через контекст,
 * доступный через хук `useDialog()`.
 *
 * Также позволяет управлять шапкой и объявлять панель действий диалога
 * с любой вложенности компонентов.
 *
 * ```TypeScript
 * // Сам диалог
 * export default function TestDialog(props: DialogProps) {
 *   const { ...dialogProps } = props;
 *
 *   return (
 *     // Сообщаем, что наш диалог это форма (будет обёрнуто в <form> содержимое диалога)
 *     <Dialog form {...dialogProps}>
 *       <Test />
 *     </Dialog>
 *   );
 * }
 *
 * // Содержимое диалога (монтируется, когда диалог открыт)
 * function Test() {
 *   // Управление диалогом
 *   const { cancel, close, registerOnSubmit } = useDialog();
 *   const [inProgress, setInProgress] = useState(false);
 *
 *   const handleSubmit = useCallback(async () => {
 *     setInProgress(true);
 *     // Что-то выполняем с await ...
 *     setInProgress(false);
 *     // Закрываем диалог
 *     close();
 *   }, [close]);
 *
 *   // Регистрируем, что будет при событии submit на форме
 *   useEffect(() => {
 *     registerOnSubmit(handleSubmit);
 *   }, [handleSubmit, registerOnSubmit]);
 *
 *   return (
 *     <>
 *       // Хоть мы и определяем шапку диалогу в теле, на самом деле она отобразится в нужном месте в DOM
 *       <DialogHeader title="TestDialog" />
 *       // Остальное выведется в тело диалога
 *       Что-то в диалоге
 *       // Хоть мы и определяем действия диалога в теле, на самом деле они отобразятся в нужном месте в DOM
 *       <DialogActions>
 *         <Button type="button" disabled={inProgress} onClick={cancel}>
 *           Cancel
 *         </Button>
 *         <Button type="submit" disabled={inProgress}>
 *           Submit
 *         </Button>
 *       </DialogActions>
 *     </>
 *   );
 * }
 * ```
 *
 * Другие примеры смотрите в папке src/demo библиотеки
 *
 * */
export default function Dialog(props: DialogProps) {
  const {
    title,
    form,
    noValidate,
    disableBackdropClick,
    children,
    onSubmit,
    onClose,
    PaperProps,
    ...dialogProps
  } = props;

  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  const submitHandlerRef = useRef<AsyncSubmitCallback>();

  const handleSubmit = async (evt: FormEvent<HTMLDivElement>) => {
    // preventDefault() делаем внутри, так как в 99,99% процентах, он нужен
    evt.preventDefault();
    onSubmit?.(evt);
    await submitHandlerRef.current?.(evt);
  };

  const registerOnSubmit = useCallback((handler: AsyncSubmitCallback) => {
    submitHandlerRef.current = handler;
  }, []);

  const dialogContextValue = useMemo<DialogContextValue>(() => {
    return {
      close: () => closeRef.current?.({}, "closeEvent"),
      cancel: () => closeRef.current?.({}, "cancelEvent"),
      registerOnSubmit,
    };
  }, [registerOnSubmit]);

  const handleDefaultMuiDialogClose: OnCloseWithReason = (...arg) => {
    // Позволить запрещать закрытие диалога по клику снаружи
    if (disableBackdropClick) {
      return;
    }

    onClose?.(...arg);
  };

  return (
    <MuiDialog
      fullWidth
      maxWidth="xs"
      onSubmit={handleSubmit}
      onClose={handleDefaultMuiDialogClose}
      TransitionProps={{
        // Закрывать мгновенно из-за проблемы в Chrome: Blocked aria-hidden on an element because its descendant retained focus
        exit: false,
      }}
      PaperProps={
        form
          ? {
              // Превращаем обёртку над содержимым диалога в форму
              component: "form",
              noValidate,
              ...PaperProps,
            }
          : PaperProps
      }
      {...dialogProps}
    >
      <DialogProvider value={dialogContextValue}>
        <DialogComposer
          title={title}
          onClose={() => closeRef.current?.({}, "closeEvent")}
        >
          {children}
        </DialogComposer>
      </DialogProvider>
    </MuiDialog>
  );
}
