'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Loader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate minimum loading time for smooth experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
        >
          <div className="relative flex flex-col items-center">
            {/* Animated lines */}
            <div className="flex gap-1 mb-8">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-[2px] h-8 bg-white"
                  initial={{ scaleY: 0.3, opacity: 0.3 }}
                  animate={{
                    scaleY: [0.3, 1, 0.3],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>

            {/* Name reveal */}
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: 40 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="text-white/60 text-xs tracking-[0.3em] uppercase"
              >
                Antonia Villalba
              </motion.p>
            </div>

            {/* Progress bar */}
            <motion.div
              className="absolute -bottom-12 w-32 h-[1px] bg-white/20 overflow-hidden"
            >
              <motion.div
                className="h-full bg-white"
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{
                  duration: 1.8,
                  ease: [0.76, 0, 0.24, 1],
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
