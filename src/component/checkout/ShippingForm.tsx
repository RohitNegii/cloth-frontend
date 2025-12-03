'use client';
import React, { useState } from 'react';
import useCartStore from '../../store/cartStore';
import { createOrder } from '../../lib/orderApi';
import useUserStore from '../../store/userStore';
import { useRouter } from 'next/navigation';

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
      const { razorpayOrder, orderId } = response.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'Your Company Name',
        description: 'Test Transaction',
        order_id: razorpayOrder.id,
        handler: function (response: any) {
          clearCart();
          router.push(`/order-confirmation?orderId=${orderId}`);
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-4">
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required className="p-2 border rounded"/>
        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required className="p-2 border rounded"/>
        <input type="text" name="address" placeholder="Address" onChange={handleChange} required className="p-2 border rounded"/>
        <input type="text" name="city" placeholder="City" onChange={handleChange} required className="p-2 border rounded"/>
        <input type="text" name="state" placeholder="State" onChange={handleChange} required className="p-2 border rounded"/>
        <input type="text" name="pincode" placeholder="Pincode" onChange={handleChange} required className="p-2 border rounded"/>
      </div>
      <button type="submit" className="mt-4 w-full bg-blue-500 text-white p-2 rounded">
        Place Order
      </button>
    </form>
  );
};

export default ShippingForm;
