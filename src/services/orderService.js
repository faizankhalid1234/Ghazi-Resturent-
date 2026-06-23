const ORDERS_KEY = "ghazi_orders";

export function readOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveOrder(order) {
  const orders = readOrders();
  orders.unshift(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  return order;
}

export function createOrder({
  items,
  subtotal,
  deliveryFee,
  paymentMethod,
  customer,
  paymentMeta = {},
}) {
  return {
    id: `GHZ-${Date.now().toString(36).toUpperCase()}`,
    items: items.map((i) => ({
      id: i.id,
      type: i.type,
      title: i.title,
      price: i.price,
      qty: i.qty,
      note: i.note || "",
      image: i.image,
    })),
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
    paymentMethod,
    paymentMeta,
    customer,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };
}

/** Demo payment — simulates API delay */
export async function processPayment(paymentMethodId, _meta = {}) {
  const delay = paymentMethodId === "cod" ? 400 : 1400;
  await new Promise((r) => setTimeout(r, delay));

  if (paymentMethodId === "card" || paymentMethodId === "mada") {
    return { success: true, transactionId: `TXN-${Date.now().toString(36).toUpperCase()}` };
  }

  if (
    ["stc_pay", "apple_pay", "google_pay", "jazzcash"].includes(paymentMethodId)
  ) {
    return { success: true, transactionId: `WLT-${Date.now().toString(36).toUpperCase()}` };
  }

  return { success: true, transactionId: null };
}
