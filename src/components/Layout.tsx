import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50/70 via-white to-gray-50/30 pt-4 pb-10 px-6 md:px-10 lg:px-12">
      <div className="max-w-4xl mx-auto relative">{children}</div>
    </div>
  );
};

export default Layout;
