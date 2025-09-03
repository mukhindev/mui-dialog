import { useState } from "react";
import { Button } from "@mui/material";
import { UserModel } from "./UserModel.ts";
import TestCustomExternalSubmitDialog from "./TestCustomExternalSubmitDialog.tsx";
import { DialogProps } from "@mukhindev/mui-dialog";

export default function TestCustomExternalSubmitDialogDemo() {
  const [isOpen, setIsOpen] = useState(false);

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

  const handleSubmit = async (data: UserModel) => {
    console.log("TestCustomExternalSubmitDialogDemo/handleSubmit/data", data);
    // Delay imitation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsOpen(false);
  };

  return (
    <div>
      <Button onClick={handleDialogOpen}>
        Open Dialog with custom external submit
      </Button>
      <TestCustomExternalSubmitDialog
        open={isOpen}
        onClose={handleDialogClose}
        onDataSubmit={handleSubmit}
      />
    </div>
  );
}
