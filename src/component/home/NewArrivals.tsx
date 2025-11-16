import React from "react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  ctaLink: string;
}

const winterArrivals: Product[] = [
  {
    id: 1,
    name: "Thermal NanoTech Hoodie",
    price: "₹4,299",
    imageUrl:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    ctaLink: "/products",
  },
  {
    id: 2,
    name: "Insulated CyberWeave Shirt",
    price: "₹2,799",
    imageUrl:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
    ctaLink: "/products",
  },
  {
    id: 3,
    name: "Fleece Lined Luminous Pants",
    price: "₹3,599",
    imageUrl:
      "https://images.unsplash.com/photo-1465101178521-c1a9136a3f86?auto=format&fit=crop&w=400&q=80",
    ctaLink: "/products",
  },
  {
    id: 4,
    name: "Reflective Reflex Jacket",
    price: "₹5,199",
    imageUrl:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=400&q=80",
    ctaLink: "/products",
  },
  {
    id: 1,
    name: "Thermal NanoTech Hoodie",
    price: "₹4,299",
    imageUrl:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    ctaLink: "/products",
  },
  {
    id: 2,
    name: "Insulated CyberWeave Shirt",
    price: "₹2,799",
    imageUrl:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
    ctaLink: "/products",
  },
  {
    id: 3,
    name: "Fleece Lined Luminous Pants",
    price: "₹3,599",
    imageUrl:
      "https://images.unsplash.com/photo-1465101178521-c1a9136a3f86?auto=format&fit=crop&w=400&q=80",
    ctaLink: "/products",
  },
  {
    id: 4,
    name: "Reflective Reflex Jacket",
    price: "₹5,199",
    imageUrl:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=400&q=80",
    ctaLink: "/products",
  },
];

export default function NewArrivals() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-14 bg-[var(--background-light)]">
      <h2 className="text-3xl font-extrabold text-[var(--primary-brand)] mb-10 text-center tracking-wide">
        Winter New Arrivals
      </h2>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
        {winterArrivals.map(({ id, name, price, imageUrl, ctaLink }) => (
          <Link
            key={id}
            href={ctaLink}
            className="group relative flex flex-col rounded-2xl bg-white shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <div className="aspect-[4/3] overflow-hidden rounded-t-2xl bg-gray-100">
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            <div className="p-4 flex flex-col">
              <h3 className="text-[var(--text-primary)] font-medium text-base mb-1">
                {name}
              </h3>
              <p className="text-[var(--buttons-highlight)] font-semibold text-lg mb-3">
                {price}
              </p>
              <button className="bg-[var(--buttons-highlight)] hover:bg-[var(--secondary-accent)] text-white py-2 rounded-full text-sm font-medium transition-colors duration-300">
                Shop Now
              </button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
