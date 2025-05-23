import { useModalStore } from "@/store/modalStore";
import { Suspense } from "react";
import { Modal } from "./modal";
import { modalComponents } from "./modals-registory/registry";

export function ModalManager() {
  const { activeModals } = useModalStore();

  return (
    <>
      {Object.entries(activeModals).map(([id, modal]) => {
        const Component = modalComponents[modal.type];
        if (!Component) {
          console.warn(`No component mapped for modal type: ${modal.type}`);
          return null;
        }

        return (
          <Suspense fallback={<div>Loading...</div>} key={id}>
            <Component {...modal.props} id={id} />
          </Suspense>
        );
      })}
    </>
  );
}
