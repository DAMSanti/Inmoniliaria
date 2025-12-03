'use client';

import { ReactNode, useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';

/**
 * FEATURE 10: Diseño adaptativo extremo + animaciones condicionadas
 * 
 * Ubicación: src/components/effects/AdaptiveDesign.tsx
 * 
 * Cambia layout, animaciones, interacciones y tipografía según
 * dispositivo, orientación y velocidad de conexión.
 */

type DeviceType = 'mobile' | 'tablet' | 'desktop';
type ConnectionType = 'slow' | 'medium' | 'fast';

interface DeviceInfo {
  type: DeviceType;
  orientation: 'portrait' | 'landscape';
  connection: ConnectionType;
  isTouchDevice: boolean;
  prefersReducedMotion: boolean;
}

/**
 * Hook para detectar información del dispositivo
 */
export function useDeviceInfo(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    type: 'desktop',
    orientation: 'landscape',
    connection: 'fast',
    isTouchDevice: false,
    prefersReducedMotion: false,
  });

  useEffect(() => {
    const updateDeviceInfo = () => {
      // Detectar tipo de dispositivo
      const width = window.innerWidth;
      let type: DeviceType = 'desktop';
      if (width < 768) type = 'mobile';
      else if (width < 1024) type = 'tablet';

      // Detectar orientación
      const orientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';

      // Detectar velocidad de conexión
      let connection: ConnectionType = 'fast';
      if ('connection' in navigator) {
        const nav = navigator as any;
        const effectiveType = nav.connection?.effectiveType;
        if (effectiveType === 'slow-2g' || effectiveType === '2g') {
          connection = 'slow';
        } else if (effectiveType === '3g') {
          connection = 'medium';
        }
      }

      // Detectar touch
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      // Detectar preferencia de movimiento reducido
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      setDeviceInfo({
        type,
        orientation,
        connection,
        isTouchDevice,
        prefersReducedMotion,
      });
    };

    updateDeviceInfo();
    window.addEventListener('resize', updateDeviceInfo);
    window.addEventListener('orientationchange', updateDeviceInfo);

    return () => {
      window.removeEventListener('resize', updateDeviceInfo);
      window.removeEventListener('orientationchange', updateDeviceInfo);
    };
  }, []);

  return deviceInfo;
}

/**
 * Contenedor adaptativo que cambia según el dispositivo
 */
interface AdaptiveContainerProps {
  children: ReactNode;
  mobileLayout?: 'stack' | 'scroll';
  tabletLayout?: 'grid-2' | 'grid-3';
  desktopLayout?: 'grid-3' | 'grid-4' | 'masonry';
  className?: string;
}

export function AdaptiveContainer({
  children,
  mobileLayout = 'stack',
  tabletLayout = 'grid-2',
  desktopLayout = 'grid-3',
  className = '',
}: AdaptiveContainerProps) {
  const { type } = useDeviceInfo();

  const getLayoutClass = () => {
    switch (type) {
      case 'mobile':
        return mobileLayout === 'stack' ? 'flex flex-col gap-4' : 'flex overflow-x-auto gap-4 snap-x';
      case 'tablet':
        return tabletLayout === 'grid-2' ? 'grid grid-cols-2 gap-6' : 'grid grid-cols-3 gap-6';
      case 'desktop':
        if (desktopLayout === 'grid-3') return 'grid grid-cols-3 gap-8';
        if (desktopLayout === 'grid-4') return 'grid grid-cols-4 gap-8';
        return 'columns-3 gap-8';
    }
  };

  return <div className={`${getLayoutClass()} ${className}`}>{children}</div>;
}

/**
 * Animación adaptativa según dispositivo y conexión
 */
interface AdaptiveAnimationProps {
  children: ReactNode;
  className?: string;
  desktopAnimation?: 'elaborate' | 'simple';
  mobileAnimation?: 'minimal' | 'none';
}

export function AdaptiveAnimation({
  children,
  className = '',
  desktopAnimation = 'elaborate',
  mobileAnimation = 'minimal',
}: AdaptiveAnimationProps) {
  const { type, connection, prefersReducedMotion } = useDeviceInfo();

  // Sin animación si el usuario prefiere movimiento reducido
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  // Animaciones reducidas en conexión lenta
  if (connection === 'slow') {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    );
  }

  // Animaciones según tipo de dispositivo
  const getVariants = (): Variants => {
    if (type === 'mobile') {
      if (mobileAnimation === 'none') {
        return {
          hidden: { opacity: 1 },
          visible: { opacity: 1 },
        };
      }
      return {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      };
    }

    if (desktopAnimation === 'elaborate') {
      return {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: 'spring',
            stiffness: 100,
            damping: 15,
          },
        },
      };
    }

    return {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 },
    };
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={getVariants()}
    >
      {children}
    </motion.div>
  );
}

