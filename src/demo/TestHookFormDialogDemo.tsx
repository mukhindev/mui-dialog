import { useState } from "react";
import { Button } from "@mui/material";
import TestHookFormDialog, { LoginModel } from "./TestHookFormDialog.tsx";
import { DialogProps } from "@mukhindev/mui-dialog";

export default function TestHookFormDialogDemo() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDialogOpen = () => {
    setIsOpen(true);
  };

  const handleDialogClose: DialogProps["onClose"] = (_, reason) => {
    console.log("TestHookFormDialogDemo/handleDialogClose/reason:", reason);
    setIsOpen(false);
  };

  const handleSubmit = async (data: LoginModel) => {
    console.log("TestHookFormDialogDemo/handleSubmit/data:", data);
    console.log(data);
    // Delay imitation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsOpen(false);
  };

  return (
    <div>
      <Button onClick={handleDialogOpen}>
        Open Dialog with use-react-hook
      </Button>
      <TestHookFormDialog
        open={isOpen}
        onClose={handleDialogClose}
        onDataSubmit={handleSubmit}
      />
    </div>
  );
}
