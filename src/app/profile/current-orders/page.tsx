'use client';

import React, { useState, useEffect } from 'react';
import { getMyOrders } from '@/lib/orderApi';
import OrderHistory from '@/component/profile/OrderHistory';

const CurrentOrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await getMyOrders();
        const currentOrders = response.data.filter((order: any) => order.status !== 'DELIVERED');
        setOrders(currentOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      {loading ? <p>Loading...</p> : <OrderHistory orders={orders} title="Current Orders" />}
    </div>
  );
};

export default CurrentOrdersPage;
