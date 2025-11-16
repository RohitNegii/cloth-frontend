
'use client'

import React from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

const collectionsData = [
  {
    id: 1,
    name: "Winter '24 Collection",
    description: "Embrace the cold with our latest collection of winter essentials. Featuring luxurious textures, warm fabrics, and contemporary silhouettes designed to keep you stylishly cozy.",
    imageUrl: "https://images.unsplash.com/photo-1543163521-b3491374b998?auto=format&fit=crop&w=1200&q=80",
    ctaLink: "/collections/winter-24",
    status: 'active'
  },
  {
    id: 2,
    name: "Urban Explorer",
    imageUrl: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80",
    status: 'soon'
  },
  {
    id: 3,
    name: "Summer Breeze",
    imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80",
    status: 'soon'
  },
  {
    id: 4,
    name: "Minimalist",
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
    status: 'soon'
  },
];

const activeCollection = collectionsData.find(c => c.status === 'active');
const comingSoonCollections = collectionsData.filter(c => c.status === 'soon');

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export default function FeaturedCollections() {
  if (!activeCollection) return null;

  return (
    <section className="py-24 bg-[var(--background-light)]">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--primary-brand)] tracking-tight">
            Featured Collections
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
            Explore our curated collections, designed to elevate your style for every season.
          </p>
        </motion.div>

        {/* Active Collection Feature */}
        <div className="relative w-full h-[60vh] rounded-2xl overflow-hidden shadow-2xl group mb-20">
            <img
                src={activeCollection.imageUrl}
                alt={activeCollection.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--contrast-dark)] via-[var(--contrast-dark)]/60 to-transparent opacity-90" />
            <motion.div 
                className="relative h-full flex flex-col justify-center items-start p-8 md:p-24 text-white w-full md:w-2/3 lg:w-1/2"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            >
                <h3 className="text-4xl lg:text-5xl font-bold tracking-tight text-shadow-md">{activeCollection.name}</h3>
                <p className="mt-4 text-lg text-gray-200 max-w-lg text-shadow-sm">{activeCollection.description}</p>
                <Link href={activeCollection.ctaLink!} className="mt-8 bg-[var(--buttons-highlight)] text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-xl">
                    Shop Now
                </Link>
            </motion.div>
        </div>

        {/* Coming Soon Collections */}
        <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-[var(--primary-brand)]">Coming Soon</h3>
            <p className="mt-2 text-md text-[var(--text-secondary)]">Get a sneak peek at what's next.</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {comingSoonCollections.map((collection, i) => (
            <motion.div
              key={collection.id}
              className="group relative overflow-hidden rounded-lg shadow-lg aspect-w-4 aspect-h-3"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <img
                src={collection.imageUrl}
                alt={collection.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60" />
              <div className="relative h-full flex flex-col justify-center items-center p-6 text-white text-center">
                <h3 className="text-2xl font-bold">{collection.name}</h3>
                <span className="mt-4 inline-block bg-[var(--secondary-accent)] text-[var(--contrast-dark)] px-4 py-1 rounded-full font-semibold">
                    Coming Soon
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
