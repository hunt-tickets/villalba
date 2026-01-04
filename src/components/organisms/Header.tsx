'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/atoms';
import { NavLink } from '@/components/molecules';
import { navItems } from '@/data/projects';
import { fadeIn } from '@/lib/animations';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="fixed top-0 left-0 right-0 z-50 py-4 md:py-6 bg-black/80 backdrop-blur-md"
    >
      <Container className="flex items-center justify-between">
        <a
          href="/"
          className="text-[10px] md:text-xs font-medium tracking-[0.15em] text-white hover:text-white/80 transition-colors"
        >
          ANTONIA VILLALBA
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="w-6 h-[1px] bg-white block"
          />
          <motion.span
            animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-[1px] bg-white block"
          />
          <motion.span
            animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="w-6 h-[1px] bg-white block"
          />
        </button>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-black/95 backdrop-blur-sm border-t border-white/10 overflow-hidden"
          >
            <Container className="py-6">
              <nav className="flex flex-col gap-6">
                {navItems.map((item) => (
                  <NavLink
                    key={item.href}
                    {...item}
                    className="text-sm"
                  />
                ))}
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
