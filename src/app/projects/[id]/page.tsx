'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getProjectById, projects } from '@/data/projects';
import { Container } from '@/components/atoms';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export default function ProjectPage() {
  const params = useParams();
  const project = getProjectById(params.id as string);

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Container>
          <p className="text-white text-center">Proyecto no encontrado</p>
          <Link href="/" className="block text-center text-white/60 mt-4 hover:text-white transition-colors">
            Volver al inicio
          </Link>
        </Container>
      </div>
    );
  }

  // Find next and previous projects
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];

  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 py-4 md:py-6 bg-black/80 backdrop-blur-md">
        <Container className="flex items-center justify-between">
          <Link
            href="/"
            className="text-[10px] md:text-xs font-medium tracking-[0.15em] text-white hover:text-white/80 transition-colors"
          >
            ANTONIA VILLALBA
          </Link>
          <Link
            href="/#gallery"
            className="text-[10px] md:text-xs tracking-[0.15em] text-white/60 hover:text-white transition-colors"
          >
            CERRAR
          </Link>
        </Container>
      </header>

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20">
        <Container>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="max-w-4xl"
          >
            {/* Category & Year */}
            <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-6">
              <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase">
                {project.subtitle}
              </span>
              <span className="text-white/20">—</span>
              <span className="text-[10px] tracking-[0.2em] text-white/40">
                {project.year}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white mb-8"
            >
              {project.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-base md:text-lg text-white/60 leading-relaxed max-w-2xl mb-8"
            >
              {project.description}
            </motion.p>

            {/* Role */}
            <motion.div variants={fadeInUp} className="flex items-center gap-4">
              <span className="text-[10px] tracking-[0.15em] text-white/40 uppercase">
                ROL
              </span>
              <span className="text-xs tracking-[0.1em] text-white/80">
                {project.role}
              </span>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Main Image */}
      <section className="pb-8 md:pb-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative aspect-video overflow-hidden bg-neutral-900"
          >
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </motion.div>
        </Container>
      </section>

      {/* Image Grid */}
      <section className="pb-16 md:pb-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {project.images.slice(1).map((image, index) => (
              <motion.div
                key={image}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative aspect-[4/3] overflow-hidden bg-neutral-900"
              >
                <Image
                  src={image}
                  alt={`${project.title} - Imagen ${index + 2}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Project Navigation */}
      <section className="border-t border-white/10 py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href={`/projects/${prevProject.id}`}
              className="group"
            >
              <span className="text-[10px] tracking-[0.15em] text-white/40 uppercase block mb-2">
                Anterior
              </span>
              <span className="text-lg md:text-2xl text-white/60 group-hover:text-white transition-colors">
                {prevProject.title}
              </span>
            </Link>
            <Link
              href={`/projects/${nextProject.id}`}
              className="group text-right"
            >
              <span className="text-[10px] tracking-[0.15em] text-white/40 uppercase block mb-2">
                Siguiente
              </span>
              <span className="text-lg md:text-2xl text-white/60 group-hover:text-white transition-colors">
                {nextProject.title}
              </span>
            </Link>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white/40">
            <span className="text-[10px] tracking-[0.15em]">ANTONIA VILLALBA</span>
            <span className="text-[10px] tracking-[0.15em]">&copy;2025</span>
          </div>
        </Container>
      </footer>
    </main>
  );
}
