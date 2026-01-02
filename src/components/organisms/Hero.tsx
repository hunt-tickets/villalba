'use client';

import { motion } from 'framer-motion';
import { Container, Typography } from '@/components/atoms';
import { ImageStack } from '@/components/molecules';
import { heroImages } from '@/data/projects';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0">
      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex flex-col items-center text-center"
        >
          <div className="relative mb-6 md:mb-8">
            <ImageStack images={heroImages} className="mx-auto" />
          </div>

          <motion.div variants={fadeInUp}>
            <Typography
              as="h1"
              variant="hero"
              className="text-white"
              animate={false}
            >
              Mi Portafolio
            </Typography>
          </motion.div>
        </motion.div>

        {/* Footer info - hidden on very small screens, stacked on mobile */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="absolute bottom-4 md:bottom-8 left-0 right-0 flex flex-col md:flex-row items-center md:items-end justify-between gap-4 md:gap-0 text-white/60"
        >
          <span className="hidden md:block text-xs tracking-[0.15em]">ANTONIA VILLALBA</span>
          <span className="text-[9px] md:text-[10px] tracking-[0.1em] text-center">
            A FILMMAKER & VISUAL ARTIST
            <br />
            BASED IN ARGENTINA
          </span>
          <span className="hidden md:block text-xs tracking-[0.15em]">&copy;2025</span>
        </motion.div>
      </Container>
    </section>
  );
}
