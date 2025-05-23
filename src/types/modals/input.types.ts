import type { BaseModalProps } from "./base.types";

export interface SignatureModalProps extends BaseModalProps {
  studentName: string;
  onSave: (signatureData: string) => void;
}
