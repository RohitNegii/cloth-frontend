
"use client"
import React from "react";
import { FaInstagram } from "react-icons/fa";

// TODO: Replace with data from a backend
const socialImages = [
  "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1542068829-1115f7259450?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80",
];

export default function SocialMediaFeed() {
  return (
    <section className="py-14 bg-[var(--background-light)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--primary-brand)] tracking-tight">
            Follow Us on Instagram
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Get a glimpse of our latest collections and behind-the-scenes content.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {socialImages.map((url, idx) => (
            <a
              href="https://instagram.com/yourbrand" // Replace with your Instagram URL
              target="_blank"
              rel="noopener noreferrer"
              key={idx}
              className="group relative block overflow-hidden rounded-lg shadow-lg aspect-square"
            >
              <img
                src={url}
                alt={`Instagram post ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <FaInstagram className="text-white text-5xl transform scale-0 group-hover:scale-100 transition-transform duration-300 ease-out" />
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="https://instagram.com/yourbrand" // Replace with your Instagram URL
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[var(--buttons-highlight)] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            Follow @UncommonThreads
          </a>
        </div>
      </div>
    </section>
  );
}
