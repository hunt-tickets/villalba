'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/types';
import { fadeInUp, hoverScale } from '@/lib/animations';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-50px' }}
      custom={index}
      className="group cursor-pointer"
    >
      <motion.div
        className="relative aspect-[4/5] overflow-hidden bg-neutral-900 mb-4"
        whileHover={hoverScale}
      >
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </motion.div>
      <div className="space-y-1">
        <h3 className="text-xs font-medium tracking-[0.15em] text-white">
          {project.title}
        </h3>
        <p className="text-[10px] tracking-[0.1em] text-white/50">
          {project.imageCount.toString().padStart(2, '0')} IMÁGENES
        </p>
      </div>
    </motion.article>
  );
}
