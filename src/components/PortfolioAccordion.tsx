import React, { useState } from 'react';
import { ChevronDown, MapPin, Calendar, Clock, CheckCircle2, Wrench, Layers, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_PROJECTS } from '../data/constructionData';
import { PortfolioProject } from '../types';

interface PortfolioAccordionProps {
  onRequestEstimate: () => void;
}

export const PortfolioAccordion: React.FC<PortfolioAccordionProps> = ({ onRequestEstimate }) => {
  // Default to the first project open ('Kitchen Renovation')
  const [openProjectId, setOpenProjectId] = useState<string>(PORTFOLIO_PROJECTS[0].id);
  const [activeTabMap, setActiveTabMap] = useState<Record<string, 'overview' | 'materials' | 'scope'>>({
    [PORTFOLIO_PROJECTS[0].id]: 'overview',
  });

  const toggleAccordion = (id: string) => {
    setOpenProjectId((prev) => (prev === id ? '' : id));
  };

  const setTab = (projectId: string, tab: 'overview' | 'materials' | 'scope') => {
    setActiveTabMap((prev) => ({ ...prev, [projectId]: tab }));
  };

  // Helper to render customized architectural vector visualization for each project category
  const renderArchitecturalPlaceholder = (project: PortfolioProject) => {
    if (project.category === 'Kitchen Renovation') {
      return (
        <div className="relative w-full h-72 sm:h-80 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 flex flex-col justify-between p-6">
          <div className="flex items-center justify-between z-10">
            <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-slate-950/80 text-amber-400 border border-amber-500/30">
              Kitchen Architecture
            </span>
            <span className="text-xs font-mono text-slate-400">
              Lansdale, PA
            </span>
          </div>

          {/* Stylized Kitchen Layout Blueprint Vector */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
            <svg className="w-full h-full p-4" viewBox="0 0 400 240" fill="none">
              {/* Perimeter Wall */}
              <rect x="20" y="20" width="360" height="200" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
              {/* Perimeter Counter & Upper Cabinets */}
              <rect x="20" y="20" width="360" height="40" fill="#334155" />
              <text x="35" y="44" fill="#cbd5e1" fontSize="11" fontFamily="sans-serif">Upper Soft-Close Cabinetry</text>
              {/* Cooktop & Hood */}
              <rect x="170" y="20" width="60" height="30" fill="#f59e0b" rx="2" />
              <text x="175" y="40" fill="#0f172a" fontSize="10" fontWeight="bold">COOKTOP</text>
              {/* Waterfall Center Island */}
              <rect x="80" y="110" width="240" height="70" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" rx="4" />
              <text x="120" y="150" fill="#f8fafc" fontSize="14" fontWeight="bold">10-FT WATERFALL QUARTZ ISLAND</text>
              <text x="145" y="168" fill="#94a3b8" fontSize="10">Prep Sink · Undercabinet Storage · Seating</text>
            </svg>
          </div>

          <div className="z-10 mt-auto bg-slate-950/90 backdrop-blur-sm p-4 rounded-lg border border-slate-800/80">
            <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
              Featured Renovation
            </div>
            <div className="text-base font-bold text-white">
              Two-Tone Shaker & Calacatta Gold Quartz
            </div>
            <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
              <span>{project.location}</span>
              <span>·</span>
              <span>Turnaround: {project.duration}</span>
            </div>
          </div>
        </div>
      );
    }

    if (project.category === 'Commercial Projects') {
      return (
        <div className="relative w-full h-72 sm:h-80 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 flex flex-col justify-between p-6">
          <div className="flex items-center justify-between z-10">
            <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-slate-950/80 text-amber-400 border border-amber-500/30">
              Commercial Framing
            </span>
            <span className="text-xs font-mono text-slate-400">
              North Wales, PA
            </span>
          </div>

          {/* Stylized Commercial Steel Stud Blueprint Vector */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
            <svg className="w-full h-full p-4" viewBox="0 0 400 240" fill="none">
              {/* Grid partition lines */}
              <line x1="20" y1="120" x2="380" y2="120" stroke="#64748b" strokeWidth="2" />
              <line x1="140" y1="20" x2="140" y2="220" stroke="#64748b" strokeWidth="2" />
              <line x1="260" y1="20" x2="260" y2="220" stroke="#64748b" strokeWidth="2" />
              {/* Stud columns */}
              {[40, 70, 100, 160, 190, 220, 280, 310, 340].map((x) => (
                <rect key={x} x={x} y="30" width="6" height="180" fill="#475569" />
              ))}
              {/* ADA Suite Zone */}
              <rect x="150" y="130" width="100" height="80" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" rx="3" />
              <text x="160" y="160" fill="#f59e0b" fontSize="11" fontWeight="bold">STC-55 ACOUSTIC</text>
              <text x="160" y="180" fill="#cbd5e1" fontSize="10">ADA Medical Suite</text>
            </svg>
          </div>

          <div className="z-10 mt-auto bg-slate-950/90 backdrop-blur-sm p-4 rounded-lg border border-slate-800/80">
            <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
              Commercial Fit-Out
            </div>
            <div className="text-base font-bold text-white">
              Heavy-Gauge Steel Framing & Soundproofing
            </div>
            <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
              <span>{project.location}</span>
              <span>·</span>
              <span>100% PA Inspection Approval</span>
            </div>
          </div>
        </div>
      );
    }

    // Decks & Exterior
    return (
      <div className="relative w-full h-72 sm:h-80 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 flex flex-col justify-between p-6">
        <div className="flex items-center justify-between z-10">
          <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-slate-950/80 text-amber-400 border border-amber-500/30">
            Outdoor Living Craft
          </span>
          <span className="text-xs font-mono text-slate-400">
            Montgomeryville, PA
          </span>
        </div>

        {/* Stylized Deck & Pergola Blueprint Vector */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
          <svg className="w-full h-full p-4" viewBox="0 0 400 240" fill="none">
            {/* House Exterior Wall */}
            <rect x="20" y="20" width="360" height="24" fill="#334155" />
            <text x="140" y="36" fill="#cbd5e1" fontSize="10">MAIN RESIDENCE LEDGER BOARD</text>
            {/* Multi-tier Deck Framing */}
            <rect x="40" y="60" width="320" height="140" fill="#1e293b" stroke="#f59e0b" strokeWidth="1" />
            {/* Joist Lines */}
            {[70, 100, 130, 160, 190, 220, 250, 280, 310, 340].map((x) => (
              <line key={x} x1={x} y1="60" x2={x} y2="200" stroke="#475569" strokeWidth="1" />
            ))}
            {/* Cedar Pergola Area */}
            <rect x="200" y="70" width="150" height="110" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
            <text x="215" y="115" fill="#f59e0b" fontSize="12" fontWeight="bold">14' x 16' CEDAR PERGOLA</text>
            <text x="215" y="135" fill="#e2e8f0" fontSize="10">Simpson Strong-Tie Footers</text>
          </svg>
        </div>

        <div className="z-10 mt-auto bg-slate-950/90 backdrop-blur-sm p-4 rounded-lg border border-slate-800/80">
          <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
            Custom Outdoor Living
          </div>
          <div className="text-base font-bold text-white">
            Trex Transcend Multi-Tier Deck & Pergola
          </div>
          <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
            <span>{project.location}</span>
            <span>·</span>
            <span>25-Year Durability Engineered</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="py-20 md:py-28 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-3xl">
            <div className="text-amber-500 font-mono text-xs uppercase tracking-wider font-semibold mb-2">
              Featured Case Studies
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance">
              Interactive Portfolio Preview
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed text-balance">
              Explore our core project categories in detail. Each project reflects our commitment 
              to structural integrity, meticulous craftsmanship, and on-schedule execution in Montgomery County.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={onRequestEstimate}
              className="px-5 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-sm font-semibold text-white flex items-center gap-2 transition-colors"
            >
              <span>Have a similar project?</span>
              <ArrowUpRight className="w-4 h-4 text-amber-500" />
            </button>
          </div>
        </div>

        {/* 3 Categories Interactive Accordion */}
        <div className="space-y-4">
          {PORTFOLIO_PROJECTS.map((project, index) => {
            const isOpen = openProjectId === project.id;
            const currentTab = activeTabMap[project.id] || 'overview';

            return (
              <div
                key={project.id}
                className={`rounded-2xl transition-all duration-200 border overflow-hidden ${
                  isOpen
                    ? 'bg-slate-900/90 border-slate-700 shadow-xl'
                    : 'bg-slate-900/40 hover:bg-slate-900/70 border-slate-800/80'
                }`}
              >
                {/* Accordion Header Bar */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(project.id)}
                  className="w-full px-6 py-6 sm:px-8 flex items-center justify-between gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  aria-expanded={isOpen}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                    <span className="font-mono text-xs font-bold text-amber-500 uppercase tracking-wider">
                      Category 0{index + 1}
                    </span>
                    <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {project.category}
                    </span>
                    <span className="text-xs text-slate-400 font-medium sm:ml-2">
                      {project.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="hidden md:flex items-center gap-3 text-xs text-slate-400 font-mono">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-500" />
                        {project.location}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        {project.duration}
                      </span>
                    </div>

                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-200 ${
                        isOpen ? 'bg-amber-500 text-slate-950 rotate-180' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </div>
                </button>

                {/* Accordion Body Content */}
                {isOpen && (
                  <div className="px-6 pb-8 sm:px-8 pt-2 border-t border-slate-800">
                    
                    {/* Tab Selection */}
                    <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-3">
                      <button
                        onClick={() => setTab(project.id, 'overview')}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                          currentTab === 'overview'
                            ? 'bg-amber-500 text-slate-950 shadow-sm'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Project Overview
                      </button>
                      <button
                        onClick={() => setTab(project.id, 'scope')}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                          currentTab === 'scope'
                            ? 'bg-amber-500 text-slate-950 shadow-sm'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Scope & Deliverables
                      </button>
                      <button
                        onClick={() => setTab(project.id, 'materials')}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                          currentTab === 'materials'
                            ? 'bg-amber-500 text-slate-950 shadow-sm'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Materials & Engineering Specs
                      </button>
                    </div>

                    {/* Main Grid: Left Graphic/Placeholder + Right Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      
                      {/* Left: Modern Graphic Blueprint Placeholder */}
                      <div className="lg:col-span-5">
                        {renderArchitecturalPlaceholder(project)}
                      </div>

                      {/* Right: Tab-controlled Details */}
                      <div className="lg:col-span-7 space-y-6">
                        {currentTab === 'overview' && (
                          <div className="space-y-5">
                            <div>
                              <h3 className="text-xl font-bold text-white tracking-tight">
                                {project.title}
                              </h3>
                              <p className="text-sm text-slate-300 leading-relaxed mt-2">
                                {project.description}
                              </p>
                            </div>

                            {/* Highlight Metric Card */}
                            <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                                <CheckCircle2 className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="text-xs text-slate-400 font-mono uppercase">Key Project Outcome</div>
                                <div className="text-sm font-bold text-amber-300">{project.highlightMetric}</div>
                              </div>
                            </div>

                            {/* Specifications Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                              {project.specs.map((s, idx) => (
                                <div key={idx} className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                                  <div className="text-[11px] text-slate-400 font-mono">{s.label}</div>
                                  <div className="text-xs font-bold text-white mt-0.5">{s.value}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {currentTab === 'scope' && (
                          <div className="space-y-4">
                            <h3 className="text-base font-bold text-white">Full Work Execution Scope</h3>
                            <div className="space-y-2.5">
                              {project.scope.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-950/70 border border-slate-800 text-sm text-slate-200">
                                  <span className="font-mono text-amber-500 text-xs font-bold mt-0.5">
                                    0{idx + 1}
                                  </span>
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {currentTab === 'materials' && (
                          <div className="space-y-4">
                            <h3 className="text-base font-bold text-white">Engineered Materials Specified</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {project.materials.map((m, idx) => (
                                <div key={idx} className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-3">
                                  <Layers className="w-4 h-4 text-amber-500 shrink-0" />
                                  <span className="text-sm font-medium text-slate-200">{m}</span>
                                </div>
                              ))}
                            </div>

                            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 leading-relaxed">
                              All materials are sourced from verified regional building suppliers in Southeastern Pennsylvania and installed strictly to manufacturer-certified specifications.
                            </div>
                          </div>
                        )}

                        {/* Direct Estimate Trigger */}
                        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="text-xs text-slate-400">
                            Looking for a project like this in {project.location} or surrounding towns?
                          </div>
                          <button
                            onClick={onRequestEstimate}
                            className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg whitespace-nowrap transition-colors"
                          >
                            Request Estimate For Similar Build
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
