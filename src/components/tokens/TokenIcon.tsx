import { memo, useState } from 'react';

interface TokenIconProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

export const TokenIcon = memo<TokenIconProps>(({
  src,
  alt,
  size = 40,
  className = '',
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 rounded ${className}`}
        style={{ width: size, height: size, minWidth: size, minHeight: size }}
      >
        <span className="text-white" style={{ fontSize: size * 0.4 }}>
          {alt.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <div className="relative" style={{ width: size, height: size, minWidth: size, minHeight: size }}>
      {!loaded && (
        <div
          className={`absolute inset-0 bg-gray-800 animate-pulse rounded ${className}`}
        />
      )}
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={`rounded ${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}
        onError={() => setError(true)}
        onLoad={() => setLoaded(true)}
        loading="lazy"
      />
    </div>
  );
});

TokenIcon.displayName = 'TokenIcon';