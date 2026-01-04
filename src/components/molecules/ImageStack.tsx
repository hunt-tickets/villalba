'use client';

import { useState } from 'react';
import { motion, PanInfo } from 'framer-motion';
import Image from 'next/image';
import { imageStackVariants } from '@/lib/animations';

interface ImageStackProps {
  images: string[];
  className?: string;
}

export function ImageStack({ images, className = '' }: ImageStackProps) {
  const [topIndex, setTopIndex] = useState(0);

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

      {/* Dot indicators - mobile only */}
      <div className="md:hidden absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setTopIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === topIndex
                ? 'bg-white w-6'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
