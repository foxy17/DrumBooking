import type { BaseModalProps } from "./base.types";

export interface PaymentModalProps extends BaseModalProps {
  amount?: number;
}

export interface UserDetailsModalProps extends BaseModalProps {
  userId?: string;
}
