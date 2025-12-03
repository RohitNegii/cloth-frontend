'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const OrderConfirmationPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const id = searchParams.get('orderId');
    if (id) {
      setOrderId(id);
    } else {
      // Redirect to home if no orderId is present
      router.push('/');
    }
  }, [searchParams, router]);

  if (!orderId) {
    return null; // Or a loading spinner
  }

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Thank you for your order!</h1>
      <p>Your order has been placed successfully.</p>
      <p className="my-4">Your Order ID is: <strong>{orderId}</strong></p>
      <p>You can track the status of your order in your account.</p>
      <button onClick={() => router.push('/')} className="mt-4 bg-blue-500 text-white p-2 rounded">
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderConfirmationPage;
