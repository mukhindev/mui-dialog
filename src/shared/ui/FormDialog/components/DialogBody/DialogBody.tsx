import { DialogActionsContext } from "../../contexts/DialogActionsContext";
import { ReactNode, useMemo, useState } from "react";
import {
  DialogActions as MuiDialogActions,
  DialogContent as MuiDialogContent,
} from "@mui/material";

/**
 * @private Тело диалога с возможностью внедрять панель действий
 * через контекст (см. `<DialogActions />`)
 * */
export default function DialogBody(props: { children: ReactNode }) {
  const { children } = props;

  const [actionsNode, setActionsNode] = useState<ReactNode>();

  const actionsContextValue = useMemo(() => {
    return { setActionsNode };
  }, []);

  return (
    <DialogActionsContext.Provider value={actionsContextValue}>
      <MuiDialogContent>{children}</MuiDialogContent>
      {actionsNode && <MuiDialogActions>{actionsNode}</MuiDialogActions>}
    </DialogActionsContext.Provider>
  );
}
