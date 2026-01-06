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
          // Validate product and quantity
          if (!product || !product.id || quantity <= 0) {
            console.warn("Invalid product or quantity");
            return state;
          }

          const existing = state.items.find(
            (item) => item.product.id === product.id
          );
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
        set((state) => {
          // Validate productId
          if (!productId) {
            console.warn("Invalid product ID for removal");
            return state;
          }

          // Check if item exists before removing
          const exists = state.items.some(
            (item) => item.product.id === productId
          );
          if (!exists) {
            console.warn(`Product ${productId} not found in cart`);
            return state;
          }

          return {
            items: state.items.filter((item) => item.product.id !== productId),
          };
        }),
      updateQuantity: (productId: number, quantity: number) =>
        set((state) => {
          // Validate inputs
          if (!productId || typeof quantity !== "number" || isNaN(quantity)) {
            console.warn("Invalid product ID or quantity");
            return state;
          }

          // Remove item if quantity is 0 or negative
          if (quantity <= 0) {
            return {
              items: state.items.filter(
                (item) => item.product.id !== productId
              ),
            };
          }

          // Cap quantity at reasonable maximum (999)
          const validatedQuantity = Math.min(quantity, 999);

          const exists = state.items.some(
            (item) => item.product.id === productId
          );
          if (!exists) {
            console.warn(
              `Cannot update quantity: Product ${productId} not in cart`
            );
            return state;
          }

          return {
            items: state.items.map((item) =>
              item.product.id === productId
                ? { ...item, quantity: validatedQuantity }
                : item
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
      storage: createJSONStorage(() => storage()),
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export const selectCartItems = (state: CartState): CartItem[] => state.items;
export const selectCartCount = (state: CartState): number =>
  state.getTotalItems();
export const selectCartTotal = (state: CartState): number =>
  state.getTotalPrice();
