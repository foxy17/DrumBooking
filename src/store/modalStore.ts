import { create } from 'zustand';
import { type BaseModalProps, type ModalType } from '@/types/modals';

interface BaseModalData {
  isOpen: boolean;
  type: ModalType;
  props: Record<string, unknown> & BaseModalProps;
}

interface ModalState {
  activeModals: Record<string, BaseModalData>;
  openModal: <T extends Record<string, unknown>>(
    type: ModalType,
    props?: Omit<T & BaseModalProps, 'onClose'>
  ) => void;
  closeModal: (id: string) => void;
  closeLatestModal: () => void;
  closeAllModals: () => void;
}

const generateModalId = (type: ModalType): string =>
  `${type}-${Date.now()}-${Math.random().toString(36).slice(2)}`;

export const useModalStore = create<ModalState>()((set, get) => ({
  activeModals: {},

  openModal: (type, props = {} as any) => {
    const modalId = generateModalId(type);
    const modalData = {
      isOpen: true,
      type,
      props: {
        ...props,
        onClose: () => {
          get().closeModal(modalId);
        },
      },
    };

    set(state => ({
      activeModals: {
        ...state.activeModals,
        [modalId]: modalData,
      },
    }));
  },

  closeModal: id => {
    set(state => {
      const { [id]: _, ...rest } = state.activeModals;
      return { activeModals: rest };
    });
  },

  closeLatestModal: () => {
    set(state => {
      const modalIds = Object.keys(state.activeModals);
      if (modalIds.length === 0) return state;

      const latestModalId = modalIds[modalIds.length - 1];
      const { [latestModalId]: _, ...rest } = state.activeModals;
      return { activeModals: rest };
    });
  },

  closeAllModals: () => {
    set({ activeModals: {} });
  },
}));
