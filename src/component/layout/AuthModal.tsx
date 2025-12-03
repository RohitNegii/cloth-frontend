"use client";
import React, { useState } from "react";
import { FiX, FiMail, FiLock, FiUser, FiLogIn, FiPhone } from "react-icons/fi";
import { userApi } from "@/lib/userApi";
import toast from "react-hot-toast";
import useUserStore from "@/store/userStore";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLogin: boolean;
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  isLogin: initialLoginState,
}) => {
  const [isLogin, setIsLogin] = useState(initialLoginState);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    otp: "",
    name: "",
    email: "",
  });
  const { login } = useUserStore();

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(formData.phone)) {
      return toast.error("Please enter a valid 10-digit phone number.");
    }
    setLoading(true);
    try {
      await userApi.sendOtp(formData.phone);
      setOtpSent(true);
      toast.success("OTP sent successfully!");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to send OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.otp.length !== 6) {
      return toast.error("Please enter a valid 6-digit OTP.");
    }
    setLoading(true);
    try {
      const { phone, otp, name, email } = formData;
      const response: any = await userApi.verifyOtp(phone, otp, name, email);
      // NOTE: In a real app, you would store the token and user data in a global state/context.
      console.log("Login successful:", response);
      toast.success("Logged in successfully!");
      login(response.data.user, response.data.token);
      onClose();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Invalid OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const renderOtpForm = () => (
    <form onSubmit={handleVerifyOtp} className="space-y-6">
      <div className="relative">
        <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
        <input
          type="text"
          name="otp"
          placeholder="Enter 6-digit OTP"
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--buttons-highlight)]"
          value={formData.otp}
          onChange={handleChange}
          maxLength={6}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-bold text-white bg-[var(--buttons-highlight)] hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        <FiLogIn className="w-6 h-6 mr-2" />
        {loading ? "Verifying..." : "Verify & Login"}
      </button>
    </form>
  );

  const renderPhoneForm = () => (
    <form onSubmit={handleSendOtp} className="space-y-6">
      {!isLogin && (
        <>
          <div className="relative">
            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
            <input
              type="text"
              name="name"
              placeholder="Username"
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--buttons-highlight)]"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--buttons-highlight)]"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </>
      )}
      <div className="relative">
        <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
        <input
          type="tel"
          name="phone"
          placeholder="10-digit phone number"
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--buttons-highlight)]"
          value={formData.phone}
          onChange={handleChange}
          maxLength={10}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-bold text-white bg-[var(--buttons-highlight)] hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        <FiLogIn className="w-6 h-6 mr-2" />
        {loading ? "Sending OTP..." : "Send OTP"}
      </button>
    </form>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-60 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl h-full md:h-auto mx-auto flex">
        {/* Image Section */}
        <div
          className="hidden md:block w-1/2 bg-cover bg-center rounded-l-2xl"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1576085898323-218337e3e43c?auto=format&fit=crop&w=800&q=80')",
          }}
        ></div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 bg-[var(--background-light)] rounded-2xl md:rounded-l-none md:rounded-r-2xl p-8 md:p-12 shadow-2xl flex flex-col justify-center">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-[var(--text-secondary)] hover:text-[var(--primary-brand)]"
          >
            <FiX size={24} />
          </button>

          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-[var(--primary-brand)]">
              {otpSent
                ? "Enter OTP"
                : isLogin
                ? "Welcome Back"
                : "Create Account"}
            </h2>
            <p className="mt-3 text-[var(--text-secondary)]">
              {otpSent
                ? `We've sent an OTP to ${formData.phone}`
                : isLogin
                ? "Sign in to access your account"
                : "Join the Uncommon Threads family"}
            </p>
          </div>

          {otpSent ? renderOtpForm() : renderPhoneForm()}

          <div className="mt-8 text-center">
            <p className="text-[var(--text-secondary)]">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setOtpSent(false);
                }}
                className="font-semibold text-[var(--buttons-highlight)] hover:underline ml-2"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
