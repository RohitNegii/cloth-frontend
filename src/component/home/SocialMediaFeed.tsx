import React from "react";

const socialImages = [
  "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1465101178521-c1a9136a3f86?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1542068829-1115f7259450?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80",
];

export default function SocialMediaFeed() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 bg-[var(--background-light)] rounded-3xl shadow-xl">
      <h2 className="text-3xl font-extrabold text-[var(--primary-brand)] mb-6 text-center tracking-wide relative inline-block">
        Follow Us on Instagram
        <span className="block w-20 h-1 bg-gradient-to-r from-[var(--buttons-highlight)] to-[var(--secondary-accent)] rounded-full mt-2 mx-auto"></span>
      </h2>

      {/* Responsive horizontal scroll on small, grid on md+ */}
      <div className="flex gap-6 overflow-x-auto scrollbar-hide md:grid md:grid-cols-6 md:gap-6 py-2">
        {socialImages.map((url, idx) => (
          <a
            href="https://instagram.com/yourbrand"
            target="_blank"
            rel="noopener noreferrer"
            key={idx}
            className="relative flex-shrink-0 w-[160px] h-[220px] md:w-auto md:h-auto rounded-2xl border-4 border-transparent bg-gradient-to-tr from-[var(--buttons-highlight)] to-[var(--secondary-accent)] p-1 shadow-lg transform transition duration-500 hover:shadow-2xl hover:scale-105"
          >
            <img
              src={url}
              alt="Social media post"
              className="w-full h-full object-cover rounded-xl"
              loading="lazy"
            />

            {/* Instagram icon overlay with subtle animation */}
            <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-white filter drop-shadow-lg scale-90 hover:scale-110 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 2h9A5.5 5.5 0 0122 7.5v9a5.5 5.5 0 01-5.5 5.5h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
