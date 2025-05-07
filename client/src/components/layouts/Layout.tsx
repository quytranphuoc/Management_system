import React from "react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Main content area */}
      <div>{children}</div>

      <Footer />
    </div>
  );
};

export default Layout;
