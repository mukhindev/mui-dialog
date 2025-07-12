import { useState } from "react";
import { Button } from "@mui/material";
import { UserModel } from "./UserModel.ts";
import TestDialogSubmitData from "./TestDialogSubmitData.tsx";

export default function DialogSubmitDataDemo() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (data: UserModel) => {
    console.log(data);
    // Delay imitation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsOpen(false);
  };

  const handleDialogOpen = () => {
    setIsOpen(true);
  };

  const handleDialogClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Button onClick={handleDialogOpen}>Open Dialog with submitData</Button>
      <TestDialogSubmitData
        open={isOpen}
        onClose={handleDialogClose}
        onDataSubmit={handleSubmit}
      />
    </div>
  );
}
