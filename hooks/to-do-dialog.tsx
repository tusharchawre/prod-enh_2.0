import { create } from "zustand";

type ToDoStore = {

  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;

};

export const useToDo = create<ToDoStore>((set) => ({

  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false}),

}));
