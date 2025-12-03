'use client';

import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// FEATURE 1: Parallax
import { ParallaxLayer, ParallaxContainer } from '../components/effects/ParallaxLayer';

// FEATURE 2: Scroll Animations
import { ScrollReveal, ScrollProgress, ScrollScale } from '../components/effects/ScrollAnimations';

// FEATURE 3: Microinteractions
import { TiltCard, BreathingButton, RippleButton, AnimatedLink, AnimatedMenuIcon } from '../components/effects/MicroInteractions';

// FEATURE 4: Kinetic Typography
import { CascadeText, RotatingWords, FloatingText, GlitchText } from '../components/effects/KineticTypography';

// FEATURE 6: Page Transitions
import { SectionTransition, StaggerContainer, StaggerItem } from '../components/effects/PageTransitions';

// FEATURE 7: Depth Effects
import { SpotlightCard, GlassCard, NeonGlow, LightParticles, DynamicShadowCard } from '../components/effects/DepthEffects';

// FEATURE 8: Generative Animations
import { FloatingShapes, GenerativeWaves } from '../components/effects/GenerativeAnimations';

// FEATURE 10: Adaptive Design
import { AdaptiveAnimation, AdaptiveTypography, AdaptiveInteraction, useDeviceInfo } from '../components/effects/AdaptiveDesign';

// CURSOR FUTURISTA
import { FuturisticCursorComplete } from '../components/effects/CursorEffects';

// Datos de ejemplo
const properties = [
  {
    id: 1,
    title: 'Villa Mediterránea',
    location: 'Costa Brava, España',
    price: 250,
    rating: 4.9,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
  },
  {
    id: 2,
    title: 'Apartamento Frente al Mar',
    location: 'Málaga, España',
    price: 180,
    rating: 4.8,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
  },
  {
    id: 3,
    title: 'Casa Rural con Piscina',
    location: 'Sevilla, España',
    price: 150,
    rating: 4.7,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
  },
  {
    id: 4,
    title: 'Ático de Lujo',
    location: 'Barcelona, España',
    price: 350,
    rating: 5.0,
    reviews: 45,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
  },
  {
    id: 5,
    title: 'Chalet en la Montaña',
    location: 'Pirineos, España',
    price: 200,
    rating: 4.9,
    reviews: 78,
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800',
  },
  {
    id: 6,
    title: 'Bungalow Tropical',
    location: 'Canarias, España',
    price: 175,
    rating: 4.6,
    reviews: 92,
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800',
  },
];

