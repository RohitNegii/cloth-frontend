
import React from 'react';
import Layout from '@/component/layout/Layout';
import { FiSend, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const ContactPage = () => {
  return (
    <Layout>
      <div className="min-h-screen grid md:grid-cols-2">

        {/* Left Side: Contact Info & Map */}
        <div className="bg-[var(--contrast-dark)] text-white p-8 md:p-16 flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tight">Get in Touch</h2>
            <p className="text-lg text-gray-300 mb-12 max-w-lg">
                We&apos;re here to help and answer any question you might have. We look forward to hearing from you.
            </p>
            
            <div className="space-y-6 mb-12">
                <p className="flex items-center gap-4 text-xl">
                    <FiMail size={24} className="text-[var(--secondary-accent)]" /> 
                    <span>contact@fashionstore.com</span>
                </p>
                <p className="flex items-center gap-4 text-xl">
                    <FiPhone size={24} className="text-[var(--secondary-accent)]" /> 
                    <span>(123) 456-7890</span>
                </p>
                <p className="flex items-center gap-4 text-xl">
                    <FiMapPin size={24} className="text-[var(--secondary-accent)]" /> 
                    <span>123 Fashion Ave, Style City, 90210</span>
                </p>
            </div>

            <div className="h-64 md:h-80 w-full rounded-lg overflow-hidden shadow-2xl">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.666943336449!2d-118.40139888478235!3d34.05399528060608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d6a1b8a5%3A0x9d5ad551b9d428c5!2sRodeo%20Dr%2C%20Beverly%20Hills%2C%20CA%2090210!5e0!3m2!1sen!2sus!4v1626966147426!5m2!1sen!2sus"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen
                    loading="lazy"
                    title="Google Maps Location"
                    className="filter grayscale-[1] contrast-[1.2] opacity-[0.8]"
                ></iframe>
            </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="bg-[var(--background-light)] p-8 md:p-16 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-[var(--primary-brand)] mb-8">Send us a Message</h2>
            <form>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-lg font-semibold text-[var(--text-secondary)] mb-2">Full Name</label>
                  <input type="text" id="name" name="name" className="w-full px-5 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-brand)] focus:border-[var(--primary-brand)] transition" placeholder="John Doe" />
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-lg font-semibold text-[var(--text-secondary)] mb-2">Email Address</label>
                  <input type="email" id="email" name="email" className="w-full px-5 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-brand)] focus:border-[var(--primary-brand)] transition" placeholder="you@example.com" />
                </div>
                <div className="mb-8">
                  <label htmlFor="message" className="block text-lg font-semibold text-[var(--text-secondary)] mb-2">Message</label>
                  <textarea id="message" name="message" rows={6} className="w-full px-5 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-brand)] focus:border-[var(--primary-brand)] transition" placeholder="Your message..."></textarea>
                </div>
                <button type="submit" className="w-full bg-[var(--buttons-highlight)] text-white font-bold text-lg py-4 rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3">
                  <FiSend /> Send Message
                </button>
            </form>
        </div>

      </div>
    </Layout>
  );
};

export default ContactPage;
