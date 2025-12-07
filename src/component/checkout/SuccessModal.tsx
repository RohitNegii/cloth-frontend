'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

interface SuccessModalProps {
  orderId: string;
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ orderId, isOpen, onClose }) => {
  const router = useRouter();

  if (!isOpen) {
    return null;
  }

  const handleContinueShopping = () => {
    onClose();
    router.push('/');
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative p-8 border w-full max-w-md m-4 bg-white rounded-lg shadow-xl transform transition-all duration-300 ease-in-out scale-100">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900">Thank You!</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-lg text-gray-500">Your order has been placed successfully.</p>
            <p className="my-4 text-md text-gray-600">Your Order ID is: <strong className="text-indigo-600">{orderId}</strong></p>
          </div>
          <div className="items-center px-4 py-3">
            <button
              onClick={handleContinueShopping}
              className="px-4 py-2 bg-indigo-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              Continue Shopping
            </button>
          </div>
        </div>
        <button onClick={onClose} className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 hover:text-gray-600">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
