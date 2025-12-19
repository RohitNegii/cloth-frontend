"use client";

import React, { useEffect, useState } from "react";
import { getMyOrders } from "@/lib/orderApi";
import Image from "next/image";

const statusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "DELIVERED":
      return "bg-green-100 text-green-700";
    case "CANCELLED":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const CurrentOrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response: any = await getMyOrders();
        const currentOrders = response.data.filter(
          (order: any) => order.status !== "DELIVERED"
        );
        setOrders(currentOrders);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-gray-100 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg font-medium">No current orders</p>
        <p className="text-sm text-gray-500 mt-1">
          You don’t have any active orders right now.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <h1 className="text-xl font-semibold text-[var(--text-primary)]">
          Current Orders
        </h1>

        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white border rounded-2xl p-4 sm:p-6 shadow-sm"
          >
            {/* Order Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="text-sm font-medium">{order._id}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Placed On</p>
                <p className="text-sm font-medium">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>

            {/* Items */}
            <div className="space-y-4">
              {order.items.map((item: any) => (
                <div key={item._id} className="flex gap-4 items-center">
                  <div className="relative h-20 w-20 rounded-lg overflow-hidden border">
                    <img
                      src={item.product.images[0]}
                      alt={item.name}
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Size: {item.size} · Color: {item.color}
                    </p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-medium">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex flex-wrap justify-between items-center gap-3 border-t pt-4 mt-4">
              <p className="text-sm text-gray-600">
                Payment:{" "}
                <span className="font-medium capitalize">
                  {order.paymentStatus}
                </span>
              </p>

              <p className="text-lg font-semibold">
                Total: ₹{order.totalPrice}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CurrentOrdersPage;
