'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

/**
 * CURSOR FUTURISTA - Efectos de cursor modernos
 * 
 * Incluye:
 * - Cursor principal con glow
 * - Trail de partículas
 * - Anillo exterior reactivo
 * - Efecto magnético en elementos interactivos
 */

interface CursorPosition {
  x: number;
  y: number;
}

/**
 * Cursor Principal Futurista
 */
export function FuturisticCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');
  
  // Posiciones con spring para suavidad
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  // Anillo exterior más lento
  const ringSpringConfig = { damping: 20, stiffness: 150 };
  const ringXSpring = useSpring(cursorX, ringSpringConfig);
  const ringYSpring = useSpring(cursorY, ringSpringConfig);

  useEffect(() => {
    // Solo en desktop
    if (typeof window === 'undefined' || 'ontouchstart' in window) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Detectar hover en elementos interactivos
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, input, [data-cursor]');
      
      if (interactive) {
        setIsHovering(true);
        const customText = interactive.getAttribute('data-cursor');
        setCursorText(customText || '');
      } else {
        setIsHovering(false);
        setCursorText('');
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleElementHover);

    // Ocultar cursor nativo
    document.body.style.cursor = 'none';
    
    // Añadir estilos para ocultar cursor en elementos interactivos
    const style = document.createElement('style');
    style.innerHTML = `
      *, *::before, *::after { cursor: none !important; }
    `;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleElementHover);
      document.body.style.cursor = 'auto';
      style.remove();
    };
  }, [cursorX, cursorY]);

  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null; // No mostrar en dispositivos táctiles
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Anillo exterior - sigue lentamente */}
          <motion.div
            className="fixed pointer-events-none z-[9999] mix-blend-difference"
            style={{
              x: ringXSpring,
              y: ringYSpring,
              translateX: '-50%',
              translateY: '-50%',
            }}
            animate={{
              scale: isHovering ? 1.5 : isClicking ? 0.8 : 1,
              opacity: isHovering ? 0.8 : 0.5,
            }}
            transition={{ duration: 0.2 }}
          >
            <div 
              className={`rounded-full border-2 ${isHovering ? 'border-white' : 'border-cyan-400'}`}
              style={{
                width: isHovering ? '60px' : '40px',
                height: isHovering ? '60px' : '40px',
                transition: 'width 0.3s, height 0.3s',
              }}
            />
          </motion.div>

          {/* Cursor principal con glow */}
          <motion.div
            className="fixed pointer-events-none z-[9999]"
            style={{
              x: cursorXSpring,
              y: cursorYSpring,
              translateX: '-50%',
              translateY: '-50%',
            }}
            animate={{
              scale: isClicking ? 0.5 : 1,
            }}
            transition={{ duration: 0.1 }}
          >
            {/* Core brillante */}
            <div className="relative">
              <div 
                className="w-3 h-3 rounded-full bg-white"
                style={{
                  boxShadow: `
                    0 0 10px #fff,
                    0 0 20px #0ff,
                    0 0 30px #0ff,
                    0 0 40px #0ff
                  `,
                }}
              />
              
              {/* Rayos de luz */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  className="w-8 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent absolute top-0 left-1/2 -translate-x-1/2"
                  animate={{ scaleX: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <motion.div
                  className="w-[1px] h-8 bg-gradient-to-b from-transparent via-cyan-400 to-transparent absolute left-0 top-1/2 -translate-y-1/2"
                  animate={{ scaleY: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                />
              </div>
            </div>
          </motion.div>

          {/* Texto del cursor si existe */}
          <AnimatePresence>
            {cursorText && (
              <motion.div
                className="fixed pointer-events-none z-[9999] text-xs font-medium text-white bg-black/50 px-2 py-1 rounded backdrop-blur-sm"
                style={{
                  x: ringXSpring,
                  y: ringYSpring,
                  translateX: '20px',
                  translateY: '20px',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                {cursorText}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * Trail de partículas que sigue al cursor
 */
export function CursorTrail({ particleCount = 12 }: { particleCount?: number }) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const particleId = useRef(0);
  const lastPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined' || 'ontouchstart' in window) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Solo crear partícula si se movió suficiente
      const dx = e.clientX - lastPosition.current.x;
      const dy = e.clientY - lastPosition.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 10) {
        lastPosition.current = { x: e.clientX, y: e.clientY };
        
        const newParticle = {
          id: particleId.current++,
          x: e.clientX,
          y: e.clientY,
        };

        setParticles(prev => [...prev.slice(-particleCount), newParticle]);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [particleCount]);

  // Limpiar partículas antiguas
  useEffect(() => {
    const cleanup = setInterval(() => {
      setParticles(prev => prev.slice(-particleCount));
    }, 100);
    return () => clearInterval(cleanup);
  }, [particleCount]);

  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]">
      <AnimatePresence>
        {particles.map((particle, index) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              translateX: '-50%',
              translateY: '-50%',
            }}
            initial={{ 
              scale: 1, 
              opacity: 0.8,
              width: 8,
              height: 8,
            }}
            animate={{ 
              scale: 0, 
              opacity: 0,
              width: 4,
              height: 4,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div 
              className="w-full h-full rounded-full"
              style={{
                background: `hsl(${180 + (index * 10) % 60}, 100%, 60%)`,
                boxShadow: `0 0 10px hsl(${180 + (index * 10) % 60}, 100%, 60%)`,
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/**
 * Efecto de ondas desde el cursor al hacer click
 */
export function CursorRipples() {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const rippleId = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleClick = (e: MouseEvent) => {
      const newRipple = {
        id: rippleId.current++,
        x: e.clientX,
        y: e.clientY,
      };
      setRipples(prev => [...prev, newRipple]);

      // Limpiar después de la animación
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 1000);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9997]">
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full border-2 border-cyan-400"
            style={{
              left: ripple.x,
              top: ripple.y,
              translateX: '-50%',
              translateY: '-50%',
            }}
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{ width: 200, height: 200, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

/**
 * Componente completo que combina todos los efectos
 */
export function FuturisticCursorComplete() {
  return (
    <>
      <CursorTrail particleCount={15} />
      <CursorRipples />
      <FuturisticCursor />
    </>
  );
}

/**
 * Cursor con efecto de campo magnético
 */
export function MagneticFieldCursor() {
  const [mousePos, setMousePos] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const fieldLines = 8;

  useEffect(() => {
    if (typeof window === 'undefined' || 'ontouchstart' in window) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsActive(true);
    };

    const handleMouseLeave = () => setIsActive(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[9996]">
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="absolute"
            style={{
              left: mousePos.x,
              top: mousePos.y,
              translateX: '-50%',
              translateY: '-50%',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Líneas de campo magnético */}
            {Array.from({ length: fieldLines }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-20 h-[1px] origin-left"
                style={{
                  background: 'linear-gradient(90deg, rgba(0,255,255,0.5), transparent)',
                  rotate: `${(360 / fieldLines) * i}deg`,
                }}
                animate={{
                  scaleX: [0.5, 1, 0.5],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
            
            {/* Núcleo central */}
            <motion.div
              className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400"
              animate={{
                scale: [1, 1.2, 1],
                boxShadow: [
                  '0 0 20px rgba(0,255,255,0.5)',
                  '0 0 40px rgba(0,255,255,0.8)',
                  '0 0 20px rgba(0,255,255,0.5)',
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Cursor con estela de estrellas
 */
export function StarTrailCursor() {
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const starId = useRef(0);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined' || 'ontouchstart' in window) return;

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 15) {
        lastPos.current = { x: e.clientX, y: e.clientY };

        // Añadir offset aleatorio
        const offsetX = (Math.random() - 0.5) * 30;
        const offsetY = (Math.random() - 0.5) * 30;

        const newStar = {
          id: starId.current++,
          x: e.clientX + offsetX,
          y: e.clientY + offsetY,
          size: Math.random() * 8 + 4,
        };

        setStars(prev => [...prev.slice(-20), newStar]);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[9996]">
      <AnimatePresence>
        {stars.map(star => (
          <motion.div
            key={star.id}
            className="absolute"
            style={{
              left: star.x,
              top: star.y,
              translateX: '-50%',
              translateY: '-50%',
              fontSize: star.size,
            }}
            initial={{ opacity: 1, scale: 1, rotate: 0 }}
            animate={{ opacity: 0, scale: 0, rotate: 180 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            ✦
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
