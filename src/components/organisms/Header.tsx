'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/atoms';
import { NavLink } from '@/components/molecules';
import { navItems } from '@/data/projects';
import { fadeIn } from '@/lib/animations';

const menuVariants = {
  closed: {
    y: '-100%',
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1] as const,
      when: 'afterChildren' as const,
    },
  },
  open: {
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1] as const,
      when: 'beforeChildren' as const,
      staggerChildren: 0.1,
    },
  },
};

const linkVariants = {
  closed: {
    opacity: 0,
    y: 20,
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  },
};

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
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
            className="md:hidden flex flex-col gap-1.5 p-2 z-50 relative"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-6 h-[1px] bg-white block"
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-6 h-[1px] bg-white block"
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-6 h-[1px] bg-white block"
            />
          </button>
        </Container>
      </motion.header>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 bg-black md:hidden flex flex-col justify-center items-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navItems.map((item) => (
                <motion.div key={item.href} variants={linkVariants}>
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    onClick={handleLinkClick}
                    className="text-3xl font-light tracking-[0.2em] text-white hover:text-white/60 transition-colors"
                  >
                    {item.label}
                  </a>
                </motion.div>
              ))}
            </nav>

            {/* Footer info in menu */}
            <motion.div
              variants={linkVariants}
              className="absolute bottom-12 text-center"
            >
              <p className="text-[10px] tracking-[0.15em] text-white/40">
                REALIZADORA AUDIOVISUAL
              </p>
              <p className="text-[10px] tracking-[0.15em] text-white/40">
                BASADA EN COLOMBIA
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
