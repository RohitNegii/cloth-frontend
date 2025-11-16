"use client";

import React, { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thanks for subscribing with ${email}!`);
    setEmail("");
  };

  return (
    <section className="w-full bg-gradient-to-r from-[var(--buttons-highlight)] to-[var(--secondary-accent)] py-20 px-6">
      <div className="max-w-7xl mx-auto text-center text-[var(--background-light)]">
        <h2 className="text-5xl font-extrabold mb-6 drop-shadow-lg tracking-wide">
          Stay Ahead with Uncommon Threads
        </h2>
        <p className="text-lg max-w-3xl mx-auto mb-10 drop-shadow-md">
          Subscribe to our newsletter to get the latest fashion trends,
          exclusive offers, and early access to new arrivals.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row justify-center max-w-4xl mx-auto gap-6"
          noValidate
        >
          <input
            type="email"
            placeholder="Enter your email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow rounded-full px-8 py-5 text-[var(--primary-brand)] font-semibold  placeholder:text-[var(--primary-brand)] placeholder:opacity-60 shadow-[0_0_15px_3px_var(--background-light)] focus:outline-none transition-shadow duration-500 text-lg"
          />
          <button
            type="submit"
            className="rounded-full bg-[var(--primary-brand)] hover:bg-[var(--background-light)] hover:text-[var(--primary-brand)] text-[var(--secondary-accent)] font-extrabold px-14 py-5 text-xl shadow-xl transition-colors duration-300 whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
