import { MODAL_TYPES, type ModalType } from "@/types/modals";
import { lazy } from "react";

// Lazy load all modal components
const modalComponents = {
  [MODAL_TYPES.ALERT]: lazy(
    async () =>
      await import("./alert-modal").then((mod) => ({ default: mod.AlertModal }))
  ),
  [MODAL_TYPES.CONFIRM]: lazy(
    async () =>
      await import("./confirm-modal").then((mod) => ({
        default: mod.ConfirmModal,
      }))
  ),
  [MODAL_TYPES.SIGNATURE]: lazy(
    async () =>
      await import("./signature-modal").then((mod) => ({
        default: mod.SignatureModal,
      }))
  ),
} as const;

// Type to ensure all modal types have a corresponding component
type ModalRegistry = typeof modalComponents;
type ModalTypeCheck = ModalType extends keyof ModalRegistry ? true : false;
type RegistryTypeCheck = keyof ModalRegistry extends ModalType ? true : false;

// This will cause a type error if any modal type is missing from the registry
// or if the registry has extra types that don't exist in ModalType
type ModalRegistryCheck = true extends ModalTypeCheck & RegistryTypeCheck
  ? true
  : never;

// This will fail to compile if the registry is not complete
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TypeCheck: ModalRegistryCheck = true as never;

export { modalComponents };
