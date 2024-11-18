import { Alert, Button, TextField } from "@mui/material";
import { dialogStore, openDialog } from "./dialog";
import { DialogActions } from "../lib";

type UserModel = {
  name: string;
};

export default function DialogObserverDemo() {
  const handleDialogObserverOpen = () => {
    // Open dialog. Extend dialog state type
    openDialog<UserModel & { isActionsDisabled: boolean }>({
      // Define dialog props
      dialog: {
        title: "DialogObserver",
      },
      // Set initial dialog state
      initialState: {
        name: "Sergey Mukhin",
        isActionsDisabled: false,
      },
      // Render dialog content. Space from the header to the bottom of the dialog
      renderContent: (state, updateState) => {
        const handleSubmit = async (data: UserModel) => {
          updateState({
            dialogProps: {
              // If you need to change nested states frequently, you can use the Immer library
              ...state.dialogProps,
              inProgress: true,
              disabled: true,
            },
            isActionsDisabled: true,
          });

          // Delay imitation
          await new Promise((resolve) => setTimeout(resolve, 3000));
          console.log(data);

          updateState({
            dialogProps: {
              ...state.dialogProps,
              inProgress: false,
              disabled: false,
            },
            isActionsDisabled: false,
          });

          dialogStore.close();
        };

        const inProgress =
          state.dialogProps.inProgress || state.isActionsDisabled;

        return (
          <>
            <Alert severity="info">
              The state of this dialog is not related to the parent component,
              which reduces the number of renders.
            </Alert>
            <pre>
              Dialog state:
              <br />
              <br />
              {JSON.stringify(state, null, 2)}
            </pre>
            <TextField
              name="name"
              label="name"
              autoComplete="off"
              fullWidth
              value={state.name}
              onChange={(evt) => updateState({ name: evt.target.value })}
            />
            {/* DialogActions children was render inside dialog actions panel */}
            <DialogActions>
              <Button
                variant="contained"
                color="inherit"
                disabled={inProgress}
                onClick={() => dialogStore.close()}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={inProgress}
                onClick={() => handleSubmit({ name: state.name })}
              >
                Apply
              </Button>
            </DialogActions>
          </>
        );
      },
    });
  };

  return (
    <div>
      <Button onClick={handleDialogObserverOpen}>Open DialogObserver</Button>
    </div>
  );
}
