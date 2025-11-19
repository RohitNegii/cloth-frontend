
"use client";

import React, { useState } from "react";
import { FiMail, FiCheckCircle } from "react-icons/fi";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribing with email:", email);
    setIsSubmitted(true);
    setEmail("");
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section className="relative py-14 bg-[var(--background-light)] overflow-hidden">
        <div 
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{backgroundImage: `url('https://images.unsplash.com/photo-1559523161-0d4d06921946?auto=format&fit=crop&w=1500&q=80')`}}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-light)] via-[var(--background-light)]/80 to-[var(--background-light)]"/>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--primary-brand)] tracking-tight">
            Join Our Style Circle
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Be the first to know about new arrivals, exclusive collections, and special offers. Subscribe to our newsletter today.
          </p>
        </div>
        <div className="mt-12 max-w-xl mx-auto">
          {isSubmitted ? (
            <div className="flex items-center justify-center bg-green-100 text-green-800 p-4 rounded-lg shadow-md">
                <FiCheckCircle className="mr-3 text-2xl"/>
                <p className="text-lg font-semibold">Thank you for subscribing! Welcome to the circle.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-grow w-full">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" size={22}/>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-lg border-2 border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--secondary-accent)] focus:border-transparent transition-all duration-300 shadow-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto bg-[var(--buttons-highlight)] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg whitespace-nowrap"
              >
                Subscribe Now
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
