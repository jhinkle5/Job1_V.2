import React from 'react';
import { MapPin, CheckCircle, PhoneCall, ShieldCheck } from 'lucide-react';
import { SERVICE_AREAS, BUSINESS_INFO } from '../data/constructionData';

export const ServiceArea: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 text-amber-400 text-xs font-mono font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              <span>Service Radius</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight text-balance">
              Serving Lansdale & Surrounding Pennsylvania Communities
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed text-balance">
              We provide prompt, licensed residential and commercial construction services throughout Montgomery County and Upper Bucks County. 
              Our crews know local zoning, codes, and historical building profiles inside and out.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span>PA Contractor License</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-amber-500" />
                <span>$2M Commercial Liability</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-xs font-mono uppercase text-slate-400 font-semibold mb-4">
                Primary Service Towns & Municipalities:
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SERVICE_AREAS.map((town) => (
                  <div
                    key={town}
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-medium text-slate-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                    <span>{town}, PA</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-400">
                <span>Not listed? We regularly travel up to 30 miles from Lansdale, PA.</span>
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call {BUSINESS_INFO.phoneDisplay} to Confirm</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
