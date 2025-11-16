import React from "react";

interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image: string;
}

const dummyCartItems: CartItem[] = [
  {
    id: 1,
    name: "NanoTech Winter Jacket",
    price: "₹8,999",
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=80&q=80",
  },
  {
    id: 2,
    name: "Thermal Gloves",
    price: "₹999",
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=80&q=80",
  },
];

interface SlidingCartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SlidingCartModal: React.FC<SlidingCartModalProps> = ({
  isOpen,
  onClose,
}) => {
  const subtotal = dummyCartItems.reduce(
    (sum, item) =>
      sum + parseInt(item.price.replace(/[^\d]/g, "")) * item.quantity,
    0
  );
  const freeShippingThreshold = 499;
  const saved = 349;
  const hasFreeShipping = subtotal >= freeShippingThreshold;

  return (
    <div>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-30 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
      />

      {/* Panel */}
      <aside
        className={`fixed top-0 right-0 z-40 h-full w-96 max-w-full shadow-2xl border-l rounded-l-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: "var(--background-light)",
          borderColor: "var(--secondary-accent)",
        }}
      >
        {/* Header */}
        <header
          className="p-5 flex justify-between items-center"
          style={{ borderBottom: "1px solid var(--secondary-accent)" }}
        >
          <h2
            className="text-xl font-bold tracking-wide"
            style={{ color: "var(--primary-brand)" }}
          >
            Your Cart
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full transition"
            style={{ color: "var(--contrast-dark)" }}
          >
            <span className="text-2xl">×</span>
          </button>
        </header>

        {/* Savings bar */}
        <div
          className="px-4 py-2 text-center font-medium"
          style={{ background: "var(--buttons-highlight)", color: "#fff" }}
        >
          You saved ₹{saved} on this order
        </div>

        {/* Free shipping status */}
        <div
          className="text-center py-2 text-sm"
          style={{ color: "var(--text-secondary)" }}
        >
          <span style={{ color: "var(--secondary-accent)", fontWeight: 600 }}>
            🎉 Congratulations!
          </span>{" "}
          You&apos;ve availed{" "}
          <span style={{ color: "var(--buttons-highlight)", fontWeight: 600 }}>
            Free shipping
          </span>{" "}
          🎉
        </div>

        {/* Progress bar */}
        <div className="px-6 py-2 flex items-center">
          <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
            Shipping ₹50
          </span>
          <div
            className="flex-grow mx-2 h-2 rounded-lg bg-gray-200 relative"
            style={{ background: "var(--secondary-accent)" }}
          >
            <div
              className={`absolute top-0 left-0 h-2 rounded-lg`}
              style={{
                background: "var(--buttons-highlight)",
                width: hasFreeShipping ? "100%" : "50%",
                transition: "width 0.4s",
              }}
            />
          </div>
          <span
            className="text-xs font-bold"
            style={{ color: "var(--buttons-highlight)" }}
          >
            Free Shipping
          </span>
        </div>

        {/* Cart items */}
        <div className="flex-grow overflow-y-auto p-5 space-y-4">
          {dummyCartItems.length === 0 ? (
            <p
              className="text-center mt-12"
              style={{ color: "var(--text-secondary)" }}
            >
              Your cart is empty.
            </p>
          ) : (
            <ul className="space-y-4">
              {dummyCartItems.map(({ id, name, price, quantity, image }) => (
                <li
                  key={id}
                  className="flex gap-4 p-4 rounded-xl border shadow hover:shadow-md transition"
                  style={{
                    background: "#fff",
                    borderColor: "var(--secondary-accent)",
                  }}
                >
                  <img
                    src={image}
                    alt={name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex flex-col flex-grow justify-center">
                    <span
                      className="font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {name}
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {price} × {quantity}
                    </span>
                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        className="w-7 h-7 border rounded-md flex items-center justify-center transition"
                        style={{
                          borderColor: "var(--secondary-accent)",
                          color: "var(--primary-brand)",
                        }}
                      >
                        -
                      </button>
                      <span className="font-medium">{quantity}</span>
                      <button
                        className="w-7 h-7 border rounded-md flex items-center justify-center transition"
                        style={{
                          borderColor: "var(--secondary-accent)",
                          color: "var(--primary-brand)",
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <span
                    className="font-semibold my-auto"
                    style={{ color: "var(--text-primary)" }}
                  >
                    ₹
                    {(
                      parseInt(price.replace(/[^\d]/g, "")) * quantity
                    ).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {/* Last Minute Deals */}
          <div
            className="mt-4 rounded-xl border px-4 py-3"
            style={{
              background: "var(--background-light)",
              borderColor: "var(--secondary-accent)",
            }}
          >
            <div
              className="font-semibold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Last Minute Deals
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://cdn.pixabay.com/photo/2017/01/06/19/15/spray-1959334_1280.png"
                  alt="Body Spray"
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <div
                    className="font-bold text-sm"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Body Spray 150ml
                  </div>
                  <div
                    className="text-xs line-through"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    ₹299
                  </div>
                  <div
                    className="text-xs font-bold"
                    style={{ color: "var(--buttons-highlight)" }}
                  >
                    ₹99{" "}
                    <span style={{ color: "var(--text-secondary)" }}>
                      66% OFF
                    </span>
                  </div>
                </div>
              </div>
              <button
                className="px-3 py-1 rounded font-medium text-sm"
                style={{
                  background: "var(--buttons-highlight)",
                  color: "#fff",
                }}
              >
                + ADD
              </button>
            </div>
          </div>

        
        </div>

        {/* Checkout button */}
        <div
          className="sticky bottom-0 left-0 right-0 px-5 py-4 border-t"
          style={{ background: "#fff", borderColor: "var(--secondary-accent)" }}
        >
          <button
            className="w-full rounded-full py-3 px-3 font-semibold text-sm transition-all duration-300 shadow-lg"
            style={{
              background: "var(--primary-brand)",
              color: "#fff",
            }}
            onClick={() => alert("Proceeding to checkout")}
          >
            Proceed to Checkout for Final Price →
          </button>
        </div>
      </aside>
    </div>
  );
};

export default SlidingCartModal;
