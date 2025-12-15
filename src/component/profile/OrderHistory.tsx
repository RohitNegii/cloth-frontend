'use client';

import React from 'react';

const OrderHistory = ({ orders, title }:any) => {
  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-500">No orders to display.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h2>
      <div className="space-y-12">
        {orders.map((order:any) => (
          <div key={order._id} className="bg-white shadow-lg rounded-xl overflow-hidden">
            <div className="bg-gray-50 p-6 sm:flex sm:items-center sm:justify-between">
              <div className="sm:flex sm:items-start space-x-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </span>
                </div>
                <div className="mt-3 sm:mt-0">
                  <h3 className="text-lg font-semibold text-gray-900">Order #{order._id.slice(-6)}</h3>
                  <p className="text-sm text-gray-500">Placed on <time dateTime={order.createdAt}>{new Date(order.createdAt).toLocaleDateString()}</time></p>
                  <p className="text-sm text-gray-500">Total: <span className="font-medium text-gray-700">₹{order.totalPrice.toLocaleString()}</span></p>
                </div>
              </div>
              <div className="mt-4 sm:mt-0">
                <button className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto">
                  Track Order
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <ul className="divide-y divide-gray-200">
                {order.items.map((item:any) => (
                  <li key={item._id} className="py-6 flex space-x-6">
                    <img src={item.product.images[0]} alt={item.name} className="flex-none w-24 h-24 object-center object-cover bg-gray-100 rounded-lg" />
                    <div className="flex-auto space-y-2">
                      <h4 className="text-md font-semibold text-gray-800">
                        <a href={`/product/${item.product._id}`} className="hover:text-blue-600">{item.name}</a>
                      </h4>
                      <p className="text-sm text-gray-500">{item.color}, {item.size}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-md font-semibold text-gray-800">₹{item.price.toLocaleString()}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-gray-200 bg-gray-50 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-md font-semibold text-gray-800 mb-2">Shipping Address</h4>
                  <address className="not-italic text-sm text-gray-600">
                    <p>{order.shippingAddress.name}</p>
                    <p>{order.shippingAddress.address}, {order.shippingAddress.city}</p>
                    <p>{order.shippingAddress.state}, {order.shippingAddress.pincode}</p>
                    <p>Phone: {order.shippingAddress.phone}</p>
                  </address>
                </div>
                <div>
                  <h4 className="text-md font-semibold text-gray-800 mb-2">Payment Information</h4>
                  <p className="text-sm text-gray-600">Payment Status: <span className={`font-medium ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'}`}>{order.paymentStatus}</span></p>
                  {order.paymentId && <p className="text-sm text-gray-600">Payment ID: {order.paymentId.slice(-8)}</p>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
