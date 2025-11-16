
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import Layout from "@/component/layout/Layout";

const product = {
  name: "Flowy Maxi Dress",
  price: "₹3,999",
  rating: 4.5,
  reviews: 120,
  description:
    "Effortlessly elegant, this flowy maxi dress is perfect for any occasion. Made from a lightweight, breathable fabric, it features a flattering V-neck and a cinched waist to create a beautiful silhouette.",
  features: [
    "Lightweight & breathable fabric",
    "Flattering V-neck design",
    "Cinched waist for a defined silhouette",
    "Available in multiple colors",
  ],
  images: [
    "https://images.unsplash.com/photo-1594618765798-e7392a81e390?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1594618765798-e7392a81e390?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1594618765798-e7392a81e390?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1594618765798-e7392a81e390?auto=format&fit=crop&w=800&q=80",
  ],
};

const relatedProducts = [
  {
    id: 1,
    name: "Classic Denim Jacket",
    price: "₹4,499",
    imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Linen Blend Shirt",
    price: "₹2,799",
    imageUrl: "https://images.unsplash.com/photo-1621072156002-e2f31c197e41?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Tailored Chino Trousers",
    price: "₹3,299",
    imageUrl: "https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    name: "Minimalist Leather Sneakers",
    price: "₹5,999",
    imageUrl: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=400&q=80",
  },
];

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Image gallery */}
            <div className="flex flex-col-reverse sm:flex-row gap-4">
              <div className="flex sm:flex-col gap-4 w-full sm:w-24 overflow-x-auto sm:overflow-y-auto pr-2">
                {product.images.map((image, index) => (
                  <motion.div
                    key={index}
                    className={`cursor-pointer rounded-lg overflow-hidden border-2 ${selectedImage === image ? "border-gray-900" : "border-transparent"}`}
                    onClick={() => setSelectedImage(image)}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-auto object-cover" />
                  </motion.div>
                ))}
              </div>
              <div className="w-full h-[25rem] sm:h-auto sm:flex-1 relative overflow-hidden rounded-xl shadow-lg">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={selectedImage}
                    alt={product.name}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>
            </div>

            {/* Product info */}
            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">{product.name}</h1>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < Math.round(product.rating) ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-gray-600">({product.reviews} reviews)</span>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <p className="text-3xl font-bold text-gray-900">{product.price}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                <h3 className="text-lg font-semibold text-gray-900">Features:</h3>
                <ul className="mt-2 list-disc list-inside text-gray-600 space-y-1">
                  {product.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                <button className="w-full bg-gray-900 text-white py-4 px-6 rounded-full font-semibold text-lg transition-transform transform hover:scale-105 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-900/50">
                  Add to Cart
                </button>
              </motion.div>
            </div>
          </div>

          {/* You might also like */}
          <div className="mt-24">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight text-center mb-12">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((related) => (
                <motion.div 
                  key={related.id}
                  className="group relative"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-full bg-gray-100 rounded-xl overflow-hidden">
                    <img src={related.imageUrl} alt={related.name} className="w-full h-64 object-cover group-hover:opacity-90 transition-opacity" />
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-900">{related.name}</h3>
                    <p className="mt-1 text-md font-medium text-gray-600">{related.price}</p>
                  </div>
                  <a href="#" className="absolute inset-0 z-10" aria-label={`View ${related.name}`}></a>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
