import { ReactNode } from "react";
import {
  DialogActions as MuiDialogActions,
  DialogContent as MuiDialogContent,
} from "@mui/material";
import DefaultDialogHeader from "../DialogHeader/components/DefaultDialogHeader";
import { DialogHeaderTeleport } from "../../teleports/DialogHeaderTeleport";
import { DialogActionsTeleport } from "../../teleports/DialogActionsTeleport";

interface DialogComposerProps {
  title?: ReactNode;
  children?: ReactNode;
  onClose?: () => void;
}

/**
 * @private Тело диалога с возможностью внедрять панель действий и шапку
 * через контекст (см. `<DialogActions /> и <DialogHeader />`)
 * */
export default function DialogComposer(props: DialogComposerProps) {
  const { title, children, onClose } = props;

  return (
    <DialogHeaderTeleport.Provider>
      <DialogActionsTeleport.Provider>
        <DialogHeaderTeleport.To>
          {(node) => {
            return (
              // Выводим шапку диалога по-умолчанию, с заголовком, прокинутым в корне, если не было внедрения DialogHeader в контексте Dialog
              node ?? <DefaultDialogHeader title={title} onClose={onClose} />
            );
          }}
        </DialogHeaderTeleport.To>
        <MuiDialogContent sx={{ p: 2 }}>{children}</MuiDialogContent>
        <DialogActionsTeleport.To>
          {(node) => {
            // DialogActions видны только при внедрении в контекст Dialog. По-умолчанию панель действий не отображается
            return (
              node && <MuiDialogActions sx={{ p: 2 }}>{node}</MuiDialogActions>
            );
          }}
        </DialogActionsTeleport.To>
      </DialogActionsTeleport.Provider>
    </DialogHeaderTeleport.Provider>
  );
}
