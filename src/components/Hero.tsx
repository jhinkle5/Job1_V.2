import React from 'react';
import { ArrowRight, ShieldCheck, MapPin, PhoneCall, Hammer, Award } from 'lucide-react';
import { BUSINESS_INFO } from '../data/constructionData';

interface HeroProps {
  onRequestEstimate: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRequestEstimate, onExploreServices }) => {
  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-slate-950">
      {/* Background Architectural Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #f59e0b 1px, transparent 0)`,
          backgroundSize: '36px 36px',
        }}
        aria-hidden="true"
      />

      {/* Subtle Ambient Radial Glow */}
      <div 
        className="absolute top-1/4 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-0 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Location & Credential Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Based in Lansdale, PA</span>
              <span className="text-slate-600">·</span>
              <span className="text-amber-400">Serving Montgomery & Bucks Counties</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white text-balance leading-[1.08]">
              {BUSINESS_INFO.tagline}
            </h1>

            {/* Subheadline (Exact text from user brief) */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed text-balance">
              {BUSINESS_INFO.headline}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onRequestEstimate}
                className="px-7 py-4 text-base font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 active:scale-[0.98] transition-all rounded-lg shadow-xl shadow-amber-500/20 flex items-center justify-center gap-3 group"
              >
                <span>Request Free Estimate</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreServices}
                className="px-6 py-4 text-base font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 active:scale-[0.98] transition-all rounded-lg flex items-center justify-center gap-2"
              >
                <span>Explore Our Services</span>
              </button>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-slate-300 font-medium">Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <Hammer className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-slate-300 font-medium">Residential & Commercial</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Award className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-slate-300 font-medium">Direct Master Craftsmanship</span>
              </div>
            </div>

          </div>

          {/* Right Column: Architectural Visual Card & Live Project Metric Canvas */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl shadow-black/50 overflow-hidden">
              
              {/* Construction Blueprint Header Graphic */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <div>
                  <div className="text-xs uppercase tracking-wider font-mono text-amber-500 font-semibold">
                    Specification Focus
                  </div>
                  <div className="text-lg font-bold text-white tracking-tight mt-0.5">
                    Job1 Master Standards
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-slate-800/90 border border-slate-700/60 flex items-center justify-center text-amber-500 shadow-inner">
                  <Hammer className="w-6 h-6" />
                </div>
              </div>

              {/* Graphic Blueprint Visualization Box */}
              <div className="my-6 p-5 rounded-xl bg-slate-950 border border-slate-800/90 relative overflow-hidden">
                {/* Structural Framing Diagram SVG */}
                <svg className="w-full h-44 text-slate-700" viewBox="0 0 360 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Foundation Line */}
                  <line x1="20" y1="140" x2="340" y2="140" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
                  <text x="20" y="154" fill="#94a3b8" fontSize="9" fontFamily="monospace">GRADE ELEVATION 0'-0"</text>

                  {/* Structural Columns */}
                  <rect x="50" y="40" width="8" height="100" fill="#334155" />
                  <rect x="175" y="40" width="8" height="100" fill="#f59e0b" />
                  <rect x="300" y="40" width="8" height="100" fill="#334155" />

                  {/* Main Header Beam */}
                  <rect x="35" y="32" width="290" height="12" fill="#475569" rx="2" />
                  <text x="145" y="26" fill="#f59e0b" fontSize="9" fontFamily="monospace" fontWeight="bold">ENGINEERED LVL BEAM</text>

                  {/* Roof Truss Angles */}
                  <line x1="40" y1="32" x2="180" y2="2" stroke="#64748b" strokeWidth="2" />
                  <line x1="320" y1="32" x2="180" y2="2" stroke="#64748b" strokeWidth="2" />
                  <line x1="180" y1="2" x2="180" y2="32" stroke="#f59e0b" strokeWidth="1.5" />
                  <line x1="110" y1="18" x2="110" y2="32" stroke="#64748b" strokeWidth="1.5" />
                  <line x1="250" y1="18" x2="250" y2="32" stroke="#64748b" strokeWidth="1.5" />

                  {/* Laser Dimension Callouts */}
                  <line x1="60" y1="90" x2="173" y2="90" stroke="#f59e0b" strokeWidth="1" markerEnd="url(#arrow)" />
                  <text x="96" y="85" fill="#e2e8f0" fontSize="8" fontFamily="monospace">16" O.C.</text>
                </svg>

                <div className="mt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-2">
                  <span className="font-mono text-slate-400">STRUCTURAL RIGIDITY</span>
                  <span className="text-amber-400 font-semibold font-mono">100% PA CODE VERIFIED</span>
                </div>
              </div>

              {/* Direct Highlights */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-sm">
                  <span className="text-slate-300 font-medium">Headquarters</span>
                  <span className="text-white font-semibold">{BUSINESS_INFO.address}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-sm">
                  <span className="text-slate-300 font-medium">Direct Contractor Phone</span>
                  <a href={`tel:${BUSINESS_INFO.phone}`} className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1.5 font-mono">
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{BUSINESS_INFO.phoneDisplay}</span>
                  </a>
                </div>
              </div>

              {/* Instant Call Prompt */}
              <div className="mt-5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                <div className="text-xs text-amber-200">
                  Ready to discuss your project scope?
                </div>
                <button
                  onClick={onRequestEstimate}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 underline underline-offset-2"
                >
                  Start Estimate
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
