'use client';

import React, { useState, useEffect } from 'react';
import { getMyOrders } from '@/lib/orderApi';
import { addReview } from '@/lib/productApi';
import OrderHistory from '@/component/profile/OrderHistory';
import { FaStar } from 'react-icons/fa';

const PastOrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState<{ [key: string]: { rating: number; comment: string } }>({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await getMyOrders();
        const pastOrders = response.data.filter((order: any) => order.status === 'DELIVERED');
        setOrders(pastOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleReviewSubmit = async (productId: string) => {
    const { rating, comment } = review[productId];
    try {
      await addReview(productId, rating, comment);
      // Re-fetch orders to show review has been submitted
      const response = await getMyOrders();
      const pastOrders = response.data.filter((order: any) => order.status === 'DELIVERED');
      setOrders(pastOrders);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleReviewChange = (productId: string, rating: number, comment: string) => {
    setReview(prev => ({ ...prev, [productId]: { rating, comment } }));
  };

  const renderStars = (rating: number, productId: string, isInput: boolean) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i <= rating ? 'text-yellow-400' : 'text-gray-300'}
          onClick={() => isInput && handleReviewChange(productId, i, review[productId]?.comment || '')}
        />
      );
    }
    return stars;
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <OrderHistory orders={orders} title="Past Orders" />
          {orders.map(order => (
            <div key={order._id} className="border p-4 mb-4 rounded-lg bg-white shadow-md">
              <div>
                <h3 className="font-semibold mt-4 text-lg">Products</h3>
                {order.items.map((item: any) => (
                  <div key={item.product._id} className="border-t mt-4 pt-4">
                    <p><strong>{item.product.name}</strong></p>
                    {item.product.review ? (
                      <div>
                        <p><strong>Your Review:</strong></p>
                        <div className="flex">{renderStars(item.product.review.rating, item.product._id, false)}</div>
                        <p>{item.product.review.comment}</p>
                      </div>
                    ) : (
                      <div>
                        <h4 className="font-semibold mt-2">Leave a Review</h4>
                        <div className="flex my-2">{renderStars(review[item.product._id]?.rating || 0, item.product._id, true)}</div>
                        <textarea
                          className="w-full border rounded p-2 text-sm"
                          placeholder="Your review..."
                          onChange={(e) => handleReviewChange(item.product._id, review[item.product._id]?.rating || 0, e.target.value)}
                        ></textarea>
                        <button onClick={() => handleReviewSubmit(item.product._id)} className="bg-primary-brand text-white px-4 py-2 rounded mt-2 text-sm">Submit Review</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PastOrdersPage;
