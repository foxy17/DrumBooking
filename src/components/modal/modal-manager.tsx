import { Suspense } from 'react';
import { useModalStore } from '@/store/modalStore';
import { modalComponents } from './modals-registory/registry';
import { Modal } from './modal';

export function ModalManager() {
  const { activeModals } = useModalStore();

  return (
    <>
      {Object.entries(activeModals).map(([id, modal]) => {
        const Component =
          modal.type in modalComponents
            ? modalComponents[modal.type as keyof typeof modalComponents]
            : undefined;
        if (!Component) {
          console.warn(`No component mapped for modal type: ${modal.type}`);
          return null;
        }

        return (
          <Modal key={id} id={id} type={modal.type}>
            <Suspense fallback={<div>Loading...</div>}>
              <Component {...modal.props} />
            </Suspense>
          </Modal>
        );
      })}
    </>
  );
}
