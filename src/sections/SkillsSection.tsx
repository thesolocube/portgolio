import React from 'react';
import { motion } from 'framer-motion';
import { Code, Server, Cpu, Database, Layers, Sparkles } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { SKILL_CATEGORIES } from '../data/portfolioData';

const iconMap: Record<string, React.ElementType> = {
  Code,
  Server,
  Cpu,
  Database,
  Layers,
};

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="py-24 relative bg-dark-bg text-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Technical Skills"
          title="Skills Matrix & Tech Stack"
          subtitle="Compétences techniques structurées par domaines d'ingénierie (sans pourcentages artificiels)."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((category, index) => {
            const IconComponent = iconMap[category.iconName] || Code;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-2xl p-6 shadow-xl hover:border-sky-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills Grid Badges */}
                  <div className="flex flex-wrap gap-2.5">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
                          skill.highlight
                            ? 'bg-sky-500/10 text-sky-300 border border-sky-500/30 font-semibold hover:bg-sky-500/20 hover:border-sky-400'
                            : 'bg-slate-950/70 text-slate-300 border border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {skill.highlight && <Sparkles className="w-3 h-3 text-sky-400 shrink-0" />}
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60 text-[10px] font-mono text-slate-400 flex justify-between">
                  <span>{category.skills.length} Competencies</span>
                  <span className="text-sky-400">Verified</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
