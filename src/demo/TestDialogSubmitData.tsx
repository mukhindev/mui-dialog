import { Dialog, DialogActions, DialogProps, useDialog } from "../lib";
import { Button, TextField } from "@mui/material";
import { UserModel } from "./UserModel.ts";
import { useState } from "react";

export default function TestDialogSubmitData(props: DialogProps<UserModel>) {
  const { ...formDialogProps } = props;

  return (
    <Dialog title="Dialog" maxWidth="sm" {...formDialogProps}>
      <DialogContent />
    </Dialog>
  );
}

function DialogContent() {
  const [user, setUser] = useState<UserModel>({ name: "Sergey Mukhin" });
  const { inProgress, cancel, submitData } = useDialog<UserModel>();

  return (
    <>
      <TextField
        name="name"
        label="Name"
        fullWidth
        value={user.name}
        onChange={(evt) =>
          setUser((prev) => ({
            ...prev,
            name: evt.target.value,
          }))
        }
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
          type="button"
          variant="contained"
          color="primary"
          disabled={inProgress}
          onClick={() => {
            submitData?.(user);
          }}
        >
          SubmitData method
        </Button>
      </DialogActions>
    </>
  );
}
