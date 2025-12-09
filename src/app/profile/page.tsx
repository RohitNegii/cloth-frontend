'use client';

import React, { useState, useEffect } from 'react';
import { getMyOrders } from '@/lib/orderApi';
import { addReview } from '@/lib/productApi';
import useUserStore from '@/store/userStore';
import { FaStar } from 'react-icons/fa';
import Layout from '@/component/layout/Layout';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState<{ [key: string]: { rating: number; comment: string } }>({});
  const { user } = useUserStore();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await getMyOrders();
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  const handleReviewSubmit = async (productId: string) => {
    const { rating, comment } = review[productId];
    try {
      await addReview(productId, rating, comment);
      // Re-fetch orders to show review has been submitted
      const response = await getMyOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleReviewChange = (productId: string, rating: number, comment: string) => {
    setReview(prev => ({ ...prev, [productId]: { rating, comment } }));
  };

  const currentOrders = orders.filter(order => order.status !== 'DELIVERED');
  const pastOrders = orders.filter(order => order.status === 'DELIVERED');

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
    <Layout>
      <div className="max-w-4xl mx-auto py-12">
        <div className="flex border-b mb-8">
          <button onClick={() => setActiveTab('current')} className={`py-2 px-4 ${activeTab === 'current' ? 'border-b-2 border-primary-brand' : ''}`}>Current Orders</button>
          <button onClick={() => setActiveTab('past')} className={`py-2 px-4 ${activeTab === 'past' ? 'border-b-2 border-primary-brand' : ''}`}>Past Orders</button>
          <button onClick={() => setActiveTab('profile')} className={`py-2 px-4 ${activeTab === 'profile' ? 'border-b-2 border-primary-brand' : ''}`}>Profile</button>
        </div>

        {loading && <p>Loading...</p>}

        {activeTab === 'current' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Current Orders</h2>
            {currentOrders.map(order => (
              <div key={order._id} className="border p-4 mb-4 rounded-lg">
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Total:</strong> ${order.totalPrice}</p>
                {/* Add tracking details here */}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'past' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Past Orders</h2>
            {pastOrders.map(order => (
              <div key={order._id} className="border p-4 mb-4 rounded-lg">
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Total:</strong> ${order.totalPrice}</p>
                <div>
                  <h3 className="font-semibold mt-4">Products</h3>
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
                            className="w-full border rounded p-2"
                            placeholder="Your review..."
                            onChange={(e) => handleReviewChange(item.product._id, review[item.product._id]?.rating || 0, e.target.value)}
                          ></textarea>
                          <button onClick={() => handleReviewSubmit(item.product._id)} className="bg-primary-brand text-white px-4 py-2 rounded mt-2">Submit Review</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'profile' && user && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProfilePage;
