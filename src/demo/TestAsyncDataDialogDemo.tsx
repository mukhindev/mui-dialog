import { useState } from "react";
import { Button } from "@mui/material";
import TestAsyncDataDialog from "./TestAsyncDataDialog.tsx";

export default function TestAsyncDataDialogDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>
        Open Dialog with async data
      </Button>
      <TestAsyncDataDialog open={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
