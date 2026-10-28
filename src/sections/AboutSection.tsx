import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap, Code2, Zap, Sparkles, MapPin, Terminal,
  CheckCircle, ArrowUpRight
} from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { PERSONAL_INFO, ABOUT_CARDS } from '../data/portfolioData';

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  Code2,
  Zap,
  Sparkles,
};

const cardTheme: Record<string, { accent: string; border: string; glow: string; badge: string }> = {
  emsi: {
    accent: 'text-sky-400',
    border: 'hover:border-sky-500/40',
    glow: 'from-sky-500/10 to-transparent',
    badge: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  },
  'fullstack-microservices': {
    accent: 'text-indigo-400',
    border: 'hover:border-indigo-500/40',
    glow: 'from-indigo-500/10 to-transparent',
    badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  },
  'data-ai': {
    accent: 'text-emerald-400',
    border: 'hover:border-emerald-500/40',
    glow: 'from-emerald-500/10 to-transparent',
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  'eda-infra': {
    accent: 'text-amber-400',
    border: 'hover:border-amber-500/40',
    glow: 'from-amber-500/10 to-transparent',
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
};

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 relative bg-white dark:bg-[#060810] text-slate-900 dark:text-slate-100 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="About Me"
          title="Ingénieur Logiciel & Architecte en Devenir"
          subtitle="Passionné par les architectures complexes, le découplage des systèmes et les expériences web modernes."
        />

        {/* Narrative & Focus Highlights Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12 items-stretch">
          {/* Main Narrative Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 relative glass rounded-3xl p-7 sm:p-9 border border-slate-800/80 shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-indigo-500 to-emerald-400" />

            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                    <Terminal className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-widest font-semibold">
                    Engineering Background & Vision
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                  <span>Casablanca, Morocco</span>
                </div>
              </div>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans font-normal">
                {PERSONAL_INFO.aboutText}
              </p>
            </div>

            {/* Core Values / Strengths pills */}
            <div className="pt-6 mt-6 border-t border-slate-800/80 flex flex-wrap gap-2.5">
              {[
                'Event-Driven Systems',
                'Microservices Architecture',
                'Graph Databases (Neo4j)',
                'Machine Learning & NLP',
                'Clean Code & SOLID',
                'High Concurrency & Low Latency',
              ].map((item) => (
                <div
                  key={item}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/90 text-slate-300 border border-slate-800 text-xs font-mono"
                >
                  <CheckCircle className="w-3 h-3 text-sky-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Metrics / Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-4 relative glass rounded-3xl p-7 border border-slate-800/80 shadow-2xl flex flex-col justify-between space-y-6"
          >
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2 font-semibold">
                Academic Profile
              </div>
              <h3 className="text-2xl font-black text-slate-100">
                EMSI Casablanca
              </h3>
              <p className="text-xs text-sky-400 font-mono mt-1 font-semibold">
                École Marocaine des Sciences de l&apos;Ingénieur
              </p>
              <div className="mt-4 p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-mono">Cycle:</span>
                  <span className="font-semibold text-slate-200">Ingénierie d&apos;État</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-mono">Filière:</span>
                  <span className="font-semibold text-sky-400 font-mono">2DSI (Dév. Digital & SI)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-mono">Promotion:</span>
                  <span className="font-semibold text-emerald-400 font-mono">5ème Année (2026)</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Status:</span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  Open for PFE / CDI
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 4 Pillars Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ABOUT_CARDS.map((card, index) => {
            const IconComponent = iconMap[card.icon] || Code2;
            const theme = cardTheme[card.id] || cardTheme.emsi;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative glass rounded-3xl p-6 border border-slate-800/80 ${theme.border} transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between overflow-hidden`}
              >
                {/* Glow backdrop on hover */}
                <div className={`absolute inset-0 bg-gradient-to-b ${theme.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                      <IconComponent className={`w-6 h-6 ${theme.accent}`} />
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${theme.badge}`}>
                      Pillar #{index + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-white transition-colors">
                    {card.title}
                  </h3>

                  <div className={`text-xs font-mono mt-1 mb-3 font-semibold ${theme.accent}`}>
                    {card.subtitle}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {card.description}
                  </p>
                </div>

                <div className="relative z-10 mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>Domaine Clé</span>
                  <ArrowUpRight className={`w-4 h-4 ${theme.accent} group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform`} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
