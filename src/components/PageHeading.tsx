import React from 'react';

interface PageHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const PageHeading: React.FC<PageHeadingProps> = ({
  title,
  subtitle,
  className = '',
}) => {
  return (
    <div className={`text-center mb-9 relative ${className}`}>
      <div className="relative py-4 px-4 mb-3">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2 mb-3">
          {title}
        </h1>
        {subtitle && (
          <p className="text-gray-600 max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      <div className="top-0 left-1/2 transform mx-auto w-16 h-1 bg-agoric-red/70 rounded-full mb-1"></div>
    </div>
  );
};

export default PageHeading;
