'use client';

import { motion } from 'framer-motion';
import { Container, Typography } from '@/components/atoms';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export function Footer() {
  return (
    <footer id="contact" className="py-24 md:py-32 border-t border-white/10">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-16"
        >
          <motion.div variants={fadeInUp}>
            <Typography
              as="h2"
              variant="title"
              className="text-white mb-6"
              animate={false}
            >
              LET&apos;S WORK
              <br />
              TOGETHER
            </Typography>
            <p className="text-white/60 text-sm leading-relaxed max-w-md">
              I&apos;m passionate about creating visual stories that connect and inspire.
              Whether it&apos;s a film, video, or photography project, I&apos;d love to
              hear about your vision.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col justify-between"
          >
            <div className="space-y-4">
              <a
                href="mailto:hello@antoniavillalba.com"
                className="block text-2xl md:text-3xl font-light text-white hover:text-white/80 transition-colors"
              >
                hello@antoniavillalba.com
              </a>
              <div className="flex gap-6">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-[0.15em] text-white/60 hover:text-white transition-colors"
                >
                  INSTAGRAM
                </a>
                <a
                  href="https://vimeo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-[0.15em] text-white/60 hover:text-white transition-colors"
                >
                  VIMEO
                </a>
                <a
                  href="https://behance.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-[0.15em] text-white/60 hover:text-white transition-colors"
                >
                  BEHANCE
                </a>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs tracking-[0.15em] text-white/40">
                ANTO&apos;S FILMS
              </span>
              <span className="text-xs tracking-[0.15em] text-white/40">
                &copy; {new Date().getFullYear()} ALL RIGHTS RESERVED
              </span>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </footer>
  );
}
