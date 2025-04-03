export const MODAL_TYPES = {
  ALERT: 'ALERT',
  CONFIRM: 'CONFIRM',
  SIGNATURE: 'SIGNATURE',
  PAYMENT: 'PAYMENT',
  USER_DETAILS: 'USER_DETAILS',
} as const;

export type ModalType = keyof typeof MODAL_TYPES;

export interface BaseModalProps {
  onClose?: () => void;
  id: string;
}
