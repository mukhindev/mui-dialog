import { ReactNode, useEffect } from "react";
import { useFormDialogActions } from "../../contexts/DialogActionsContext";

interface DialogActionsProps {
  children: ReactNode;
}

/**
 * Компонент для `<Dialog />`, который, c любого уровня вложенности,
 * перенаправит своё содержимое на панель действий.
 *
 * ```TypeScript
 * export default function TestDialog(props: FormDialogProps) {
 *   const { ...dialogProps } = props;
 *
 *   return (
 *     <Dialog title="Тестовый диалог" {...dialogProps}>
 *       <TestDialogContent />
 *     </Dialog>
 *   );
 * }
 *
 * function TestDialogContent() {
 *   return (
 *     <>
 *       <input />
 *       // Будет перенесено отсюда в DialogActions диалога, см. FormDialog.tsx
 *       <DialogActions>
 *         <button type="submit">Отправить</button>
 *       </DialogActions>
 *     </>
 *   );
 * }
 * ```
 * */
export default function DialogActions(props: DialogActionsProps) {
  const { children } = props;
  const { setActionsNode } = useFormDialogActions();

  useEffect(() => {
    setActionsNode?.(children);
  }, [children, setActionsNode]);

  return null;
}
