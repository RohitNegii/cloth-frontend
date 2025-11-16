
"use client";
import React, { useState } from 'react';
import { FiX, FiMail, FiLock, FiUser, FiLogIn } from 'react-icons/fi';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLogin: boolean;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, isLogin: initialLoginState }) => {
  const [isLogin, setIsLogin] = useState(initialLoginState);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-60 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl h-full md:h-auto mx-auto flex">
        {/* Image Section */}
        <div className="hidden md:block w-1/2 bg-cover bg-center rounded-l-2xl" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576085898323-218337e3e43c?auto=format&fit=crop&w=800&q=80')" }}>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 bg-[var(--background-light)] rounded-2xl md:rounded-l-none md:rounded-r-2xl p-8 md:p-12 shadow-2xl flex flex-col justify-center">
          <button onClick={onClose} className="absolute top-6 right-6 text-[var(--text-secondary)] hover:text-[var(--primary-brand)]">
            <FiX size={24} />
          </button>

          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-[var(--primary-brand)]">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p className="mt-3 text-[var(--text-secondary)]">{isLogin ? 'Sign in to access your account' : 'Join the Uncommon Threads family'}</p>
          </div>

          {/* Form */}
          <form className="space-y-6">
            {!isLogin && (
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
                <input type="text" placeholder="Username" className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--buttons-highlight)]" />
              </div>
            )}
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
              <input type="email" placeholder="Email Address" className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--buttons-highlight)]" />
            </div>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
              <input type="password" placeholder="Password" className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--buttons-highlight)]" />
            </div>

            {isLogin && (
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                    <input id="remember" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-[var(--buttons-highlight)] focus:ring-[var(--buttons-highlight)]" />
                    <label htmlFor="remember" className="text-[var(--text-secondary)]">Remember me</label>
                    </div>
                    <a href="#" className="font-medium text-[var(--buttons-highlight)] hover:underline">Forgot password?</a>
              </div>
            )}

            <button type="submit" className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-bold text-white bg-[var(--buttons-highlight)] hover:opacity-90 transition-opacity">
              <FiLogIn className="w-6 h-6 mr-2" />
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[var(--text-secondary)]">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button onClick={() => setIsLogin(!isLogin)} className="font-semibold text-[var(--buttons-highlight)] hover:underline ml-2">
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
