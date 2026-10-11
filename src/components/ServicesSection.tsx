import React, { useState } from 'react';
import { Home, Building2, Utensils, Trees, Check, ArrowRight, Sparkles, Layers, Shield } from 'lucide-react';
import { CORE_SERVICES } from '../data/constructionData';
import { ServiceType, ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectServiceForEstimate: (serviceId: ServiceType) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForEstimate }) => {
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceType>('residential');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Home':
        return <Home className="w-6 h-6" />;
      case 'Building2':
        return <Building2 className="w-6 h-6" />;
      case 'Utensils':
        return <Utensils className="w-6 h-6" />;
      case 'Trees':
        return <Trees className="w-6 h-6" />;
      default:
        return <Layers className="w-6 h-6" />;
    }
  };

  const activeService: ServiceItem =
    CORE_SERVICES.find((s) => s.id === selectedServiceId) || CORE_SERVICES[0];

  return (
    <section id="services" className="py-20 md:py-28 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-amber-500 font-mono text-xs uppercase tracking-wider font-semibold mb-2">
            Our Core Disciplines
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance">
            Comprehensive Construction Services
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            Engineered precision from ground-up structural work to bespoke interior finishes. 
            Explore our four core pillars built on master craftsmanship and transparent project delivery.
          </p>
        </div>

        {/* 4 Interactive Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {CORE_SERVICES.map((service, index) => {
            const isSelected = selectedServiceId === service.id;
            return (
              <div
                key={service.id}
                onClick={() => setSelectedServiceId(service.id)}
                className={`cursor-pointer rounded-xl p-6 transition-all duration-200 border flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-slate-800/90 border-amber-500 shadow-xl shadow-amber-500/10 ring-1 ring-amber-500'
                    : 'bg-slate-950/80 hover:bg-slate-800/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  {/* Top Bar inside card */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                          : 'bg-slate-900 text-slate-400 group-hover:text-amber-400 group-hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      {getIcon(service.iconName)}
                    </div>
                    <span className="font-mono text-xs text-slate-500 font-bold">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight mb-2 group-hover:text-amber-400 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-xs text-amber-400/90 font-medium mb-3">
                    {service.tagline}
                  </p>

                  <p className="text-sm text-slate-400 leading-normal line-clamp-3 mb-4">
                    {service.description}
                  </p>
                </div>

                {/* Card Action footer */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className={`text-xs font-semibold ${isSelected ? 'text-amber-400' : 'text-slate-400 group-hover:text-slate-200'}`}>
                    {isSelected ? 'Viewing Scope' : 'Click to View'}
                  </span>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform ${isSelected ? 'bg-amber-500 text-slate-950' : 'text-slate-500 group-hover:text-slate-300 group-hover:translate-x-1'}`}>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Service Detail Expanded Drawer / Panel */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Scope Breakdown */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-semibold">
                  {activeService.specBadge}
                </span>
                <span className="text-xs text-slate-400">
                  Lansdale & Montgomery County, PA Service Guarantee
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {activeService.title} Detailed Scope
                </h3>
                <p className="mt-2 text-base text-slate-300 leading-relaxed">
                  {activeService.description}
                </p>
              </div>

              {/* In-depth 3 Features Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {activeService.features.map((feat, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                    <div className="text-sm font-bold text-white mb-1">{feat.name}</div>
                    <div className="text-xs text-slate-400 leading-relaxed">{feat.description}</div>
                  </div>
                ))}
              </div>

              {/* Checklist */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  Standard Inclusions & Deliverables:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeService.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-slate-200">
                      <div className="w-5 h-5 rounded-md bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Quick Action Card */}
            <div className="lg:col-span-5 bg-slate-900 rounded-xl border border-slate-800 p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Direct Contractor Estimate</h4>
                  <p className="text-xs text-slate-400">Zero pressure, clear transparent pricing</p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Typical Project Lead Time</span>
                  <span className="font-semibold text-white">1–3 Weeks Planning</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Township Permitting</span>
                  <span className="font-semibold text-white">Handled by Job1</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Warranty Coverage</span>
                  <span className="font-semibold text-amber-400">Full Workmanship Backed</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onSelectServiceForEstimate(activeService.id)}
                  className="w-full py-3.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>Request Estimate for {activeService.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-center text-slate-400 mt-2.5">
                  Pre-fills this service type into our estimate inquiry form.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
