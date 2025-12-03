"use client";
import React, { useState } from "react";
import { HiOutlineShoppingCart, HiOutlineMenu, HiOutlineX, HiOutlineUserCircle } from "react-icons/hi";
import SlidingCartModal from "./CartDropdown";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import AuthModal from "./AuthModal";
import useUserStore from "@/store/userStore";
import useCartStore from "@/store/cartStore";
import useAuthModalStore from "@/store/authModalStore";

const Header: React.FC = () => {
  const { isCartOpen, openCart, closeCart, items: cartItems } = useCartStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthModalOpen, openAuthModal, closeAuthModal } = useAuthModalStore();
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useUserStore();
  const isLoggedIn = !!user;
  const cartItemCount = cartItems.length;
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const openAuthModalAsLogin = (login: boolean) => {
    setIsLogin(login);
    openAuthModal();
    setMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[var(--background-light)] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)} className="text-[var(--text-primary)] hover:text-[var(--primary-brand)] focus:outline-none">
                {menuOpen ? <HiOutlineX size={28} /> : <HiOutlineMenu size={28} />}
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <img src="https://i.ibb.co/Vt0wS0v/logo-removebg-preview.png" alt="Uncommon Threads Logo" className="h-20 w-auto" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link key={link.href} href={link.href} className={`text-lg font-semibold transition-colors duration-300 ${isActive ? 'text-[var(--primary-brand)] border-b-2 border-[var(--primary-brand)]' : 'text-[var(--text-secondary)] hover:text-[var(--primary-brand)]'}`}>
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Auth Buttons or Cart/Profile */}
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="relative cursor-pointer group" onClick={openCart} aria-label="Open cart">
                  <HiOutlineShoppingCart className="text-[var(--text-primary)] group-hover:text-[var(--primary-brand)] w-8 h-8" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-3 bg-[var(--buttons-highlight)] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-[var(--background-light)]">
                      {cartItemCount}
                    </span>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <button onClick={() => openAuthModalAsLogin(true)} className="px-6 py-2 text-lg font-semibold text-[var(--text-secondary)] hover:text-[var(--primary-brand)] transition-colors duration-300">Login</button>
                  <button onClick={() => openAuthModalAsLogin(false)} className="px-6 py-2 text-lg font-semibold text-white bg-[var(--buttons-highlight)] rounded-lg hover:opacity-90 transition-opacity shadow-md">Sign Up</button>
                </div>
              )}
              <div className="md:hidden flex items-center">
                {isLoggedIn && <HiOutlineUserCircle className="text-[var(--text-primary)] w-8 h-8"/>}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden bg-[var(--background-light)] border-t border-gray-200">
            <nav className="px-4 pt-4 pb-6 space-y-2">
              {navLinks.map((link) => {
                 const isActive = pathname === link.href;
                return(
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-3 rounded-lg text-base font-semibold ${isActive ? 'text-[var(--primary-brand)] bg-gray-200' : 'text-[var(--text-secondary)] hover:text-[var(--primary-brand)] hover:bg-gray-100'}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )})}
               {!isLoggedIn && (
                <div className="border-t border-gray-200 mt-4 pt-4 space-y-3">
                    <button onClick={() => openAuthModalAsLogin(true)} className="block w-full text-left px-4 py-3 rounded-lg text-base font-semibold text-[var(--text-secondary)] hover:bg-gray-100">Login</button>
                    <button onClick={() => openAuthModalAsLogin(false)} className="block w-full text-center px-4 py-3 rounded-lg text-base font-semibold text-white bg-[var(--buttons-highlight)] hover:opacity-90">Sign Up</button>
                </div>
                )}
            </nav>
          </div>
        )}
      </header>

      <SlidingCartModal isOpen={isCartOpen} onClose={closeCart} />
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} isLogin={isLogin} />
    </>
  );
};

export default Header;
