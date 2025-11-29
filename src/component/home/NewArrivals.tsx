
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import { getProducts } from "@/lib/productApi";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string | null;
  images: string[];
  videoUrl: string;
  stock: number;
  sizes: string[];
  colors: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

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
          {products.map((product, i) => (
            <div
              key={product._id}
              className="group relative bg-[var(--background-light)] rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              <Link href={`/product/${product._id}`}>
                <div className="relative w-full h-72 overflow-hidden">
                  <img
                    src={product.images[0]}
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
                    <p className="text-xl font-extrabold text-[var(--primary-brand)]">₹{product.price}</p>
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
