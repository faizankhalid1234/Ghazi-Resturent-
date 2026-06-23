import { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart, formatSAR } from "../context/CartContext";
import { PAYMENT_METHODS, getPaymentMethod } from "../data/paymentMethods";

const DEMO_CUSTOMER = {
  name: "Faizan Khalid",
  phone: "03029655325",
  address: "House 12, Main Boulevard, Riyadh / Lahore",
};

function CheckoutPanel() {
  const { user } = useAuth();
  const { subtotal, deliveryFee, total, count, placeOrder, placingOrder } =
    useCart();
  const errorRef = useRef(null);

  const [name, setName] = useState(
    user?.name && user.name !== "Guest" ? user.name : DEMO_CUSTOMER.name
  );
  const [phone, setPhone] = useState(user?.phone || DEMO_CUSTOMER.phone);
  const [address, setAddress] = useState(DEMO_CUSTOMER.address);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [cardNumber, setCardNumber] = useState("4111111111111111");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvv, setCardCvv] = useState("123");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const needsCard = paymentMethod === "card" || paymentMethod === "mada";

  const fillDemo = () => {
    setName(DEMO_CUSTOMER.name);
    setPhone(DEMO_CUSTOMER.phone);
    setAddress(DEMO_CUSTOMER.address);
    setPaymentMethod("cod");
    setFieldErrors({});
    setError("");
  };

  const showError = (msg, fields = {}) => {
    setError(msg);
    setFieldErrors(fields);
    requestAnimationFrame(() => {
      errorRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    const nextFieldErrors = {};
    if (!name.trim()) nextFieldErrors.name = true;
    if (!phone.trim()) nextFieldErrors.phone = true;
    if (!address.trim()) nextFieldErrors.address = true;

    if (Object.keys(nextFieldErrors).length) {
      showError("Please fill all delivery details marked with *.", nextFieldErrors);
      return;
    }

    if (needsCard && (!cardNumber.trim() || !cardExpiry.trim() || !cardCvv.trim())) {
      showError("Please enter card details for card payment.");
      return;
    }

    try {
      await placeOrder({
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
        paymentMethod,
        cardNumber: cardNumber.replace(/\s/g, ""),
        cardExpiry,
        cardCvv,
      });
    } catch (err) {
      showError(err.message || "Order failed. Please try again.");
    }
  };

  const inputClass = (field) =>
    `w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-navy outline-none focus:ring-2 focus:ring-orange/15 ${
      fieldErrors[field]
        ? "border-red-400 focus:border-red-400"
        : "border-gray-border focus:border-orange"
    }`;

  return (
    <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
      <div className="shrink-0 border-b border-orange/20 bg-gradient-to-r from-orange-pale to-white px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-muted">
              Order total
            </p>
            <p className="text-[22px] font-bold text-orange">{formatSAR(total)}</p>
          </div>
          <div className="text-right text-[12px] text-navy">
            <p>{count} item{count !== 1 ? "s" : ""}</p>
            <p className="text-gray-muted">
              {formatSAR(subtotal)} + {formatSAR(deliveryFee)} delivery
            </p>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        <div className="mb-4 flex items-center justify-between gap-2">
          <h3 className="text-[14px] font-bold text-navy">Delivery Details</h3>
          <button
            type="button"
            onClick={fillDemo}
            className="shrink-0 rounded-full bg-navy px-3 py-1 text-[11px] font-semibold text-white transition hover:bg-navy-light"
          >
            Use demo info
          </button>
        </div>

        <div className="space-y-2.5">
          <div>
            <label htmlFor="checkout-name" className="mb-1 block text-[11px] font-medium text-gray-muted">
              Full name *
            </label>
            <input
              id="checkout-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setFieldErrors((f) => ({ ...f, name: false }));
              }}
              placeholder="e.g. Faizan Khalid"
              required
              className={inputClass("name")}
            />
          </div>
          <div>
            <label htmlFor="checkout-phone" className="mb-1 block text-[11px] font-medium text-gray-muted">
              Phone number *
            </label>
            <input
              id="checkout-phone"
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setFieldErrors((f) => ({ ...f, phone: false }));
              }}
              placeholder="e.g. 03029655325"
              required
              className={inputClass("phone")}
            />
          </div>
          <div>
            <label htmlFor="checkout-address" className="mb-1 block text-[11px] font-medium text-gray-muted">
              Delivery address *
            </label>
            <textarea
              id="checkout-address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setFieldErrors((f) => ({ ...f, address: false }));
              }}
              placeholder="Street, area, city"
              rows={2}
              required
              className={`${inputClass("address")} resize-none`}
            />
          </div>
        </div>

        <section className="mt-5">
          <h3 className="text-[14px] font-bold text-navy">Payment Method</h3>
          <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {PAYMENT_METHODS.map((method) => {
              const Icon = method.icon;
              const active = paymentMethod === method.id;
              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id)}
                  className={`flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition ${
                    active
                      ? "border-orange bg-orange-pale ring-1 ring-orange/30"
                      : "border-gray-border bg-white hover:border-orange/30"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${method.bg}`}
                  >
                    <Icon className={`h-4 w-4 ${method.color}`} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12px] font-bold text-navy">
                      {method.label}
                    </span>
                  </span>
                  <span
                    className={`h-3.5 w-3.5 shrink-0 rounded-full border-2 ${
                      active ? "border-orange bg-orange" : "border-gray-border"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </section>

        {needsCard && (
          <section className="mt-4 rounded-xl border border-gray-border bg-page p-3">
            <p className="mb-2 text-[12px] font-semibold text-navy">Card details (demo pre-filled)</p>
            <div className="space-y-2">
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="Card number"
                className="w-full rounded-lg border border-gray-border bg-white px-3 py-2 text-sm outline-none focus:border-orange"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  placeholder="MM/YY"
                  className="rounded-lg border border-gray-border bg-white px-3 py-2 text-sm outline-none focus:border-orange"
                />
                <input
                  type="text"
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value)}
                  placeholder="CVV"
                  className="rounded-lg border border-gray-border bg-white px-3 py-2 text-sm outline-none focus:border-orange"
                />
              </div>
            </div>
          </section>
        )}
      </div>

      <div
        ref={errorRef}
        className="shrink-0 border-t border-gray-border bg-white px-4 py-4 shadow-[0_-4px_20px_rgba(26,35,64,0.06)]"
      >
        {error && (
          <p className="mb-3 rounded-lg bg-red-50 px-3 py-2.5 text-[12px] font-semibold text-red-600">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={placingOrder || count === 0}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange py-3.5 text-[15px] font-bold text-white shadow-[0_4px_16px_rgba(249,115,22,0.35)] transition hover:bg-orange-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {placingOrder ? (
            <>
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Confirming order...
            </>
          ) : (
            <>Confirm Order — {formatSAR(total)}</>
          )}
        </button>
        <p className="mt-2 text-center text-[11px] text-gray-muted">
          {getPaymentMethod(paymentMethod)?.label} · Tap to place order
        </p>
      </div>
    </form>
  );
}

export default CheckoutPanel;
