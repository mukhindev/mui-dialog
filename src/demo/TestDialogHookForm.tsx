import { useFormContext } from "react-hook-form";
import { DialogActions, useDialog } from "../lib";
import { Button, TextField } from "@mui/material";
import { UserModel } from "./UserModel.ts";
import HookFormDialog, {
  HookFormDialogProps,
} from "../lib/extensions/HookFormDialog";

export default function TestDialogHookForm(
  props: HookFormDialogProps<UserModel>,
) {
  const { ...formDialogProps } = props;

  return (
    <HookFormDialog
      title="Dialog"
      maxWidth="sm"
      formParams={{
        defaultValues: {
          name: "Sergey Mukhin",
        },
      }}
      {...formDialogProps}
    >
      <DialogContent />
    </HookFormDialog>
  );
}

function DialogContent() {
  const { register } = useFormContext<UserModel>();
  const { cancel, inProgress } = useDialog<UserModel>();

  return (
    <>
      <TextField {...register("name")} label="Name" fullWidth />
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
          Submit with use-react-hook
        </Button>
      </DialogActions>
    </>
  );
}
