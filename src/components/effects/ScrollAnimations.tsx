'use client';

import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

/**
 * FEATURE 2: Animaciones e interacciones basadas en el scroll
 * 
 * Ubicación: src/components/effects/ScrollAnimations.tsx
 * 
 * Contenido que aparece, se transforma o se deforma según la posición del scroll.
 */

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'rotate';
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 60,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-100px' });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
      x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
      scale: direction === 'scale' ? 0.8 : 1,
      rotate: direction === 'rotate' ? -10 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotate: 0,
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Texto que se expande/contrae con el scroll
 */
interface ScrollExpandTextProps {
  text: string;
  className?: string;
}

export function ScrollExpandText({ text, className = '' }: ScrollExpandTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const letterSpacing = useTransform(scrollYProgress, [0, 0.5, 1], ['0em', '0.3em', '0em']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.1, 0.9]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        letterSpacing,
        scale,
      }}
    >
      {text}
    </motion.div>
  );
}

/**
 * Imagen que rota con el scroll
 */
interface ScrollRotateProps {
  children: ReactNode;
  className?: string;
  rotationRange?: number;
}

export function ScrollRotate({ children, className = '', rotationRange = 360 }: ScrollRotateProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, rotationRange]);
  const smoothRotate = useSpring(rotate, { stiffness: 100, damping: 30 });

  return (
    <motion.div ref={ref} className={className} style={{ rotate: smoothRotate }}>
      {children}
    </motion.div>
  );
}

/**
 * Elemento que se escala según el scroll
 */
interface ScrollScaleProps {
  children: ReactNode;
  className?: string;
  scaleRange?: [number, number, number];
}

export function ScrollScale({
  children,
  className = '',
  scaleRange = [0.5, 1, 0.5],
}: ScrollScaleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], scaleRange);
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return (
    <motion.div ref={ref} className={className} style={{ scale: smoothScale }}>
      {children}
    </motion.div>
  );
}

/**
 * Progreso horizontal basado en scroll
 */
interface ScrollProgressProps {
  className?: string;
  color?: string;
  height?: number;
}

export function ScrollProgress({ className = '', color = '#3b82f6', height = 4 }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 z-50 origin-left ${className}`}
      style={{
        scaleX,
        height,
        backgroundColor: color,
      }}
    />
  );
}

/**
 * Contenedor con efecto de morphing según scroll
 */
interface ScrollMorphProps {
  children: ReactNode;
  className?: string;
}

export function ScrollMorph({ children, className = '' }: ScrollMorphProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const borderRadius = useTransform(scrollYProgress, [0, 0.5, 1], ['0%', '50%', '0%']);
  const skewX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 5, 0]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        borderRadius,
        skewX,
      }}
    >
      {children}
    </motion.div>
  );
}
