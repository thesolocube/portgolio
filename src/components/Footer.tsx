import React from 'react';
import { Linkedin, Github, Mail, ArrowUpRight, Heart, Code2, Sparkles, Terminal } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-slate-100 dark:bg-[#04060b] text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/80 pt-16 pb-12 overflow-hidden">
      {/* Glow highlight line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand & Role */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-600 p-[1px] shadow-lg shadow-sky-500/20">
                <div className="w-full h-full bg-[#060810] rounded-[15px] flex items-center justify-center font-mono font-black text-sm text-sky-400">
                  SR
                </div>
              </div>
              <div>
                <span className="font-black text-xl text-slate-100 tracking-tight block">
                  {PERSONAL_INFO.name}
                </span>
                <span className="text-[11px] font-mono text-sky-400 flex items-center gap-1">
                  <Terminal className="w-3 h-3" /> Software Engineer · 5th Year EMSI
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-md leading-relaxed font-sans">
              Élève ingénieur en 5ème année spécialisé en ingénierie informatique, architectures distribuées orientées événements, microservices et Data/IA.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span>Available for Software Engineering Opportunities (Casablanca / Remote)</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-widest flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-sky-400" /> Navigation
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li><a href="#about" className="text-slate-400 hover:text-sky-400 transition-colors">#about-me</a></li>
              <li><a href="#experience" className="text-slate-400 hover:text-sky-400 transition-colors">#experience</a></li>
              <li><a href="#projects" className="text-slate-400 hover:text-sky-400 transition-colors">#featured-projects</a></li>
              <li><a href="#skills" className="text-slate-400 hover:text-sky-400 transition-colors">#skills-matrix</a></li>
              <li><a href="#certifications" className="text-slate-400 hover:text-sky-400 transition-colors">#certifications</a></li>
              <li><a href="#contact" className="text-slate-400 hover:text-sky-400 transition-colors">#get-in-touch</a></li>
            </ul>
          </div>

          {/* Connect & Socials */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Connect
            </h4>
            <div className="flex flex-col gap-2.5 text-xs font-mono">
              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-sky-400 transition group"
              >
                <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sky-400">
                  <Linkedin className="w-3.5 h-3.5" />
                </div>
                <span>LinkedIn Profile</span>
                <ArrowUpRight className="w-3 h-3 text-slate-600 group-hover:text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-purple-400 transition group"
              >
                <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-purple-400">
                  <Github className="w-3.5 h-3.5" />
                </div>
                <span>GitHub Repositories</span>
                <ArrowUpRight className="w-3 h-3 text-slate-600 group-hover:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={`mailto:${PERSONAL_INFO.contactEmail}`}
                className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition group"
              >
                <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-amber-400">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">{PERSONAL_INFO.contactEmail}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} Sami Rahni · Built with React, TypeScript & Tailwind CSS
          </div>
          <div className="flex items-center gap-1.5">
            Designed with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Engineering Excellence.
          </div>
        </div>
      </div>
    </footer>
  );
};
