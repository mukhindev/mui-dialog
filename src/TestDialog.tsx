import Dialog, { DialogProps, DialogActions } from "./shared/ui/FormDialog";

export default function TestDialog(props: DialogProps) {
  const { ...dialogProps } = props;

  return (
    <Dialog form title="Тестовый диалог" {...dialogProps}>
      <TestDialogContent />
    </Dialog>
  );
}

function TestDialogContent() {
  return (
    <>
      <input />
      <DialogActions>
        <button type="submit">Отправить</button>
      </DialogActions>
    </>
  );
}
