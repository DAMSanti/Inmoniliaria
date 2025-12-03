'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * FEATURE 5: Fondos interactivos 3D / WebGL
 * 
 * Ubicación: src/components/effects/WebGLBackground.tsx
 * 
 * Elementos en 3D que puedes mover, rotar o incluso interactuar con ellos.
 * Partículas flotando, modelos 3D que giran al mover el ratón.
 */

/**
 * Partículas flotantes que siguen el cursor
 */
function FloatingParticles({ count = 5000, mouse }: { count?: number; mouse: React.MutableRefObject<[number, number]> }) {
  const points = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.05;
      points.current.rotation.y = state.clock.elapsedTime * 0.08;
      
      // Seguir el mouse suavemente
      points.current.rotation.x += (mouse.current[1] * 0.5 - points.current.rotation.x) * 0.02;
      points.current.rotation.y += (mouse.current[0] * 0.5 - points.current.rotation.y) * 0.02;
    }
  });

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#6366f1"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

/**
 * Esfera de partículas
 */
function ParticleSphere({ count = 3000, radius = 2 }: { count?: number; radius?: number }) {
  const points = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * Math.cbrt(Math.random());
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, [count, radius]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#3b82f6"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

/**
 * Ondas de partículas
 */
function ParticleWaves({ count = 10000 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const initialPositions = useRef<Float32Array>();
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const gridSize = Math.sqrt(count);
    for (let i = 0; i < count; i++) {
      const x = (i % gridSize) / gridSize - 0.5;
      const z = Math.floor(i / gridSize) / gridSize - 0.5;
      positions[i * 3] = x * 10;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = z * 10;
    }
    initialPositions.current = positions.slice();
    return positions;
  }, [count]);

  useFrame((state) => {
    if (points.current && initialPositions.current) {
      const positions = points.current.geometry.attributes.position.array as Float32Array;
      const time = state.clock.elapsedTime;
      
      for (let i = 0; i < count; i++) {
        const x = initialPositions.current[i * 3];
        const z = initialPositions.current[i * 3 + 2];
        positions[i * 3 + 1] = Math.sin(x * 2 + time) * Math.cos(z * 2 + time) * 0.5;
      }
      
      points.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#8b5cf6"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.5}
      />
    </Points>
  );
}

/**
 * Controlador de cámara que sigue el mouse
 */
function CameraController({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const { camera } = useThree();
  
  useFrame(() => {
    camera.position.x += (mouse.current[0] * 2 - camera.position.x) * 0.02;
    camera.position.y += (-mouse.current[1] * 2 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

/**
 * Fondo 3D con partículas flotantes
 */
interface ParticleBackgroundProps {
  variant?: 'floating' | 'sphere' | 'waves';
  className?: string;
  color?: string;
}

export function ParticleBackground({
  variant = 'floating',
  className = '',
}: ParticleBackgroundProps) {
  const mouse = useRef<[number, number]>([0, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = [
        (e.clientX / window.innerWidth) * 2 - 1,
        (e.clientY / window.innerHeight) * 2 - 1,
      ];
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <CameraController mouse={mouse} />
        <ambientLight intensity={0.5} />
        {variant === 'floating' && <FloatingParticles mouse={mouse} />}
        {variant === 'sphere' && <ParticleSphere />}
        {variant === 'waves' && <ParticleWaves />}
      </Canvas>
    </div>
  );
}

/**
 * Gradiente animado como fondo (alternativa sin WebGL)
 */
interface AnimatedGradientProps {
  colors?: string[];
  className?: string;
  speed?: number;
}

export function AnimatedGradient({
  colors = ['#667eea', '#764ba2', '#6B8DD6', '#8E37D7'],
  className = '',
  speed = 15,
}: AnimatedGradientProps) {
  const gradientStyle = {
    background: `linear-gradient(-45deg, ${colors.join(', ')})`,
    backgroundSize: '400% 400%',
    animation: `gradient ${speed}s ease infinite`,
  };

  return (
    <>
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      <div className={`absolute inset-0 ${className}`} style={gradientStyle} />
    </>
  );
}

/**
 * Fondo con ruido dinámico
 */
export function NoiseBackground({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let animationId: number;
    const animate = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 20;
        data[i] = noise;     // R
        data[i + 1] = noise; // G
        data[i + 2] = noise + 20; // B
        data[i + 3] = 30;    // A
      }

      ctx.putImageData(imageData, 0, 0);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className={`absolute inset-0 ${className}`} />;
}
