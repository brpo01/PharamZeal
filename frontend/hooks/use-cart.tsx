import { create } from "zustand";
import { toast } from "sonner";
import { persist, createJSONStorage } from "zustand/middleware";

import { Drug } from "@/types";

interface CartStore {
  items: Drug[];
  addItem: (data: Drug) => void;
  removeItem: (id: number) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [
        {
          availability: true,
          available_stock: 50,
          customer_condition: "Left Ventricular Dysfunction",
          drugName: "Valsartan",
          drug_code: "VAL0001",
          expiry_date: "2024-01-01",
          id: 1,
          id_check: true,
          postcode: "ST4",
          price: 10,
          sales: null,
          store: "Tunstall",
          quantity: 1,
          tax: 0,
        },
        {
          availability: true,
          available_stock: 50,
          customer_condition: "Left Ventricular Dysfunction",
          drugName: "Valsartan2",
          drug_code: "VAL00012",
          expiry_date: "2024-01-01",
          id: 1,
          id_check: true,
          postcode: "ST4",
          price: 10,
          sales: null,
          store: "Tunstall",
          quantity: 1,
          tax: 0,
        },
      ],
      addItem: (data: Drug) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          return toast("Item already in cart.");
        }

        set({ items: [...get().items, data] });
        toast.success("Item added to cart.");
      },
      removeItem: (id: number) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success("Item removed from cart.");
      },
      removeAll: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
