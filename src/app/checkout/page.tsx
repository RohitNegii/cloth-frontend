"use client";

import ShippingForm from "@/component/checkout/ShippingForm";
import OrderSummary from "@/component/checkout/OrderSummary";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[var(--contrast-light-2)] py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-[var(--primary-brand)]">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Shipping */}
          <div className="lg:col-span-2">
            <ShippingForm />
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
