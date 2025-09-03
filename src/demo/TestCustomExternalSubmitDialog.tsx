import {
  Dialog,
  DialogActions,
  DialogHeader,
  DialogProps,
  useDialog,
} from "@mukhindev/mui-dialog";
import { Button, TextField } from "@mui/material";
import { UserModel } from "./UserModel.ts";
import { useState } from "react";

/** Диалог с кастомной внешней отправкой данных */
export default function TestCustomExternalSubmitDialog(
  props: DialogProps & TestCustomExternalSubmitProps,
) {
  const { onDataSubmit, ...formDialogProps } = props;

  return (
    <Dialog maxWidth="sm" {...formDialogProps}>
      <TestCustomExternalSubmit onDataSubmit={onDataSubmit} />
    </Dialog>
  );
}

interface TestCustomExternalSubmitProps {
  onDataSubmit: (data: UserModel) => Promise<void>;
}

function TestCustomExternalSubmit(props: TestCustomExternalSubmitProps) {
  const { onDataSubmit } = props;

  const [user, setUser] = useState<UserModel>({ name: "Sergey Mukhin" });
  const { cancel } = useDialog();
  const [inProgress, setInProgress] = useState(false);

  const handleSubmit = async () => {
    setInProgress(true);
    await onDataSubmit(user);
    setInProgress(false);
  };

  return (
    <>
      <DialogHeader
        title="TestCustomExternalSubmit"
        inProgress={inProgress}
        disableClose={inProgress}
      />
      <TextField
        name="name"
        label="Name"
        fullWidth
        disabled={inProgress}
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
          onClick={handleSubmit}
        >
          Submit Data
        </Button>
      </DialogActions>
    </>
  );
}
