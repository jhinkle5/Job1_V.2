import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioAccordion } from './components/PortfolioAccordion';
import { WhyJob1 } from './components/WhyJob1';
import { CostEstimator } from './components/CostEstimator';
import { EstimateForm } from './components/EstimateForm';
import { ServiceArea } from './components/ServiceArea';
import { Footer } from './components/Footer';
import { ServiceType } from './types';
import { Phone, CalendarCheck } from 'lucide-react';
import { BUSINESS_INFO } from './data/constructionData';

export default function App() {
  const [selectedServiceForEstimate, setSelectedServiceForEstimate] = useState<ServiceType>('residential');
  const [activeSection, setActiveSection] = useState<string>('home');

  // Track active section for clean navbar highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'projects', 'why-job1', 'estimate'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToEstimate = (serviceId?: ServiceType) => {
    if (serviceId) {
      setSelectedServiceForEstimate(serviceId);
    }
    const estimateEl = document.getElementById('estimate');
    if (estimateEl) {
      estimateEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const servicesEl = document.getElementById('services');
    if (servicesEl) {
      servicesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyCalculatedEstimate = (service: ServiceType, details: string, sqFt: string) => {
    setSelectedServiceForEstimate(service);
    scrollToEstimate(service);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* 1. Header Navigation with strict 3-Zone contract */}
      <Navbar
        onRequestEstimate={() => scrollToEstimate()}
        activeSection={activeSection}
      />

      <main className="flex-1">
        {/* 2. Hero Banner: Built With Purpose. */}
        <Hero
          onRequestEstimate={() => scrollToEstimate()}
          onExploreServices={scrollToServices}
        />

        {/* 3. Comprehensive Services Section (4 Core Pillars with Interactive Cards) */}
        <ServicesSection
          onSelectServiceForEstimate={(serviceId) => scrollToEstimate(serviceId)}
        />

        {/* 4. Interactive Accordion / Portfolio Preview */}
        <PortfolioAccordion
          onRequestEstimate={() => scrollToEstimate()}
        />

        {/* 5. "Why Job1" Value Propositions (Clear checkmark layouts for 4 pillars) */}
        <WhyJob1 />

        {/* Scope Estimator Tool */}
        <CostEstimator
          onApplyEstimate={handleApplyCalculatedEstimate}
        />

        {/* 6. Dynamic Lead Estimate Inquiry Form */}
        <EstimateForm
          initialServiceType={selectedServiceForEstimate}
        />

        {/* Local Service Area & Presence in Lansdale / Montgomery County */}
        <ServiceArea />
      </main>

      {/* Floating Quick Action for Mobile / Tablet */}
      <aside aria-label="Quick contact" className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        <a
          href={`tel:${BUSINESS_INFO.phone}`}
          className="md:hidden flex items-center justify-center w-12 h-12 rounded-full bg-slate-900 border border-slate-700 text-amber-400 shadow-xl shadow-black/40 focus:outline-none focus:ring-2 focus:ring-amber-500"
          title={`Call ${BUSINESS_INFO.phoneDisplay}`}
        >
          <Phone className="w-5 h-5" />
        </a>
        <button
          onClick={() => scrollToEstimate()}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-xl shadow-amber-500/30 transition-all hover:scale-105 active:scale-95"
        >
          <CalendarCheck className="w-4 h-4" />
          <span className="hidden sm:inline">Free Estimate</span>
        </button>
      </aside>

      {/* Footer */}
      <Footer />
    </div>
  );
}
