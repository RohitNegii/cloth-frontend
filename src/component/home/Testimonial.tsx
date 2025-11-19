
"use client"
import React from "react";
import Slider from "react-slick";
import { FaQuoteLeft } from "react-icons/fa";

// TODO: Replace with data from a backend
const testimonials = [
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
    {
    id: 4,
    name: "Priya Singh",
    role: "Student",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "The customer service is excellent, and the delivery is always on time. I'm a loyal customer!",
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
    autoplaySpeed: 5000,
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
    <section className="py-14 bg-[var(--contrast-light-2)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--primary-brand)] tracking-tight">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            We are proud to have a community of happy customers.
          </p>
          </div>
        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="p-4">
              <div className="bg-white rounded-lg shadow-lg p-8 h-full flex flex-col">
                <FaQuoteLeft className="text-[var(--secondary-accent)] text-3xl mb-4" />
                <p className="text-[var(--text-secondary)] italic mb-6 flex-grow">{testimonial.review}</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-[var(--primary-brand)]">{testimonial.name}</h4>
                    <p className="text-[var(--text-secondary)]">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
