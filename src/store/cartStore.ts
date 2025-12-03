import {create} from 'zustand';

interface CartState {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const useCartStore = create<CartState>((set) => ({
  isCartOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
}));

export default useCartStore;
