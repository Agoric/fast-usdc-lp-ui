import { HTMLProps } from 'react';

interface ShimmerProps extends HTMLProps<HTMLDivElement> {
  width?: string;
  height?: string;
}

const Shimmer = ({
  width = '100%',
  height = '24px',
  className = '',
  ...props
}: ShimmerProps) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
      style={{ width, height }}
      {...props}
    />
  );
};

export default Shimmer;
