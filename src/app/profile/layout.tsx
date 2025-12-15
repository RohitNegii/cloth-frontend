'use client';

import React from 'react';
import Layout from '@/component/layout/Layout';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex border-b mb-8">
          <Link href="/profile" className={`py-2 px-4 text-sm font-medium cursor-pointer ${pathname === '/profile' ? 'border-b-2 border-primary-brand text-primary-brand' : 'text-gray-500 hover:text-gray-700'}`}>
            Profile
          </Link>
          <Link href="/profile/current-orders" className={`py-2 px-4 text-sm font-medium cursor-pointer ${pathname === '/profile/current-orders' ? 'border-b-2 border-primary-brand text-primary-brand' : 'text-gray-500 hover:text-gray-700'}`}>
            Current Orders
          </Link>
          <Link href="/profile/past-orders" className={`py-2 px-4 text-sm font-medium cursor-pointer ${pathname === '/profile/past-orders' ? 'border-b-2 border-primary-brand text-primary-brand' : 'text-gray-500 hover:text-gray-700'}`}>
            Past Orders
          </Link>
        </div>
        {children}
      </div>
    </Layout>
  );
};

export default ProfileLayout;
