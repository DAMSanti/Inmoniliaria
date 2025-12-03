'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

/**
 * CURSOR CON ESTELA DE HUMO - Cambia color según velocidad
 */

interface SmokeParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  velocity: number;
  angle: number;
  life: number;
}

/**
 * Estela de humo que cambia de color según velocidad del cursor
 */
export function SmokeTrailCursor({ maxParticles = 50 }: { maxParticles?: number }) {
  const [particles, setParticles] = useState<SmokeParticle[]>([]);
  const [currentVelocity, setCurrentVelocity] = useState(0);
  const particleId = useRef(0);
  const lastPosition = useRef({ x: 0, y: 0, time: Date.now() });
  const animationFrame = useRef<number>();
  const isTouch = useRef(false);

  // Calcular color basado en velocidad (0-100+)
  const getColorFromVelocity = useCallback((velocity: number) => {
    // Lento: Azul/Cyan -> Medio: Verde/Amarillo -> Rápido: Naranja/Rojo -> Muy rápido: Rosa/Magenta
    if (velocity < 5) {
      return { h: 200, s: 80, l: 60 }; // Azul tranquilo
    } else if (velocity < 15) {
      return { h: 180, s: 90, l: 55 }; // Cyan
    } else if (velocity < 30) {
      return { h: 140, s: 85, l: 50 }; // Verde
    } else if (velocity < 50) {
      return { h: 60, s: 95, l: 55 }; // Amarillo
    } else if (velocity < 80) {
      return { h: 30, s: 100, l: 50 }; // Naranja
    } else if (velocity < 120) {
      return { h: 0, s: 100, l: 55 }; // Rojo
    } else {
      return { h: 320, s: 100, l: 60 }; // Magenta/Rosa fuego
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    isTouch.current = 'ontouchstart' in window;
    if (isTouch.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const deltaTime = now - lastPosition.current.time;
      
      if (deltaTime > 0) {
        const dx = e.clientX - lastPosition.current.x;
        const dy = e.clientY - lastPosition.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const velocity = (distance / deltaTime) * 50; // Normalizar velocidad
        
        setCurrentVelocity(velocity);

        // Crear más partículas a mayor velocidad
        const particlesToCreate = Math.min(Math.ceil(velocity / 10) + 1, 5);
        
        if (distance > 3) {
          const newParticles: SmokeParticle[] = [];
          
          for (let i = 0; i < particlesToCreate; i++) {
            // Dispersión lateral para efecto de humo
            const spread = (Math.random() - 0.5) * (20 + velocity * 0.5);
            const angle = Math.atan2(dy, dx);
            const perpAngle = angle + Math.PI / 2;
            
            newParticles.push({
              id: particleId.current++,
              x: e.clientX + Math.cos(perpAngle) * spread,
              y: e.clientY + Math.sin(perpAngle) * spread,
              size: 15 + Math.random() * 25 + velocity * 0.3,
              velocity: velocity,
              angle: angle + (Math.random() - 0.5) * 0.5,
              life: 1,
            });
          }

          setParticles(prev => [...prev.slice(-maxParticles), ...newParticles]);
        }
      }

      lastPosition.current = { x: e.clientX, y: e.clientY, time: now };
    };

    // Animación de decay de partículas
    const animate = () => {
      setParticles(prev => 
        prev
          .map(p => ({
            ...p,
            life: p.life - 0.02,
            x: p.x + Math.cos(p.angle + Math.PI) * 0.5 + (Math.random() - 0.5) * 2,
            y: p.y - 1 + (Math.random() - 0.5) * 1.5, // Subir como humo
            size: p.size * 1.02, // Expandirse
          }))
          .filter(p => p.life > 0)
      );
      animationFrame.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animationFrame.current = requestAnimationFrame(animate);

    // Ocultar cursor nativo
    document.body.style.cursor = 'none';
    const style = document.createElement('style');
    style.id = 'cursor-hide-style';
    style.innerHTML = `*, *::before, *::after { cursor: none !important; }`;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
      document.body.style.cursor = 'auto';
      const styleEl = document.getElementById('cursor-hide-style');
      if (styleEl) styleEl.remove();
    };
  }, [maxParticles]);

  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  const baseColor = getColorFromVelocity(currentVelocity);

  return (
    <>
      {/* Partículas de humo */}
      <div className="fixed inset-0 pointer-events-none z-[9998]">
        {particles.map(particle => {
          const color = getColorFromVelocity(particle.velocity);
          return (
            <div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                left: particle.x,
                top: particle.y,
                width: particle.size,
                height: particle.size,
                transform: 'translate(-50%, -50%)',
                background: `radial-gradient(circle, 
                  hsla(${color.h}, ${color.s}%, ${color.l}%, ${particle.life * 0.6}) 0%, 
                  hsla(${color.h}, ${color.s}%, ${color.l}%, ${particle.life * 0.3}) 40%, 
                  hsla(${color.h}, ${color.s}%, ${color.l}%, 0) 70%
                )`,
                filter: `blur(${8 + (1 - particle.life) * 15}px)`,
                opacity: particle.life,
              }}
            />
          );
        })}
      </div>

      {/* Cursor principal */}
      <div 
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: lastPosition.current.x,
          top: lastPosition.current.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Núcleo brillante */}
        <motion.div
          className="relative"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          <div 
            className="w-4 h-4 rounded-full"
            style={{
              background: `hsl(${baseColor.h}, ${baseColor.s}%, ${baseColor.l}%)`,
              boxShadow: `
                0 0 10px hsla(${baseColor.h}, ${baseColor.s}%, ${baseColor.l}%, 0.8),
                0 0 20px hsla(${baseColor.h}, ${baseColor.s}%, ${baseColor.l}%, 0.6),
                0 0 40px hsla(${baseColor.h}, ${baseColor.s}%, ${baseColor.l}%, 0.4),
                0 0 60px hsla(${baseColor.h}, ${baseColor.s}%, ${baseColor.l}%, 0.2)
              `,
            }}
          />
        </motion.div>
      </div>

      {/* Indicador de velocidad */}
      <div 
        className="fixed bottom-4 right-4 pointer-events-none z-[9999] text-xs font-mono px-3 py-2 rounded-lg backdrop-blur-md"
        style={{
          background: `hsla(${baseColor.h}, ${baseColor.s}%, 20%, 0.8)`,
          color: `hsl(${baseColor.h}, ${baseColor.s}%, ${baseColor.l}%)`,
          border: `1px solid hsla(${baseColor.h}, ${baseColor.s}%, ${baseColor.l}%, 0.5)`,
          boxShadow: `0 0 20px hsla(${baseColor.h}, ${baseColor.s}%, ${baseColor.l}%, 0.3)`,
        }}
      >
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full animate-pulse"
            style={{ background: `hsl(${baseColor.h}, ${baseColor.s}%, ${baseColor.l}%)` }}
          />
          <span>Speed: {Math.round(currentVelocity)}</span>
        </div>
      </div>
    </>
  );
}

