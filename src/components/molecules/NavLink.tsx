'use client';

import { motion } from 'framer-motion';
import { NavItem } from '@/types';

interface NavLinkProps extends NavItem {
  className?: string;
}

export function NavLink({ label, href, external = false, className = '' }: NavLinkProps) {
  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`text-xs font-medium tracking-[0.15em] text-white/70 hover:text-white transition-colors duration-300 ${className}`}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {label}
    </motion.a>
  );
}
