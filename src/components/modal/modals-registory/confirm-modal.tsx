import { AlertDialog } from "@/components/ui/alert-dialog";
import type { ConfirmModalProps } from "@/types/modals";

export function ConfirmModal({
  title,
  description,
  onConfirm,
  onCancel,
  onClose,
}: ConfirmModalProps) {
  return (
    <AlertDialog>
      {title && <h2 className="text-lg font-semibold">{title}</h2>}
      {description && <p className="mt-2">{description}</p>}
      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={() => {
            onCancel?.();
            onClose?.();
          }}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            onConfirm?.();
            onClose?.();
          }}
          className="px-4 py-2 bg-primary text-white rounded"
        >
          Confirm
        </button>
      </div>
    </AlertDialog>
  );
}
