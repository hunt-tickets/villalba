'use client';

import { motion } from 'framer-motion';
import { Container, Typography } from '@/components/atoms';
import { ImageStack } from '@/components/molecules';
import { heroImages } from '@/data/projects';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex flex-col items-center text-center"
        >
          <div className="relative mb-8">
            <ImageStack images={heroImages} className="mx-auto" />
          </div>

          <motion.div variants={fadeInUp} className="space-y-2">
            <Typography
              as="h1"
              variant="hero"
              className="text-white"
              animate={false}
            >
              HELLO, I&apos;M
            </Typography>
            <Typography
              as="h1"
              variant="hero"
              className="text-white indent-8 md:indent-16"
              animate={false}
            >
              ANTONIA
            </Typography>
            <Typography
              as="h1"
              variant="hero"
              className="text-white indent-16 md:indent-32"
              animate={false}
            >
              VILLALBA
            </Typography>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="absolute bottom-8 left-0 right-0 flex items-end justify-between text-white/60"
        >
          <span className="text-xs tracking-[0.15em]">ANTONIA VILLALBA</span>
          <span className="text-[10px] tracking-[0.1em] text-center">
            A FILMMAKER & VISUAL ARTIST
            <br />
            BASED IN ARGENTINA
          </span>
          <span className="text-xs tracking-[0.15em]">&copy;2025</span>
        </motion.div>
      </Container>
    </section>
  );
}
