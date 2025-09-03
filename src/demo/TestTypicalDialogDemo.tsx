import { useState } from "react";
import { Button } from "@mui/material";
import { DialogProps } from "@mukhindev/mui-dialog";
import TestTypicalDialog from "./TestTypicalDialog.tsx";
import { UserModel } from "./UserModel.ts";

export default function TestTypicalDialogDemo() {
  const [isOpen, setIsOpen] = useState(false);

  const [initialData] = useState<UserModel>({
    name: "Sergey Mukhin (предзагружено)",
  });

  const handleDialogOpen = () => {
    setIsOpen(true);
  };

  const handleDialogClose: DialogProps["onClose"] = (_, reason) => {
    console.log(
      "TestCustomExternalSubmitDialogDemo/handleDialogClose/reason:",
      reason,
    );
    setIsOpen(false);
  };

  const refresh = async () => {
    console.log(
      "TestTypicalDialogDemo/refresh",
      "Обновляем какой-то внешний список",
    );
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <div>
      <Button onClick={handleDialogOpen}>Open Typical Dialog</Button>
      <TestTypicalDialog
        open={isOpen}
        onClose={handleDialogClose}
        initialData={initialData}
        onAfterSubmit={refresh}
      />
    </div>
  );
}
