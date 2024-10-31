import { Button } from "@mui/material";
import { useState } from "react";
import TestDialog, { Model } from "./TestDialog.tsx";

function App() {
  const [isOpen, setIsOpen] = useState(true);

  const handleSubmit = async (data: Model) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsOpen(false);
    console.log(data);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Открыть диалог</Button>
      <TestDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onDataSubmit={handleSubmit}
      />
    </>
  );
}

export default App;
