import React from 'react';
import { Linkedin, Github, Mail, ArrowUpRight, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-slate-950 dark:bg-slate-950 light:bg-slate-900 text-slate-400 border-t border-slate-800/80 pt-16 pb-12 overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800/80">
          {/* Brand & Role */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl text-slate-100 tracking-tight">Sami Rahni</span>
              <span className="text-xs px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 font-mono border border-sky-500/20">
                Software Engineer
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed font-sans">
              Élève ingénieur en 5ème année spécialisé en ingénierie informatique & architectures distribuées orientées événements.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Available for Software Engineering & Full-Stack roles
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-1.5 text-xs">
              <li><a href="#about" className="hover:text-sky-400 transition">About Me</a></li>
              <li><a href="#experience" className="hover:text-sky-400 transition">Experience</a></li>
              <li><a href="#projects" className="hover:text-sky-400 transition">Featured Projects</a></li>
              <li><a href="#skills" className="hover:text-sky-400 transition">Technical Matrix</a></li>
            </ul>
          </div>

          {/* Connect & Socials */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider">Connect</h4>
            <div className="flex flex-col gap-2 text-xs">
              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-sky-400 transition group"
              >
                <Linkedin className="w-4 h-4 text-sky-400" />
                <span>LinkedIn Profile</span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-sky-400 transition group"
              >
                <Github className="w-4 h-4 text-purple-400" />
                <span>GitHub Repositories</span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={`mailto:${PERSONAL_INFO.contactEmail}`}
                className="flex items-center gap-2 text-slate-400 hover:text-sky-400 transition"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                <span>{PERSONAL_INFO.contactEmail}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>© 2026 Sami Rahni. All rights reserved.</div>
          <div className="flex items-center gap-1.5">
            Designed & Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" /> for software engineering.
          </div>
        </div>
      </div>
    </footer>
  );
};
