import { DialogObserver } from "../lib";
import { dialogStore } from "./dialog";
import DialogHookFormDemo from "./DialogHookFormDemo.tsx";
import { useEffect, useState } from "react";
import DialogObserverDemo from "./DialogObserverDemo";
import DialogWithAsyncData from "./DialogWithAsyncData.tsx";
import DialogSubmitDataDemo from "./DialogSubmitDataDemo.tsx";
import DialogNativeSubmitDemo from "./DialogNativeSubmitDemo.tsx";

export default function App() {
  const [, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCount((count) => count + 1), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <DialogObserver dialogStore={dialogStore} />
      <DialogSubmitDataDemo />
      <DialogNativeSubmitDemo />
      <DialogHookFormDemo />
      <DialogObserverDemo />
      <DialogWithAsyncData />
    </div>
  );
}
