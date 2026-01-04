'use client';

import { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import Image from 'next/image';
import { imageStackVariants } from '@/lib/animations';

interface ImageStackProps {
  images: string[];
  className?: string;
}

export function ImageStack({ images, className = '' }: ImageStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 50;
    if (info.offset.x < -threshold && currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (info.offset.x > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <>
      {/* Mobile: Swipeable Carousel */}
      <div className={`md:hidden relative w-64 h-80 ${className}`}>
        <AnimatePresence mode="wait" custom={currentIndex}>
          <motion.div
            key={currentIndex}
            custom={currentIndex}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <div className="relative w-full h-full overflow-hidden shadow-2xl">
              <Image
                src={images[currentIndex]}
                alt={`Portfolio image ${currentIndex + 1}`}
                fill
                className="object-cover"
                sizes="256px"
                priority={currentIndex === 0}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dot indicators */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-white w-6'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop: Stacked Images */}
      <div className={`hidden md:block relative w-80 h-96 ${className}`}>
        {images.map((src, index) => (
          <motion.div
            key={src}
            variants={imageStackVariants}
            initial="initial"
            animate="animate"
            custom={index}
            className="absolute inset-0 origin-center"
            style={{
              zIndex: images.length - index,
            }}
          >
            <div className="relative w-full h-full overflow-hidden shadow-2xl">
              <Image
                src={src}
                alt={`Portfolio image ${index + 1}`}
                fill
                className="object-cover"
                sizes="320px"
                priority={index === 0}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
