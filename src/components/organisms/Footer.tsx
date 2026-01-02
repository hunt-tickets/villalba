'use client';

import { motion } from 'framer-motion';
import { Container, Typography } from '@/components/atoms';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export function Footer() {
  return (
    <footer id="contact" className="py-16 md:py-24 lg:py-32 border-t border-white/10">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16"
        >
          <motion.div variants={fadeInUp}>
            <Typography
              as="h2"
              variant="title"
              className="text-white mb-4 md:mb-6 !text-3xl md:!text-4xl lg:!text-5xl"
              animate={false}
            >
              TRABAJEMOS
              <br />
              JUNTOS
            </Typography>
            <p className="text-white/60 text-sm leading-relaxed max-w-md">
              Me apasiona crear historias visuales que conectan e inspiran.
              Ya sea un proyecto de cine, video o fotografía, me encantaría
              conocer tu visión.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col justify-between"
          >
            <div className="space-y-4">
              <a
                href="mailto:hello@antoniavillalba.com"
                className="block text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white hover:text-white/80 transition-colors break-all sm:break-normal"
              >
                hello@antoniavillalba.com
              </a>
              <div className="flex flex-wrap gap-4 md:gap-6">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] md:text-xs tracking-[0.15em] text-white/60 hover:text-white transition-colors"
                >
                  INSTAGRAM
                </a>
                <a
                  href="https://vimeo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] md:text-xs tracking-[0.15em] text-white/60 hover:text-white transition-colors"
                >
                  VIMEO
                </a>
                <a
                  href="https://behance.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] md:text-xs tracking-[0.15em] text-white/60 hover:text-white transition-colors"
                >
                  BEHANCE
                </a>
              </div>
            </div>

            <div className="mt-10 md:mt-16 pt-6 md:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <span className="text-[10px] md:text-xs tracking-[0.15em] text-white/40">
                ANTO&apos;S FILMS
              </span>
              <span className="text-[10px] md:text-xs tracking-[0.15em] text-white/40">
                &copy; {new Date().getFullYear()} TODOS LOS DERECHOS RESERVADOS
              </span>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </footer>
  );
}
