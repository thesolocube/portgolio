import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Sparkles } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { EDUCATION } from '../data/portfolioData';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-24 relative bg-dark-bg/95 text-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Academic Background"
          title="Education"
          subtitle="Diplômes d'ingénieur d'État et parcours académique supérieur."
        />

        <div className="max-w-4xl mx-auto space-y-6">
          {EDUCATION.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 hover:border-sky-500/40 rounded-2xl p-6 shadow-xl transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 group-hover:text-sky-400 transition-colors">
                    {item.degree}
                  </h3>
                  <div className="text-sm font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 font-mono mt-0.5">
                    {item.institution}
                  </div>
                  {item.currentStatus && (
                    <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono">
                      <Sparkles className="w-3 h-3 animate-pulse" />
                      <span>{item.currentStatus}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-400 shrink-0">
                <Calendar className="w-3.5 h-3.5 text-sky-400" />
                <span>{item.period}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
