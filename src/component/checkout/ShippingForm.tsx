'use client';
import React, { useState } from 'react';
import useCartStore from '../../store/cartStore';
import { createOrder } from '../../lib/orderApi';
import useUserStore from '../../store/userStore';
import { useRouter } from 'next/navigation';
import SuccessModal from './SuccessModal';

const ShippingForm = () => {
  const { items, getCartTotal, clearCart } = useCartStore();
  const { user } = useUserStore();
  const router = useRouter();
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to continue');
      return;
    }
    const orderPayload = {
      userId: user._id,
      items: items.map(item => ({...item, product: item.product})),
      totalPrice: getCartTotal(),
      shippingAddress: { ...shippingInfo, country: 'India' },
    };
    try {
      const response = await createOrder(orderPayload);
      const { razorpayOrder, razorpayOrderId } = response.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'Your Company Name',
        description: 'Test Transaction',
        order_id: razorpayOrder.id,
        handler: function (response: any) {
          setOrderId(razorpayOrderId);
          setIsModalOpen(true);
        },
        prefill: {
          name: shippingInfo.name,
          contact: shippingInfo.phone,
        },
        theme: {
          color: '#3399cc'
        }
      };

      const rzp1 = new (window as any).Razorpay(options);
      rzp1.open();

    } catch (error) {
      console.error('Order creation failed', error);
      alert('Something went wrong!');
    }
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    clearCart();
    router.push('/');
  };


  return (
    <>
     <form onSubmit={handleSubmit} className="space-y-6 bg-white px-4 py-6 rounded-lg shadow-md">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" id="name" name="name" placeholder="John Doe" onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="col-span-1">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input type="text" id="phone" name="phone" placeholder="123-456-7890" onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="col-span-1 md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Street Address</label>
            <input type="text" id="address" name="address" placeholder="123 Main St" onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="col-span-1">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
            <input type="text" id="city" name="city" placeholder="Anytown" onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="col-span-1">
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">State / Province</label>
            <input type="text" id="state" name="state" placeholder="CA" onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="col-span-1">
            <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">ZIP / Postal Code</label>
            <input type="text" id="pincode" name="pincode" placeholder="12345" onChange={handleChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
    </div>

    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Place Order
    </button>
</form>
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
