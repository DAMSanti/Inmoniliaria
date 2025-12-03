'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number; // -1 a 1, negativo = más lento, positivo = más rápido
  direction?: 'vertical' | 'horizontal' | 'both';
  className?: string;
  offset?: number;
  scale?: boolean;
  rotate?: boolean;
  opacity?: boolean;
}

/**
 * FEATURE 1: Efecto Parallax Multicapa Avanzado
 * 
 * Ubicación: src/components/effects/ParallaxLayer.tsx
 * 
 * Crea sensación de profundidad 3D con múltiples capas que se mueven
 * a diferentes velocidades según el scroll.
 * 
 * Uso:
 * <ParallaxLayer speed={0.5} direction="vertical">
 *   <YourContent />
 * </ParallaxLayer>
 */
export function ParallaxLayer({
  children,
  speed = 0.5,
  direction = 'vertical',
  className = '',
  offset = 0,
  scale = false,
  rotate = false,
  opacity = false,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Transformaciones suaves con spring
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  
  const yRange = useTransform(scrollYProgress, [0, 1], [offset - 100 * speed, offset + 100 * speed]);
  const xRange = useTransform(scrollYProgress, [0, 1], [offset - 50 * speed, offset + 50 * speed]);
  const scaleRange = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);
  const rotateRange = useTransform(scrollYProgress, [0, 1], [0, speed * 10]);
  const opacityRange = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const y = useSpring(yRange, springConfig);
  const x = useSpring(xRange, springConfig);
  const scaleValue = useSpring(scaleRange, springConfig);
  const rotateValue = useSpring(rotateRange, springConfig);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y: direction === 'vertical' || direction === 'both' ? y : 0,
        x: direction === 'horizontal' || direction === 'both' ? x : 0,
        scale: scale ? scaleValue : 1,
        rotate: rotate ? rotateValue : 0,
        opacity: opacity ? opacityRange : 1,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Contenedor para múltiples capas parallax
 */
interface ParallaxContainerProps {
  children: ReactNode;
  className?: string;
}

export function ParallaxContainer({ children, className = '' }: ParallaxContainerProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

/**
 * Capa de fondo con parallax extremo
 */
interface ParallaxBackgroundProps {
  layers: {
    content: ReactNode;
    speed: number;
    zIndex: number;
    className?: string;
  }[];
  className?: string;
}

export function ParallaxBackground({ layers, className = '' }: ParallaxBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {layers.map((layer, index) => (
        <ParallaxLayer
          key={index}
          speed={layer.speed}
          className={`absolute inset-0 ${layer.className || ''}`}
          style={{ zIndex: layer.zIndex }}
        >
          {layer.content}
        </ParallaxLayer>
      ))}
    </div>
  );
}
