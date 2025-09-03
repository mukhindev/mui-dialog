import { Button } from "@mui/material";
import { openConfirm } from "./confirm.tsx";

export default function TestAlertDialogDemo() {
  const handleAlertOpen = async () => {
    await openConfirm({
      title: "Очень важно!",
      description:
        "Произошло что-то настолько важное, что я вывожу это сообщение",
      severity: "error",
      cancelButton: <Button>ОК</Button>,
      applyButton: null,
    });
  };

  return (
    <div>
      <Button onClick={handleAlertOpen}>Open Alert Dialog</Button>
    </div>
  );
}
