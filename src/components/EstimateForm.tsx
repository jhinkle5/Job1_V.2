import React, { useState, useEffect } from 'react';
import { 
  Send, 
  CheckCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Sparkles, 
  Calendar,
  AlertCircle,
  FileText
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/constructionData';
import { ServiceType, EstimateFormData } from '../types';

interface EstimateFormProps {
  initialServiceType?: ServiceType;
}

export const EstimateForm: React.FC<EstimateFormProps> = ({ initialServiceType = 'residential' }) => {
  const [formData, setFormData] = useState<EstimateFormData>({
    fullName: '',
    email: '',
    phone: '',
    preferredContact: 'phone',
    projectLocation: 'Lansdale, PA',
    serviceType: initialServiceType,
    timeline: '1-3 months',
    budgetRange: 'Flexible / Contractor Guidance',
    projectDetails: '',
    squareFootage: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    referenceId: string;
    submittedAt: string;
    details: EstimateFormData;
  } | null>(null);

  // Sync if initialServiceType changes from external click
  useEffect(() => {
    if (initialServiceType) {
      setFormData((prev) => ({ ...prev, serviceType: initialServiceType }));
    }
  }, [initialServiceType]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Full Name is required';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      errs.phone = 'Please provide a 10-digit phone number';
    }
    if (!formData.projectDetails.trim()) {
      errs.projectDetails = 'Please provide a few details regarding your project scope';
    } else if (formData.projectDetails.trim().length < 10) {
      errs.projectDetails = 'Please provide at least 10 characters describing your goals';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate reliable async submission
    setTimeout(() => {
      const randomRef = `J1-${Math.floor(100000 + Math.random() * 900000)}`;
      const now = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      setSubmittedData({
        referenceId: randomRef,
        submittedAt: now,
        details: { ...formData },
      });
      setIsSubmitting(false);
    }, 700);
  };

  const handleReset = () => {
    setSubmittedData(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      preferredContact: 'phone',
      projectLocation: 'Lansdale, PA',
      serviceType: 'residential',
      timeline: '1-3 months',
      budgetRange: 'Flexible / Contractor Guidance',
      projectDetails: '',
      squareFootage: '',
    });
    setErrors({});
  };

  return (
    <section id="estimate" className="py-20 md:py-28 bg-slate-950 border-t border-slate-800 relative">
      {/* Subtle backdrop lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full opacity-10 pointer-events-none">
        <div className="w-[600px] h-[600px] bg-amber-500 rounded-full blur-[140px] mx-auto" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="text-amber-500 font-mono text-xs uppercase tracking-wider font-semibold mb-2">
            No Obligation · Free Detailed Consultation
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance">
            Request Your Free Estimate
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
            Tell us about your residential or commercial project. We will review your scope, 
            schedule an on-site evaluation in Lansdale or the surrounding area, and provide a clear, itemized proposal.
          </p>
        </div>

        {/* Main Grid: Form on Left/Center + Contact & Assurance Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Center: Interactive Form or Success State */}
          <div className="lg:col-span-8 bg-slate-900/90 rounded-2xl border border-slate-800 p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
            
            {submittedData ? (
              /* Success Confirmation View */
              <div className="space-y-6 animate-fadeIn">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 stroke-[2.5]" />
                </div>

                <div>
                  <div className="text-xs font-mono uppercase text-amber-500 font-semibold tracking-wider">
                    Inquiry Received Successfully
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                    Thank You, {submittedData.details.fullName}!
                  </h3>
                  <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                    Your project estimate inquiry has been routed directly to our Job1 project team in Lansdale, PA. 
                    We will review your requirements and reach out to schedule an on-site walk-through.
                  </p>
                </div>

                {/* Submitted Summary Ticket */}
                <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800 text-xs">
                    <span className="font-mono text-slate-400">Reference ID: <strong className="text-amber-400 font-bold">{submittedData.referenceId}</strong></span>
                    <span className="text-slate-400">{submittedData.submittedAt}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 block font-mono">Service Selected:</span>
                      <span className="text-white font-semibold text-sm capitalize">
                        {submittedData.details.serviceType === 'other'
                          ? 'Other / Custom Construction'
                          : `${submittedData.details.serviceType} Construction`}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-mono">Project Location:</span>
                      <span className="text-white font-semibold text-sm">{submittedData.details.projectLocation}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-mono">Preferred Contact:</span>
                      <span className="text-white font-semibold text-sm capitalize">{submittedData.details.preferredContact} via {submittedData.details.phone}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-mono">Target Timeline:</span>
                      <span className="text-white font-semibold text-sm">{submittedData.details.timeline}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80">
                    <span className="text-slate-400 block text-xs font-mono mb-1">Project Notes:</span>
                    <p className="text-xs text-slate-300 italic bg-slate-900/60 p-3 rounded border border-slate-800">
                      "{submittedData.details.projectDetails}"
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto px-6 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="w-full sm:w-auto px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm text-center shadow-lg transition-colors"
                  >
                    Call Us Now ({BUSINESS_INFO.phoneDisplay})
                  </a>
                </div>
              </div>
            ) : (
              /* The Active Estimate Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Name and Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Full Name <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Michael Miller"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full px-4 py-3 rounded-lg bg-slate-950 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                        errors.fullName ? 'border-rose-500' : 'border-slate-800 focus:border-amber-500'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Project Location / Town <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Lansdale, PA or Montgomeryville"
                      value={formData.projectLocation}
                      onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    />
                  </div>
                </div>

                {/* 2. Contact Details: Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Email Address <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3 rounded-lg bg-slate-950 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                        errors.email ? 'border-rose-500' : 'border-slate-800 focus:border-amber-500'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Phone Number <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="(267) 506-XXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full px-4 py-3 rounded-lg bg-slate-950 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                        errors.phone ? 'border-rose-500' : 'border-slate-800 focus:border-amber-500'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Preferred Contact Mode */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Preferred Contact Method
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'phone', label: 'Phone Call' },
                      { id: 'email', label: 'Email' },
                      { id: 'text', label: 'Text Message' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, preferredContact: opt.id as any })
                        }
                        className={`py-2.5 px-3 rounded-lg border text-xs font-semibold transition-all ${
                          formData.preferredContact === opt.id
                            ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Project Type Dropdown Selector (Matching our 4 services + Other) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Project Type Category <span className="text-amber-500">*</span>
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) =>
                      setFormData({ ...formData, serviceType: e.target.value as ServiceType })
                    }
                    className="w-full px-4 py-3.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all appearance-none cursor-pointer"
                  >
                    <option value="residential">
                      Residential Construction (Additions, home renovations, window/door upgrades)
                    </option>
                    <option value="commercial">
                      Commercial Construction (Structural exterior framing, custom tenant fit-outs, commercial renovations)
                    </option>
                    <option value="kitchen">
                      Kitchen Remodeling (Modern, functional kitchen and bath renovations)
                    </option>
                    <option value="outdoor">
                      Outdoor Living (Decks, patios, and durable exterior upgrades)
                    </option>
                    <option value="other">
                      Other / Custom Construction Project
                    </option>
                  </select>
                </div>

                {/* 4. Timeline and Estimated Size */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Target Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="Immediately / Next 2-3 Weeks">Immediate (Ready to start)</option>
                      <option value="1-3 months">Within 1 to 3 Months</option>
                      <option value="3-6 months">3 to 6 Months Out</option>
                      <option value="Planning / Future Stage">Planning & Exploration Phase</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Approx. Square Footage (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 500 sq ft or 2 Floors"
                      value={formData.squareFootage}
                      onChange={(e) => setFormData({ ...formData, squareFootage: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* 5. Details Textarea */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Project Scope & Details <span className="text-amber-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your project goals, existing conditions, layout ideas, or any specific materials you have in mind..."
                    value={formData.projectDetails}
                    onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg bg-slate-950 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all ${
                      errors.projectDetails ? 'border-rose-500' : 'border-slate-800 focus:border-amber-500'
                    }`}
                  />
                  {errors.projectDetails && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.projectDetails}
                    </p>
                  )}
                </div>

                {/* Bold Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-lg bg-amber-500 hover:bg-amber-400 active:scale-[0.99] text-slate-950 font-extrabold text-base tracking-wide shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Processing Estimate Request...</span>
                      </span>
                    ) : (
                      <>
                        <span>Request My Estimate</span>
                        <Send className="w-5 h-5 stroke-[2.5]" />
                      </>
                    )}
                  </button>
                  <p className="text-xs text-center text-slate-400 mt-3">
                    Direct contractor consultation · No high-pressure sales · Free on-site walk-through
                  </p>
                </div>

              </form>
            )}

          </div>

          {/* Right Sidebar: Direct Contact & Guarantees */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Contact Card */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6">
              <div>
                <span className="font-mono text-xs text-amber-500 font-bold uppercase tracking-wider block">
                  Prefer To Speak Right Now?
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Call Job1 Construction
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Speak directly with a knowledgeable project specialist.
                </p>
              </div>

              <div className="space-y-4 text-sm">
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">Phone (Call or Text)</div>
                    <div className="text-white font-bold group-hover:text-amber-400 transition-colors">
                      {BUSINESS_INFO.phoneDisplay}
                    </div>
                  </div>
                </a>

                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">Direct Email</div>
                    <div className="text-white font-bold group-hover:text-amber-400 transition-colors">
                      {BUSINESS_INFO.email}
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="w-9 h-9 rounded-lg bg-slate-800 text-amber-500 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">Shop & Operations</div>
                    <div className="text-white font-semibold">
                      {BUSINESS_INFO.address}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="w-9 h-9 rounded-lg bg-slate-800 text-amber-500 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">Operating Hours</div>
                    <div className="text-xs text-slate-300 font-medium">
                      {BUSINESS_INFO.hours}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* What to expect card */}
            <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-amber-400">
                What Happens Next?
              </h4>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 font-bold flex items-center justify-center shrink-0">1</span>
                  <span><strong>Scope Review:</strong> We review your submission within 24 business hours.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 font-bold flex items-center justify-center shrink-0">2</span>
                  <span><strong>On-Site Consultation:</strong> We inspect existing structure and laser measure.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 font-bold flex items-center justify-center shrink-0">3</span>
                  <span><strong>Itemized Proposal:</strong> You receive a transparent quote with no surprise fees.</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
