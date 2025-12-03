# 🎨 Guía de Efectos Visuales Avanzados

Esta documentación describe cada una de las 10 características visuales avanzadas implementadas en la plataforma, junto con su ubicación en el código y ejemplos de uso.

---

## 📁 Estructura de Archivos

```
src/components/effects/
├── index.ts                    # Exportaciones de todos los efectos
├── ParallaxLayer.tsx           # Feature 1: Parallax multicapa
├── ScrollAnimations.tsx        # Feature 2: Animaciones de scroll
├── MicroInteractions.tsx       # Feature 3: Microinteracciones
├── KineticTypography.tsx       # Feature 4: Tipografía cinética
├── WebGLBackground.tsx         # Feature 5: Fondos 3D WebGL
├── PageTransitions.tsx         # Feature 6: Transiciones de página
├── DepthEffects.tsx            # Feature 7: Efectos de profundidad
├── GenerativeAnimations.tsx    # Feature 8: Animaciones generativas
├── TouchGestures.tsx           # Feature 9: Gestos táctiles
└── AdaptiveDesign.tsx          # Feature 10: Diseño adaptativo
```

---

## 1️⃣ Efecto Parallax Multicapa Avanzado

**Archivo:** `src/components/effects/ParallaxLayer.tsx`

Crea sensación de profundidad 3D con múltiples capas que se mueven a diferentes velocidades según el scroll.

### Componentes disponibles:
- `ParallaxLayer` - Capa individual con velocidad configurable
- `ParallaxContainer` - Contenedor para múltiples capas
- `ParallaxBackground` - Fondo con múltiples capas predefinidas

### Uso en la página:
```tsx
import { ParallaxLayer, ParallaxContainer } from '@/components/effects/ParallaxLayer';

<ParallaxContainer>
  <ParallaxLayer speed={0.3}>
    <h1>Título que se mueve lento</h1>
  </ParallaxLayer>
  <ParallaxLayer speed={0.7}>
    <p>Texto que se mueve más rápido</p>
  </ParallaxLayer>
</ParallaxContainer>
```

### Ubicación en page.tsx:
- Hero section: Título y subtítulo con diferentes velocidades (líneas ~160-180)

---

## 2️⃣ Animaciones e Interacciones basadas en Scroll

**Archivo:** `src/components/effects/ScrollAnimations.tsx`

Contenido que aparece, se transforma o se deforma según la posición del scroll.

### Componentes disponibles:
- `ScrollReveal` - Elementos que aparecen al hacer scroll
- `ScrollExpandText` - Texto que se expande/contrae
- `ScrollRotate` - Elementos que rotan con el scroll
- `ScrollScale` - Elementos que escalan con el scroll
- `ScrollProgress` - Barra de progreso de scroll
- `ScrollMorph` - Contenedor que cambia de forma

### Uso:
```tsx
import { ScrollReveal, ScrollProgress } from '@/components/effects/ScrollAnimations';

// Barra de progreso fija en la parte superior
<ScrollProgress color="#6366f1" height={3} />

// Elemento que aparece desde abajo
<ScrollReveal direction="up" delay={0.3}>
  <div>Contenido que aparece</div>
</ScrollReveal>
```

### Ubicación en page.tsx:
- Barra de progreso: parte superior fija (línea ~73)
- Todas las secciones usan `ScrollReveal` para aparecer
- Destinos: `ScrollScale` para efecto de escala (línea ~290)

---

## 3️⃣ Microinteracciones Personalizadas

**Archivo:** `src/components/effects/MicroInteractions.tsx`

Pequeños detalles que responden a las acciones del usuario.

### Componentes disponibles:
- `BreathingButton` - Botón que "respira" al hover
- `TiltCard` - Tarjeta con inclinación 3D al mover ratón
- `MorphIcon` - Icono que se transforma en otro
- `RippleButton` - Botón con efecto de onda al click
- `AnimatedLink` - Enlace con subrayado animado
- `LoadingSpinner` - Indicador de carga animado
- `AnimatedMenuIcon` - Icono hamburguesa animado

