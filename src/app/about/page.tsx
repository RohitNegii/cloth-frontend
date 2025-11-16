
import React from 'react';
import Layout from '@/component/layout/Layout';
import { FaUsers, FaBullseye, FaHandshake } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <Layout>
      <div className="bg-[var(--background-light)] text-[var(--text-primary)] py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--primary-brand)] mb-4">
              About Our Company
            </h1>
            <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
              We are a team of fashion enthusiasts dedicated to bringing you the best in style, quality, and customer service.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mb-20">
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[var(--primary-brand)] text-white mx-auto mb-4">
                <FaBullseye size={32} />
              </div>
              <h2 className="text-2xl font-bold text-[var(--primary-brand)] mb-2">Our Mission</h2>
              <p className="text-[var(--text-secondary)]">
                To provide a curated collection of high-quality, fashionable apparel and accessories that empower our customers to express their individuality and feel confident in their own skin.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[var(--primary-brand)] text-white mx-auto mb-4">
                <FaHandshake size={32} />
              </div>
              <h2 className="text-2xl font-bold text-[var(--primary-brand)] mb-2">Our Values</h2>
              <p className="text-[var(--text-secondary)]">
                We believe in sustainability, ethical sourcing, and building a strong community. We are committed to making a positive impact on the world, one garment at a time.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[var(--primary-brand)] text-white mx-auto mb-4">
                <FaUsers size={32} />
              </div>
              <h2 className="text-2xl font-bold text-[var(--primary-brand)] mb-2">Our Team</h2>
              <p className="text-[var(--text-secondary)]">
                Our team is made up of a diverse group of talented individuals who share a passion for fashion and a commitment to excellence. We work together to bring our vision to life.
              </p>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-[var(--primary-brand)] mb-8">Meet the Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <div className="bg-[var(--background-light)] rounded-lg shadow-lg p-6">
                <img src="https://images.unsplash.com/photo-1594744800828-902d72a08f00?auto=format&fit=crop&w=300&q=80" alt="Team Member" className="w-32 h-32 rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[var(--primary-brand)]">Jessica Chen</h3>
                <p className="text-[var(--text-secondary)]">Founder & CEO</p>
              </div>
              <div className="bg-[var(--background-light)] rounded-lg shadow-lg p-6">
                <img src="https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=300&q=80" alt="Team Member" className="w-32 h-32 rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[var(--primary-brand)]">David Lee</h3>
                <p className="text-[var(--text-secondary)]">Head of Design</p>
              </div>
              <div className="bg-[var(--background-light)] rounded-lg shadow-lg p-6">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80" alt="Team Member" className="w-32 h-32 rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[var(--primary-brand)]">Sarah Kim</h3>
                <p className="text-[var(--text-secondary)]">Marketing Director</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
