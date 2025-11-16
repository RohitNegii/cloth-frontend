
import React from 'react';
import { FiPackage, FiClock, FiTruck } from 'react-icons/fi';

const ShippingFeatures = () => {
  return (
    <div className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          
          <div className="flex items-center justify-center flex-col">
            <FiPackage size={40} className="text-[var(--primary-brand)] mb-4" />
            <h3 className="text-xl font-bold text-[var(--text-primary)]">Easy Returns</h3>
            <p className="text-[var(--text-secondary)]">Free pick up</p>
          </div>

          <div className="flex items-center justify-center flex-col">
            <FiClock size={40} className="text-[var(--primary-brand)] mb-4" />
            <h3 className="text-xl font-bold text-[var(--text-primary)]">Fast Delivery</h3>
            <p className="text-[var(--text-secondary)]">4000+ styles</p>
          </div>

          <div className="flex items-center justify-center flex-col">
            <FiTruck size={40} className="text-[var(--primary-brand)] mb-4" />
            <h3 className="text-xl font-bold text-[var(--text-primary)]">Free Shipping</h3>
            <p className="text-[var(--text-secondary)]">For Orders 599+</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ShippingFeatures;
