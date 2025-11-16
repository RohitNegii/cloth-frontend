import React from "react";
import Link from "next/link";

interface PromoBanner {
  id: number;
  title: string;
  subtitle?: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  backgroundColor?: string;
  textColor?: string;
}

const promoBanners: PromoBanner[] = [
  {
    id: 1,
    title: "Mega Winter Sale",
    subtitle: "Up to 50% OFF on all jackets",
    imageUrl:
      "https://images.unsplash.com/photo-1600185361521-94b428dfa06a?auto=format&fit=crop&w=800&q=80",
    ctaText: "Shop Jackets",
    ctaLink: "/sales/winter-sale",
    backgroundColor: "bg-[var(--primary-brand)]",
    textColor: "text-[var(--secondary-accent)]",
  },
  {
    id: 2,
    title: "Summer Collection Launch",
    subtitle: "Bright new styles now available",
    imageUrl:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
    ctaText: "Explore Summer",
    ctaLink: "/collections/summer-2025",
    backgroundColor: "bg-[var(--buttons-highlight)]",
    textColor: "text-[var(--text-primary)]",
  },
  {
    id: 3,
    title: "Exclusive Member Offers",
    subtitle: "Sign up & get early discounts",
    imageUrl:
      "https://images.unsplash.com/photo-1536005035076-3a5db3070846?auto=format&fit=crop&w=800&q=80",
    ctaText: "Join Now",
    ctaLink: "/membership",
    backgroundColor: "bg-[var(--secondary-accent)]",
    textColor: "text-[var(--text-primary)]",
  },
];

export default function PromotionalBanners(): JSX.Element {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 bg-[var(--background-light)]">
      <h2 className="text-3xl font-extrabold text-[var(--primary-brand)] mb-8 text-center">
        Promotional Banners
      </h2>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {promoBanners.map(
          ({
            id,
            title,
            subtitle,
            imageUrl,
            ctaText,
            ctaLink,
            backgroundColor,
            textColor,
          }) => (
            <Link
              key={id}
              href={ctaLink}
              className={`${backgroundColor} rounded-3xl overflow-hidden shadow-lg group relative flex flex-col justify-end h-64 cursor-pointer`}
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity group-hover:bg-opacity-25 rounded-3xl" />
              <div className={`relative p-6 ${textColor}`}>
                <h3 className="text-2xl font-bold mb-2">{title}</h3>
                {subtitle && <p className="mb-4">{subtitle}</p>}
                <button
                  className={`unique-btn border-2 border-white bg-transparent ${
                    textColor?.includes("text-[var(--text-primary)]")
                      ? "text-[var(--text-primary)] border-[var(--text-primary)] hover:bg-[var(--secondary-accent)] hover:text-[var(--text-primary)]"
                      : "text-white hover:bg-white hover:text-[var(--primary-brand)]"
                  } transition-colors duration-300 font-semibold px-6 py-2 rounded-full inline-flex items-center`}
                >
                  {ctaText}
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </Link>
          )
        )}
      </div>
    </section>
  );
}
