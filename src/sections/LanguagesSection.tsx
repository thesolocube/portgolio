import React from 'react';
import { motion } from 'framer-motion';
import { Globe, CheckCircle2 } from 'lucide-react';
import { LANGUAGES } from '../data/portfolioData';

export const LanguagesSection: React.FC = () => {
  return (
    <section id="languages" className="py-20 relative bg-white dark:bg-[#060810] text-slate-900 dark:text-slate-100 border-t border-b border-slate-200 dark:border-slate-800/80 overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4 text-center lg:text-left">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-100">
                Languages & International Communication
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Capacité éprouvée à travailler et collaborer dans des contextes multilingues et internationaux
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-auto">
            {LANGUAGES.map((lang, idx) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="flex items-center gap-3.5 px-5 py-4 rounded-2xl glass border border-slate-800 hover:border-sky-500/40 shadow-lg transition-all"
              >
                <span className="text-3xl shrink-0">{lang.flag}</span>
                <div>
                  <div className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                    <span>{lang.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                  </div>
                  <div className="text-xs text-sky-400 font-mono font-medium">{lang.level}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
