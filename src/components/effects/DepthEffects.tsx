'use client';

import { ReactNode, useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * FEATURE 7: Integración de efectos de profundidad y luz
 * 
 * Ubicación: src/components/effects/DepthEffects.tsx
 * 
 * Sombras dinámicas, brillos, reflejos y efectos de luz que
 * reaccionan al cursor o al scroll.
 */

/**
 * Tarjeta con sombra dinámica que sigue el cursor
 */
interface DynamicShadowCardProps {
  children: ReactNode;
  className?: string;
  shadowColor?: string;
  intensity?: number;
}

export function DynamicShadowCard({
  children,
  className = '',
  shadowColor = 'rgba(0, 0, 0, 0.3)',
  intensity = 30,
}: DynamicShadowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const shadowX = useSpring(useTransform(x, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 300,
    damping: 30,
  });
  const shadowY = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((event.clientX - centerX) / rect.width);
    y.set((event.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        boxShadow: `${shadowX}px ${shadowY}px 40px ${shadowColor}`,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Efecto de brillo/spotlight que sigue el cursor
 */
interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightSize?: number;
}

export function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(255, 255, 255, 0.15)',
  spotlightSize = 200,
}: SpotlightCardProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{
          background: isHovered
            ? `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent)`
            : 'transparent',
        }}
        transition={{ duration: 0.15 }}
      />
      {children}
    </motion.div>
  );
}

/**
 * Efecto de reflejo (glassmorphism mejorado)
 */
interface GlassCardProps {
  children: ReactNode;
  className?: string;
  blur?: number;
  opacity?: number;
}

export function GlassCard({
  children,
  className = '',
  blur = 10,
  opacity = 0.2,
}: GlassCardProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        background: `rgba(255, 255, 255, ${opacity})`,
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        border: '1px solid rgba(255, 255, 255, 0.3)',
      }}
    >
      {/* Reflejo superior */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)',
        }}
      />
      {children}
    </div>
  );
}

/**
 * Borde con gradiente animado
 */
interface GradientBorderProps {
  children: ReactNode;
  className?: string;
  borderWidth?: number;
  colors?: string[];
  speed?: number;
}

export function GradientBorder({
  children,
  className = '',
  borderWidth = 2,
  colors = ['#6366f1', '#8b5cf6', '#d946ef', '#6366f1'],
  speed = 3,
}: GradientBorderProps) {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 rounded-inherit"
        style={{
          padding: borderWidth,
          background: `linear-gradient(90deg, ${colors.join(', ')})`,
          backgroundSize: '200% 100%',
          borderRadius: 'inherit',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div className="w-full h-full bg-white dark:bg-gray-900 rounded-inherit" style={{ borderRadius: 'inherit' }} />
      </motion.div>
      <div className="relative" style={{ margin: borderWidth }}>
        {children}
      </div>
    </div>
  );
}

/**
 * Efecto de neón/glow
 */
interface NeonGlowProps {
  children: ReactNode;
  className?: string;
  color?: string;
  intensity?: number;
}

export function NeonGlow({
  children,
  className = '',
  color = '#6366f1',
  intensity = 20,
}: NeonGlowProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        boxShadow: isHovered
          ? `0 0 ${intensity}px ${color}, 0 0 ${intensity * 2}px ${color}, 0 0 ${intensity * 3}px ${color}`
          : `0 0 ${intensity / 2}px ${color}`,
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Partículas de luz flotantes
 */
interface LightParticlesProps {
  count?: number;
  className?: string;
}

export function LightParticles({ count = 20, className = '' }: LightParticlesProps) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 10 + 5,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
    x: Math.random() * 100,
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/30"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            bottom: '-20px',
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

/**
 * Efecto de aurora boreal
 */
interface AuroraBackgroundProps {
  className?: string;
}

export function AuroraBackground({ className = '' }: AuroraBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(45deg, #1a1a2e, #16213e, #0f3460)',
        }}
      />
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at ${50 + i * 10}% ${50 + i * 10}%, 
              rgba(99, 102, 241, 0.3) 0%, 
              rgba(139, 92, 246, 0.2) 30%, 
              transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 2,
          }}
        />
      ))}
    </div>
  );
}
