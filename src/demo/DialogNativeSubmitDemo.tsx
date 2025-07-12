import { FormEvent, useState } from "react";
import { Button } from "@mui/material";
import TestDialogNativeSubmit from "./TestDialogNativeSubmit.tsx";

export default function DialogNativeSubmitDemo() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (evt: FormEvent) => {
    console.log("External handleSubmit:", evt);
  };

  const handleDialogOpen = () => {
    setIsOpen(true);
  };

  const handleDialogClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Button onClick={handleDialogOpen}>Open Dialog with native submit</Button>
      <TestDialogNativeSubmit
        open={isOpen}
        onClose={handleDialogClose}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
