import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle2, Star } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { EXPERIENCES } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative bg-dark-bg text-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Career Journey"
          title="Work Experience"
          subtitle="Parcours professionnel et stages en ingénierie logicielle, développement Full-Stack et gestion de projets."
        />

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto mt-12">
          {/* Vertical Timeline Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-sky-500 via-indigo-500 to-slate-800 -translate-x-1/2" />

          <div className="space-y-12">
            {EXPERIENCES.map((exp, index) => {
              const isEven = index % 2 === 0;
              const isFeatured = !!exp.featuredBadge;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`relative flex flex-col sm:flex-row items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Center Dot */}
                  <div className="absolute left-4 sm:left-1/2 top-0 -translate-x-1/2 z-20 flex items-center justify-center">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg ${
                        isFeatured
                          ? 'bg-sky-500 text-slate-950 ring-4 ring-sky-500/30'
                          : 'bg-slate-900 border border-slate-700 text-sky-400'
                      }`}
                    >
                      <Briefcase className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Experience Card */}
                  <div className="w-full sm:w-[calc(50%-2.5rem)] ml-12 sm:ml-0">
                    <div
                      className={`group relative bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border rounded-2xl p-6 transition-all duration-300 shadow-xl ${
                        isFeatured
                          ? 'border-sky-500/50 ring-1 ring-sky-500/30 shadow-sky-500/10'
                          : 'border-slate-800 dark:border-slate-800 light:border-slate-200 hover:border-slate-700'
                      }`}
                    >
                      {/* Featured Badge */}
                      {isFeatured && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/15 text-sky-400 text-[11px] font-mono font-bold uppercase tracking-wider mb-3 border border-sky-500/30">
                          <Star className="w-3 h-3 fill-sky-400" />
                          {exp.featuredBadge}
                        </div>
                      )}

                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <h3 className="text-xl font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-800">
                          <Calendar className="w-3.5 h-3.5 text-sky-400" />
                          <span>{exp.period}</span>
                        </div>
                      </div>

                      <div className="text-sm font-semibold text-sky-400 font-mono mb-3">
                        {exp.company}
                      </div>

                      <p className="text-xs text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed mb-4">
                        {exp.description}
                      </p>

                      {/* Key Achievements Bullet points */}
                      <div className="space-y-2 border-t border-slate-800/80 pt-4">
                        <div className="text-[11px] font-mono text-slate-400 font-semibold uppercase tracking-wider">
                          Key Achievements:
                        </div>
                        {exp.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
