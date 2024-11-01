import { useState } from "react";
import TestDialog, { UserModel } from "./TestDialog.tsx";
import { Button } from "@mui/material";

export default function DialogDemo() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (data: UserModel) => {
    // Delay imitation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsOpen(false);
    console.log(data);
  };

  const handleDialogOpen = () => {
    setIsOpen(true);
  };

  const handleDialogClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Button onClick={handleDialogOpen}>Open Dialog</Button>
      <TestDialog
        open={isOpen}
        onClose={handleDialogClose}
        onDataSubmit={handleSubmit}
      />
    </div>
  );
}
