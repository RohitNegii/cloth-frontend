'use client';
import React from 'react';
import ShippingForm from '../../component/checkout/ShippingForm';
import OrderSummary from '../../component/checkout/OrderSummary';

const CheckoutPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <ShippingForm />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
