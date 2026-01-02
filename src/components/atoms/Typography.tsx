'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4';

interface TypographyProps extends Omit<HTMLMotionProps<'h1'>, 'children'> {
  as?: HeadingLevel | 'p' | 'span';
  variant?: 'hero' | 'title' | 'subtitle' | 'body' | 'caption' | 'label';
  children: React.ReactNode;
  animate?: boolean;
}

const variantStyles: Record<string, string> = {
  hero: 'text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.9]',
  title: 'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight',
  subtitle: 'text-xl md:text-2xl font-light tracking-wide',
  body: 'text-base md:text-lg font-normal',
  caption: 'text-xs md:text-sm font-light tracking-widest uppercase',
  label: 'text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase',
};

export function Typography({
  as: Component = 'p',
  variant = 'body',
  children,
  className = '',
  animate = true,
  ...props
}: TypographyProps) {
  const MotionComponent = motion.create(Component);

  return (
    <MotionComponent
      variants={animate ? fadeInUp : undefined}
      initial={animate ? 'initial' : undefined}
      whileInView={animate ? 'animate' : undefined}
      viewport={{ once: true, margin: '-50px' }}
      className={`${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
