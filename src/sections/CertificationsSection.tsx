import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { CERTIFICATIONS } from '../data/portfolioData';

const institutionStyles: Record<string, { border: string; bg: string; badge: string; text: string; glow: string }> = {
  Meta: {
    border: 'hover:border-sky-500/50',
    bg: 'bg-sky-500/10',
    badge: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
    text: 'text-sky-400',
    glow: 'from-sky-500/15 to-transparent',
  },
  EPFL: {
    border: 'hover:border-rose-500/50',
    bg: 'bg-rose-500/10',
    badge: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    text: 'text-rose-400',
    glow: 'from-rose-500/15 to-transparent',
  },
  'Johns Hopkins University': {
    border: 'hover:border-blue-500/50',
    bg: 'bg-blue-500/10',
    badge: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    text: 'text-blue-400',
    glow: 'from-blue-500/15 to-transparent',
  },
  HKUST: {
    border: 'hover:border-amber-500/50',
    bg: 'bg-amber-500/10',
    badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    text: 'text-amber-400',
    glow: 'from-amber-500/15 to-transparent',
  },
  'University of Michigan': {
    border: 'hover:border-indigo-500/50',
    bg: 'bg-indigo-500/10',
    badge: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
    text: 'text-indigo-400',
    glow: 'from-indigo-500/15 to-transparent',
  },
  LearnQuest: {
    border: 'hover:border-emerald-500/50',
    bg: 'bg-emerald-500/10',
    badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    text: 'text-emerald-400',
    glow: 'from-emerald-500/15 to-transparent',
  },
  'Board Infinity': {
    border: 'hover:border-teal-500/50',
    bg: 'bg-teal-500/10',
    badge: 'bg-teal-500/15 text-teal-400 border-teal-500/30',
    text: 'text-teal-400',
    glow: 'from-teal-500/15 to-transparent',
  },
  IBM: {
    border: 'hover:border-blue-600/50',
    bg: 'bg-blue-600/10',
    badge: 'bg-blue-600/15 text-blue-500 dark:text-blue-400 border-blue-600/30 font-bold',
    text: 'text-blue-500 dark:text-blue-400',
    glow: 'from-blue-600/15 to-transparent',
  },
};

export const CertificationsSection: React.FC = () => {
  return (
    <section id="certifications" className="py-24 relative bg-slate-50 dark:bg-[#060810] text-slate-900 dark:text-slate-100 overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div className="absolute bottom-10 right-1/3 w-80 h-80 bg-sky-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Verified Credentials"
          title="Certifications & Accréditations"
          subtitle="Certifications internationales de haut niveau délivrées par des entreprises et universités majeures (IBM, Meta, EPFL, Johns Hopkins, HKUST, Univ of Michigan, Board Infinity)."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert, index) => {
            const style = institutionStyles[cert.institution] || institutionStyles.Meta;
            const scoreNum = parseFloat(cert.score.replace('%', ''));
            const isHighScore = !isNaN(scoreNum) && scoreNum >= 90;

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className={`group relative glass rounded-3xl p-6 border border-slate-800/80 ${style.border} transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between overflow-hidden`}
              >
                {/* Glow on hover */}
                <div className={`absolute inset-0 bg-gradient-to-b ${style.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                <div className="relative z-10">
                  {/* Top: Institution Tag + Score */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-xl border ${style.badge}`}>
                      {cert.institution}
                    </span>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-xl border border-emerald-500/20 font-bold">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{cert.score}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-white transition-colors leading-snug min-h-[48px] flex items-center">
                    {cert.title}
                  </h3>

                  {/* Honors badge if score >= 90% */}
                  {isHighScore && (
                    <div className="mt-3 inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>High Academic Distinction</span>
                    </div>
                  )}
                </div>

                {/* Footer verification */}
                <div className="relative z-10 mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-400">
                  {cert.credentialUrl ? (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 hover:text-sky-400 transition-colors group/link"
                    >
                      <ShieldCheck className={`w-4 h-4 ${style.text}`} />
                      <span>Verified Credential</span>
                      <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className={`w-4 h-4 ${style.text}`} />
                      <span>Verified Credential</span>
                    </span>
                  )}
                  <span className="text-[10px] text-slate-500 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" /> Official
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
