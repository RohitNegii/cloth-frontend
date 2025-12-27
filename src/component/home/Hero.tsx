"use client";

import React from "react";
import Slider, { Settings } from "react-slick";
import Link from "next/link";

interface BannerSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  badge?: "NEW" | "SALE" | "FEATURED";
  price: string;
}

export default function Banner() {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    pauseOnHover: true,
    customPaging: () => (
      <div className="w-3 h-3 bg-[var(--secondary-accent)] rounded-full opacity-50 hover:opacity-100 transition-opacity" />
    ),
    appendDots: (dots: React.ReactNode[]) => (
      <div className="absolute bottom-4 w-full">
        <ul className="flex justify-center gap-2">{dots}</ul>
      </div>
    ),
  };

  const bannerData: BannerSlide[] = [
    {
      id: 1,
      title: "Trendy Urban Jacket",
      subtitle: "Bold and Comfortable",
      description:
        "Elevate your style with our cutting-edge jacket designed for comfort and fashion-forward looks.",
      image:
        "data:image/jpeg;base64,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",
      ctaText: "Shop Now",
      ctaLink: "/categories/jackets",
      badge: "NEW",
      price: "Starting at ₹3,499",
    },
    {
      id: 2,
      title: "Futuristic Casual Shirts",
      subtitle: "Innovative Fabrics",
      description:
        "Experience the perfect blend of style and function with our breathable, tech-fabric shirts.",
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
      ctaText: "Explore",
      ctaLink: "/categories/shirts",
      badge: "SALE",
      price: "Up to 25% OFF",
    },
    {
      id: 3,
      title: "Sleek Performance Trousers",
      subtitle: "Move with Freedom",
      description:
        "Crafted for performance and style, these trousers combine flexibility with modern design.",
      image:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80",
      ctaText: "Discover",
      ctaLink: "/categories/trousers",
      badge: "FEATURED",
      price: "Starting at ₹2,999",
    },
  ];

  const getBadgeClasses = (badge: BannerSlide["badge"]): string => {
    switch (badge) {
      case "NEW":
        return "bg-[var(--buttons-highlight)] text-[var(--text-primary)]";
      case "SALE":
        return "bg-red-600 text-white";
      case "FEATURED":
        return "bg-[var(--secondary-accent)] text-[var(--text-primary)]";
      default:
        return "bg-[var(--secondary-accent)] text-[var(--text-primary)]";
    }
  };

  return (
    <div className="relative bg-[var(--background-light)] overflow-hidden w-full select-none">
      <Slider {...settings} className="banner-slider">
        {bannerData?.length>0&&<>
          {bannerData.map((slide) => (
            <div key={slide.id} className="relative">
              <div className="relative h-[500px] md:h-[600px] bg-gradient-to-r from-[var(--primary-brand)] to-[var(--contrast-dark)]">
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-20"
                  style={{ backgroundImage: `url(${slide.image})` }}
                  aria-hidden="true"
                />
                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
                  <div className="grid md:grid-cols-2 gap-8 items-center w-full">
                    {/* Text Content */}
                    <div className="text-white space-y-6">
                      {slide.badge && (
                        <span
                          className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${getBadgeClasses(
                            slide.badge
                          )}`}
                          aria-label={`${slide.badge} badge`}
                        >
                          {slide.badge}
                        </span>
                      )}
                      <div>
                        <p className="text-[var(--secondary-accent)] text-lg font-medium mb-2">
                          {slide.subtitle}
                        </p>
                        <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
                          {slide.title}
                        </h2>
                        <p className="text-lg text-gray-300 max-w-lg">
                          {slide.description}
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <Link
                          href={slide?.ctaLink || "#"}
                          className="bg-[var(--buttons-highlight)] hover:bg-[var(--buttons-highlight)]/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2 focus:outline-none focus:ring-4 focus:ring-[var(--buttons-highlight)]/60"
                        >
                          {slide.ctaText}
                          <svg
                            className="w-4 h-4"
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
                        </Link>
                        <div className="text-[var(--secondary-accent)]">
                          <p className="text-sm opacity-80">{slide.price}</p>
                        </div>
                      </div>
                    </div>
                    {/* Image Showcase */}
                    <div className="hidden md:block">
                      <div className="relative">
                        <img
                          src={slide?.image}
                          alt={slide.title}
                          className="w-full h-80 object-cover rounded-lg shadow-2xl border-4 border-[var(--secondary-accent)]"
                          loading="lazy"
                        />
                        <div className="absolute -bottom-4 -right-4 bg-[var(--secondary-accent)] text-[var(--text-primary)] px-4 py-2 rounded-lg font-bold shadow-lg whitespace-nowrap">
                          Premium Quality
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>}
      </Slider>

      {/* Custom Slick CSS */}
      <style jsx global>{`
        .banner-slider .slick-prev,
        .banner-slider .slick-next {
          z-index: 20;
          width: 50px;
          height: 50px;
        }
        .banner-slider .slick-prev {
          left: 20px;
        }
        .banner-slider .slick-next {
          right: 20px;
        }
        .banner-slider .slick-prev:before,
        .banner-slider .slick-next:before {
          font-size: 24px;
          color: var(--secondary-accent);
        }
        .banner-slider .slick-dots {
          bottom: 20px;
        }
        .banner-slider .slick-dots li button:before {
          opacity: 0;
        }
        .banner-slider .slick-dots li.slick-active div {
          opacity: 1 !important;
          background-color: var(--buttons-highlight) !important;
        }
      `}</style>
    </div>
  );
}
