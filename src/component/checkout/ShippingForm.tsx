"use client";
import React, { useState } from "react";
import useCartStore from "../../store/cartStore";
import { createOrder } from "../../lib/orderApi";
import useUserStore from "../../store/userStore";
import { useRouter } from "next/navigation";
import SuccessModal from "./SuccessModal";

const ShippingForm = () => {
  const { items, getCartTotal, clearCart } = useCartStore();
  const { user } = useUserStore();
  const router = useRouter();

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to continue");
      return;
    }

    const orderPayload = {
      userId: user._id,
      items: items.map((item) => ({ ...item, product: item.product })),
      totalPrice: getCartTotal(),
      shippingAddress: { ...shippingInfo, country: "India" },
    };

    try {
      const response = await createOrder(orderPayload);

      const { order, razorpayOrder } = response.data;
      const razorpayOrderId = order.razorpayOrderId;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Your Company Name",
        description: "Test Transaction",
        order_id: razorpayOrder.id,
        handler: function () {
          setOrderId(razorpayOrderId);
          setIsModalOpen(true);
        },
        prefill: {
          name: shippingInfo.name,
          contact: shippingInfo.phone,
        },
        theme: {
          color: "var(--buttons-highlight)",
        },
      };

      const rzp1 = new (window as any).Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Order creation failed", error);
      alert("Something went wrong!");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    clearCart();
    router.push("/");
  };

  return (
    <>
      <div className="min-h-screen bg-[var(--background-light)] flex items-center justify-center px-4 py-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 md:p-10 space-y-8 border border-[var(--secondary-accent)]/30"
        >
          {/* Heading */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-[var(--primary-brand)]">
              Shipping Details
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Please enter your address to complete your order
            </p>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)]">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm 
                  bg-[var(--background-light)]
                  focus:ring-2 focus:ring-[var(--buttons-highlight)]
                  focus:border-[var(--buttons-highlight)]
                  transition"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)]">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                placeholder="9876543210"
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm 
                  bg-[var(--background-light)]
                  focus:ring-2 focus:ring-[var(--buttons-highlight)]
                  focus:border-[var(--buttons-highlight)]
                  transition"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[var(--text-primary)]">
                Street Address
              </label>
              <input
                type="text"
                name="address"
                placeholder="House no., Street name"
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm 
                  bg-[var(--background-light)]
                  focus:ring-2 focus:ring-[var(--buttons-highlight)]
                  focus:border-[var(--buttons-highlight)]
                  transition"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)]">
                City
              </label>
              <input
                type="text"
                name="city"
                placeholder="Your City"
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm 
                  bg-[var(--background-light)]
                  focus:ring-2 focus:ring-[var(--buttons-highlight)]
                  focus:border-[var(--buttons-highlight)]
                  transition"
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)]">
                State
              </label>
              <input
                type="text"
                name="state"
                placeholder="State"
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm 
                  bg-[var(--background-light)]
                  focus:ring-2 focus:ring-[var(--buttons-highlight)]
                  focus:border-[var(--buttons-highlight)]
                  transition"
              />
            </div>

            {/* Pincode */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)]">
                Pincode
              </label>
              <input
                type="text"
                name="pincode"
                placeholder="246473"
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm 
                  bg-[var(--background-light)]
                  focus:ring-2 focus:ring-[var(--buttons-highlight)]
                  focus:border-[var(--buttons-highlight)]
                  transition"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-[var(--buttons-highlight)] py-3 text-sm font-semibold text-white tracking-wide
              shadow-lg hover:shadow-xl hover:brightness-110 transition-all active:scale-[0.98]"
          >
            Place Order
          </button>
        </form>
      </div>

      {isModalOpen && orderId && (
        <SuccessModal
          orderId={orderId}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default ShippingForm;
