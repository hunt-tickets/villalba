'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { imageStackVariants } from '@/lib/animations';

interface ImageStackProps {
  images: string[];
  className?: string;
}

export function ImageStack({ images, className = '' }: ImageStackProps) {
  return (
    <div className={`relative w-64 h-80 md:w-80 md:h-96 ${className}`}>
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
              sizes="(max-width: 768px) 256px, 320px"
              priority={index === 0}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
