import React from 'react'

type Props = {
  src?: string
  seed?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const Avatar = ({ src, seed, size = 'md', className = '' }: Props) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  const finalSrc = src || `https://api.dicebear.com/7.x/initials/svg?seed=${seed || 'anon'}`

  return (
    <img
      src={finalSrc}
      alt=""
      className={`${sizeClasses[size]} rounded-none bg-white/5 object-cover ${className}`}
    />
  )
}
