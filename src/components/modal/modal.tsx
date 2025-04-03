import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useModalStore } from '@/store/modalStore';
import { type ModalType } from '@/types/modals';

interface ModalProps {
  id: string;
  type: ModalType;
  children: React.ReactNode;
  contentClassName?: string;
}

export function Modal({ id, type, children, contentClassName }: ModalProps) {
  const { activeModals, closeModal } = useModalStore();
  const modalData = activeModals[id];

  if (!modalData?.isOpen) return null;

  return (
    <Dialog
      open={modalData.isOpen}
      onOpenChange={() => {
        closeModal(id);
      }}
    >
      <DialogContent className={cn(contentClassName)}>{children}</DialogContent>
    </Dialog>
  );
}
