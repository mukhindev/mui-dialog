import { Button } from "@mui/material";
import { openConfirm } from "./confirm.tsx";

export default function TestConfirmDialogDemo() {
  const handleConfirmOpen = async () => {
    await openConfirm<Error>({
      title: "Подтвердите удаление",
      description: "Вы собираетесь что-то удалить",
      severity: "warning",
      applyButton: <Button color="error">Удалить</Button>,
      getErrorMessage: (error) => error?.message,
      onApply: async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        if (Math.random() > 0.25) {
          throw Error(
            "Возникла умышленная ошибка. См. TestConfirmDialogDemo.tsx",
          );
        }
      },
    });
  };

  return (
    <div>
      <Button onClick={handleConfirmOpen}>Open Confirm Dialog</Button>
    </div>
  );
}
