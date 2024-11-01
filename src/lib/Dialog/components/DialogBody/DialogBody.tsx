import { ReactNode, useMemo, useState } from "react";
import {
  DialogActions as MuiDialogActions,
  DialogContent as MuiDialogContent,
} from "@mui/material";
import {
  DialogActionsProvider,
  DialogActionsContextValue,
} from "../../contexts/DialogActionsContext";

/**
 * @private Тело диалога с возможностью внедрять панель действий
 * через контекст (см. `<DialogActions />`)
 * */
export default function DialogBody(props: { children: ReactNode }) {
  const { children } = props;

  const [actionsNode, setActionsNode] = useState<ReactNode>();

  const dialogActionsContextValue = useMemo<DialogActionsContextValue>(() => {
    return { setActionsNode };
  }, []);

  return (
    <DialogActionsProvider value={dialogActionsContextValue}>
      <MuiDialogContent sx={{ p: 2 }}>{children}</MuiDialogContent>
      {actionsNode && (
        <MuiDialogActions sx={{ p: 2 }}>{actionsNode}</MuiDialogActions>
      )}
    </DialogActionsProvider>
  );
}
