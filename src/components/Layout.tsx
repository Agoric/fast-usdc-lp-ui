import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50/80 to-white pt-3 pb-6 px-6 md:px-9 md:pb-9 max-w-[100rem] mx-auto">
      <div className="max-w-4xl mx-auto">{children}</div>
    </div>
  );
};

export default Layout;
