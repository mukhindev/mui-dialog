import {
  Dialog,
  DialogActions,
  DialogHeader,
  DialogProps,
  useDialog,
} from "@mukhindev/mui-dialog";
import { Button, TextField } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { UserModel } from "./UserModel.ts";

export default function TestTypicalDialog(
  props: DialogProps & TestTypicalProps,
) {
  const { initialData, onAfterSubmit, ...formDialogProps } = props;

  return (
    <Dialog form noValidate maxWidth="sm" {...formDialogProps}>
      <TestTypical initialData={initialData} onAfterSubmit={onAfterSubmit} />
    </Dialog>
  );
}

interface TestTypicalProps {
  initialData: UserModel;
  onAfterSubmit: () => void;
}

function TestTypical(props: TestTypicalProps) {
  const { initialData, onAfterSubmit } = props;

  const [serverData, setServerData] = useState<Partial<UserModel>>({});
  const [updatedData, setUpdatedData] = useState<Partial<UserModel>>({});

  const data = useMemo(() => {
    return {
      ...initialData,
      ...serverData,
      ...updatedData,
    };
  }, [initialData, serverData, updatedData]);

  const [errors, setErrors] = useState<Partial<UserModel>>({});
  const [inProgress, setInProgress] = useState(false);
  const { cancel, close, registerOnSubmit } = useDialog();

  const updateData = useCallback((data: Partial<UserModel>) => {
    setErrors({});
    setUpdatedData((prev) => ({ ...prev, ...data }));
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    setInProgress(true);

    fetchParams(abortController.signal)
      .then((res) => {
        setServerData(res);
        console.log("TestTypicalDemo/fetchParams/res", res);
      })
      .catch(() => {
        if (abortController.signal.aborted) {
          return;
        }
      })
      .finally(() => {
        setInProgress(false);
      });

    return () => {
      abortController.abort();
    };
  }, []);

  const validate = useCallback((): boolean => {
    const errors: Record<string, string> = {};

    if (!data.name) {
      errors["name"] = "Обязательно поле";
    }

    if (data.name && data.name?.length < 4) {
      errors["name"] = "Минимум 4 знака";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }, [data]);

  const handleSubmit = useCallback(async () => {
    if (!validate()) return;

    try {
      setInProgress(true);
      await new Promise<void>((resolve) => setTimeout(resolve, 2000));
      console.log("TestTypicalDemo/handleSubmit", {
        initialData,
        serverData,
        updatedData,
      });
      onAfterSubmit();
      close();
    } catch (error) {
      console.error(error);
    } finally {
      setInProgress(false);
    }
  }, [close, initialData, onAfterSubmit, serverData, updatedData, validate]);

  useEffect(() => {
    registerOnSubmit(handleSubmit);
  }, [handleSubmit, registerOnSubmit]);

  return (
    <>
      <DialogHeader
        title="TestTypical"
        inProgress={inProgress}
        disableClose={inProgress}
      />
      <TextField
        label="Имя"
        name="_nama"
        fullWidth
        slotProps={{
          input: {
            readOnly: inProgress,
          },
        }}
        value={data.name ?? ""}
        autoComplete="off"
        error={!!errors.name}
        helperText={errors.name}
        onChange={(evt) => updateData({ name: evt.target.value })}
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
          disabled={inProgress}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </DialogActions>
    </>
  );
}

async function fetchParams(signal?: AbortSignal): Promise<UserModel> {
  return new Promise<UserModel>((resolve, reject) => {
    if (signal?.aborted) {
      return reject(new DOMException("Aborted", "AbortError"));
    }

    const timeoutId = setTimeout(() => {
      resolve({ name: "Sergey Mukhin (загружено)" });
    }, 2000);

    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(timeoutId);
        reject(new DOMException("Aborted", "AbortError"));
      },
      { once: true },
    );
  });
}
