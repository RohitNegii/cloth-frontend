"use client";

import React, { useState, useEffect } from "react";
import { getMyOrders } from "@/lib/orderApi";
import { addReview } from "@/lib/productApi";
import { FaStar } from "react-icons/fa";

const PastOrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // key => orderId_productId
  const [review, setReview] = useState<{
    [key: string]: { rating: number; comment: string };
  }>({});

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getMyOrders();
      const pastOrders = response.data.filter(
        (order: any) => order.status === "delivered"
      );
      setOrders(pastOrders);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewChange = (
    orderId: string,
    productId: string,
    rating: number,
    comment: string
  ) => {
    const key = `${orderId}_${productId}`;
    setReview((prev) => ({
      ...prev,
      [key]: { rating, comment },
    }));
  };

  const handleReviewSubmit = async (orderId: string, productId: string) => {
    const key = `${orderId}_${productId}`;
    const { rating, comment } = review[key];

    try {
      await addReview({
        orderId,
        productId,
        rating,
        comment,
      });

      await fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const renderStars = (rating: number, onClick?: (value: number) => void) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <FaStar
          key={i}
          className={`cursor-pointer transition ${
            i <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
          onClick={() => onClick?.(i)}
        />
      ))}
    </div>
  );

  if (loading) {
    return <p className="text-center py-10">Loading orders...</p>;
  }

  return (
    <div className="space-y-8">
      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white rounded-2xl border shadow-md p-4 sm:p-6"
        >
          {/* ORDER HEADER */}
          <div className="flex justify-between items-center border-b pb-4 mb-6">
            <div>
              <p className="text-xs text-gray-400">Order ID</p>
              <p className="text-sm font-semibold">{order._id}</p>
            </div>

            <span className="text-sm font-medium text-green-600">
              Delivered
            </span>
          </div>

          {/* PRODUCTS */}
          <div className="space-y-6">
            {order.items.map((item: any) => {
              const productId = item.product._id;
              const reviewKey = `${order._id}_${productId}`;
              const existingReview = item.review;

              return (
                <div
                  key={reviewKey}
                  className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-xl"
                >
                  {/* IMAGE */}
                  <div className="w-24 h-24 rounded-lg overflow-hidden border bg-white">
                    <img
                      src={item.product.images?.[0]}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* INFO */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">
                      {item.product.name}
                    </h3>

                    {/* EXISTING REVIEW */}
                    {existingReview ? (
                      <div className="mt-2">
                        {renderStars(existingReview.rating)}
                        <p className="text-sm text-gray-600 mt-1">
                          {existingReview.comment}
                        </p>
                      </div>
                    ) : (
                      <div className="mt-3">
                        <p className="text-sm font-medium mb-1">
                          Rate this product
                        </p>

                        {renderStars(review[reviewKey]?.rating || 0, (value) =>
                          handleReviewChange(
                            order._id,
                            productId,
                            value,
                            review[reviewKey]?.comment || ""
                          )
                        )}

                        <textarea
                          className="w-full mt-2 p-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary-brand"
                          placeholder="Write your review..."
                          value={review[reviewKey]?.comment || ""}
                          onChange={(e) =>
                            handleReviewChange(
                              order._id,
                              productId,
                              review[reviewKey]?.rating || 0,
                              e.target.value
                            )
                          }
                        />

                        <button
                          onClick={() =>
                            handleReviewSubmit(order._id, productId)
                          }
                          className="mt-3 bg-primary-brand text-black px-4 py-2 rounded-lg text-sm hover:opacity-90 transition"
                        >
                          Submit Review
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PastOrdersPage;
