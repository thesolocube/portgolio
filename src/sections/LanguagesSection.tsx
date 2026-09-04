import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { LANGUAGES } from '../data/portfolioData';

export const LanguagesSection: React.FC = () => {
  return (
    <section className="py-16 relative bg-dark-bg/95 text-slate-100 border-t border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                Languages & International Communication
              </h3>
              <p className="text-xs text-slate-400 font-mono">Maîtrise des langues pour environnements internationaux</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto">
            {LANGUAGES.map((lang) => (
              <motion.div
                key={lang.name}
                whileHover={{ scale: 1.03 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 shadow-md font-sans"
              >
                <span className="text-2xl">{lang.flag}</span>
                <div>
                  <div className="text-sm font-bold text-slate-200">{lang.name}</div>
                  <div className="text-xs text-sky-400 font-mono">{lang.level}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
