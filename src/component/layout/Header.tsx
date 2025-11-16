"use client";
import React, { useState } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";
import SlidingCartModal from "./CartDropdown";

const Header: React.FC = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const cartItemCount = 3;

  return (
    <>
      <header className="sticky top-0 z-50 bg-[var(--primary-brand)] backdrop-blur-xl shadow-[0_3px_10px_rgb(0,0,0,0.15)]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Brand */}
          <h1 className="text-[var(--secondary-accent)] text-2xl sm:text-3xl font-extrabold tracking-wider select-none transition hover:opacity-90">
            UNCOMMON THREADS
          </h1>

          {/* Cart */}
          <div
            className="relative cursor-pointer p-2 rounded-full hover:bg-white/10 transition"
            onClick={() => setCartOpen(true)}
            aria-label="Open cart"
          >
            <HiOutlineShoppingCart className="text-[var(--secondary-accent)] w-7 h-7" />

            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-600 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs font-semibold shadow-md animate-pulse">
                {cartItemCount}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Cart Sliding Drawer */}
      <SlidingCartModal isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Header;
