'use client';

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

/**
 * FEATURE 6: Transiciones de página fluidas
 * 
 * Ubicación: src/components/effects/PageTransitions.tsx
 * 
 * Transiciones suaves entre secciones o páginas, con animaciones complejas.
 */

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

/**
 * Transición de fade
 */
export function FadeTransition({ children, className = '' }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Transición de deslizamiento
 */
export function SlideTransition({ children, className = '' }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        className={className}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Transición de escala
 */
export function ScaleTransition({ children, className = '' }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        className={className}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Transición con cortina
 */
export function CurtainTransition({ children, className = '' }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className={`relative ${className}`}>
        <motion.div
          className="fixed inset-0 bg-blue-600 z-50 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1, 1, 0] }}
          transition={{
            duration: 0.8,
            times: [0, 0.4, 0.6, 1],
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Transición con círculo expandible
 */
export function CircleTransition({ children, className = '' }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className={`relative ${className}`}>
        <motion.div
          className="fixed inset-0 bg-gradient-to-br from-blue-600 to-purple-600 z-50"
          initial={{ clipPath: 'circle(0% at 50% 50%)' }}
          animate={{ clipPath: ['circle(0% at 50% 50%)', 'circle(150% at 50% 50%)', 'circle(150% at 50% 50%)', 'circle(0% at 50% 50%)'] }}
          transition={{
            duration: 1,
            times: [0, 0.4, 0.6, 1],
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Transición con bloques
 */
export function BlocksTransition({ children, className = '' }: PageTransitionProps) {
  const pathname = usePathname();
  const blocks = Array.from({ length: 10 });

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className={`relative ${className}`}>
        <div className="fixed inset-0 z-50 flex pointer-events-none">
          {blocks.map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-blue-600"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: [0, 1, 1, 0] }}
              transition={{
                duration: 0.8,
                times: [0, 0.3, 0.7, 1],
                delay: i * 0.05,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              style={{ originY: i % 2 === 0 ? 0 : 1 }}
            />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Contenedor de transición de sección
 */
interface SectionTransitionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function SectionTransition({ children, className = '', delay = 0 }: SectionTransitionProps) {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.section>
  );
}

/**
 * Transición de elementos en stagger
 */
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({ children, className = '', staggerDelay = 0.1 }: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
