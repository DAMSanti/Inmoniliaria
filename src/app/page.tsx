import { Suspense } from 'react';
import { HeroSection } from '@/components/home/hero-section';
import { FeaturedProperties } from '@/components/home/featured-properties';
import { SearchSection } from '@/components/home/search-section';
import { DestinationsSection } from '@/components/home/destinations-section';
import { WhyChooseUs } from '@/components/home/why-choose-us';
import { TestimonialsSection } from '@/components/home/testimonials-section';
import { CTASection } from '@/components/home/cta-section';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PropertyCardSkeleton } from '@/components/ui/skeletons';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <HeroSection />

        {/* Search Section */}
        <SearchSection />

        {/* Featured Properties */}
        <section className="section bg-secondary/30">
          <div className="container-app">
            <div className="section-header">
              <h2 className="section-title">Propiedades Destacadas</h2>
              <p className="section-subtitle">
                Descubre nuestras propiedades más exclusivas para tus próximas vacaciones
              </p>
            </div>
            <Suspense
              fallback={
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <PropertyCardSkeleton key={i} />
                  ))}
                </div>
              }
            >
              <FeaturedProperties />
            </Suspense>
          </div>
        </section>

        {/* Popular Destinations */}
        <DestinationsSection />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* CTA Section */}
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
