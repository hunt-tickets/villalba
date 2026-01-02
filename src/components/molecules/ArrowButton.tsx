'use client';

import { motion } from 'framer-motion';

interface ArrowButtonProps {
  direction: 'left' | 'right';
  onClick?: () => void;
  disabled?: boolean;
}

export function ArrowButton({ direction, onClick, disabled = false }: ArrowButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`w-10 h-10 rounded-full border border-white/30 flex items-center justify-center transition-colors duration-300 ${
        disabled
          ? 'opacity-30 cursor-not-allowed'
          : 'hover:border-white hover:bg-white/10'
      }`}
      whileHover={disabled ? {} : { scale: 1.1 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className={direction === 'left' ? 'rotate-180' : ''}
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </motion.button>
  );
}
