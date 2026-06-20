import { createContext, useContext, useMemo, useState, useCallback } from "react";

const CartContext = createContext(null);

export function parsePrice(price) {
  return parseFloat(String(price).replace(/[^\d.]/g, "")) || 0;
}

export function formatSAR(amount) {
  return `${amount.toFixed(2)} SAR`;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [modalProduct, setModalProduct] = useState(null);

  const openProductModal = useCallback((product) => {
    setModalProduct(product);
  }, []);

  const closeProductModal = useCallback(() => {
    setModalProduct(null);
  }, []);

  const addItem = useCallback(({ qty = 1, note = "", ...item }) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.id === item.id && i.type === item.type
      );
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.type === item.type
            ? {
                ...i,
                qty: i.qty + qty,
                note: note || i.note,
              }
            : i
        );
      }
      return [...prev, { ...item, qty, note }];
    });
  }, []);

  const total = useMemo(
    () => items.reduce((sum, i) => sum + parsePrice(i.price) * i.qty, 0),
    [items]
  );

  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.qty, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        total,
        count,
        modalProduct,
        openProductModal,
        closeProductModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
