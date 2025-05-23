import type { BaseModalProps } from "./base.types";

export interface AlertModalProps extends BaseModalProps {
  title?: string;
  description?: string;
  onConfirm?: () => void;
}

export interface ConfirmModalProps extends AlertModalProps {
  onCancel?: () => void;
}
