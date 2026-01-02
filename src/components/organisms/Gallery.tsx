'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Container, Typography } from '@/components/atoms';
import { ProjectCard, ArrowButton } from '@/components/molecules';
import { projects } from '@/data/projects';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.children[0]?.clientWidth || 0;
      const gap = 24;
      scrollRef.current.scrollTo({
        left: index * (cardWidth + gap),
        behavior: 'smooth',
      });
    }
  };

  const handlePrev = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = Math.min(projects.length - 1, currentIndex + 1);
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  return (
    <section id="gallery" className="py-24 md:py-32">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-12 flex items-end justify-between"
        >
          <div className="flex items-baseline gap-8">
            <motion.span
              variants={fadeInUp}
              className="text-6xl md:text-8xl font-light text-white/20"
            >
              {(currentIndex + 1).toString().padStart(2, '0')}
            </motion.span>
            <Typography
              as="h2"
              variant="title"
              className="text-white"
              animate={false}
            >
              GALLERY
            </Typography>
          </div>
          <motion.div variants={fadeInUp} className="flex gap-3">
            <ArrowButton
              direction="left"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            />
            <ArrowButton
              direction="right"
              onClick={handleNext}
              disabled={currentIndex === projects.length - 1}
            />
          </motion.div>
        </motion.div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-6 px-6"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="flex-shrink-0 w-[280px] md:w-[320px]"
              style={{ scrollSnapAlign: 'start' }}
            >
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
