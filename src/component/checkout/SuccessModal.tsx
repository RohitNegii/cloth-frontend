"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface SuccessModalProps {
  orderId: string;
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  orderId,
  isOpen,
  onClose,
}) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleContinueShopping = () => {
    onClose();
    router.push("/");
  };

  return (
    <div className="fixed inset-0 bg-[var(--contrast-dark)]/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-[var(--background-light)] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[var(--primary-brand)] px-6 py-5 text-center">
          <h3 className="text-2xl font-bold text-[var(--secondary-accent)] tracking-wide">
            🎉 Order Confirmed!
          </h3>
        </div>

        {/* Body */}
        <div className="px-6 py-8 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--buttons-highlight)]/15">
            ✅
          </div>

          <p className="text-lg font-medium text-[var(--text-primary)]">
            Thank you for your purchase
          </p>

          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Your order has been successfully placed.
          </p>

          <div className="mt-5 rounded-xl bg-white px-4 py-3 shadow-inner text-sm text-[var(--text-primary)]">
            <span className="font-semibold text-[var(--text-secondary)]">
              Order ID:
            </span>
            <div className="mt-1 break-all font-mono text-[var(--primary-brand)]">
              {orderId}
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleContinueShopping}
            className="mt-8 w-full rounded-xl bg-[var(--buttons-highlight)] py-3 text-sm font-semibold text-white tracking-wide transition hover:brightness-110 active:scale-[0.98]"
          >
            Continue Shopping
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-[var(--secondary-accent)] hover:opacity-80 transition"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
