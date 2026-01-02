'use client';

import { motion } from 'framer-motion';
import { hoverScale, tapScale } from '@/lib/animations';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  external?: boolean;
}

const variantStyles = {
  primary: 'bg-white text-black hover:bg-neutral-200',
  secondary: 'bg-neutral-900 text-white hover:bg-neutral-800',
  outline: 'bg-transparent border border-white/20 text-white hover:border-white/40',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  external = false,
}: ButtonProps) {
  const baseStyles = `inline-flex items-center justify-center font-medium tracking-wider uppercase transition-colors duration-300 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={baseStyles}
        whileHover={hoverScale}
        whileTap={tapScale}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={baseStyles}
      whileHover={hoverScale}
      whileTap={tapScale}
    >
      {children}
    </motion.button>
  );
}
