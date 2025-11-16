import BlogHighlights from "@/component/home/Blog";
import FeaturedCollections from "@/component/home/FeaturedCollections";
import HeroSection from "@/component/home/Heor";
import NewArrivals from "@/component/home/NewArrivals";
import NewsletterSignup from "@/component/home/NewsletterSignup";
import PromotionalBanners from "@/component/home/PromoBanners";
import SocialMediaFeed from "@/component/home/SocialMediaFeed";
import CustomerTestimonials from "@/component/home/Testimonial";
import Layout from "@/component/layout/Layout";
import React from "react";

const page = () => {
  return (
    <Layout>
      <main>
        <HeroSection />
        <FeaturedCollections/>
        <NewArrivals/>
        <CustomerTestimonials/>
        <NewsletterSignup/>
        {/* <BlogHighlights/> */}
        <SocialMediaFeed/>
      </main>
    </Layout>
  );
};

export default page;
