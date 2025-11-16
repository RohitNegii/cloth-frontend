import React from "react";

interface Collection {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  ctaLink?: string; // Optional now!
  upcoming?: boolean; // Added to flag as upcoming
}

const featuredCollections: Collection[] = [
  {
    id: 1,
    name: "Winter 2025 Collection",
    description: "Cozy, layered essentials for the cold season.",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    ctaLink: "/collections/winter-2025",
  },
  {
    id: 2,
    name: "Summer Pastels (Upcoming)",
    description: "Soft, breezy styles launching soon.",
    imageUrl:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    upcoming: true,
  },
  {
    id: 3,
    name: "Futurist Edition (Upcoming)",
    description: "Bold, high-tech fashion coming this fall.",
    imageUrl:
      "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?auto=format&fit=crop&w=600&q=80",
    upcoming: true,
  },
];

export default function FeaturedCollections(): JSX.Element {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 bg-[var(--background-light)]">
      <h2 className="text-4xl font-extrabold text-[var(--primary-brand)] mb-12 text-center tracking-wide">
        Featured Collections
      </h2>
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {/* Left, bigger Winter card */}
        {featuredCollections[0].ctaLink ? (
          <a
            href={featuredCollections[0].ctaLink}
            className="group relative rounded-4xl overflow-hidden shadow-2xl hover:shadow-[0_25px_50px_rgba(43,45,49,0.35)] scale-[1.02] hover:scale-[1.07] transition-transform duration-700 col-span-1 md:col-span-2 row-span-1 md:row-span-2"
            aria-label={`Explore ${featuredCollections[0].name}`}
            style={{
              backgroundImage: `url(${featuredCollections[0].imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-60 group-hover:opacity-50 transition-opacity duration-700 rounded-4xl"></div>
            <div className="relative p-10 flex flex-col h-full justify-end text-white">
              <h3 className="text-5xl font-bold drop-shadow-lg">
                {featuredCollections[0].name}
              </h3>
              <p className="mt-4 max-w-xl text-lg drop-shadow-md">
                {featuredCollections[0].description}
              </p>
              <button className="mt-8 self-start unique-btn bg-[var(--buttons-highlight)] hover:bg-[var(--secondary-accent)] text-white rounded-full px-8 py-3 font-semibold shadow-lg transition-colors duration-400">
                Explore Collection
              </button>
            </div>
          </a>
        ) : null}
        {/* The other two cards: not clickable, show 'Upcoming' banner */}
        {featuredCollections
          .slice(1)
          .map(({ id, name, description, imageUrl, upcoming }) => (
            <div
              key={id}
              className="group relative rounded-3xl overflow-hidden shadow-lg cursor-not-allowed opacity-90 transition-shadow duration-600"
              aria-disabled="true"
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-55 group-hover:opacity-40 transition-opacity duration-600 rounded-3xl"></div>
              <div className="relative p-8 flex flex-col h-full justify-end text-white">
                <div className="absolute top-6 right-6 bg-yellow-400 text-black rounded-full px-4 py-1 text-xs font-bold shadow-lg">
                  Upcoming
                </div>
                <h3 className="text-3xl font-extrabold drop-shadow-lg">
                  {name}
                </h3>
                <p className="mt-3 text-lg drop-shadow-md">{description}</p>
                <button
                  className="mt-6 self-start bg-gray-300 text-gray-500 rounded-full px-6 py-2 font-semibold shadow cursor-not-allowed"
                  disabled
                  style={{ pointerEvents: "none" }}
                >
                  Coming Soon
                </button>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
