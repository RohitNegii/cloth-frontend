"use client";
import Layout from "@/component/layout/Layout";
import React, { useState } from "react";

const product = {
  name: "NanoTech Winter Jacket",
  price: "₹8,999",
  description:
    "Stay warm and look sharp this winter with the NanoTech Jacket, featuring cutting-edge insulation, water resistance, and a comfortable fit.",
  features: [
    "Thermal NanoTech Insulation",
    "Water-resistant & windproof",
    "Comfort stretch fabric",
    "Modern fit & design",
    "Machine washable",
  ],
  images: [
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1465101178521-c1a9136a3f86?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=500&q=80",
  ],
  video: "https://www.w3schools.com/html/mov_bbb.mp4",
};

export default function ProductDetail() {
  const [mainMedia, setMainMedia] = useState({
    type: "image",
    src: product.images[0],
  });

  return (
    <Layout>
      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start bg-[var(--background-light)] rounded-2xl shadow-md">
        {/* LEFT: Main image + thumbnails */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-full max-w-md h-[420px] rounded-2xl overflow-hidden shadow bg-white">
            {mainMedia.type === "image" ? (
              <img
                src={mainMedia.src}
                alt={product.name}
                className="w-full h-full object-contain p-3"
              />
            ) : (
              <video
                src={mainMedia.src}
                controls
                className="w-full h-full object-contain bg-black"
              />
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex space-x-3 overflow-x-auto max-w-md w-full scrollbar-none">
            {product.images.map((url) => (
              <button
                key={url}
                onClick={() => setMainMedia({ type: "image", src: url })}
                className={`w-16 h-20 rounded-lg border transition ${
                  mainMedia.src === url && mainMedia.type === "image"
                    ? "border-[var(--buttons-highlight)] shadow"
                    : "border-gray-200"
                }`}
              >
                <img
                  src={url}
                  className="w-full h-full object-cover rounded-md"
                />
              </button>
            ))}

            {/* Video Thumbnail */}
            <button
              onClick={() =>
                setMainMedia({ type: "video", src: product.video })
              }
              className={`w-16 h-20 flex items-center justify-center rounded-lg border transition
        ${
          mainMedia.type === "video"
            ? "border-[var(--buttons-highlight)] shadow"
            : "border-gray-300"
        }`}
            >
              <svg
                className="w-6 h-6 text-[var(--primary-brand)]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M4.018 14L14.41 9.293a1 1 0 00.005-1.78L4.018 4A1 1 0 003 4.999v9.001a1 1 0 001.018 1z" />
              </svg>
            </button>
          </div>
        </div>

        {/* RIGHT: Product Details */}
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold text-[var(--primary-brand)] leading-tight">
            {product.name}
          </h1>

          <p className="text-2xl font-extrabold bg-gradient-to-r from-[var(--buttons-highlight)] to-[var(--secondary-accent)] bg-clip-text text-transparent">
            {product.price}
          </p>

          <p className="text-[var(--text-primary)] text-base leading-relaxed">
            {product.description}
          </p>

          <ul className="text-[var(--text-secondary)] text-sm space-y-2">
            {product.features.map((feature) => (
              <li key={feature} className="flex gap-2 items-start">
                <svg
                  className="w-4 h-4 text-[var(--buttons-highlight)] mt-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                  viewBox="0 0 24 24"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>

          <button className="w-full rounded-full bg-[var(--buttons-highlight)] hover:bg-[var(--secondary-accent)] text-white font-semibold py-3 text-lg shadow-md transition">
            Add to Cart
          </button>
        </div>
      </section>
    </Layout>
  );
}
