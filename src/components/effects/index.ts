/**
 * ÍNDICE DE EFECTOS VISUALES AVANZADOS
 * =====================================
 * 
 * Este archivo exporta todos los componentes de efectos visuales
 * disponibles en la plataforma.
 */

// FEATURE 1: Efecto Parallax Multicapa Avanzado
export {
  ParallaxLayer,
  ParallaxContainer,
  ParallaxBackground,
} from './ParallaxLayer';

// FEATURE 2: Animaciones e interacciones basadas en el scroll
export {
  ScrollReveal,
  ScrollExpandText,
  ScrollRotate,
  ScrollScale,
  ScrollProgress,
  ScrollMorph,
} from './ScrollAnimations';

// FEATURE 3: Microinteracciones personalizadas
export {
  BreathingButton,
  TiltCard,
  MorphIcon,
  RippleButton,
  AnimatedLink,
  LoadingSpinner,
  AnimatedMenuIcon,
} from './MicroInteractions';

// FEATURE 4: Tipografía cinética o variable
export {
  StretchText,
  TypewriterText,
  FloatingText,
  CascadeText,
  GlitchText,
  MouseFollowText,
  VariableWeightText,
  RotatingWords,
} from './KineticTypography';

// FEATURE 5: Fondos interactivos 3D / WebGL
export {
  ParticleBackground,
  AnimatedGradient,
  NoiseBackground,
} from './WebGLBackground';

// FEATURE 6: Transiciones de página fluidas
export {
  FadeTransition,
  SlideTransition,
  ScaleTransition,
  CurtainTransition,
  CircleTransition,
  BlocksTransition,
  SectionTransition,
  StaggerContainer,
  StaggerItem,
} from './PageTransitions';

// FEATURE 7: Integración de efectos de profundidad y luz
export {
  DynamicShadowCard,
  SpotlightCard,
  GlassCard,
  GradientBorder,
  NeonGlow,
  LightParticles,
  AuroraBackground,
} from './DepthEffects';

// FEATURE 8: Animaciones generativas o basadas en datos
export {
  BreathingBackground,
  LissajousParticles,
  GenerativeWaves,
  DataBubbles,
  FloatingShapes,
  InteractiveGrid,
} from './GenerativeAnimations';

// FEATURE 9: Gestos y control avanzado en móviles
export {
  PinchZoom,
  Rotatable,
  SwipeCarousel,
  DraggableCard,
  ReorderableList,
  GestureGallery,
  PullToRefresh,
} from './TouchGestures';

// FEATURE 10: Diseño adaptativo extremo + animaciones condicionadas
export {
  useDeviceInfo,
  AdaptiveContainer,
  AdaptiveAnimation,
  AdaptiveTypography,
  AdaptiveImage,
  AdaptiveInteraction,
  ResponsiveContent,
  PerformanceAware,
} from './AdaptiveDesign';
