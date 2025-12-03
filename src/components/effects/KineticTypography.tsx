'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

/**
 * FEATURE 4: Tipografía cinética o variable
 * 
 * Ubicación: src/components/effects/KineticTypography.tsx
 * 
 * Texto que cambia de forma, tamaño o posición dinámicamente
 * según interacción o scroll.
 */

/**
 * Texto que estira letras al hacer scroll
 */
interface StretchTextProps {
  text: string;
  className?: string;
}

export function StretchText({ text, className = '' }: StretchTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scaleY = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1]);
  const letterSpacing = useTransform(scrollYProgress, [0, 0.5, 1], ['0em', '0.2em', '0em']);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        scaleY,
        letterSpacing,
        transformOrigin: 'center',
      }}
    >
      {text}
    </motion.div>
  );
}

/**
 * Texto con letras que aparecen una por una
 */
interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

export function TypewriterText({ text, className = '', speed = 50, delay = 0 }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }
    }, currentIndex === 0 ? delay : speed);

    return () => clearTimeout(timer);
  }, [currentIndex, text, speed, delay]);

  return (
    <span className={className}>
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        |
      </motion.span>
    </span>
  );
}

/**
 * Texto con letras que flotan y se mueven
 */
interface FloatingTextProps {
  text: string;
  className?: string;
}

export function FloatingText({ text, className = '' }: FloatingTextProps) {
  return (
    <span className={className}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.1,
            ease: 'easeInOut',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

/**
 * Texto que aparece letra por letra con efecto de cascada
 */
interface CascadeTextProps {
  text: string;
  className?: string;
  staggerDelay?: number;
}

export function CascadeText({ text, className = '', staggerDelay = 0.05 }: CascadeTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: index * staggerDelay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
}

/**
 * Texto con efecto de glitch
 */
interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className = '' }: GlitchTextProps) {
  return (
    <div className={`relative ${className}`}>
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute inset-0 text-red-500 opacity-70"
        animate={{
          x: [-2, 2, -2, 0],
          opacity: [0.7, 0.5, 0.7, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 2,
        }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute inset-0 text-blue-500 opacity-70"
        animate={{
          x: [2, -2, 2, 0],
          opacity: [0.7, 0.5, 0.7, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 2,
          delay: 0.1,
        }}
      >
        {text}
      </motion.span>
    </div>
  );
}

/**
 * Texto que sigue el cursor
 */
interface MouseFollowTextProps {
  text: string;
  className?: string;
}

export function MouseFollowText({ text, className = '' }: MouseFollowTextProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 50, damping: 10 });
  const springY = useSpring(y, { stiffness: 50, damping: 10 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      x.set((e.clientX - centerX) * 0.02);
      y.set((e.clientY - centerY) * 0.02);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y]);

  return (
    <motion.div className={className} style={{ x: springX, y: springY }}>
      {text}
    </motion.div>
  );
}

/**
 * Texto con peso de fuente variable según scroll
 */
interface VariableWeightTextProps {
  text: string;
  className?: string;
}

export function VariableWeightText({ text, className = '' }: VariableWeightTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const fontWeight = useTransform(scrollYProgress, [0, 0.5, 1], [300, 900, 300]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        fontWeight,
        fontVariationSettings: `'wght' var(--font-weight)`,
      }}
    >
      {text}
    </motion.div>
  );
}

/**
 * Título con palabras que cambian
 */
interface RotatingWordsProps {
  prefix: string;
  words: string[];
  suffix?: string;
  className?: string;
  interval?: number;
}

export function RotatingWords({
  prefix,
  words,
  suffix = '',
  className = '',
  interval = 3000,
}: RotatingWordsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span className={className}>
      {prefix}{' '}
      <span className="relative inline-block">
        {words.map((word, index) => (
          <motion.span
            key={word}
            className="absolute left-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: index === currentIndex ? 1 : 0,
              y: index === currentIndex ? 0 : -20,
            }}
            transition={{ duration: 0.5 }}
          >
            {word}
          </motion.span>
        ))}
        <span className="invisible">{words[0]}</span>
      </span>
      {suffix}
    </span>
  );
}
