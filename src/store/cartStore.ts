"use client";

import { CartItem, CartState } from "@/types/cart";
import { Product } from "@/types/product";
import { create } from "zustand";
import { StateStorage, createJSONStorage, persist } from "zustand/middleware";

const createNoopStorage = (): StateStorage => ({
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
});

const storage = () =>
  typeof window === "undefined" ? createNoopStorage() : localStorage;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product: Product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((item) => item.product.id === product.id);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return { items: [...state.items, { product, quantity }] };
        }),
      removeItem: (productId: number) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        })),
      updateQuantity: (productId: number, quantity: number) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter((item) => item.product.id !== productId),
            };
          }
          const exists = state.items.some((item) => item.product.id === productId);
          if (!exists) return state;
          return {
            items: state.items.map((item) =>
              item.product.id === productId ? { ...item, quantity } : item
            ),
          };
        }),
      clearCart: () => set({ items: [] }),
      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        ),
      getTotalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage<CartState>(storage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export const selectCartItems = (state: CartState): CartItem[] => state.items;
export const selectCartCount = (state: CartState): number => state.getTotalItems();
export const selectCartTotal = (state: CartState): number => state.getTotalPrice();
