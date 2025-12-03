'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * FEATURE 8: Animaciones generativas o basadas en datos
 * 
 * Ubicación: src/components/effects/GenerativeAnimations.tsx
 * 
 * Gráficos, partículas o fondos que cambian en tiempo real
 * según datos o interacción del usuario.
 */

/**
 * Fondo que "respira" según la hora del día
 */
interface BreathingBackgroundProps {
  className?: string;
}

export function BreathingBackground({ className = '' }: BreathingBackgroundProps) {
  const [timeOfDay, setTimeOfDay] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours() + now.getMinutes() / 60;
      setTimeOfDay(hours / 24);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Colores según hora del día
  const getGradient = () => {
    if (timeOfDay < 0.25) {
      // Noche (0-6h)
      return 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)';
    } else if (timeOfDay < 0.5) {
      // Mañana (6-12h)
      return 'linear-gradient(to bottom, #ff9a9e, #fecfef, #fecfef)';
    } else if (timeOfDay < 0.75) {
      // Tarde (12-18h)
      return 'linear-gradient(to bottom, #a1c4fd, #c2e9fb)';
    } else {
      // Atardecer/Noche (18-24h)
      return 'linear-gradient(to bottom, #fa709a, #fee140, #0f0c29)';
    }
  };

  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      animate={{
        scale: [1, 1.02, 1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{ background: getGradient() }}
    />
  );
}

/**
 * Partículas que siguen patrones matemáticos (Lissajous)
 */
interface LissajousParticlesProps {
  count?: number;
  className?: string;
}

export function LissajousParticles({ count = 50, className = '' }: LissajousParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: count }, (_, i) => ({
      phase: (i / count) * Math.PI * 2,
      a: 3 + Math.random() * 2,
      b: 2 + Math.random() * 2,
      size: 2 + Math.random() * 3,
      color: `hsla(${220 + Math.random() * 60}, 70%, 60%, 0.8)`,
    }));

    let time = 0;
    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        const x = Math.sin(p.a * time + p.phase) * (canvas.width * 0.3) + canvas.width / 2;
        const y = Math.sin(p.b * time) * (canvas.height * 0.3) + canvas.height / 2;

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      time += 0.01;
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [count]);

  return <canvas ref={canvasRef} className={`absolute inset-0 ${className}`} />;
}

/**
 * Ondas generativas basadas en audio o datos
 */
interface GenerativeWavesProps {
  className?: string;
  waveCount?: number;
}

export function GenerativeWaves({ className = '', waveCount = 5 }: GenerativeWavesProps) {
  const waves = useMemo(() => {
    return Array.from({ length: waveCount }, (_, i) => ({
      id: i,
      amplitude: 20 + Math.random() * 30,
      frequency: 0.01 + Math.random() * 0.02,
      phase: Math.random() * Math.PI * 2,
      color: `rgba(99, 102, 241, ${0.1 + (i / waveCount) * 0.2})`,
      speed: 0.02 + Math.random() * 0.02,
    }));
  }, [waveCount]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {waves.map((wave) => (
        <motion.svg
          key={wave.id}
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <motion.path
            fill={wave.color}
            animate={{
              d: [
                `M0,160 C360,${160 + wave.amplitude},720,${160 - wave.amplitude},1080,160 C1260,${160 + wave.amplitude / 2},1440,160,1440,160 L1440,320 L0,320 Z`,
                `M0,160 C360,${160 - wave.amplitude},720,${160 + wave.amplitude},1080,160 C1260,${160 - wave.amplitude / 2},1440,160,1440,160 L1440,320 L0,320 Z`,
                `M0,160 C360,${160 + wave.amplitude},720,${160 - wave.amplitude},1080,160 C1260,${160 + wave.amplitude / 2},1440,160,1440,160 L1440,320 L0,320 Z`,
              ],
            }}
            transition={{
              duration: 5 + wave.id,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.svg>
      ))}
    </div>
  );
}

/**
 * Visualización de datos en forma de burbujas
 */
interface DataBubblesProps {
  data: { value: number; label: string; color?: string }[];
  className?: string;
}

export function DataBubbles({ data, className = '' }: DataBubblesProps) {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className={`relative flex items-center justify-center gap-4 ${className}`}>
      {data.map((item, index) => {
        const size = 50 + (item.value / maxValue) * 100;
        return (
          <motion.div
            key={index}
            className="flex items-center justify-center rounded-full text-white font-semibold text-sm"
            style={{
              width: size,
              height: size,
              backgroundColor: item.color || '#6366f1',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, type: 'spring' }}
            whileHover={{ scale: 1.1 }}
          >
            {item.label}
          </motion.div>
        );
      })}
    </div>
  );
}

/**
 * Fondo con formas geométricas flotantes
 */
interface FloatingShapesProps {
  className?: string;
  shapeCount?: number;
}

export function FloatingShapes({ className = '', shapeCount = 15 }: FloatingShapesProps) {
  const shapes = useMemo(() => {
    return Array.from({ length: shapeCount }, (_, i) => ({
      id: i,
      type: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)],
      size: 20 + Math.random() * 60,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 10 + Math.random() * 20,
      delay: Math.random() * 5,
      color: `rgba(${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 100 + 100)}, 255, 0.1)`,
    }));
  }, [shapeCount]);

  const getShapeStyle = (type: string, size: number) => {
    switch (type) {
      case 'circle':
        return { borderRadius: '50%' };
      case 'triangle':
        return {
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        };
      default:
        return { borderRadius: '8px' };
    }
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            width: shape.size,
            height: shape.size,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            backgroundColor: shape.color,
            ...getShapeStyle(shape.type, shape.size),
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, 30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/**
 * Grid de puntos interactivo
 */
interface InteractiveGridProps {
  className?: string;
  gridSize?: number;
}

export function InteractiveGrid({ className = '', gridSize = 20 }: InteractiveGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const dots = useMemo(() => {
    const dots = [];
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        dots.push({ x: i, y: j, id: `${i}-${j}` });
      }
    }
    return dots;
  }, [gridSize]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {dots.map((dot) => (
          <GridDot key={dot.id} mouseX={mouseX} mouseY={mouseY} gridX={dot.x} gridY={dot.y} gridSize={gridSize} />
        ))}
      </div>
    </div>
  );
}

function GridDot({
  mouseX,
  mouseY,
  gridX,
  gridY,
  gridSize,
}: {
  mouseX: any;
  mouseY: any;
  gridX: number;
  gridY: number;
  gridSize: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(1000);

  useEffect(() => {
    const unsubscribeX = mouseX.on('change', () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const dotX = rect.left + rect.width / 2;
        const dotY = rect.top + rect.height / 2;
        const dist = Math.sqrt(Math.pow(mouseX.get() - dotX, 2) + Math.pow(mouseY.get() - dotY, 2));
        setDistance(dist);
      }
    });

    return () => unsubscribeX();
  }, [mouseX, mouseY]);

  const scale = Math.max(0.3, 1 - distance / 200);
  const opacity = Math.max(0.2, 1 - distance / 300);

  return (
    <motion.div
      ref={ref}
      className="w-2 h-2 rounded-full bg-blue-500"
      animate={{ scale, opacity }}
      transition={{ duration: 0.1 }}
    />
  );
}
