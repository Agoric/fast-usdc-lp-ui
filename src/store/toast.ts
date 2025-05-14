import { type Id as ToastId } from 'react-toastify';
import { create } from 'zustand';

interface ToastState {
  toastId: ToastId | null;
  setToastId: (id: ToastId | null) => void;
}

const useToastStore = create<ToastState>(set => ({
  toastId: null,
  setToastId: (id: ToastId | null) => set({ toastId: id }),
}));

export default useToastStore;
