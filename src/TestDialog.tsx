import { useFormContext } from "react-hook-form";
import {
  DialogActions,
  FormDialog,
  useDialog,
  FormDialogProps,
} from "./shared/ui/FormDialog";
import { Button, TextField } from "@mui/material";

type Model = {
  name: string;
};

export default function TestDialog(props: FormDialogProps<Model>) {
  const { ...formDialogProps } = props;

  return (
    <FormDialog
      title="Тестовый диалог"
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
  const { register, getValues } = useFormContext<Model>();
  const dialog = useDialog<Model>();

  return (
    <>
      <TextField {...register("name")} label="Имя" fullWidth />
      <DialogActions>
        <Button
          type="button"
          variant="contained"
          color="inherit"
          onClick={dialog.cancel}
        >
          Отмена
        </Button>
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={() => {
            dialog.submitData?.(getValues());
          }}
        >
          Метод submitData
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Форма
        </Button>
      </DialogActions>
    </>
  );
}
