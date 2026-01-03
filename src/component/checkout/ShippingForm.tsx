"use client";
import React, { useState } from "react";
import { createOrder } from "@/lib/orderApi";
import useUserStore from "@/store/userStore";
import { useRouter } from "next/navigation";
import SuccessModal from "./SuccessModal";
import { useServerCart } from "@/hooks/useServerCart";

const ShippingForm = () => {
  const { items, total } = useServerCart();
  const { user } = useUserStore();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("Please login to continue");
    if (items.length === 0) return alert("Cart is empty");

    try {
      setLoading(true);

      const response: any = await createOrder({
        userId: user._id,
        items,
        totalPrice: total,
        shippingAddress: { ...shippingInfo, country: "India" },
      });

      const { order, razorpayOrder } = response.data;

      const rzp = new (window as any).Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Your Store",
        order_id: razorpayOrder.id,
        handler: () => {
          setOrderId(order.razorpayOrderId);
          setIsModalOpen(true);
        },
        prefill: {
          name: shippingInfo.name,
          contact: shippingInfo.phone,
        },
        theme: { color: "#000" },
      });

      rzp.open();
    } catch (err) {
      alert("Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-8 space-y-8 border"
      >
        <div>
          <h2 className="text-2xl font-bold text-[var(--primary-brand)]">
            Shipping Address
          </h2>
          <p className="text-sm text-gray-500">
            Enter details for safe & fast delivery
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["name", "phone", "city", "state", "pincode"].map((field) => (
            <input
              key={field}
              name={field}
              required
              placeholder={field.toUpperCase()}
              onChange={handleChange}
              className="px-4 py-3 rounded-xl border focus:ring-2 focus:ring-black outline-none"
            />
          ))}

          <input
            name="address"
            placeholder="FULL ADDRESS"
            onChange={handleChange}
            required
            className="md:col-span-2 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-black outline-none"
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-black text-white py-4 rounded-xl font-semibold text-lg
          hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? "Processing Payment..." : `Pay ₹${total}`}
        </button>

        <p className="text-xs text-center text-gray-500">
          🔒 100% Secure Payments powered by Razorpay
        </p>
      </form>

      {isModalOpen && (
        <SuccessModal
          orderId={orderId}
          isOpen
          onClose={() => router.push("/")}
        />
      )}
    </>
  );
};

export default ShippingForm;
