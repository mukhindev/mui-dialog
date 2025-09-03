import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Dialog,
  DialogActions,
  DialogHeader,
  DialogProps,
  useDialog,
} from "@mukhindev/mui-dialog";
import { Button, Stack, TextField } from "@mui/material";
import { useCallback, useEffect } from "react";

import { z } from "zod";

const LoginSchema = z.object({
  email: z.email("Введите корректный email"),
  password: z.string().min(1, "Обязательное поле"),
});

export type LoginModel = z.infer<typeof LoginSchema>;

/** Пример использования совместно с React Hook Form */
export default function TestHookFormDialog(
  props: DialogProps & TestHookFormProps,
) {
  const { onDataSubmit, ...dialogProps } = props;

  return (
    <Dialog
      form
      noValidate
      title="Dialog"
      maxWidth="sm"
      disableBackdropClick
      disableEscapeKeyDown
      {...dialogProps}
    >
      <TestHookForm onDataSubmit={onDataSubmit} />
    </Dialog>
  );
}

interface TestHookFormProps {
  onDataSubmit: (data: LoginModel) => Promise<void>;
}

function TestHookForm(props: TestHookFormProps) {
  const { onDataSubmit } = props;

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginModel>({
    mode: "onSubmit",
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "mukhin.dev_invalid_email",
      password: "",
    },
  });
  const { cancel, registerOnSubmit } = useDialog();

  const onSubmit: SubmitHandler<LoginModel> = useCallback(
    async (data) => {
      await onDataSubmit?.(data);
    },
    [onDataSubmit],
  );

  useEffect(() => {
    registerOnSubmit(handleSubmit(onSubmit));
  }, [registerOnSubmit, handleSubmit, onSubmit]);

  return (
    <Stack gap={3}>
      <DialogHeader title="TestHookForm" inProgress={isSubmitting} />
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            required
            label="Email"
            slotProps={{
              input: {
                readOnly: isSubmitting,
              },
            }}
            fullWidth
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            required
            type="password"
            label="Пароль"
            slotProps={{
              input: {
                readOnly: isSubmitting,
              },
            }}
            fullWidth
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <DialogActions>
        <Button
          type="button"
          variant="contained"
          color="inherit"
          disabled={isSubmitting}
          onClick={cancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="contained"
          color="primary"
        >
          Submit with react-hook-form
        </Button>
      </DialogActions>
    </Stack>
  );
}
