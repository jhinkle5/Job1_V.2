import React from 'react';
import { Check, Shield, Award, Users, Wrench } from 'lucide-react';
import { VALUE_PROPOSITIONS, BUSINESS_INFO } from '../data/constructionData';

export const WhyJob1: React.FC = () => {
  const getPillarIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Wrench className="w-5 h-5 text-amber-500" />;
      case 1:
        return <Users className="w-5 h-5 text-amber-500" />;
      case 2:
        return <Award className="w-5 h-5 text-amber-500" />;
      case 3:
        return <Shield className="w-5 h-5 text-amber-500" />;
      default:
        return <Check className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <section id="why-job1" className="py-20 md:py-28 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-amber-500 font-mono text-xs uppercase tracking-wider font-semibold mb-2">
            The Job1 Standard
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance">
            Why Property Owners Choose Job1 Construction
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            Building is not just about wood, steel, and drywall. It is about accountability, 
            respect for your home or commercial premises, and craftsmanship that endures.
          </p>
        </div>

        {/* 4 Pillars Grid with Clear Checkmark Layouts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {VALUE_PROPOSITIONS.map((item, index) => (
            <div
              key={item.pillar}
              className="rounded-2xl bg-slate-950 p-6 sm:p-8 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between"
            >
              <div>
                {/* Pillar Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                    {getPillarIcon(index)}
                  </div>
                  <div>
                    <span className="font-mono text-xs text-amber-500 font-bold uppercase tracking-wider block">
                      Pillar 0{index + 1}
                    </span>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {item.pillar}
                    </h3>
                  </div>
                </div>

                <div className="text-sm font-semibold text-slate-200 mb-2">
                  {item.title}
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Clear Checkmark Layout */}
                <div className="space-y-3 pt-4 border-t border-slate-800/80">
                  {item.points.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span className="text-sm text-slate-300 leading-snug">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Subtle Bar */}
              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-amber-500/90 font-medium">Guaranteed Specification</span>
                <span>Job1 Construction LLC</span>
              </div>
            </div>
          ))}
        </div>

        {/* Local Credibility Strip */}
        <div className="rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <h4 className="text-xl font-bold text-white">
              Proudly Headquartered in Lansdale, Pennsylvania
            </h4>
            <p className="text-sm text-slate-300 max-w-2xl">
              We live and work right here in Montgomery County. When you hire Job1 Construction, 
              you get direct contractor accountability, local building department familiarity, and prompt on-site presence.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <div className="text-center sm:text-right">
              <div className="text-xs font-mono uppercase text-slate-400">Direct Contractor Line</div>
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="text-lg font-bold text-amber-400 hover:text-amber-300 font-mono"
              >
                {BUSINESS_INFO.phoneDisplay}
              </a>
            </div>
            <a
              href={`mailto:${BUSINESS_INFO.email}`}
              className="px-5 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold border border-slate-700 transition-colors"
            >
              Email Us Directly
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
