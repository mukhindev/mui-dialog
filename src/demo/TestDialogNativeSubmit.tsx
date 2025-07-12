import { Dialog, DialogActions, DialogProps, useDialog } from "../lib";
import { Button, TextField } from "@mui/material";
import { FormEvent, useCallback, useEffect, useState } from "react";

export default function TestDialogNativeSubmit(props: DialogProps) {
  const { ...formDialogProps } = props;

  return (
    <Dialog form title="Dialog" maxWidth="sm" {...formDialogProps}>
      <DialogContent />
    </Dialog>
  );
}

function DialogContent() {
  const [name, setName] = useState("Sergey Mukhin");
  const { cancel, close, inProgress, registerOnSubmit } = useDialog();

  const handleSubmit = useCallback(
    async (evt: FormEvent) => {
      console.log("Internal handleSubmit:", evt);
      console.log({ name });
      // Delay imitation
      await new Promise((resolve) => setTimeout(resolve, 2000));
      close?.();
    },
    [name, close],
  );

  useEffect(() => {
    registerOnSubmit(handleSubmit);
  }, [registerOnSubmit, handleSubmit]);

  return (
    <>
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
