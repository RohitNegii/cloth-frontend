import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col bg-[var(--background-light)] text-[var(--text-primary)]]">
      <Header />
      <main className="flex-1 max-w-full mx-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
