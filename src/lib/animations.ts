import { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 40,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

export const fadeIn: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const scaleIn: Variants = {
  initial: {
    opacity: 0,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

export const slideInLeft: Variants = {
  initial: {
    opacity: 0,
    x: -60,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

export const slideInRight: Variants = {
  initial: {
    opacity: 0,
    x: 60,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

export const imageStackVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
    rotate: 0,
  },
  animate: (i: number) => ({
    opacity: 1,
    scale: 1,
    rotate: (i - 1) * 8,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.3, ease: 'easeOut' as const },
};

export const tapScale = {
  scale: 0.98,
};
