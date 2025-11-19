
"use client";

import React from "react";
import Link from "next/link";
import { FiShoppingCart, FiHeart } from "react-icons/fi";

// TODO: Replace with data from a backend
const newArrivals = [
  {
    id: 1,
    name: "Flowy Maxi Dress",
    category: "Dresses",
    price: "₹3,999",
    imageUrl:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
    ctaLink: "/product/1",
  },
  {
    id: 2,
    name: "Classic Denim Jacket",
    category: "Jackets",
    price: "₹4,499",
    imageUrl:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80",
    ctaLink: "/product/2",
  },
  {
    id: 3,
    name: "Linen Blend Shirt",
    category: "Shirts",
    price: "₹2,799",
    imageUrl:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
    ctaLink: "/product/3",
  },
  {
    id: 4,
    name: "Tailored Chino Trousers",
    category: "Trousers",
    price: "₹3,299",
    imageUrl:
      "https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=600&q=80",
    ctaLink: "/product/4",
  },
  {
    id: 5,
    name: "Minimalist Leather Sneakers",
    category: "Footwear",
    price: "₹5,999",
    imageUrl:
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80",
    ctaLink: "/product/5",
  },
  {
    id: 6,
    name: "Silk Blend Scarf",
    category: "Accessories",
    price: "₹1,999",
    imageUrl:
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&w=600&q=80",
    ctaLink: "/product/6",
  },
  {
    id: 7,
    name: "Wool-Cashmere Blend Sweater",
    category: "Knitwear",
    price: "₹7,999",
    imageUrl:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
    ctaLink: "/product/7",
  },
  {
    id: 8,
    name: "High-Waisted Skinny Jeans",
    category: "Denim",
    price: "₹4,999",
    imageUrl:
      "https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=600&q=80",
    ctaLink: "/product/8",
  },
  {
    id: 9,
    name: "Leather Crossbody Bag",
    category: "Bags",
    price: "₹6,499",
    imageUrl:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
    ctaLink: "/product/9",
  },
  {
    id: 10,
    name: "Suede Ankle Boots",
    category: "Footwear",
    price: "₹8,999",
    imageUrl:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
    ctaLink: "/product/10",
  },
];

export default function NewArrivals() {
  return (
    <section className="w-full py-14 bg-[var(--contrast-light-2)]">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--primary-brand)] tracking-tight">
            New Arrivals
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Discover our latest arrivals, designed to make a statement and elevate your wardrobe.
          </p>
        </div>
        <div className="max-w-[90rem] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {newArrivals.map((product, i) => (
            <div
              key={product.id}
              className="group relative bg-[var(--background-light)] rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              <Link href={product.ctaLink}>
                <div className="relative w-full h-72 overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full cursor-pointer hover:bg-[var(--secondary-accent)] hover:text-white transition-colors">
                      <FiHeart size={20} />
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-[var(--text-tertiary)] mb-1">{product.category}</p>
                  <h3 className="text-lg font-bold text-[var(--primary-brand)] truncate">{product.name}</h3>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-xl font-extrabold text-[var(--primary-brand)]">{product.price}</p>
                    <div className="bg-[var(--buttons-highlight)] text-white p-3 rounded-full hover:bg-opacity-90 transition-all transform group-hover:scale-110 shadow-lg">
                      <FiShoppingCart size={20} />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
