'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/atoms';
import { NavLink } from '@/components/molecules';
import { navItems } from '@/data/projects';
import { fadeIn } from '@/lib/animations';

export function Header() {
  return (
    <motion.header
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="fixed top-0 left-0 right-0 z-50 py-6"
    >
      <Container className="flex items-center justify-between">
        <a
          href="/"
          className="text-xs font-medium tracking-[0.15em] text-white hover:text-white/80 transition-colors"
        >
          ANTONIA VILLALBA
        </a>
        <nav className="flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>
      </Container>
    </motion.header>
  );
}
