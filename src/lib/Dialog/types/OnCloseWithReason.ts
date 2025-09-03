export type OnCloseWithReason = (
  event: object,
  reason: "backdropClick" | "escapeKeyDown" | "closeEvent" | "cancelEvent",
) => void;
