import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Sparkles, School } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { EDUCATION } from '../data/portfolioData';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-24 relative bg-white dark:bg-[#060810] text-slate-900 dark:text-slate-100 overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Academic Background"
          title="Education & Diplômes"
          subtitle="Diplôme d'ingénieur d'État et parcours académique d'excellence."
        />

        <div className="max-w-4xl mx-auto space-y-6">
          {EDUCATION.map((item, index) => {
            const isFeatured = !!item.currentStatus;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative glass rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 overflow-hidden ${
                  isFeatured
                    ? 'border border-sky-500/40 ring-1 ring-sky-500/20'
                    : 'border border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* Top highlight line */}
                {isFeatured && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-400 via-indigo-500 to-sky-400" />
                )}

                <div className="flex items-start gap-4 sm:gap-5">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-lg ${
                    isFeatured
                      ? 'bg-sky-500/15 border border-sky-500/30 text-sky-400 ring-2 ring-sky-500/10'
                      : 'bg-slate-900 border border-slate-800 text-slate-400'
                  }`}>
                    <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-100 group-hover:text-sky-300 transition-colors leading-snug">
                      {item.degree}
                    </h3>
                    <div className="text-sm font-semibold text-slate-300 font-mono mt-1 flex items-center gap-1.5">
                      <School className="w-3.5 h-3.5 text-sky-400" />
                      <span>{item.institution}</span>
                    </div>

                    {item.currentStatus && (
                      <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-semibold">
                        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                        <span>{item.currentStatus}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-400 shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-sky-400" />
                  <span>{item.period}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
