"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { getProducts } from "@/lib/productApi";
import toast from "react-hot-toast";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data: Product[] = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError(true);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="w-full py-14 bg-[var(--contrast-light-2)]">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--primary-brand)]">
            New Arrivals
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Discover our latest arrivals, designed to elevate your wardrobe.
          </p>
        </div>

        {/* Grid */}
        <div className="max-w-[90rem] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* 🔄 Skeleton */}
          {loading &&
            Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}

          {/* ❌ Error */}
          {!loading && error && (
            <p className="col-span-full text-center text-red-500 font-semibold">
              Something went wrong. Please try again later.
            </p>
          )}

          {/* ✅ Products */}
          {!loading &&
            !error &&
            products.map((product) => (
              <div
                key={product._id}
                className="group relative bg-[var(--background-light)] rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              >
                <Link href={`/product/${product._id}`}>
                  <div className="relative w-full h-72 overflow-hidden">
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-5">
                    <p className="text-sm text-[var(--text-tertiary)] mb-1">
                      {product.category ?? "Fashion"}
                    </p>

                    <h3 className="text-lg font-bold text-[var(--primary-brand)] truncate">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between mt-4">
                      <p className="text-xl font-extrabold text-[var(--primary-brand)]">
                        ₹{product.price}
                      </p>
                      <div className="bg-[var(--buttons-highlight)] text-white p-3 rounded-full transition-transform group-hover:scale-110 shadow-lg">
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

/* ================= Skeleton Card ================= */
function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="h-72 bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="h-5 w-full bg-gray-300 rounded" />
        <div className="flex justify-between items-center mt-4">
          <div className="h-6 w-20 bg-gray-300 rounded" />
          <div className="h-10 w-10 bg-gray-300 rounded-full" />
        </div>
      </div>
    </div>
  );
}
