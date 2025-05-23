import { AlertDialog } from "@/components/ui/alert-dialog";
import type { AlertModalProps } from "@/types/modals";

export function AlertModal({
  title,
  description,
  onConfirm,
  onClose,
}: AlertModalProps) {
  return (
    <AlertDialog>
      {title && <h2 className="text-lg font-semibold">{title}</h2>}
      {description && <p className="mt-2">{description}</p>}
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => {
            onConfirm?.();
            onClose?.();
          }}
          className="px-4 py-2 bg-primary text-white rounded"
        >
          OK
        </button>
      </div>
    </AlertDialog>
  );
}
