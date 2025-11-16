import React from "react";
import Link from "next/link";

interface BlogPost {
  id: number;
  title: string;
  summary: string;
  imageUrl: string;
  slug: string;
  publishedDate: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "5 Futuristic Fabrics Changing Fashion",
    summary: "Explore cutting-edge fabrics redefining comfort and style.",
    imageUrl:
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=600&q=80",
    slug: "futuristic-fabrics",
    publishedDate: "Nov 1, 2025",
  },
  {
    id: 2,
    title: "How To Style Your Urban Jacket",
    summary:
      "Tips and tricks to create the perfect outfit around our Urban Jacket.",
    imageUrl:
      "https://images.unsplash.com/photo-1542068829-1115f7259450?auto=format&fit=crop&w=600&q=80",
    slug: "style-urban-jacket",
    publishedDate: "Oct 20, 2025",
  },
  {
    id: 3,
    title: "Sustainability Trends in 2025",
    summary:
      "Our commitment to eco-friendly fashion and what it means for you.",
    imageUrl:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
    slug: "sustainability-trends",
    publishedDate: "Oct 10, 2025",
  },
];

export default function BlogHighlights() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 bg-[var(--background-light)]">
      <h2 className="text-3xl font-extrabold text-[var(--primary-brand)] mb-8 text-center">
        From Our Blog
      </h2>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {blogPosts.map(
          ({ id, title, summary, imageUrl, slug, publishedDate }) => (
            <Link
              href={`/blog/${slug}`}
              key={id}
              className="group block rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white"
            >
              <div className="relative h-48 overflow-hidden rounded-t-3xl">
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <p className="text-[var(--buttons-highlight)] font-semibold text-sm mb-2">
                  {publishedDate}
                </p>
                <h3 className="text-[var(--text-primary)] font-bold text-lg mb-2">
                  {title}
                </h3>
                <p className="text-[var(--text-secondary)] text-base">
                  {summary}
                </p>
              </div>
            </Link>
          )
        )}
      </div>
    </section>
  );
}