/**
 * Tipografía adaptativa
 */
interface AdaptiveTypographyProps {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
}

export function AdaptiveTypography({
  children,
  as: Component = 'p',
  className = '',
}: AdaptiveTypographyProps) {
  const { type } = useDeviceInfo();

  const getSizeClass = () => {
    const sizes = {
      h1: {
        mobile: 'text-3xl',
        tablet: 'text-4xl',
        desktop: 'text-6xl',
      },
      h2: {
        mobile: 'text-2xl',
        tablet: 'text-3xl',
        desktop: 'text-5xl',
      },
      h3: {
        mobile: 'text-xl',
        tablet: 'text-2xl',
        desktop: 'text-3xl',
      },
      h4: {
        mobile: 'text-lg',
        tablet: 'text-xl',
        desktop: 'text-2xl',
      },
      p: {
        mobile: 'text-sm',
        tablet: 'text-base',
        desktop: 'text-lg',
      },
      span: {
        mobile: 'text-sm',
        tablet: 'text-base',
        desktop: 'text-base',
      },
    };

    return sizes[Component][type];
  };

  return <Component className={`${getSizeClass()} ${className}`}>{children}</Component>;
}

/**
 * Imagen optimizada según conexión
 */
interface AdaptiveImageProps {
  src: string;
  lowResSrc?: string;
  alt: string;
  className?: string;
}

export function AdaptiveImage({ src, lowResSrc, alt, className = '' }: AdaptiveImageProps) {
  const { connection, type } = useDeviceInfo();
  const [imageSrc, setImageSrc] = useState(lowResSrc || src);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Cargar imagen de baja resolución primero en conexiones lentas
    if (connection === 'slow' && lowResSrc) {
      setImageSrc(lowResSrc);
    } else {
      // Precargar imagen de alta resolución
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };
    }
  }, [src, lowResSrc, connection]);

  return (
    <motion.img
      src={imageSrc}
      alt={alt}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded || connection === 'slow' ? 1 : 0.5 }}
      transition={{ duration: 0.3 }}
      loading={type === 'mobile' ? 'lazy' : 'eager'}
    />
  );
}

/**
 * Interacción adaptativa (hover en desktop, tap en móvil)
 */
interface AdaptiveInteractionProps {
  children: ReactNode;
  className?: string;
  onInteract?: () => void;
}

export function AdaptiveInteraction({ children, className = '', onInteract }: AdaptiveInteractionProps) {
  const { isTouchDevice, prefersReducedMotion } = useDeviceInfo();

  if (prefersReducedMotion) {
    return (
      <div className={className} onClick={onInteract}>
        {children}
      </div>
    );
  }

  if (isTouchDevice) {
    return (
      <motion.div
        className={className}
        whileTap={{ scale: 0.95 }}
        onClick={onInteract}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onInteract}
    >
      {children}
    </motion.div>
  );
}

/**
 * Componente que muestra diferente contenido según dispositivo
 */
interface ResponsiveContentProps {
  mobile?: ReactNode;
  tablet?: ReactNode;
  desktop?: ReactNode;
  fallback?: ReactNode;
}

export function ResponsiveContent({ mobile, tablet, desktop, fallback }: ResponsiveContentProps) {
  const { type } = useDeviceInfo();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{fallback}</>;
  }

  switch (type) {
    case 'mobile':
      return <>{mobile || fallback}</>;
    case 'tablet':
      return <>{tablet || fallback}</>;
    case 'desktop':
      return <>{desktop || fallback}</>;
    default:
      return <>{fallback}</>;
  }
}

/**
 * Wrapper para activar/desactivar animaciones según performance
 */
interface PerformanceAwareProps {
  children: ReactNode;
  heavyContent: ReactNode;
  lightContent: ReactNode;
}

export function PerformanceAware({ heavyContent, lightContent }: PerformanceAwareProps) {
  const { connection, type, prefersReducedMotion } = useDeviceInfo();

  // Contenido ligero para móviles, conexiones lentas o preferencia de movimiento reducido
  if (type === 'mobile' || connection === 'slow' || prefersReducedMotion) {
    return <>{lightContent}</>;
  }

  return <>{heavyContent}</>;
}
