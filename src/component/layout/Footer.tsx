import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--primary-brand)] text-[var(--secondary-accent)] py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div>
          <h3 className="text-2xl font-bold mb-4">UNCOMMON THREADS</h3>
          <p className="text-[var(--text-secondary)] max-w-sm leading-relaxed">
            Innovative, bold, and sustainable fashion. Wear the future today.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-semibold mb-4">Shop</h4>
          <ul className="space-y-2 text-[var(--secondary-accent)]">
            <li>
              <Link
                href="/collections"
                className="hover:text-[var(--buttons-highlight)]"
              >
                Collections
              </Link>
            </li>
            <li>
              <Link
                href="/new-arrivals"
                className="hover:text-[var(--buttons-highlight)]"
              >
                New Arrivals
              </Link>
            </li>
            <li>
              <Link
                href="/sale"
                className="hover:text-[var(--buttons-highlight)]"
              >
                Sale
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-[var(--buttons-highlight)]"
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="font-semibold mb-4">Customer Service</h4>
          <ul className="space-y-2 text-[var(--secondary-accent)]">
            <li>
              <Link
                href="/contact"
                className="hover:text-[var(--buttons-highlight)]"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="hover:text-[var(--buttons-highlight)]"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="/shipping"
                className="hover:text-[var(--buttons-highlight)]"
              >
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:text-[var(--buttons-highlight)]"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4 text-[var(--secondary-accent)]">
            <a
              href="https://instagram.com/yourbrand"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-[var(--buttons-highlight)]"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2a1 1 0 110 2 1 1 0 010-2zm-5 3a5 5 0 100 10 5 5 0 000-10zM7 8a5 5 0 115 5 5.007 5.007 0 01-5-5z" />
              </svg>
            </a>
            <a
              href="https://facebook.com/yourbrand"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-[var(--buttons-highlight)]"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path d="M22 12.07C22 6.5 17.52 2 12 2S2 6.5 2 12.07c0 5 3.66 9.13 8.44 9.86v-6.98h-2.54v-2.88h2.54v-2.2c0-2.51 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.25 0-1.64.77-1.64 1.56v1.86h2.8l-.45 2.88h-2.35v6.98C18.35 21.2 22 17.04 22 12.07z" />
              </svg>
            </a>
            <a
              href="https://twitter.com/yourbrand"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-[var(--buttons-highlight)]"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path d="M22.46 6c-.77.35-1.6.59-2.46.69a4.3 4.3 0 001.88-2.37 8.6 8.6 0 01-2.72 1.03 4.28 4.28 0 00-7.3 3.9 12.16 12.16 0 01-8.82-4.47 4.28 4.28 0 001.33 5.7 4.24 4.24 0 01-1.94-.54v.05a4.28 4.28 0 003.44 4.2 4.3 4.3 0 01-1.93.07 4.29 4.29 0 004 2.99 8.6 8.6 0 01-5.33 1.85A8.65 8.65 0 012 18.57a12.14 12.14 0 006.57 1.93c7.88 0 12.2-6.53 12.2-12.2 0-.18 0-.35-.01-.53A8.7 8.7 0 0022.46 6z" />
              </svg>
            </a>
          </div>
          <p className="mt-6 text-sm text-[var(--text-secondary)]">
            &copy; {new Date().getFullYear()} Uncommon Threads. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
