import { DialogObserver } from "@mukhindev/mui-dialog";
import { dialogStore } from "./dialog";
import { confirmStore } from "./confirm";
import TestHookFormDialogDemo from "./TestHookFormDialogDemo.tsx";
import TestObserverDialogDemo from "./TestObserverDialogDemo.tsx";
import TestCustomExternalSubmitDialogDemo from "./TestCustomExternalSubmitDialogDemo.tsx";
import TestNativeSubmitDialogDemo from "./TestNativeSubmitDialogDemo.tsx";
import TestAsyncDataDialogDemo from "./TestAsyncDataDialogDemo.tsx";
import TestConfirmDialogDemo from "./TestConfirmDialogDemo.tsx";
import TestAlertDialogDemo from "./TestAlertDialogDemo.tsx";
import TestTypicalDialogDemo from "./TestTypicalDialogDemo.tsx";

export default function App() {
  return (
    <div>
      <TestTypicalDialogDemo />
      <TestCustomExternalSubmitDialogDemo />
      <TestNativeSubmitDialogDemo />
      <TestHookFormDialogDemo />
      <TestAsyncDataDialogDemo />
      <DialogObserver dialogStore={dialogStore} />
      <TestObserverDialogDemo />
      <DialogObserver dialogStore={confirmStore} />
      <TestConfirmDialogDemo />
      <TestAlertDialogDemo />
    </div>
  );
}
