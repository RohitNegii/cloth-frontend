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
const statusSteps = ["pending", "processing", "shipped", "delivered"];

const statusIcons: Record<string, string> = {
  pending: "🕒",
  processing: "⚙️",
  shipped: "🚚",
  delivered: "✅",
};

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-indigo-100 text-indigo-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const getStatusIndex = (status: string) => statusSteps.indexOf(status);

  return (
    <>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Current Orders
        </h1>

        {orders.map((order) => {
          const currentStep = getStatusIndex(order.status);

          return (
            <div
              key={order._id}
              className="group bg-white border rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* HEADER */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-xs text-gray-400">Order ID</p>
                  <p className="text-sm font-semibold tracking-wide">
                    {order._id}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    📅 {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <span
                  className={`px-4 py-1 rounded-full text-xs font-semibold capitalize shadow-sm ${
                    statusStyles[order.status]
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* STATUS TIMELINE */}
              {order.status !== "cancelled" && (
                <div className="mt-8">
                  <div className="relative flex justify-between items-center">
                    {/* Background line */}
                    <div className="absolute top-1/2 left-0 w-full h-[3px] bg-gray-200 rounded-full" />

                    {/* Active line */}
                    <div
                      className="absolute top-1/2 left-0 h-[3px] bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500"
                      style={{
                        width: `${
                          ((currentStep + 1) / statusSteps.length) * 100
                        }%`,
                      }}
                    />

                    {statusSteps.map((step, index) => {
                      const active = index <= currentStep;

                      return (
                        <div
                          key={step}
                          className="relative z-10 flex flex-col items-center w-full"
                        >
                          <div
                            className={`h-10 w-10 flex items-center justify-center rounded-full text-lg transition-all duration-300 ${
                              active
                                ? "bg-green-500 text-white scale-110 shadow-lg"
                                : "bg-gray-300 text-gray-500"
                            }`}
                          >
                            {statusIcons[step]}
                          </div>

                          <p
                            className={`mt-2 text-xs capitalize tracking-wide ${
                              active
                                ? "text-green-600 font-semibold"
                                : "text-gray-400"
                            }`}
                          >
                            {step}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ITEMS */}
              <div className="mt-10 space-y-4">
                {order.items.map((item:any) => (
                  <div
                    key={item._id}
                    className="flex gap-4 items-center bg-gray-50 p-3 rounded-xl hover:bg-gray-100 transition"
                  >
                    <div className="h-20 w-20 rounded-xl overflow-hidden border bg-white">
                      <img
                        src={item.product.images[0]}
                        alt={item.name}
                        className="h-full w-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>

                    <div className="flex-1">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.size} · {item.color}
                      </p>
                      <p className="text-xs text-gray-400">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold text-sm text-gray-700">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              {/* FOOTER */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t pt-4 mt-8">
                <p className="text-sm text-gray-600">
                  💳 Payment:
                  <span className="ml-1 font-medium capitalize">
                    {order.paymentStatus}
                  </span>
                </p>

                <p className="text-xl font-bold text-gray-800">
                  ₹{order.totalPrice}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CurrentOrdersPage;