### Uso:
```tsx
import { BreathingButton, TiltCard, RippleButton } from '@/components/effects/MicroInteractions';

<BreathingButton color="#6366f1">
  Botón que respira
</BreathingButton>

<TiltCard intensity={15}>
  <div>Tarjeta con efecto 3D</div>
</TiltCard>

<RippleButton className="bg-blue-600 text-white px-4 py-2">
  Click para ver onda
</RippleButton>
```

### Ubicación en page.tsx:
- Header: `BreathingButton` para login (línea ~100)
- Header móvil: `AnimatedMenuIcon` (línea ~110)
- Buscador: `RippleButton` (línea ~158)
- Propiedades: `TiltCard` en cada tarjeta (línea ~220)
- Footer: `AnimatedLink` en todos los enlaces

---

## 4️⃣ Tipografía Cinética o Variable

**Archivo:** `src/components/effects/KineticTypography.tsx`

Texto que cambia de forma, tamaño o posición dinámicamente.

### Componentes disponibles:
- `StretchText` - Texto que se estira con scroll
- `TypewriterText` - Efecto máquina de escribir
- `FloatingText` - Letras que flotan
- `CascadeText` - Letras que aparecen en cascada
- `GlitchText` - Efecto de glitch/distorsión
- `MouseFollowText` - Texto que sigue el cursor
- `VariableWeightText` - Peso de fuente variable
- `RotatingWords` - Palabras que rotan/cambian

### Uso:
```tsx
import { CascadeText, RotatingWords, GlitchText } from '@/components/effects/KineticTypography';

<CascadeText text="Texto en cascada" staggerDelay={0.05} />

<RotatingWords 
  prefix="Somos" 
  words={['creativos', 'innovadores', 'únicos']} 
/>

<GlitchText text="Efecto Glitch" />
```

### Ubicación en page.tsx:
- Hero: `CascadeText` para título principal (línea ~142)
- Hero: `RotatingWords` para subtítulo dinámico (línea ~153)
- Header/Footer: `GlitchText` para logo (línea ~86)
- Propiedades: `FloatingText` para título de sección (línea ~197)

---

## 5️⃣ Fondos Interactivos 3D / WebGL

**Archivo:** `src/components/effects/WebGLBackground.tsx`

Elementos 3D interactivos usando Three.js.

### Componentes disponibles:
- `ParticleBackground` - Partículas flotantes (variantes: floating, sphere, waves)
- `AnimatedGradient` - Gradiente animado (alternativa sin WebGL)
- `NoiseBackground` - Ruido dinámico

### Uso:
```tsx
import { ParticleBackground, AnimatedGradient } from '@/components/effects/WebGLBackground';

// Con WebGL (partículas 3D)
<ParticleBackground variant="floating" />

// Sin WebGL (más ligero)
<AnimatedGradient colors={['#667eea', '#764ba2']} speed={15} />
```

### Nota importante:
El componente `ParticleBackground` con WebGL puede ser pesado. Se recomienda usar `AnimatedGradient` para dispositivos móviles o conexiones lentas.

### Ubicación en page.tsx:
- Se puede activar cambiando `FloatingShapes` por `ParticleBackground` en el hero

---

## 6️⃣ Transiciones de Página Fluidas

**Archivo:** `src/components/effects/PageTransitions.tsx`

Transiciones suaves entre secciones o páginas.

### Componentes disponibles:
- `FadeTransition` - Desvanecimiento
- `SlideTransition` - Deslizamiento lateral
- `ScaleTransition` - Escalado
- `CurtainTransition` - Cortina
- `CircleTransition` - Círculo expandible
- `BlocksTransition` - Bloques
- `SectionTransition` - Transición de sección
- `StaggerContainer` / `StaggerItem` - Elementos en secuencia

