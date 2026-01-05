'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/types';
import { hoverScale } from '@/lib/animations';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`}>
      <motion.article
        className="group cursor-pointer"
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
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
          <motion.div
            className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"
            whileTap={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          />
          {/* Selection overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-active:opacity-100"
            initial={false}
          >
            <motion.div
              className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center"
              initial={{ scale: 0.5, opacity: 0 }}
              whileTap={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
        <div className="space-y-1">
          <h3 className="text-xs font-medium tracking-[0.15em] text-white group-active:text-white/70 transition-colors">
            {project.title}
          </h3>
          <p className="text-[10px] tracking-[0.1em] text-white/50">
            {project.imageCount.toString().padStart(2, '0')} IMÁGENES
          </p>
        </div>
      </motion.article>
    </Link>
  );
}
