import { createContext, useContext, useMemo, useState, useCallback } from "react";
import { DELIVERY_FEE } from "../data/paymentMethods";
import { createOrder, saveOrder, processPayment } from "../services/orderService";

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
  const [cartOpen, setCartOpen] = useState(false);
  const [cartView, setCartView] = useState("cart");
  const [lastOrder, setLastOrder] = useState(null);
  const [placingOrder, setPlacingOrder] = useState(false);

  const openProductModal = useCallback((product) => {
    setModalProduct(product);
  }, []);

  const closeProductModal = useCallback(() => {
    setModalProduct(null);
  }, []);

  const openCart = useCallback(() => {
    setCartOpen(true);
    setCartView((v) => (v === "success" ? "cart" : v));
  }, []);

  const closeCart = useCallback(() => {
    setCartOpen(false);
    setTimeout(() => {
      setCartView((v) => (v === "success" ? "cart" : v));
      setLastOrder(null);
    }, 300);
  }, []);

  const startCheckout = useCallback(() => {
    if (!items.length) return;
    setCartView("checkout");
  }, [items.length]);

  const backToCart = useCallback(() => setCartView("cart"), []);

  const addItem = useCallback(({ qty = 1, note = "", ...item }) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.id === item.id && i.type === item.type
      );
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.type === item.type
            ? { ...i, qty: i.qty + qty, note: note || i.note }
            : i
        );
      }
      return [...prev, { ...item, qty, note }];
    });
    setCartOpen(true);
    setCartView("cart");
  }, []);

  const removeItem = useCallback((id, type) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.type === type)));
  }, []);

  const updateQty = useCallback((id, type, qty) => {
    if (qty < 1) return;
    setItems((prev) =>
      prev.map((i) =>
        i.id === id && i.type === type ? { ...i, qty } : i
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + parsePrice(i.price) * i.qty, 0),
    [items]
  );

  const deliveryFee = items.length > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.qty, 0),
    [items]
  );

  const placeOrder = useCallback(
    async ({ name, phone, address, paymentMethod, cardNumber, cardExpiry, cardCvv }) => {
      if (!items.length) {
        throw new Error("Your cart is empty. Add items before checkout.");
      }

      setPlacingOrder(true);

      try {
        const paymentMeta = {};
        if (paymentMethod === "card" || paymentMethod === "mada") {
          paymentMeta.last4 = cardNumber?.slice(-4) || "****";
        }

        const paymentResult = await processPayment(paymentMethod, paymentMeta);
        if (!paymentResult.success) {
          throw new Error("Payment failed. Please try again.");
        }

        const order = createOrder({
          items,
          subtotal,
          deliveryFee,
          paymentMethod,
          customer: { name, phone, address },
          paymentMeta: {
            ...paymentMeta,
            transactionId: paymentResult.transactionId,
          },
        });

        try {
          saveOrder(order);
        } catch {
          // Still confirm order in UI if storage blocked (e.g. private mode)
        }

        setLastOrder(order);
        setItems([]);
        setCartView("success");
      } catch (err) {
        throw err;
      } finally {
        setPlacingOrder(false);
      }
    },
    [items, subtotal, deliveryFee]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        subtotal,
        deliveryFee,
        total,
        count,
        modalProduct,
        openProductModal,
        closeProductModal,
        cartOpen,
        openCart,
        closeCart,
        cartView,
        startCheckout,
        backToCart,
        placeOrder,
        placingOrder,
        lastOrder,
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
