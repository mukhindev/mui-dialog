import { useFormContext } from "react-hook-form";
import { DialogActions, FormDialog, useDialog, FormDialogProps } from "../lib";
import { Button, TextField } from "@mui/material";

export type UserModel = {
  name: string;
};

export default function TestDialog(props: FormDialogProps<UserModel>) {
  const { ...formDialogProps } = props;

  return (
    <FormDialog
      title="Dialog"
      maxWidth="sm"
      formParams={{
        defaultValues: {
          name: "Sergey Mukhin",
        },
      }}
      {...formDialogProps}
    >
      <TestDialogContent />
    </FormDialog>
  );
}

function TestDialogContent() {
  const { register, getValues } = useFormContext<UserModel>();
  const dialog = useDialog<UserModel>();

  return (
    <>
      <TextField {...register("name")} label="Name" fullWidth />
      <DialogActions>
        <Button
          type="button"
          variant="contained"
          color="inherit"
          disabled={dialog.inProgress}
          onClick={dialog.cancel}
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="contained"
          color="primary"
          disabled={dialog.inProgress}
          onClick={() => {
            dialog.submitData?.(getValues());
          }}
        >
          SubmitData method
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={dialog.inProgress}
        >
          Submit form
        </Button>
      </DialogActions>
    </>
  );
}
