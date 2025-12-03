'use client';

import { ReactNode, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * FEATURE 3: Microinteracciones personalizadas
 * 
 * Ubicación: src/components/effects/MicroInteractions.tsx
 * 
 * Pequeños detalles que responden a la acción del usuario:
 * hover, click, scroll, o carga de página.
 */

/**
 * Botón que "respira" al hacer hover
 */
interface BreathingButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  color?: string;
}

export function BreathingButton({
  children,
  onClick,
  className = '',
  color = '#3b82f6',
}: BreathingButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className={`relative overflow-hidden px-8 py-4 rounded-xl font-semibold text-white ${className}`}
      style={{ backgroundColor: color }}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={
        isHovered
          ? {
              boxShadow: [
                `0 0 0 0 ${color}40`,
                `0 0 0 20px ${color}00`,
              ],
            }
          : {}
      }
      transition={{
        boxShadow: {
          duration: 1,
          repeat: Infinity,
        },
      }}
    >
      <motion.span
        animate={isHovered ? { scale: [1, 1.02, 1] } : {}}
        transition={{ duration: 0.6, repeat: Infinity }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}

/**
 * Tarjeta con efecto de inclinación 3D al mover el ratón
 */
interface TiltCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function TiltCard({ children, className = '', intensity = 15 }: TiltCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
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
      className={`${className}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

/**
 * Icono que se transforma en otro al hacer hover
 */
interface MorphIconProps {
  defaultIcon: ReactNode;
  hoverIcon: ReactNode;
  className?: string;
}

export function MorphIcon({ defaultIcon, hoverIcon, className = '' }: MorphIconProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        animate={{ opacity: isHovered ? 0 : 1, scale: isHovered ? 0.5 : 1, rotate: isHovered ? 90 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {defaultIcon}
      </motion.div>
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5, rotate: isHovered ? 0 : -90 }}
        transition={{ duration: 0.3 }}
      >
        {hoverIcon}
      </motion.div>
    </motion.div>
  );
}

/**
 * Botón con efecto de onda (ripple) al hacer click
 */
interface RippleButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function RippleButton({ children, onClick, className = '' }: RippleButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);

    onClick?.();
  };

  return (
    <motion.button
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          initial={{ width: 0, height: 0, x: ripple.x, y: ripple.y, opacity: 1 }}
          animate={{ width: 500, height: 500, x: ripple.x - 250, y: ripple.y - 250, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
    </motion.button>
  );
}

/**
 * Enlace con subrayado animado
 */
interface AnimatedLinkProps {
  children: ReactNode;
  href: string;
  className?: string;
}

export function AnimatedLink({ children, href, className = '' }: AnimatedLinkProps) {
  return (
    <motion.a
      href={href}
      className={`relative inline-block ${className}`}
      whileHover="hover"
    >
      {children}
      <motion.span
        className="absolute bottom-0 left-0 h-0.5 bg-current"
        initial={{ width: '0%' }}
        variants={{
          hover: { width: '100%' },
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />
    </motion.a>
  );
}

/**
 * Indicador de carga con animación
 */
interface LoadingSpinnerProps {
  size?: number;
  color?: string;
}

export function LoadingSpinner({ size = 40, color = '#3b82f6' }: LoadingSpinnerProps) {
  return (
    <motion.div
      style={{ width: size, height: size }}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    >
      <svg viewBox="0 0 50 50" style={{ width: '100%', height: '100%' }}>
        <motion.circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0.2, rotate: 0 }}
          animate={{ pathLength: [0.2, 0.8, 0.2], rotate: [0, 360] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </motion.div>
  );
}

/**
 * Menú hamburguesa animado
 */
interface AnimatedMenuIconProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
  color?: string;
}

export function AnimatedMenuIcon({
  isOpen,
  onClick,
  className = '',
  color = 'currentColor',
}: AnimatedMenuIconProps) {
  return (
    <motion.button
      className={`relative w-8 h-6 ${className}`}
      onClick={onClick}
    >
      <motion.span
        className="absolute left-0 w-full h-0.5 rounded"
        style={{ backgroundColor: color, top: '0%' }}
        animate={{
          top: isOpen ? '50%' : '0%',
          rotate: isOpen ? 45 : 0,
          y: isOpen ? '-50%' : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className="absolute left-0 w-full h-0.5 rounded"
        style={{ backgroundColor: color, top: '50%', y: '-50%' }}
        animate={{ opacity: isOpen ? 0 : 1, scaleX: isOpen ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className="absolute left-0 w-full h-0.5 rounded"
        style={{ backgroundColor: color, bottom: '0%' }}
        animate={{
          bottom: isOpen ? '50%' : '0%',
          rotate: isOpen ? -45 : 0,
          y: isOpen ? '50%' : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}
