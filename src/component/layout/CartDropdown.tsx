"use client";
import React, { useEffect, useState } from "react";
import {
  getCart,
  removeFromCart,
  updateCartItem,
  getCartCount,
} from "@/lib/cartApi";
import useUserStore from "@/store/userStore";
import useCartStore from "@/store/cartStore"; // Import useCartStore
import { useRouter } from "next/navigation";

interface CartItem {
  id: number;
  quantity: number;
  color: string;
  size: string;
  product: {
    name: string;
    price: number;
    images: string[];
    _id: string;
  };
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
  const { token } = useUserStore();
  const {
    items: cartItems,
    setCart,
    getCartTotal,
    setCartCount,
  } = useCartStore(); // Use cart store
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && token) {
      const fetchCart = async () => {
        try {
          setLoading(true);
          const response: any = await getCart();
          const items =
            response?.data?.items.map((item: any) => ({
              product: item.product._id,
              name: item.product.name,
              quantity: item.quantity,
              price: item.product.price,
              size: item.size,
              color: item.color,
              _id: item._id,
            })) || [];
          setCart(items);
        } catch (error) {
          console.error("Error fetching cart:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchCart();
    }
  }, [isOpen, token, setCart]);

  const handleRemoveFromCart = async (itemId: string) => {
    try {
      await removeFromCart(itemId);
      const response: any = await getCart();
      const items =
        response?.data?.items.map((item: any) => ({
          product: item.product._id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          size: item.size,
          color: item.color,
          _id: item._id,
        })) || [];
      setCart(items);
      const countResponse = await getCartCount();
      setCartCount(countResponse.count);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(itemId);
      return;
    }
    try {
      await updateCartItem(itemId, quantity);
      const response: any = await getCart();
      const items =
        response?.data?.items.map((item: any) => ({
          product: item.product._id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          size: item.size,
          color: item.color,
          _id: item._id,
        })) || [];
      setCart(items);
      const countResponse = await getCartCount();
      setCartCount(countResponse.count);
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const subtotal = getCartTotal();

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
              {cartItems.map((item) => (
                <li
                  key={item.product}
                  className="flex gap-4 p-4 rounded-xl border shadow hover:shadow-md transition"
                  style={{
                    background: "#fff",
                    borderColor: "var(--secondary-accent)",
                  }}
                >
                  {/* <img
                      src={image}
                      alt={name}
                      className="w-16 h-16 object-cover rounded-lg"
                    /> */}
                  <div className="flex flex-col flex-grow justify-center">
                    <span
                      className="font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {item.name} ({item.color}, {item.size})
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      ₹{item.price.toLocaleString()} × {item.quantity}
                    </span>
                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item._id, item.quantity - 1)
                        }
                        className="w-7 h-7 border rounded-md flex items-center justify-center transition"
                        style={{
                          borderColor: "var(--secondary-accent)",
                          color: "var(--primary-brand)",
                        }}
                      >
                        -
                      </button>
                      <span className="font-medium">{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item.product, item.quantity + 1)
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
                  <span
                    className="font-semibold my-auto"
                    style={{ color: "var(--text-primary)" }}
                  >
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </span>
                </li>
              ))}
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
              onClick={() => {
                router.push("/checkout");
                onClose();
              }}
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
