import { create } from "zustand";
import { persist } from 'zustand/middleware'

interface StoreCartState {
  cartId: string;
  setCartId: (value: string) => void;
}

export const useStoreCart = create<StoreCartState>()(
  persist(
    (set) => ({
      cartId: "",
      setCartId: (value : string ) => set({ cartId : value }),
      
    }),
    {
      name: "CART_SESSION",
    }
  )
);
