import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ArrowUpRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/constructionData';

interface NavbarProps {
  onRequestEstimate: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onRequestEstimate, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'About', href: '#why-job1', id: 'why-job1' },
    { label: 'Contact', href: '#estimate', id: 'estimate' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-xl shadow-black/20'
          : 'bg-slate-950/80 backdrop-blur-sm border-b border-slate-800/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand Wordmark (Single text element in display face, no subtitles in top bar) */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-md"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-extrabold text-xl tracking-tighter shadow-md shadow-amber-500/20 group-hover:bg-amber-400 transition-colors">
              J1
            </div>
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 group-hover:text-amber-400 transition-colors">
              {BUSINESS_INFO.name}
            </span>
          </a>

          {/* Zone 2: 4-5 Concise Single-Line Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                  activeSection === link.id
                    ? 'text-amber-400 border-amber-400 font-semibold'
                    : 'border-transparent hover:text-white hover:border-slate-600'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action (Request Free Estimate) + Direct Call Link */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-amber-400 px-3 py-2 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors whitespace-nowrap"
              title="Call Job1 Construction LLC"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>{BUSINESS_INFO.phoneDisplay}</span>
            </a>
            <button
              onClick={onRequestEstimate}
              className="px-5 py-2.5 text-sm font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 active:scale-[0.98] transition-all rounded-lg shadow-lg shadow-amber-500/20 whitespace-nowrap flex items-center gap-2"
            >
              <span>Request Free Estimate</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onRequestEstimate}
              className="px-3 py-1.5 text-xs font-bold text-slate-950 bg-amber-500 rounded-md whitespace-nowrap"
            >
              Estimate
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-200 hover:text-amber-400 py-1 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-200 py-2.5 rounded-lg bg-slate-800"
            >
              <Phone className="w-4 h-4 text-amber-500" />
              <span>Call {BUSINESS_INFO.phoneDisplay}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestEstimate();
              }}
              className="w-full py-3 text-sm font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-md"
            >
              Request Free Estimate
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
