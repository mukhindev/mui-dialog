import { FormEvent, useState } from "react";
import { Button } from "@mui/material";
import TestNativeSubmitDialog from "./TestNativeSubmitDialog.tsx";
import { DialogProps } from "@mukhindev/mui-dialog";

export default function TestNativeSubmitDialogDemo() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDialogOpen = () => {
    setIsOpen(true);
  };

  const handleDialogClose: DialogProps["onClose"] = (_, reason) => {
    console.log("TestNativeSubmitDialogDemo/handleDialogClose/reason:", reason);
    setIsOpen(false);
  };

  const handleSubmit = async (evt: FormEvent) => {
    console.log("TestNativeSubmitDialogDemo/handleSubmit/externalEvent", evt);
  };

  return (
    <div>
      <Button onClick={handleDialogOpen}>Open Dialog with native submit</Button>
      <TestNativeSubmitDialog
        open={isOpen}
        onClose={handleDialogClose}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
