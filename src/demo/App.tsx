import DialogObserver from "../lib/DialogObserver";
import { dialogStore } from "./dialog.ts";
import DialogDemo from "./DialogDemo.tsx";
import { useEffect, useState } from "react";
import DialogObserverDemo from "./DialogObserverDemo.tsx";

export default function App() {
  const [, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCount((count) => count + 1), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <DialogObserver dialogStore={dialogStore} />
      <DialogDemo />
      <DialogObserverDemo />
    </div>
  );
}
