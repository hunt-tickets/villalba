'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Container } from '@/components/atoms';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-8xl md:text-9xl font-light text-white/10 mb-4">
            404
          </h1>
          <h2 className="text-xl md:text-2xl font-light text-white mb-4">
            Página no encontrada
          </h2>
          <p className="text-white/50 mb-8 max-w-md mx-auto">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            Volver al inicio
          </Link>
        </motion.div>
      </Container>
    </main>
  );
}
