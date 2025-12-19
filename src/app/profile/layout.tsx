"use client";

import React from "react";
import Layout from "@/component/layout/Layout";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { User, Package, History, LogOut } from "lucide-react";
import { motion } from "framer-motion";

const menu = [
  // { name: "Profile", href: "/profile", icon: User },
  { name: "Current Orders", href: "/profile/current-orders", icon: Package },
  { name: "Past Orders", href: "/profile/past-orders", icon: History },
];

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Layout>
      {/* Full height below header */}
      <div className="h-[calc(100vh-64px)] w-full bg-[var(--background-light)] ">
        <div className="h-full w-[80vw] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid h-full grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
            {/* Sidebar (fixed height, no scroll) */}
            <aside className="hidden lg:flex flex-col bg-white rounded-2xl shadow-sm p-4">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                  My Account
                </h2>
                <p className="text-sm text-[var(--text-secondary)]">
                  Manage your details & orders
                </p>
              </div>

              <nav className="space-y-2 flex-1">
                {menu.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                        ${
                          isActive
                            ? "bg-[var(--primary-brand)] text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                    >
                      <Icon size={18} />
                      {item.name}

                      {isActive && (
                        <motion.span
                          layoutId="activeSidebar"
                          className="absolute inset-0 rounded-xl bg-[var(--primary-brand)] -z-10"
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>

              <button className="mt-6 flex items-center gap-2 text-sm text-red-500 hover:text-red-600">
                <LogOut size={16} />
                Logout
              </button>
            </aside>

            {/* RIGHT CONTENT – ONLY THIS SCROLLS */}
            <main className="h-full overflow-y-auto bg-white rounded-2xl shadow-sm p-4 sm:p-6 lg:p-8">
              {children}
            </main>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-sm">
          <div className="flex justify-around">
            {menu.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center justify-center py-3 text-xs font-medium transition-colors
                    ${
                      isActive ? "text-[var(--primary-brand)]" : "text-gray-500"
                    }
                  `}
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