### Uso:
```tsx
import { SectionTransition, StaggerContainer, StaggerItem } from '@/components/effects/PageTransitions';

<SectionTransition>
  <h2>Sección con transición</h2>
</SectionTransition>

<StaggerContainer staggerDelay={0.1}>
  <StaggerItem>Elemento 1</StaggerItem>
  <StaggerItem>Elemento 2</StaggerItem>
  <StaggerItem>Elemento 3</StaggerItem>
</StaggerContainer>
```

### Ubicación en page.tsx:
- Todas las secciones: `SectionTransition` (líneas ~184, ~269, ~310)
- Propiedades: `StaggerContainer` + `StaggerItem` para tarjetas (línea ~208)
- Servicios: `StaggerContainer` para features (línea ~328)

---

## 7️⃣ Efectos de Profundidad y Luz

**Archivo:** `src/components/effects/DepthEffects.tsx`

Sombras dinámicas, brillos y efectos de luz.

### Componentes disponibles:
- `DynamicShadowCard` - Sombra que sigue el cursor
- `SpotlightCard` - Spotlight que sigue el cursor
- `GlassCard` - Efecto glassmorphism
- `GradientBorder` - Borde con gradiente animado
- `NeonGlow` - Efecto neón/glow
- `LightParticles` - Partículas de luz flotantes
- `AuroraBackground` - Fondo tipo aurora boreal

### Uso:
```tsx
import { SpotlightCard, GlassCard, NeonGlow } from '@/components/effects/DepthEffects';

<SpotlightCard>
  <div>Contenido con spotlight</div>
</SpotlightCard>

<GlassCard blur={15} opacity={0.1}>
  <div>Contenido con efecto glass</div>
</GlassCard>

<NeonGlow color="#6366f1" intensity={20}>
  <span>Texto con neón</span>
</NeonGlow>
```

### Ubicación en page.tsx:
- Header: `GlassCard` (línea ~80)
- Buscador: `SpotlightCard` (línea ~144)
- Propiedades: `DynamicShadowCard` en tarjetas (línea ~225)
- Rating: `NeonGlow` en badges (línea ~238)
- Hero: `LightParticles` de fondo (línea ~128)
- Servicios: `GlassCard` en cada feature (línea ~338)

---

## 8️⃣ Animaciones Generativas basadas en Datos

**Archivo:** `src/components/effects/GenerativeAnimations.tsx`

Gráficos y fondos que cambian en tiempo real.

### Componentes disponibles:
- `BreathingBackground` - Fondo que cambia según hora del día
- `LissajousParticles` - Partículas con patrones matemáticos
- `GenerativeWaves` - Ondas SVG animadas
- `DataBubbles` - Visualización de datos en burbujas
- `FloatingShapes` - Formas geométricas flotantes
- `InteractiveGrid` - Grid de puntos interactivo

### Uso:
```tsx
import { FloatingShapes, GenerativeWaves } from '@/components/effects/GenerativeAnimations';

<FloatingShapes shapeCount={20} />
<GenerativeWaves waveCount={4} className="opacity-30" />
```

### Ubicación en page.tsx:
- Fondo global: `FloatingShapes` (línea ~75)
- Hero: `GenerativeWaves` de fondo (línea ~125)
- CTA section: `GenerativeWaves` (línea ~354)

---

## 9️⃣ Gestos y Control Avanzado en Móviles

**Archivo:** `src/components/effects/TouchGestures.tsx`

Interacciones táctiles avanzadas.

### Componentes disponibles:
- `PinchZoom` - Zoom con pellizco
- `Rotatable` - Elemento rotable con gestos
- `SwipeCarousel` - Carrusel con swipe
- `DraggableCard` - Tarjeta arrastrable (tipo Tinder)
- `ReorderableList` - Lista reordenable
- `GestureGallery` - Galería con gestos
- `PullToRefresh` - Tirar para refrescar