/**
 * Versión con llamas de fuego
 */
export function FireTrailCursor({ maxParticles = 60 }: { maxParticles?: number }) {
  const [particles, setParticles] = useState<SmokeParticle[]>([]);
  const [velocity, setVelocity] = useState(0);
  const particleId = useRef(0);
  const lastPos = useRef({ x: 0, y: 0, time: Date.now() });
  const frame = useRef<number>();

  useEffect(() => {
    if (typeof window === 'undefined' || 'ontouchstart' in window) return;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dt = now - lastPos.current.time;
      
      if (dt > 0) {
        const dx = e.clientX - lastPos.current.x;
        const dy = e.clientY - lastPos.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const vel = (dist / dt) * 50;
        setVelocity(vel);

        if (dist > 2) {
          const count = Math.min(Math.ceil(vel / 8), 6);
          const newP: SmokeParticle[] = [];
          
          for (let i = 0; i < count; i++) {
            newP.push({
              id: particleId.current++,
              x: e.clientX + (Math.random() - 0.5) * 20,
              y: e.clientY + (Math.random() - 0.5) * 20,
              size: 20 + Math.random() * 30 + vel * 0.2,
              velocity: vel,
              angle: Math.atan2(dy, dx),
              life: 1,
            });
          }
          setParticles(prev => [...prev.slice(-maxParticles), ...newP]);
        }
      }
      lastPos.current = { x: e.clientX, y: e.clientY, time: now };
    };

    const animate = () => {
      setParticles(prev =>
        prev
          .map(p => ({
            ...p,
            life: p.life - 0.025,
            y: p.y - 2 - p.velocity * 0.02,
            x: p.x + (Math.random() - 0.5) * 3,
            size: p.size * 0.98,
          }))
          .filter(p => p.life > 0)
      );
      frame.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    frame.current = requestAnimationFrame(animate);
    
    document.body.style.cursor = 'none';
    const style = document.createElement('style');
    style.id = 'fire-cursor-style';
    style.innerHTML = `*, *::before, *::after { cursor: none !important; }`;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (frame.current) cancelAnimationFrame(frame.current);
      document.body.style.cursor = 'auto';
      document.getElementById('fire-cursor-style')?.remove();
    };
  }, [maxParticles]);

  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  // Color basado en velocidad: amarillo -> naranja -> rojo -> blanco
  const getFireColor = (vel: number, life: number) => {
    const baseHue = Math.max(60 - vel * 0.5, 0); // De amarillo a rojo
    const saturation = 100;
    const lightness = 50 + (1 - life) * 20 + vel * 0.2; // Más brillante = más caliente
    return { h: baseHue, s: saturation, l: Math.min(lightness, 80) };
  };

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-[9998]">
        {particles.map(p => {
          const color = getFireColor(p.velocity, p.life);
          return (
            <div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: p.x,
                top: p.y,
                width: p.size,
                height: p.size * 1.3,
                transform: 'translate(-50%, -50%)',
                background: `radial-gradient(ellipse at center bottom,
                  hsla(${color.h}, ${color.s}%, ${color.l + 20}%, ${p.life}) 0%,
                  hsla(${color.h}, ${color.s}%, ${color.l}%, ${p.life * 0.7}) 30%,
                  hsla(${Math.max(color.h - 30, 0)}, ${color.s}%, ${color.l - 20}%, ${p.life * 0.4}) 60%,
                  transparent 100%
                )`,
                filter: `blur(${5 + (1 - p.life) * 10}px)`,
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              }}
            />
          );
        })}
      </div>

      {/* Cursor core */}
      <motion.div
        className="fixed pointer-events-none z-[9999] w-5 h-5 rounded-full"
        style={{
          left: lastPos.current.x,
          top: lastPos.current.y,
          transform: 'translate(-50%, -50%)',
          background: velocity > 50 
            ? 'radial-gradient(circle, #fff 0%, #ffcc00 50%, #ff6600 100%)'
            : 'radial-gradient(circle, #ffcc00 0%, #ff6600 50%, #ff3300 100%)',
          boxShadow: `
            0 0 ${10 + velocity * 0.3}px #ff6600,
            0 0 ${20 + velocity * 0.5}px #ff3300,
            0 0 ${30 + velocity * 0.7}px rgba(255,51,0,0.5)
          `,
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 0.3, repeat: Infinity }}
      />
    </>
  );
}

