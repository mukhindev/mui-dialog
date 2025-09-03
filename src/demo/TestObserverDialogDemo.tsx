import { Alert, Button, TextField } from "@mui/material";
import { dialogStore, openDialog } from "./dialog";
import { DialogActions, DialogHeader } from "@mukhindev/mui-dialog";

type UserModel = {
  name: string;
};

export default function TestObserverDialogDemo() {
  const handleDialogObserverOpen = () => {
    // Open dialog. Extend dialog state type
    openDialog<UserModel & { inProgress: boolean }>({
      // Define dialog props
      dialog: {
        title: "DialogObserver",
      },
      // Set initial dialog state
      initialState: {
        name: "Sergey Mukhin",
        inProgress: false,
      },
      // Render dialog content. Space from the header to the bottom of the dialog
      renderContent: (state, updateState) => {
        const handleSubmit = async (data: UserModel) => {
          updateState({
            inProgress: true,
          });

          // Delay imitation
          await new Promise((resolve) => setTimeout(resolve, 3000));
          console.log(data);

          updateState({
            inProgress: false,
          });

          dialogStore.close();
        };

        return (
          <>
            <DialogHeader
              title={state.dialogProps.title}
              inProgress={state.inProgress}
              disableClose={state.inProgress}
            />
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
                disabled={state.inProgress}
                onClick={() => dialogStore.close()}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={state.inProgress}
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
