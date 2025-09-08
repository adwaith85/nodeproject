import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const CartStore = create(
  persist(
    (set) => ({
      cart: [],
      add: (item) =>
        set((state) => ({
          cart: [...state.cart, item],
        })),
      remove: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),
      clear: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage", // key name in storage
      storage: createJSONStorage(() => localStorage), // defaults to localStorage
    }
  )
)




export default CartStore
