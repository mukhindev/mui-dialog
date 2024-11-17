import { DialogObserver } from "../lib";
import { dialogStore } from "./dialog";
import DialogDemo from "./DialogDemo";
import { useEffect, useState } from "react";
import DialogObserverDemo from "./DialogObserverDemo";

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
