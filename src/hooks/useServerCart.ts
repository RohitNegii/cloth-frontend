"use client";
import { useEffect, useState } from "react";
import { getCart } from "@/lib/cartApi";

export interface CartItem {
  _id: string;
  product: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
}

export const useServerCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res: any = await getCart();
        const mapped =
          res?.data?.items.map((item: any) => ({
            _id: item._id,
            product: item.product._id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            size: item.size,
            color: item.color,
          })) || [];
        setItems(mapped);
      } catch (err) {
        console.error("Failed to load cart", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return { items, total, loading };
};
