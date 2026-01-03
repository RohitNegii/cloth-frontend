"use client";

import React, { useEffect, useState } from "react";
import { getMyOrders } from "@/lib/orderApi";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Package } from "lucide-react";

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

export default function CurrentOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openOrder, setOpenOrder] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res: any = await getMyOrders("current");
        setOrders(res.data.filter((o: any) => o.status !== "DELIVERED"));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-36 bg-gray-100 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  /* ---------------- EMPTY ---------------- */
  if (!orders.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <Package size={48} className="text-gray-300 mb-4" />
        <p className="text-lg font-semibold">No active orders</p>
        <p className="text-sm text-gray-500 mt-1">
          Once you place an order, it will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Current Orders</h1>

      {orders.map((order) => {
        const expanded = openOrder === order._id;
        const currentStep = getStatusIndex(order.status);

        return (
          <motion.div
            key={order._id}
            layout
            className="bg-white border rounded-2xl shadow-sm hover:shadow-lg transition"
          >
            {/* ---------- HEADER ---------- */}
            <div
              className="p-4 sm:p-6 cursor-pointer flex justify-between gap-4"
              onClick={() => setOpenOrder(expanded ? null : order._id)}
            >
              <div>
                <p className="text-xs text-gray-400">ORDER ID</p>
                <p className="text-sm font-semibold">{order._id}</p>
                <p className="text-xs text-gray-500 mt-1">
                  📅 {new Date(order.createdAt).toLocaleDateString()}
                </p>

                {/* Show product names */}
                <p className="text-sm mt-2 text-gray-600">
                  {order.items.length <= 2
                    ? order.items.map((item:any) => item.product.name).join(", ")
                    : `${order.items[0].product.name}, ${
                        order.items[1].product.name
                      } +${order.items.length - 2} more`}
                </p>

                {/* Total Price */}
                <p className="text-sm mt-1 text-gray-600">
                  Total:{" "}
                  <span className="font-semibold">₹{order.totalPrice}</span>
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span
                  className={`px-4 py-1 rounded-full text-xs font-semibold capitalize ${
                    statusStyles[order.status]
                  }`}
                >
                  {order.status}
                </span>

                {expanded ? <ChevronUp /> : <ChevronDown />}
              </div>
            </div>

            {/* ---------- EXPANDABLE CONTENT ---------- */}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-4 sm:px-6 pb-6"
                >
                  {/* STATUS TRACKER */}
                  {order.status !== "cancelled" && (
                    <div className="mt-6">
                      <div className="relative flex justify-between">
                        <div className="absolute top-5 left-0 w-full h-[3px] bg-gray-200 rounded" />
                        <div
                          className="absolute top-5 left-0 h-[3px] bg-green-500 rounded transition-all"
                          style={{
                            width: `${
                              ((currentStep + 1) / statusSteps.length) * 100
                            }%`,
                          }}
                        />

                        {statusSteps.map((step, i) => {
                          const active = i <= currentStep;
                          return (
                            <div
                              key={step}
                              className="relative z-10 flex flex-col items-center w-full"
                            >
                              <div
                                className={`h-10 w-10 flex items-center justify-center rounded-full ${
                                  active
                                    ? "bg-green-500 text-white scale-110"
                                    : "bg-gray-300 text-gray-500"
                                }`}
                              >
                                {statusIcons[step]}
                              </div>
                              <p
                                className={`text-xs mt-2 capitalize ${
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
                  <div className="mt-8 space-y-3">
                    {order.items.map((item: any) => (
                      <div
                        key={item._id}
                        className="flex items-center gap-4 bg-gray-50 rounded-xl p-3"
                      >
                        <img
                          src={item.product.images[0]}
                          className="h-20 w-20 rounded-lg object-cover bg-white border"
                        />

                        <div className="flex-1">
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            {item.size} · {item.color}
                          </p>
                          <p className="text-xs text-gray-400">
                            Qty: {item.quantity}
                          </p>
                        </div>

                        <p className="font-semibold">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* FOOTER */}
                  <div className="flex justify-between items-center border-t pt-4 mt-6">
                    <p className="text-sm text-gray-600">
                      💳 Payment:
                      <span className="ml-1 font-medium capitalize">
                        {order.paymentStatus}
                      </span>
                    </p>

                    <button className="text-sm font-semibold text-[var(--primary-brand)] hover:underline">
                      View Details
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
