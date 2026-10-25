import React, { useState, useEffect } from 'react';
import { Menu, X, Command, FileText } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onOpenCV: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette, onOpenCV }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Languages', href: '#languages' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Active section highlighting
      const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'education', 'certifications', 'languages', 'contact'];
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 dark:bg-slate-950/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 py-3 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 p-[1px] shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[11px] flex items-center justify-center font-mono font-black text-sm text-sky-600 dark:text-sky-400">
              SR
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 leading-none">
              Software Engineer
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-full px-3 py-1.5 backdrop-blur-md shadow-sm">
          {navLinks.map((link) => {
            const sectionId = link.href.substring(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-sky-500/15 text-sky-600 dark:text-sky-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-sky-500 dark:bg-sky-400" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Actions (Cmd+K, Resume, Theme) */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:border-sky-500/40 text-xs font-mono transition"
            aria-label="Open Command Palette"
          >
            <Command className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Search</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-950 text-[10px] text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 shadow-sm">
              ⌘K
            </kbd>
          </button>

          <button
            onClick={onOpenCV}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/30 text-xs font-mono font-medium transition active:scale-95"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>CV</span>
          </button>

          <ThemeToggle />
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-slate-950/95 border-b border-slate-200 dark:border-slate-800 backdrop-blur-xl px-4 py-6 space-y-3 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCV();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-md shadow-sky-500/20"
            >
              <FileText className="w-4 h-4" /> Voir & Télécharger le CV
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommandPalette();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs border border-slate-200 dark:border-slate-700"
            >
              <Command className="w-4 h-4 text-sky-600 dark:text-sky-400" /> Open Command Palette (Cmd+K)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