### Uso:
```tsx
import { SwipeCarousel, DraggableCard } from '@/components/effects/TouchGestures';

<SwipeCarousel items={[<Card1 />, <Card2 />, <Card3 />]} />

<DraggableCard 
  onSwipeLeft={() => console.log('No')}
  onSwipeRight={() => console.log('Sí')}
>
  <div>Arrastra para decidir</div>
</DraggableCard>
```

### Nota:
Estos componentes están disponibles pero se activan principalmente en dispositivos táctiles. Se pueden usar para galerías de propiedades o carruseles.

---

## 🔟 Diseño Adaptativo Extremo

**Archivo:** `src/components/effects/AdaptiveDesign.tsx`

Diseño que se adapta al dispositivo, conexión y preferencias.

### Componentes y hooks disponibles:
- `useDeviceInfo()` - Hook para detectar dispositivo
- `AdaptiveContainer` - Layout adaptativo
- `AdaptiveAnimation` - Animaciones según dispositivo
- `AdaptiveTypography` - Tipografía responsiva
- `AdaptiveImage` - Imágenes optimizadas
- `AdaptiveInteraction` - Interacciones adaptativas
- `ResponsiveContent` - Contenido diferente por dispositivo
- `PerformanceAware` - Contenido según rendimiento

### Uso:
```tsx
import { useDeviceInfo, AdaptiveAnimation, AdaptiveInteraction } from '@/components/effects/AdaptiveDesign';

const { type, connection, prefersReducedMotion } = useDeviceInfo();

<AdaptiveAnimation 
  desktopAnimation="elaborate" 
  mobileAnimation="minimal"
>
  <div>Animación adaptativa</div>
</AdaptiveAnimation>

<AdaptiveInteraction onInteract={() => console.log('Interacción')}>
  <div>Hover en desktop, tap en móvil</div>
</AdaptiveInteraction>
```

### Ubicación en page.tsx:
- Hero: `AdaptiveTypography` para título (línea ~140)
- Propiedades: `AdaptiveInteraction` en tarjetas (línea ~217)
- Destinos: `AdaptiveInteraction` (línea ~282)

---

## 🚀 Cómo Desplegar

1. **Commit y push de todos los cambios:**
```bash
git add .
git commit -m "feat: implementar 10 efectos visuales avanzados"
git push
```

2. **En el Droplet de DigitalOcean:**
```bash
cd ~/app
git pull
docker compose -f docker-compose.light.yml down
docker volume rm app_node_modules
docker compose -f docker-compose.light.yml up -d
docker logs -f vacacional_app
```

---

## ⚡ Notas de Rendimiento

1. **WebGL/Three.js**: El fondo con partículas 3D puede ser pesado. Se ha incluido una alternativa con `AnimatedGradient` para dispositivos menos potentes.

2. **Animaciones reducidas**: Los componentes respetan `prefers-reduced-motion` del sistema operativo.

3. **Lazy loading**: Las animaciones complejas se activan solo cuando el elemento entra en el viewport.

4. **Conexión lenta**: El sistema detecta la velocidad de conexión y reduce animaciones automáticamente.

---

## 🎯 Resumen de Features por Sección

| Sección | Features Usadas |
|---------|-----------------|
| Header | GlassCard, GlitchText, BreathingButton, AnimatedMenuIcon, AnimatedLink |
| Hero | ParallaxLayer, CascadeText, RotatingWords, SpotlightCard, RippleButton, GenerativeWaves, LightParticles |
| Propiedades | ScrollReveal, StaggerContainer, TiltCard, DynamicShadowCard, NeonGlow, AdaptiveInteraction |
| Destinos | ScrollScale, SpotlightCard, AdaptiveInteraction |
| Servicios | StaggerContainer, TiltCard, GlassCard |
| CTA | GenerativeWaves, GlassCard, BreathingButton, RippleButton |
| Footer | GlitchText, AnimatedLink |
| Global | ScrollProgress, FloatingShapes |
