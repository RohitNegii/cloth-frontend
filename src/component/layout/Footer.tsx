
import React from "react";
import Link from "next/link";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const socialLinks = [
    { href: "https://instagram.com/uncommon_threads", icon: FaInstagram },
    { href: "https://facebook.com/uncommon_threads", icon: FaFacebookF },
    { href: "https://twitter.com/uncommon_threads", icon: FaTwitter },
  ];

  const footerLinks = {
    Shop: [
      { href: "/collections", label: "Collections" },
      { href: "/new-arrivals", label: "New Arrivals" },
      { href: "/sale", label: "Sale" },
      { href: "/about", label: "About Us" },
    ],
    "Customer Service": [
      { href: "/contact", label: "Contact Us" },
      { href: "/faq", label: "FAQ" },
      { href: "/shipping", label: "Shipping & Returns" },
      { href: "/privacy", label: "Privacy Policy" },
    ],
  };

  return (
    <footer className="bg-[var(--contrast-dark)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand & Socials */}
          <div className="md:col-span-1">
            <div>
              <h3 className="text-2xl font-bold text-[var(--secondary-accent)] mb-4">UNCOMMON THREADS</h3>
              <p className="text-gray-400 mb-6">
                Innovative, bold, and sustainable fashion. Wear the future today.
              </p>
              <div className="flex space-x-5 mt-6">
                {socialLinks.map(({ href, icon: Icon }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--secondary-accent)] transition-colors duration-300">
                    <Icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 grid grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="font-semibold mb-4 tracking-wider uppercase text-gray-300">{title}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-gray-400 hover:text-white transition-colors duration-300">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
             <div>
                <h4 className="font-semibold mb-4 tracking-wider uppercase text-gray-300">Newsletter</h4>
                <p className="text-gray-400 mb-4">Sign up for our newsletter</p>
                 <form>
              <label htmlFor="email-newsletter" className="sr-only">Email for newsletter</label>
              <div className="flex items-center">
                <input
                  type="email"
                  id="email-newsletter"
                  placeholder="Your email"
                  className="bg-black/20 text-white w-full py-3 px-4 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[var(--secondary-accent)]"
                />
                <button type="submit" className="bg-[var(--buttons-highlight)] hover:bg-opacity-90 px-4 py-3 rounded-r-md font-semibold transition-colors duration-300">
                  Subscribe
                </button>
              </div>
            </form>
             </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Uncommon Threads. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
