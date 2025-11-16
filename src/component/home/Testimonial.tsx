"use client"
import React from "react";
import Slider from "react-slick";


interface Testimonial {
  id: number;
  name: string;
  role: string;
  photo: string;
  review: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Aarav Mehta",
    role: "Fashion Blogger",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
    review:
      "Uncommon Threads offers the most innovative clothing styles. The quality and comfort are unmatched!",
  },
  {
    id: 2,
    name: "Tanvi Sharma",
    role: "Lifestyle Influencer",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    review:
      "I love how versatile the designs are. Perfect for both casual and semi-formal wear.",
  },
  {
    id: 3,
    name: "Rohit Joshi",
    role: "Entrepreneur",
    photo: "https://randomuser.me/api/portraits/men/22.jpg",
    review:
      "The attention to detail and futuristic feel make this brand stand out from the rest.",
  },
];

export default function CustomerTestimonials() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 bg-[var(--background-light)]">
      <h2 className="text-3xl font-extrabold text-[var(--primary-brand)] mb-12 text-center tracking-wide">
        What Our Customers Say
      </h2>

      <Slider {...settings} className="overflow-visible">
        {testimonials.map(({ id, name, role, photo, review }) => (
          <div
            key={id}
            className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-400 mx-2"
          >
            {/* Decorative Quote Symbol */}
            <div className="text-[var(--buttons-highlight)] text-5xl select-none opacity-20 mb-3">
              “
            </div>

            {/* Portrait with gradient ring */}
            <div className="mb-3 p-1 rounded-full bg-gradient-to-tr from-[var(--buttons-highlight)] to-[var(--secondary-accent)] w-max mx-auto">
              <img
                src={photo}
                alt={name}
                className="w-14 h-14 rounded-full object-cover border-2 border-[var(--background-light)]"
              />
            </div>

            <p className="text-[var(--text-primary)] italic mb-3 text-sm leading-snug">
              {review}
            </p>

            <h3 className="text-md font-semibold text-[var(--primary-brand)]">
              {name}
            </h3>
            <p className="text-[var(--text-secondary)] text-xs">{role}</p>
          </div>
        ))}
      </Slider>
    </section>
  );
}
