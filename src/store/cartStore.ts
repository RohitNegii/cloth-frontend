import {create} from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  product: string; // product id
  name: string;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
}

interface CartState {
  isCartOpen: boolean;
  items: CartItem[];
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  getCartTotal: () => number;
  clearCart: () => void;
}

const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      isCartOpen: false,
      items: [],
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      addItem: (item) => {
        const existingItem = get().items.find((i) => i.product === item.product);
        if (existingItem) {
          const updatedItems = get().items.map((i) =>
            i.product === item.product ? { ...i, quantity: i.quantity + 1 } : i
          );
          set({ items: updatedItems });
        } else {
          set({ items: [...get().items, item] });
        }
      },
      removeItem: (productId) => {
        const updatedItems = get().items.filter((i) => i.product !== productId);
        set({ items: updatedItems });
      },
      getCartTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage', // unique name
    }
  )
);

export default useCartStore;
