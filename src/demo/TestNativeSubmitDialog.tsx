import {
  Dialog,
  DialogActions,
  DialogHeader,
  DialogProps,
  useDialog,
} from "@mukhindev/mui-dialog";
import { Button, TextField } from "@mui/material";
import { FormEvent, useCallback, useEffect, useState } from "react";

export default function TestNativeSubmitDialog(props: DialogProps) {
  const { ...formDialogProps } = props;

  return (
    <Dialog form title="Dialog" maxWidth="sm" {...formDialogProps}>
      <TestNativeSubmit />
    </Dialog>
  );
}

function TestNativeSubmit() {
  const [name, setName] = useState("Sergey Mukhin");
  const { cancel, close, registerOnSubmit } = useDialog();

  const [inProgress, setInProgress] = useState(false);

  const handleSubmit = useCallback(
    async (evt: FormEvent) => {
      setInProgress(true);
      console.log("TestNativeSubmitDialogDemo/handleSubmit/internalEvent", evt);
      console.log("TestNativeSubmitDialogDemo/handleSubmit/internalData", {
        name,
      });
      // Delay imitation
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setInProgress(false);
      close();
    },
    [name, close],
  );

  useEffect(() => {
    registerOnSubmit(handleSubmit);
  }, [registerOnSubmit, handleSubmit]);

  return (
    <>
      <DialogHeader title="TestNativeSubmit" inProgress={inProgress} />
      <TextField
        name="name"
        label="Name"
        fullWidth
        value={name}
        disabled={inProgress}
        onChange={(evt) => setName(evt.target.value)}
      />
      <DialogActions>
        <Button
          type="button"
          variant="contained"
          color="inherit"
          disabled={inProgress}
          onClick={cancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={inProgress}
        >
          Submit
        </Button>
      </DialogActions>
    </>
  );
}