/**
 * Nebula/Galaxy trail - efecto espacial
 */
export function NebulaTrailCursor({ maxParticles = 80 }: { maxParticles?: number }) {
  const [particles, setParticles] = useState<SmokeParticle[]>([]);
  const [velocity, setVelocity] = useState(0);
  const particleId = useRef(0);
  const lastPos = useRef({ x: 0, y: 0, time: Date.now() });
  const frame = useRef<number>();
  const hueOffset = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined' || 'ontouchstart' in window) return;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dt = now - lastPos.current.time;
      
      if (dt > 0) {
        const dx = e.clientX - lastPos.current.x;
        const dy = e.clientY - lastPos.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const vel = (dist / dt) * 50;
        setVelocity(vel);
        
        // Rotación del hue basada en velocidad
        hueOffset.current = (hueOffset.current + vel * 0.5) % 360;

        if (dist > 2) {
          const count = Math.min(Math.ceil(vel / 6), 8);
          const newP: SmokeParticle[] = [];
          
          for (let i = 0; i < count; i++) {
            const spread = (Math.random() - 0.5) * (30 + vel);
            const angle = Math.atan2(dy, dx);
            
            newP.push({
              id: particleId.current++,
              x: e.clientX + Math.cos(angle + Math.PI/2) * spread + (Math.random() - 0.5) * 15,
              y: e.clientY + Math.sin(angle + Math.PI/2) * spread + (Math.random() - 0.5) * 15,
              size: 10 + Math.random() * 40 + vel * 0.3,
              velocity: vel,
              angle: (hueOffset.current + Math.random() * 60) % 360, // Usar para color
              life: 1,
            });
          }
          setParticles(prev => [...prev.slice(-maxParticles), ...newP]);
        }
      }
      lastPos.current = { x: e.clientX, y: e.clientY, time: now };
    };

    const animate = () => {
      setParticles(prev =>
        prev
          .map(p => ({
            ...p,
            life: p.life - 0.015,
            x: p.x + (Math.random() - 0.5) * 2,
            y: p.y + (Math.random() - 0.5) * 2,
            size: p.size * 1.01,
          }))
          .filter(p => p.life > 0)
      );
      frame.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    frame.current = requestAnimationFrame(animate);
    
    document.body.style.cursor = 'none';
    const style = document.createElement('style');
    style.id = 'nebula-cursor-style';
    style.innerHTML = `*, *::before, *::after { cursor: none !important; }`;
    document.head.appendChild(style);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (frame.current) cancelAnimationFrame(frame.current);
      document.body.style.cursor = 'auto';
      document.getElementById('nebula-cursor-style')?.remove();
    };
  }, [maxParticles]);

  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  return (
    <>
      {/* Estrellas de fondo */}
      <div className="fixed inset-0 pointer-events-none z-[9997]">
        {particles.filter((_, i) => i % 5 === 0).map(p => (
          <div
            key={`star-${p.id}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: p.x + (Math.random() - 0.5) * 100,
              top: p.y + (Math.random() - 0.5) * 100,
              opacity: p.life * 0.5,
              boxShadow: '0 0 3px #fff',
            }}
          />
        ))}
      </div>

      {/* Nebulosa */}
      <div className="fixed inset-0 pointer-events-none z-[9998]">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(circle,
                hsla(${p.angle}, 100%, 70%, ${p.life * 0.5}) 0%,
                hsla(${(p.angle + 40) % 360}, 100%, 50%, ${p.life * 0.3}) 40%,
                hsla(${(p.angle + 80) % 360}, 100%, 40%, ${p.life * 0.1}) 70%,
                transparent 100%
              )`,
              filter: `blur(${10 + (1 - p.life) * 20}px)`,
              mixBlendMode: 'screen',
            }}
          />
        ))}
      </div>

      {/* Cursor central - estrella */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: lastPos.current.x,
          top: lastPos.current.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <motion.div
          className="relative w-6 h-6"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          {/* Rayos de estrella */}
          {[0, 45, 90, 135].map(angle => (
            <div
              key={angle}
              className="absolute top-1/2 left-1/2 w-8 h-[2px] -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                background: `linear-gradient(90deg, transparent, hsl(${hueOffset.current}, 100%, 70%), transparent)`,
              }}
            />
          ))}
          {/* Núcleo */}
          <div
            className="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
            style={{
              boxShadow: `
                0 0 10px hsl(${hueOffset.current}, 100%, 70%),
                0 0 20px hsl(${hueOffset.current}, 100%, 60%),
                0 0 40px hsl(${hueOffset.current}, 80%, 50%)
              `,
            }}
          />
        </motion.div>
      </motion.div>
    </>
  );
}

/**
 * Componente principal - SMOKE TRAIL (el que pediste)
 */
export function FuturisticCursorComplete() {
  return <SmokeTrailCursor maxParticles={60} />;
}

// Exportar alternativas
export { SmokeTrailCursor, FireTrailCursor, NebulaTrailCursor };
