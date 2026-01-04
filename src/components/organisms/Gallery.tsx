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
      const gap = 16;
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
    <section id="gallery" className="py-16 md:py-24 lg:py-32">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div className="flex items-baseline gap-4 md:gap-8">
            <motion.span
              variants={fadeInUp}
              className="text-4xl md:text-6xl lg:text-8xl font-light text-white/20"
            >
              {(currentIndex + 1).toString().padStart(2, '0')}
            </motion.span>
            <Typography
              as="h2"
              variant="title"
              className="text-white !text-2xl md:!text-4xl lg:!text-5xl"
              animate={false}
            >
              GALERÍA
            </Typography>
          </div>
          <motion.div variants={fadeInUp} className="hidden md:flex gap-3">
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
          className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 sm:-mx-6 md:-mx-12 lg:-mx-16 px-4 sm:px-6 md:px-12 lg:px-16"
          style={{
            scrollSnapType: 'x mandatory',
            touchAction: 'pan-x pan-y',
            WebkitOverflowScrolling: 'touch',
          }}
          onScroll={(e) => {
            const container = e.currentTarget;
            const cardWidth = container.children[0]?.clientWidth || 0;
            const gap = 16;
            const newIndex = Math.round(container.scrollLeft / (cardWidth + gap));
            if (newIndex !== currentIndex && newIndex >= 0 && newIndex < projects.length) {
              setCurrentIndex(newIndex);
            }
          }}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="flex-shrink-0 w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px]"
              style={{ scrollSnapAlign: 'start' }}
            >
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>

        {/* Mobile navigation arrows */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="flex md:hidden justify-end gap-3 mt-6"
        >
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
      </Container>
    </section>
  );
}
