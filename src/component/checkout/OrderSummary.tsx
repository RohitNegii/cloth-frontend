'use client';
import React from 'react';
import useCartStore from '../../store/cartStore';

const OrderSummary = () => {
  const { items, getCartTotal } = useCartStore();

  return (
    <div>
      {items.map(item => (
        <div key={item.product} className="flex justify-between items-center mb-2">
          <div>
            <p className="font-semibold">{item.name}</p>
            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
          </div>
          <p>₹{item.price * item.quantity}</p>
        </div>
      ))}
      <div className="flex justify-between items-center mt-4 font-bold">
        <p>Total</p>
        <p>₹{getCartTotal()}</p>
      </div>
    </div>
  );
};

export default OrderSummary;
