"use client";
import React, { useEffect, useState } from "react";
import { getCart, removeFromCart, updateCartItem } from "@/lib/cartApi";
import useUserStore from "@/store/userStore";
import { useRouter } from 'next/navigation';

// 1. UPDATED INTERFACE
interface CartItem {
  id: number;
  quantity: number;
  color: string;
  size: string;
  product: {
    // Correctly reflect the nested structure
    name: string;
    price: number; // Price is a number
    images: string[];
    // Include other product fields as needed, e.g., _id
    _id: string;
  };
  // The API response also has _id, which you can use as the item's key
  _id: string;
}

interface SlidingCartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SlidingCartModal: React.FC<SlidingCartModalProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  // Using 'any' type temporarily if the full CartItem structure is complex,
  // but using the updated interface is better.
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useUserStore();

  useEffect(() => {
    // ... (fetchCart logic remains the same)
    if (isOpen && token) {
      const fetchCart = async () => {
        try {
          setLoading(true);
          const response = await getCart();
          // Assuming your API returns an array of CartItem objects in response?.data?.items
          // We cast the response data to the new structure
          setCartItems((response?.data?.items as CartItem[]) || []);
        } catch (error) {
          console.error("Error fetching cart:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchCart();
    }
  }, [isOpen, token]);

  const handleRemoveFromCart = async (itemId: string) => {
    // ID should probably be string (_id)
    try {
      // You should use the MongoDB item ID string for removal
      await removeFromCart(itemId);
      setCartItems(cartItems.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    // ID should probably be string (_id)
    if (quantity <= 0) {
      handleRemoveFromCart(itemId);
      return;
    }
    try {
      // You should use the MongoDB item ID string for update
      await updateCartItem(itemId, quantity);
      setCartItems(
        cartItems.map((item) =>
          item._id === itemId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  // 2. UPDATED SUBTOTAL CALCULATION
  const subtotal = cartItems.reduce((sum, item) => {
    // Access price from the nested product object. Use 0 as a fallback.
    const priceValue = item.product?.price || 0;
    return sum + priceValue * item.quantity;
  }, 0);

  return (
    <div>
      {/* Overlay and Panel remains the same */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-30 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
      />
      <aside
        className={`fixed top-0 right-0 z-40 h-full w-96 max-w-full shadow-2xl border-l rounded-l-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: "var(--background-light)",
          borderColor: "var(--secondary-accent)",
        }}
      >
        <header
          className="p-5 flex justify-between items-center"
          style={{ borderBottom: "1px solid var(--secondary-accent)" }}
        >
          <h2
            className="text-xl font-bold tracking-wide"
            style={{ color: "var(--primary-brand)" }}
          >
            Your Cart
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full transition"
            style={{ color: "var(--contrast-dark)" }}
          >
            <span className="text-2xl">×</span>
          </button>
        </header>

        {/* Cart items */}
        <div className="flex-grow overflow-y-auto p-5 space-y-4">
          {loading ? (
            <p>Loading...</p>
          ) : cartItems.length === 0 ? (
            <p
              className="text-center mt-12"
              style={{ color: "var(--text-secondary)" }}
            >
              No item in cart
            </p>
          ) : (
            <ul className="space-y-4">
              {cartItems.map((item) => {
                // Destructure directly from 'item' and 'item.product'
                const { _id, quantity, color, size } = item;
                const { name, price, images } = item.product;
                const image = images?.[0] || ""; // Use the first image

                // Calculate the final price for this item
                const itemFinalPrice = (price || 0) * quantity;

                return (
                  <li
                    key={_id} // Use the item's _id as the key
                    className="flex gap-4 p-4 rounded-xl border shadow hover:shadow-md transition"
                    style={{
                      background: "#fff",
                      borderColor: "var(--secondary-accent)",
                    }}
                  >
                    <img
                      src={image}
                      alt={name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex flex-col flex-grow justify-center">
                      <span
                        className="font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {name} ({color}, {size})
                      </span>
                      <span
                        className="text-sm"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        ₹{price.toLocaleString()} × {quantity}
                      </span>
                      {/* Quantity controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(_id, quantity - 1)
                          }
                          className="w-7 h-7 border rounded-md flex items-center justify-center transition"
                          style={{
                            borderColor: "var(--secondary-accent)",
                            color: "var(--primary-brand)",
                          }}
                        >
                          -
                        </button>
                        <span className="font-medium">{quantity}</span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(_id, quantity + 1)
                          }
                          className="w-7 h-7 border rounded-md flex items-center justify-center transition"
                          style={{
                            borderColor: "var(--secondary-accent)",
                            color: "var(--primary-brand)",
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    {/* 2. UPDATED INDIVIDUAL ITEM PRICE DISPLAY */}
                    <span
                      className="font-semibold my-auto"
                      style={{ color: "var(--text-primary)" }}
                    >
                      ₹{itemFinalPrice.toLocaleString()}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Checkout button */}
        {cartItems.length > 0 && (
          <div
            className="sticky bottom-0 left-0 right-0 px-5 py-4 border-t"
            style={{
              background: "#fff",
              borderColor: "var(--secondary-accent)",
            }}
          >
            <div className="flex justify-between items-center mb-3 font-semibold text-lg">
              <span>Subtotal:</span>
              <span style={{ color: "var(--primary-brand)" }}>
                ₹{subtotal.toLocaleString()}
              </span>
            </div>
            <button
              className="w-full rounded-full py-3 px-3 font-semibold text-sm transition-all duration-300 shadow-lg"
              style={{
                background: "var(--primary-brand)",
                color: "#fff",
              }}
              onClick={() => { router.push('/checkout'); onClose(); }}
            >
              Proceed to Checkout →
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};

export default SlidingCartModal;
