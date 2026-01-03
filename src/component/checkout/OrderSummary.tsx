"use client";
import { useServerCart } from "@/hooks/useServerCart";

const OrderSummary = () => {
  const { items, total, loading } = useServerCart();

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6 border animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-6" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex justify-between mb-4">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-32" />
              <div className="h-3 bg-gray-100 rounded w-24" />
            </div>
            <div className="h-4 bg-gray-200 rounded w-16" />
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6 border text-center">
        <p className="text-gray-500">🛒 Your cart is empty</p>
      </div>
    );
  }

  const shippingFee = total > 999 ? 0 : 99;
  const grandTotal = total + shippingFee;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border sticky top-24">
      <h3 className="text-xl font-bold mb-6 text-[var(--primary-brand)]">
        Order Summary
      </h3>

      {/* Items */}
      <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
        {items.map((item) => (
          <div
            key={item._id}
            className="flex justify-between text-sm p-3 rounded-lg hover:bg-gray-50 transition"
          >
            <div>
              <p className="font-medium text-gray-800">{item.name}</p>
              <p className="text-xs text-gray-500">
                Qty {item.quantity} • {item.size}, {item.color}
              </p>
            </div>
            <p className="font-semibold">₹{item.price * item.quantity}</p>
          </div>
        ))}
      </div>

      <hr className="my-4" />

      {/* Price breakup */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{total}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span className={shippingFee === 0 ? "text-green-600" : ""}>
            {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
          </span>
        </div>

        <div className="flex justify-between text-green-600">
          <span>Discount</span>
          <span>- ₹0</span>
        </div>
      </div>

      <hr className="my-4" />

      {/* Grand total */}
      <div className="flex justify-between font-bold text-lg">
        <span>Total Payable</span>
        <span className="text-[var(--primary-brand)]">₹{grandTotal}</span>
      </div>

      {/* Trust text */}
      <p className="text-xs text-gray-500 mt-3">
        🔒 100% secure payments • Easy returns
      </p>
    </div>
  );
};

export default OrderSummary;
