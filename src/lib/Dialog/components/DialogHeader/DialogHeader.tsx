import DefaultDialogHeader from "./components/DefaultDialogHeader";
import { DialogHeaderTeleport } from "../../teleports/DialogHeaderTeleport";
import { DialogHeaderProps } from "./components/DefaultDialogHeader/types";
import { ReactNode } from "react";

/**
 * Компонент для `<Dialog>`, который, с любого уровня вложенности,
 * позволит переопределить шапку диалога, используемую по-умолчанию.
 * */
export default function DialogHeader(
  props: DialogHeaderProps & {
    /** Переопределение шапки диалога на полностью свою реализацию */
    custom?: ReactNode;
  },
) {
  const { custom, ...dialogHeaderProps } = props;

  return (
    <DialogHeaderTeleport.From>
      {custom ?? <DefaultDialogHeader {...dialogHeaderProps} />}
    </DialogHeaderTeleport.From>
  );
}