const destinations = [
  { name: 'Barcelona', count: 234, image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400' },
  { name: 'Málaga', count: 189, image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400' },
  { name: 'Ibiza', count: 156, image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400' },
  { name: 'Canarias', count: 201, image: 'https://images.unsplash.com/photo-1559599746-c0f31c73d93e?w=400' },
];

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  const { type: deviceType, prefersReducedMotion } = useDeviceInfo();

  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* CURSOR FUTURISTA - Trail + Glow + Ripples */}
      <FuturisticCursorComplete />
      
      {/* FEATURE 2: Barra de progreso de scroll */}
      <ScrollProgress color="#6366f1" height={3} />

      {/* FEATURE 8: Formas flotantes de fondo */}
      <FloatingShapes shapeCount={20} />

      {/* Header con efecto glass */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        style={{ opacity: headerOpacity }}
      >
        {/* FEATURE 7: Glass Card para header */}
        <GlassCard className="mx-4 mt-4 rounded-2xl" blur={15} opacity={0.1}>
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            {/* FEATURE 4: Logo con efecto glitch */}
            <GlitchText text="🏖️ Vacacional" className="text-2xl font-bold" />
            
            {/* Navegación desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              {/* FEATURE 3: Enlaces animados */}
              <AnimatedLink href="#propiedades" className="text-gray-300 hover:text-white transition">
                Propiedades
              </AnimatedLink>
              <AnimatedLink href="#destinos" className="text-gray-300 hover:text-white transition">
                Destinos
              </AnimatedLink>
              <AnimatedLink href="#servicios" className="text-gray-300 hover:text-white transition">
                Servicios
              </AnimatedLink>
              <AnimatedLink href="#contacto" className="text-gray-300 hover:text-white transition">
                Contacto
              </AnimatedLink>
              
              {/* FEATURE 3: Botón con efecto respiración */}
              <BreathingButton className="text-sm" color="#6366f1">
                Iniciar Sesión
              </BreathingButton>
            </nav>

            {/* Menú móvil */}
            <div className="md:hidden">
              {/* FEATURE 3: Icono de menú animado */}
              <AnimatedMenuIcon
                isOpen={isMenuOpen}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                color="white"
              />
            </div>
          </div>
        </GlassCard>
      </motion.header>

      {/* Hero Section con PARALLAX DRAMÁTICO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        
        {/* ===== FEATURE 1: PARALLAX MULTICAPA EXTREMO ===== */}
        <ParallaxContainer className="absolute inset-0">
          
          {/* Capa 1: Fondo degradado - MUY LENTO (profundidad máxima) */}
          <ParallaxLayer speed={-0.8} className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-950" />
          </ParallaxLayer>
          
          {/* Capa 2: Círculos grandes borrosos - LENTO */}
          <ParallaxLayer speed={-0.5} direction="both" className="absolute inset-0 z-10">
            <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
            <div className="absolute bottom-40 right-20 w-80 h-80 bg-purple-500/40 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/30 rounded-full blur-3xl" />
          </ParallaxLayer>
          
          {/* Capa 3: Montañas/Formas geométricas - MEDIO LENTO */}
          <ParallaxLayer speed={-0.3} className="absolute inset-0 z-20">
            <svg className="absolute bottom-0 w-full h-1/2" viewBox="0 0 1440 400" preserveAspectRatio="none">
              <polygon fill="rgba(99, 102, 241, 0.3)" points="0,400 200,200 400,300 600,150 800,250 1000,100 1200,200 1440,50 1440,400" />
            </svg>
          </ParallaxLayer>
          
          {/* Capa 4: Segunda capa de montañas - MEDIO */}
          <ParallaxLayer speed={-0.1} className="absolute inset-0 z-30">
            <svg className="absolute bottom-0 w-full h-1/3" viewBox="0 0 1440 300" preserveAspectRatio="none">
              <polygon fill="rgba(139, 92, 246, 0.4)" points="0,300 300,150 500,200 700,100 900,180 1100,80 1300,150 1440,100 1440,300" />
            </svg>
          </ParallaxLayer>
          
          {/* Capa 5: Estrellas/Puntos decorativos - HORIZONTAL LENTO */}
          <ParallaxLayer speed={0.2} direction="horizontal" className="absolute inset-0 z-25 pointer-events-none">
            <div className="absolute top-[15%] left-[10%] w-2 h-2 bg-white rounded-full animate-pulse" />
            <div className="absolute top-[25%] left-[25%] w-3 h-3 bg-yellow-300 rounded-full animate-pulse" style={{animationDelay: '0.5s'}} />
            <div className="absolute top-[10%] left-[50%] w-2 h-2 bg-blue-300 rounded-full animate-pulse" style={{animationDelay: '1s'}} />
            <div className="absolute top-[30%] left-[70%] w-4 h-4 bg-purple-300 rounded-full animate-pulse" style={{animationDelay: '0.3s'}} />
            <div className="absolute top-[20%] left-[85%] w-2 h-2 bg-pink-300 rounded-full animate-pulse" style={{animationDelay: '0.7s'}} />
            <div className="absolute top-[35%] left-[40%] w-3 h-3 bg-cyan-300 rounded-full animate-pulse" style={{animationDelay: '1.2s'}} />
          </ParallaxLayer>
          
          {/* Capa 6: Iconos flotantes grandes - MOVIMIENTO OPUESTO */}
          <ParallaxLayer speed={0.6} direction="both" rotate scale className="absolute inset-0 z-35 pointer-events-none">
            <div className="absolute top-[20%] left-[5%] text-6xl opacity-20">🏠</div>
            <div className="absolute top-[60%] left-[15%] text-7xl opacity-15">🌴</div>
            <div className="absolute top-[15%] right-[10%] text-8xl opacity-20">✈️</div>
            <div className="absolute top-[50%] right-[5%] text-6xl opacity-15">🏖️</div>
            <div className="absolute bottom-[30%] left-[40%] text-7xl opacity-10">🌊</div>
          </ParallaxLayer>
          
          {/* Capa 7: Líneas decorativas - HORIZONTAL RÁPIDO */}
          <ParallaxLayer speed={0.8} direction="horizontal" className="absolute inset-0 z-15 pointer-events-none">
            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />
          </ParallaxLayer>
          
          {/* Capa 8: Formas geométricas flotantes con rotación */}
          <ParallaxLayer speed={0.4} direction="both" rotate className="absolute inset-0 z-40 pointer-events-none">
            <div className="absolute top-[40%] left-[20%] w-20 h-20 border-2 border-white/20 rotate-45" />
            <div className="absolute top-[25%] right-[25%] w-16 h-16 border-2 border-purple-400/30 rounded-full" />
            <div className="absolute bottom-[35%] left-[60%] w-12 h-12 border-2 border-cyan-400/25 rotate-12" />
            <div className="absolute top-[55%] left-[75%] w-24 h-24 border border-pink-400/20 rounded-lg rotate-[-20deg]" />
          </ParallaxLayer>
          
        </ParallaxContainer>
        
        {/* FEATURE 8: Ondas generativas de fondo */}
        <GenerativeWaves waveCount={4} className="opacity-30" />
        
        {/* FEATURE 7: Partículas de luz */}
        <LightParticles count={30} />

        {/* Contenido principal del Hero */}
        <div className="relative z-50 text-center px-4 max-w-5xl mx-auto">
          
          {/* FEATURE 1: Título con parallax intenso */}
          <ParallaxLayer speed={0.5} className="mb-6">
            {/* FEATURE 4: Texto con cascada */}
            <AdaptiveTypography as="h1" className="font-bold">
              <CascadeText 
                text="Encuentra tu escapada perfecta" 
                className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl"
                staggerDelay={0.03}
              />
            </AdaptiveTypography>
          </ParallaxLayer>

          {/* FEATURE 1: Subtítulo con parallax diferente */}
          <ParallaxLayer speed={0.8} direction="horizontal">
            {/* FEATURE 4: Texto con palabras rotativas */}
            <p className="text-xl md:text-2xl text-gray-300 mb-12">
              <RotatingWords
                prefix="Descubre alojamientos"
                words={['únicos', 'exclusivos', 'increíbles', 'memorables']}
                suffix="para tus vacaciones"
                interval={2500}
              />
            </p>
          </ParallaxLayer>

          {/* FEATURE 2: Scroll reveal para el buscador */}
          <ScrollReveal direction="up" delay={0.5}>
            {/* FEATURE 7: Spotlight card para buscador */}
            <SpotlightCard className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <label className="text-xs text-gray-400 mb-1 block">Destino</label>
                  <input
                    type="text"
                    placeholder="¿A dónde quieres ir?"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  />
                </div>
                <div className="relative">
                  <label className="text-xs text-gray-400 mb-1 block">Llegada</label>
                  <input
                    type="date"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  />
                </div>
                <div className="relative">
                  <label className="text-xs text-gray-400 mb-1 block">Salida</label>
                  <input
                    type="date"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  />
                </div>
                {/* FEATURE 3: Botón ripple */}
                <div className="flex items-end">
                  <RippleButton className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl px-6 py-3 font-semibold hover:from-indigo-700 hover:to-purple-700 transition">
                    🔍 Buscar
                  </RippleButton>
                </div>
              </div>
            </SpotlightCard>
          </ScrollReveal>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
              <motion.div
                className="w-1.5 h-1.5 bg-white rounded-full"
                animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Propiedades Destacadas */}
      <section id="propiedades" className="py-24 px-4 relative">
        {/* FEATURE 6: Transición de sección */}
        <SectionTransition>
          <div className="max-w-7xl mx-auto">
            {/* FEATURE 2: Scroll reveal para título */}
            <ScrollReveal direction="up">
              <div className="text-center mb-16">
                {/* FEATURE 4: Texto flotante */}
                <FloatingText 
                  text="Propiedades Destacadas" 
                  className="text-4xl md:text-5xl font-bold mb-4"
                />
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                  Selección exclusiva de los mejores alojamientos para tus vacaciones
                </p>
              </div>
            </ScrollReveal>

            {/* FEATURE 6: Contenedor con stagger */}
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.15}>
              {properties.map((property) => (
                <StaggerItem key={property.id}>
                  {/* FEATURE 10: Interacción adaptativa */}
                  <AdaptiveInteraction>
                    {/* FEATURE 3: Tarjeta con inclinación 3D */}
                    <TiltCard intensity={10}>
                      {/* FEATURE 7: Tarjeta con sombra dinámica */}
                      <DynamicShadowCard
                        className="bg-slate-900/80 rounded-2xl overflow-hidden border border-white/10"
                        shadowColor="rgba(99, 102, 241, 0.3)"
                        intensity={20}
                      >
                        {/* Imagen con overlay */}
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src={property.image}
                            alt={property.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                          <div className="absolute top-4 right-4">
                            {/* FEATURE 7: Efecto neón */}
                            <NeonGlow color="#6366f1" intensity={10}>
                              <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                ⭐ {property.rating}
                              </span>
                            </NeonGlow>
                          </div>
                        </div>

                        {/* Contenido */}
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-2">{property.title}</h3>
                          <p className="text-gray-400 text-sm mb-4 flex items-center">
                            <span className="mr-2">📍</span>
                            {property.location}
                          </p>
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="text-2xl font-bold text-indigo-400">{property.price}€</span>
                              <span className="text-gray-500 text-sm">/noche</span>
                            </div>
                            <span className="text-gray-500 text-sm">
                              {property.reviews} reseñas
                            </span>
                          </div>
                        </div>
                      </DynamicShadowCard>
                    </TiltCard>
                  </AdaptiveInteraction>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Botón ver más */}
            <ScrollReveal direction="up" delay={0.8}>
              <div className="text-center mt-12">
                <BreathingButton color="#6366f1">
                  Ver todas las propiedades →
                </BreathingButton>
              </div>
            </ScrollReveal>
          </div>
        </SectionTransition>
      </section>

      {/* Destinos Populares */}
      <section id="destinos" className="py-24 px-4 bg-slate-900/50 relative">
        <SectionTransition>
          <div className="max-w-7xl mx-auto">
            <ScrollReveal direction="left">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Destinos Populares
                </h2>
                <p className="text-gray-400 text-lg">
                  Los lugares favoritos de nuestros viajeros
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {destinations.map((destination, index) => (
                <ScrollReveal key={destination.name} direction="scale" delay={index * 0.1}>
                  {/* FEATURE 2: Escala con scroll */}
                  <ScrollScale scaleRange={[0.9, 1, 0.9]}>
                    <AdaptiveInteraction>
                      <SpotlightCard className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer">
                        <img
                          src={destination.image}
                          alt={destination.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
                          <p className="text-gray-300 text-sm">{destination.count} propiedades</p>
                        </div>
                      </SpotlightCard>
                    </AdaptiveInteraction>
                  </ScrollScale>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </SectionTransition>
      </section>

      {/* Servicios / Features */}
      <section id="servicios" className="py-24 px-4 relative">
        <SectionTransition>
          <div className="max-w-7xl mx-auto">
            <ScrollReveal direction="up">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  ¿Por qué elegirnos?
                </h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                  Ofrecemos la mejor experiencia para encontrar tu alojamiento ideal
                </p>
              </div>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.2}>
              {[
                {
                  icon: '🔒',
                  title: 'Reserva Segura',
                  description: 'Pago seguro y garantía de reembolso. Tu dinero está protegido.',
                },
                {
                  icon: '🌟',
                  title: 'Calidad Verificada',
                  description: 'Todas las propiedades son verificadas y cumplen nuestros estándares.',
                },
                {
                  icon: '💬',
                  title: 'Soporte 24/7',
                  description: 'Atención al cliente disponible las 24 horas del día, los 7 días.',
                },
              ].map((feature) => (
                <StaggerItem key={feature.title}>
                  <TiltCard intensity={8}>
                    <GlassCard className="p-8 rounded-2xl h-full" blur={10} opacity={0.1}>
                      <div className="text-5xl mb-6">{feature.icon}</div>
                      <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </GlassCard>
                  </TiltCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </SectionTransition>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        {/* FEATURE 8: Ondas de fondo */}
        <GenerativeWaves waveCount={3} className="opacity-20" />
        
        <SectionTransition>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <ScrollReveal direction="up">
              <GlassCard className="p-12 rounded-3xl" blur={20} opacity={0.15}>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  ¿Listo para tu próxima aventura?
                </h2>
                <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                  Únete a miles de viajeros que ya han encontrado su alojamiento perfecto con nosotros
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <BreathingButton color="#6366f1">
                    Explorar propiedades
                  </BreathingButton>
                  <RippleButton className="bg-white/10 border border-white/20 text-white rounded-xl px-8 py-4 font-semibold hover:bg-white/20 transition">
                    Publicar mi propiedad
                  </RippleButton>
                </div>
              </GlassCard>
            </ScrollReveal>
          </div>
        </SectionTransition>
      </section>

      {/* Footer */}
      <footer id="contacto" className="bg-slate-900/80 border-t border-white/10 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <GlitchText text="🏖️ Vacacional" className="text-2xl font-bold mb-4" />
              <p className="text-gray-400 text-sm">
                La mejor plataforma para encontrar alojamientos vacacionales únicos en toda España.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Explorar</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><AnimatedLink href="#" className="hover:text-white">Propiedades</AnimatedLink></li>
                <li><AnimatedLink href="#" className="hover:text-white">Destinos</AnimatedLink></li>
                <li><AnimatedLink href="#" className="hover:text-white">Ofertas</AnimatedLink></li>
                <li><AnimatedLink href="#" className="hover:text-white">Blog</AnimatedLink></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Soporte</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><AnimatedLink href="#" className="hover:text-white">Centro de ayuda</AnimatedLink></li>
                <li><AnimatedLink href="#" className="hover:text-white">Contacto</AnimatedLink></li>
                <li><AnimatedLink href="#" className="hover:text-white">FAQ</AnimatedLink></li>
                <li><AnimatedLink href="#" className="hover:text-white">Política de cancelación</AnimatedLink></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><AnimatedLink href="#" className="hover:text-white">Términos de servicio</AnimatedLink></li>
                <li><AnimatedLink href="#" className="hover:text-white">Política de privacidad</AnimatedLink></li>
                <li><AnimatedLink href="#" className="hover:text-white">Cookies</AnimatedLink></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
            <p>© 2025 Vacacional Rental Platform. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

