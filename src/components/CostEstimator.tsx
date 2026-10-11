import React, { useState } from 'react';
import { Calculator, ArrowRight, Info, Check } from 'lucide-react';
import { ServiceType } from '../types';

interface CostEstimatorProps {
  onApplyEstimate: (service: ServiceType, details: string, squareFootage: string) => void;
}

export const CostEstimator: React.FC<CostEstimatorProps> = ({ onApplyEstimate }) => {
  const [selectedService, setSelectedService] = useState<ServiceType>('kitchen');
  const [tier, setTier] = useState<'standard' | 'premium' | 'custom'>('premium');
  const [scale, setScale] = useState<number>(300); // sq ft or linear ft

  // Approximate realistic regional cost models for SE Pennsylvania
  const getCalculations = () => {
    let baseRate = 120; // per sq ft
    let title = 'Kitchen Remodeling';

    switch (selectedService) {
      case 'residential':
        title = 'Residential Addition & Structural';
        baseRate = tier === 'standard' ? 180 : tier === 'premium' ? 240 : 320;
        break;
      case 'commercial':
        title = 'Commercial Fit-Out & Framing';
        baseRate = tier === 'standard' ? 95 : tier === 'premium' ? 145 : 210;
        break;
      case 'kitchen':
        title = 'Kitchen & Bath Renovation';
        baseRate = tier === 'standard' ? 140 : tier === 'premium' ? 220 : 340;
        break;
      case 'outdoor':
        title = 'Composite Deck & Outdoor Living';
        baseRate = tier === 'standard' ? 55 : tier === 'premium' ? 85 : 135;
        break;
      default:
        baseRate = 150;
    }

    const estimatedTotal = Math.round(scale * baseRate);
    const low = Math.round(estimatedTotal * 0.9);
    const high = Math.round(estimatedTotal * 1.15);

    return {
      title,
      low: low.toLocaleString(),
      high: high.toLocaleString(),
      baseRate,
    };
  };

  const calc = getCalculations();

  const handleTransfer = () => {
    const summary = `Estimated via scope calculator: ${calc.title} (${tier} tier), approximately ${scale} sq ft. Ballpark range: $${calc.low} - $${calc.high}.`;
    onApplyEstimate(selectedService, summary, `${scale} sq ft`);
  };

  return (
    <section className="py-16 bg-slate-900/60 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-2xl bg-slate-950 border border-slate-800 p-6 sm:p-10">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 text-amber-400 text-xs font-mono font-semibold mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>Interactive Scope Estimator</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Preliminary Scope & Budget Calculator
            </h3>
            <p className="text-sm text-slate-300 mt-2">
              Select your project parameters to view typical Montgomery County, PA project investment ranges. 
              Actual quotes are finalized during our free on-site walk-through.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Inputs */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Service Tabs */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 font-semibold mb-2">
                  Select Project Pillar:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'residential', label: 'Residential' },
                    { id: 'commercial', label: 'Commercial' },
                    { id: 'kitchen', label: 'Kitchen/Bath' },
                    { id: 'outdoor', label: 'Outdoor/Deck' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedService(s.id as ServiceType)}
                      className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                        selectedService === s.id
                          ? 'bg-amber-500 text-slate-950 shadow-md'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider for Scale/Area */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-mono uppercase text-slate-400 font-semibold">
                    Estimated Project Size:
                  </label>
                  <span className="text-sm font-bold font-mono text-amber-400">
                    {scale} sq ft
                  </span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={2000}
                  step={50}
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
                  <span>100 sq ft (Compact)</span>
                  <span>1,000 sq ft</span>
                  <span>2,000+ sq ft (Estate/Commercial)</span>
                </div>
              </div>

              {/* Tier Selection */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 font-semibold mb-2">
                  Finish & Material Specification:
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'standard', title: 'Essential', desc: 'Code-compliant durable finishes' },
                    { id: 'premium', title: 'Premium', desc: 'Custom hardwood, quartz & Trex' },
                    { id: 'custom', title: 'Architectural', desc: 'Luxury tailored bespoke materials' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTier(t.id as any)}
                      className={`p-3 rounded-lg text-left border transition-all ${
                        tier === t.id
                          ? 'bg-slate-900 border-amber-500 text-white ring-1 ring-amber-500'
                          : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="text-xs font-bold text-white">{t.title}</div>
                      <div className="text-[11px] text-slate-400 leading-tight mt-0.5">{t.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Result Card */}
            <div className="lg:col-span-5 bg-slate-900 rounded-xl border border-slate-800 p-6 space-y-5">
              <div className="text-xs font-mono text-amber-500 uppercase tracking-wider font-semibold">
                Estimated Project Scope Range
              </div>

              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
                  ${calc.low} – ${calc.high}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Estimated based on ~{scale} sq ft at {tier} specifications.
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-3">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-500" />
                  <span>Includes architectural framing and certified trade labor</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-500" />
                  <span>Includes clean daily disposal & local permit coordination</span>
                </div>
              </div>

              <button
                onClick={handleTransfer}
                className="w-full py-3 px-4 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Transfer Estimate to Form Below</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
