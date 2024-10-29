import { Button } from "@mui/material";
import { useState } from "react";
import TestDialog from "./TestDialog.tsx";

function App() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Открыть диалог</Button>
      <TestDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onDataSubmit={(data) => console.log(data)}
      />
    </>
  );
}

export default App;
