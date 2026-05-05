"use client";

import React from "react";

export const MarketImage = ({ src, alt, seed, className }: { src: string; alt: string; seed: string; className?: string }) => {
  const [error, setError] = React.useState(false);
  const fallback = `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&backgroundColor=11161d&fontFamily=Arial&fontWeight=700`;
  
  return (
    <img 
      src={error ? fallback : (src || fallback)} 
      alt={alt}
      onError={() => setError(true)}
      className={className || "w-9 h-9 rounded-none bg-gray-800 object-cover"} 
      referrerPolicy="no-referrer"
    />
  );
};
