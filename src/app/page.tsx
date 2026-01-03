
import FeaturedCollections from "@/component/home/FeaturedCollections";
import Hero from "@/component/home/Hero";
import NewArrivals from "@/component/home/NewArrivals";
import NewsletterSignup from "@/component/home/NewsletterSignup";
import SocialMediaFeed from "@/component/home/SocialMediaFeed";
import CustomerTestimonials from "@/component/home/Testimonial";
import Layout from "@/component/layout/Layout";
import ShippingFeatures from "@/component/home/ShippingFeatures"; // Corrected import path
import React from "react";


const page = () => {
  return (
    <Layout>
      <main>
        <Hero />
        <FeaturedCollections/>
        <NewArrivals/>
        <CustomerTestimonials/>
        <ShippingFeatures/>
        <NewsletterSignup/>
        <SocialMediaFeed/>
      </main>
    </Layout>
  );
};

export default page;
