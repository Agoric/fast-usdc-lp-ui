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
      className={`relative overflow-hidden bg-slate-200 rounded ${className}`}
      style={{
        width,
        height,
        ...props.style,
      }}
      {...props}
    >
      <div className="absolute inset-0 shimmer-wave" />
    </div>
  );
};

export default Shimmer;
