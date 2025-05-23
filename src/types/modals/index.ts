import type { AlertModalProps, ConfirmModalProps } from "./dialog.types";
import type { PaymentModalProps, UserDetailsModalProps } from "./form.types";
import type { SignatureModalProps } from "./input.types";

export * from "./base.types";
export * from "./dialog.types";
export * from "./form.types";
export * from "./input.types";

export type CustomModalProps =
  | SignatureModalProps
  | PaymentModalProps
  | UserDetailsModalProps;

export type ModalProps = AlertModalProps | ConfirmModalProps | CustomModalProps;
