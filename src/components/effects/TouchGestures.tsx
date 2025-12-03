'use client';

import { ReactNode, useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, PanInfo } from 'framer-motion';
import { useGesture } from '@use-gesture/react';

/**
 * FEATURE 9: Gestos y control avanzado en móviles
 * 
 * Ubicación: src/components/effects/TouchGestures.tsx
 * 
 * Interacciones con gestos táctiles complejos (deslizar, pellizcar, rotar)
 * que modifican la interfaz o contenido.
 */

/**
 * Contenedor con soporte para pellizcar (pinch) para zoom
 */
interface PinchZoomProps {
  children: ReactNode;
  className?: string;
  minScale?: number;
  maxScale?: number;
}

export function PinchZoom({
  children,
  className = '',
  minScale = 0.5,
  maxScale = 3,
}: PinchZoomProps) {
  const scale = useMotionValue(1);
  const springScale = useSpring(scale, { stiffness: 300, damping: 30 });

  const bind = useGesture({
    onPinch: ({ offset: [d] }) => {
      const newScale = Math.min(Math.max(1 + d / 100, minScale), maxScale);
      scale.set(newScale);
    },
    onPinchEnd: () => {
      scale.set(1);
    },
  });

  return (
    <motion.div
      {...bind()}
      className={`touch-none ${className}`}
      style={{ scale: springScale }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Elemento rotable con gestos
 */
interface RotatableProps {
  children: ReactNode;
  className?: string;
}

export function Rotatable({ children, className = '' }: RotatableProps) {
  const rotate = useMotionValue(0);
  const springRotate = useSpring(rotate, { stiffness: 300, damping: 30 });

  const bind = useGesture({
    onDrag: ({ movement: [mx], velocity: [vx] }) => {
      rotate.set(mx * 0.5);
    },
    onDragEnd: () => {
      rotate.set(0);
    },
  });

  return (
    <motion.div
      {...bind()}
      className={`touch-none cursor-grab active:cursor-grabbing ${className}`}
      style={{ rotate: springRotate }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Carrusel con gestos de deslizamiento
 */
interface SwipeCarouselProps {
  items: ReactNode[];
  className?: string;
  itemClassName?: string;
}

export function SwipeCarousel({ items, className = '', itemClassName = '' }: SwipeCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (info.offset.x < -threshold && currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        animate={{ x: -currentIndex * 100 + '%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {items.map((item, index) => (
          <div key={index} className={`flex-shrink-0 w-full ${itemClassName}`}>
            {item}
          </div>
        ))}
      </motion.div>
      
      {/* Indicadores */}
      <div className="flex justify-center gap-2 mt-4">
        {items.map((_, index) => (
          <motion.button
            key={index}
            className="w-2 h-2 rounded-full"
            animate={{
              backgroundColor: index === currentIndex ? '#3b82f6' : '#d1d5db',
              scale: index === currentIndex ? 1.2 : 1,
            }}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Elemento arrastrable con física realista
 */
interface DraggableCardProps {
  children: ReactNode;
  className?: string;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

export function DraggableCard({
  children,
  className = '',
  onSwipeLeft,
  onSwipeRight,
}: DraggableCardProps) {
  const x = useMotionValue(0);
  const rotate = useMotionValue(0);
  const opacity = useMotionValue(1);

  const springX = useSpring(x, { stiffness: 500, damping: 30 });
  const springRotate = useSpring(rotate, { stiffness: 500, damping: 30 });

  const handleDrag = (event: any, info: PanInfo) => {
    x.set(info.offset.x);
    rotate.set(info.offset.x * 0.05);
    opacity.set(1 - Math.abs(info.offset.x) / 300);
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 150;
    if (info.offset.x > threshold) {
      onSwipeRight?.();
    } else if (info.offset.x < -threshold) {
      onSwipeLeft?.();
    }
    x.set(0);
    rotate.set(0);
    opacity.set(1);
  };

  return (
    <motion.div
      className={`cursor-grab active:cursor-grabbing ${className}`}
      style={{ x: springX, rotate: springRotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.5}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

/**
 * Lista reordenable con drag and drop
 */
interface ReorderableListProps {
  items: { id: string; content: ReactNode }[];
  onReorder: (items: { id: string; content: ReactNode }[]) => void;
  className?: string;
  itemClassName?: string;
}

export function ReorderableList({
  items,
  onReorder,
  className = '',
  itemClassName = '',
}: ReorderableListProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className={className}>
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          className={`${itemClassName} ${activeId === item.id ? 'z-10' : ''}`}
          layout
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.1}
          onDragStart={() => setActiveId(item.id)}
          onDragEnd={(event, info) => {
            setActiveId(null);
            const moveBy = Math.round(info.offset.y / 60);
            if (moveBy !== 0) {
              const newIndex = Math.min(Math.max(index + moveBy, 0), items.length - 1);
              const newItems = [...items];
              const [removed] = newItems.splice(index, 1);
              newItems.splice(newIndex, 0, removed);
              onReorder(newItems);
            }
          }}
          whileDrag={{ scale: 1.02, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
        >
          {item.content}
        </motion.div>
      ))}
    </div>
  );
}

/**
 * Galería con gestos de pellizcar y arrastrar
 */
interface GestureGalleryProps {
  images: string[];
  className?: string;
}

export function GestureGallery({ images, className = '' }: GestureGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scale = useMotionValue(1);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springScale = useSpring(scale, { stiffness: 300, damping: 30 });
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const bind = useGesture({
    onPinch: ({ offset: [d] }) => {
      scale.set(Math.max(1, 1 + d / 100));
    },
    onPinchEnd: () => {
      scale.set(1);
      x.set(0);
      y.set(0);
    },
    onDrag: ({ movement: [mx, my], pinching }) => {
      if (scale.get() > 1) {
        x.set(mx);
        y.set(my);
      }
    },
    onDragEnd: ({ velocity: [vx], direction: [dx] }) => {
      if (scale.get() === 1) {
        if (Math.abs(vx) > 0.5) {
          if (dx > 0 && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
          } else if (dx < 0 && currentIndex < images.length - 1) {
            setCurrentIndex(currentIndex + 1);
          }
        }
      }
    },
  });

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        {...bind()}
        className="touch-none flex"
        animate={{ x: -currentIndex * 100 + '%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0 w-full h-full"
            style={{
              scale: index === currentIndex ? springScale : 1,
              x: index === currentIndex ? springX : 0,
              y: index === currentIndex ? springY : 0,
            }}
          >
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </motion.div>
        ))}
      </motion.div>
      
      {/* Contador */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}

/**
 * Pull to refresh
 */
interface PullToRefreshProps {
  children: ReactNode;
  onRefresh: () => Promise<void>;
  className?: string;
}

export function PullToRefresh({ children, onRefresh, className = '' }: PullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const y = useMotionValue(0);
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const handleDragEnd = async (event: any, info: PanInfo) => {
    if (info.offset.y > 100 && !isRefreshing) {
      setIsRefreshing(true);
      await onRefresh();
      setIsRefreshing(false);
    }
    y.set(0);
  };

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="absolute top-0 left-0 right-0 flex justify-center items-center h-16"
        style={{ y: springY, opacity: springY }}
      >
        <motion.div
          animate={{ rotate: isRefreshing ? 360 : 0 }}
          transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0 }}
          className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"
        />
      </motion.div>
      
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.5}
        onDrag={(event, info) => {
          if (info.offset.y > 0) {
            y.set(Math.min(info.offset.y, 100));
          }
        }}
        onDragEnd={handleDragEnd}
        style={{ y: springY }}
      >
        {children}
      </motion.div>
    </div>
  );
}
