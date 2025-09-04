import {
  DialogTitle as MuiDialogTitle,
  IconButton,
  LinearProgress,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { DialogHeaderProps } from "./types";
import { useDialog } from "../../../../contexts/DialogContext";

export default function DefaultDialogHeader(props: DialogHeaderProps) {
  const { close } = useDialog();
  const { title, children, inProgress, disableClose, onClose = close } = props;

  return (
    <>
      {inProgress && (
        <LinearProgress
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
          }}
        />
      )}
      {children}
      {!children && title && (
        <MuiDialogTitle
          sx={{
            p: 2,
            // Зарезервировать отступ для кнопки закрыть
            pr: !onClose ? undefined : 7,
            "&+.MuiDialogContent-root": {
              pt: 2,
            },
          }}
        >
          {title}
        </MuiDialogTitle>
      )}
      {onClose && (
        <IconButton
          aria-label="Закрыть"
          data-close
          disabled={disableClose}
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
          }}
          onClick={onClose}
        >
          <CloseOutlinedIcon />
        </IconButton>
      )}
    </>
  );
}
