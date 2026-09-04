import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { CERTIFICATIONS } from '../data/portfolioData';

export const CertificationsSection: React.FC = () => {
  return (
    <section id="certifications" className="py-24 relative bg-dark-bg text-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Verified Credentials"
          title="Certifications & Accréditations"
          subtitle="Certifications internationales de haut niveau délivrées par des universités et entreprises majeures."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 hover:border-sky-500/40 rounded-2xl p-6 shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Institution & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider bg-sky-500/10 px-2.5 py-1 rounded-md border border-sky-500/20">
                    {cert.institution}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                    <CheckCircle className="w-3 h-3" />
                    <span>Score: {cert.score}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 group-hover:text-sky-400 transition-colors leading-snug">
                  {cert.title}
                </h3>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-sky-400" /> Verified Certificate
                </span>
                <span className="text-[10px] text-slate-500">Academic Grade</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
