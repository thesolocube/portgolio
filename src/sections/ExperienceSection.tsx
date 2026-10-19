import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle2, Star, Building2 } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { EXPERIENCES } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative bg-[#060810] text-slate-100 overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Career Journey"
          title="Work Experience & Internships"
          subtitle="Parcours professionnel et stages en ingénierie logicielle, architectures événementielles et déploiements virtualisés."
        />

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto mt-12">
          {/* Vertical Timeline Line — desktop centered */}
          <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-sky-500 via-indigo-500 to-slate-800 -translate-x-1/2" />

          {/* Mobile-only left line */}
          <div className="block sm:hidden absolute left-5 top-0 bottom-0 w-[2px] bg-gradient-to-b from-sky-500 via-indigo-500 to-slate-800" />

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
                  className={`relative flex items-start sm:items-center ${
                    isEven ? 'sm:flex-row-reverse' : 'sm:flex-row'
                  } flex-row gap-0`}
                >
                  {/* Timeline Center Dot */}
                  <div className="absolute left-5 sm:left-1/2 top-0 sm:top-1/2 -translate-x-1/2 sm:-translate-y-1/2 z-20 flex items-center justify-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shadow-xl transition-transform duration-300 hover:scale-110 ${
                        isFeatured
                          ? 'bg-gradient-to-tr from-sky-400 to-blue-600 text-slate-950 ring-4 ring-sky-500/30'
                          : 'bg-slate-900 border-2 border-slate-700 text-sky-400 ring-2 ring-slate-800'
                      }`}
                    >
                      <Briefcase className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Desktop half-width spacer (opposite side) */}
                  <div className="hidden sm:block sm:w-1/2 flex-shrink-0" />

                  {/* Experience Card */}
                  <div className="w-full pl-16 sm:pl-0 sm:w-[calc(50%-2.5rem)] sm:mx-5">
                    <div
                      className={`group relative glass rounded-3xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 shadow-2xl overflow-hidden ${
                        isFeatured
                          ? 'border border-sky-500/40 ring-1 ring-sky-500/20'
                          : 'border border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      {/* Top gradient highlight */}
                      <div className={`absolute top-0 inset-x-0 h-1 ${
                        isFeatured
                          ? 'bg-gradient-to-r from-sky-400 to-blue-500'
                          : 'bg-gradient-to-r from-slate-700 to-slate-800'
                      }`} />

                      {/* Featured Badge */}
                      {isFeatured && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/15 text-sky-400 text-[11px] font-mono font-bold uppercase tracking-wider mb-3 border border-sky-500/30">
                          <Star className="w-3 h-3 fill-sky-400" />
                          <span>{exp.featuredBadge}</span>
                        </div>
                      )}

                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <h3 className="text-xl font-black text-slate-100 group-hover:text-sky-300 transition-colors">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-slate-950/80 px-2.5 py-1 rounded-xl border border-slate-800">
                          <Calendar className="w-3.5 h-3.5 text-sky-400" />
                          <span>{exp.period}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm font-bold text-sky-400 font-mono mb-3">
                        <Building2 className="w-4 h-4 text-sky-500" />
                        <span>{exp.company}</span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed mb-4 font-sans">
                        {exp.description}
                      </p>

                      {/* Key Achievements Bullet points */}
                      <div className="space-y-2 border-t border-slate-800/80 pt-4">
                        <div className="text-[11px] font-mono text-slate-400 font-semibold uppercase tracking-wider">
                          Key Deliverables:
                        </div>
                        {exp.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                            <span className="leading-snug">{highlight}</span>
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
