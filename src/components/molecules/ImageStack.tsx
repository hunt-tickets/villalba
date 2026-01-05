'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, PanInfo } from 'framer-motion';
import Image from 'next/image';
import { imageStackVariants } from '@/lib/animations';

interface ImageStackProps {
  images: string[];
  className?: string;
  autoPlayInterval?: number;
}

export function ImageStack({ images, className = '', autoPlayInterval = 5000 }: ImageStackProps) {
  const [topIndex, setTopIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextImage = useCallback(() => {
    setTopIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // Auto-rotate images
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextImage();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isPaused, autoPlayInterval, nextImage]);

  const handleDragStart = () => {
    setIsPaused(true);
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 50;
    if (Math.abs(info.offset.x) > threshold) {
      if (info.offset.x < 0) {
        // Swipe left - next image
        setTopIndex((prev) => (prev + 1) % images.length);
      } else {
        // Swipe right - previous image
        setTopIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    }
    // Resume auto-play after a short delay
    setTimeout(() => setIsPaused(false), 3000);
  };

  // Reorder images so topIndex is first
  const getStackOrder = () => {
    const order = [];
    for (let i = 0; i < images.length; i++) {
      order.push((topIndex + i) % images.length);
    }
    return order;
  };

  const stackOrder = getStackOrder();

  return (
    <div className={`relative w-64 h-80 md:w-80 md:h-96 ${className}`}>
      {stackOrder.map((imageIndex, stackPosition) => (
        <motion.div
          key={images[imageIndex]}
          variants={imageStackVariants}
          initial="initial"
          animate="animate"
          custom={stackPosition}
          drag={stackPosition === 0 ? 'x' : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragStart={stackPosition === 0 ? handleDragStart : undefined}
          onDragEnd={stackPosition === 0 ? handleDragEnd : undefined}
          className={`absolute inset-0 origin-center ${
            stackPosition === 0 ? 'cursor-grab active:cursor-grabbing' : ''
          }`}
          style={{
            zIndex: images.length - stackPosition,
          }}
          layout
          transition={{
            layout: { duration: 0.3, ease: 'easeOut' },
          }}
        >
          <div className="relative w-full h-full overflow-hidden shadow-2xl">
            <Image
              src={images[imageIndex]}
              alt={`Portfolio image ${imageIndex + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 256px, 320px"
              priority={imageIndex === 0}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
