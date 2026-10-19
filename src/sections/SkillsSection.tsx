import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code, Server, Cpu, Database, Layers, Sparkles,
  Search, CheckCircle2, Star
} from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { SKILL_CATEGORIES } from '../data/portfolioData';

const iconMap: Record<string, React.ElementType> = {
  Code,
  Server,
  Cpu,
  Database,
  Layers,
  Sparkles,
};

const categoryTheme: Record<string, { border: string; bg: string; accent: string; glow: string }> = {
  languages: {
    border: 'hover:border-sky-500/40',
    bg: 'bg-sky-500/10',
    accent: 'text-sky-400',
    glow: 'from-sky-500/10 to-transparent',
  },
  backend: {
    border: 'hover:border-indigo-500/40',
    bg: 'bg-indigo-500/10',
    accent: 'text-indigo-400',
    glow: 'from-indigo-500/10 to-transparent',
  },
  'data-ai': {
    border: 'hover:border-emerald-500/40',
    bg: 'bg-emerald-500/10',
    accent: 'text-emerald-400',
    glow: 'from-emerald-500/10 to-transparent',
  },
  architecture: {
    border: 'hover:border-amber-500/40',
    bg: 'bg-amber-500/10',
    accent: 'text-amber-400',
    glow: 'from-amber-500/10 to-transparent',
  },
  databases: {
    border: 'hover:border-purple-500/40',
    bg: 'bg-purple-500/10',
    accent: 'text-purple-400',
    glow: 'from-purple-500/10 to-transparent',
  },
  infrastructure: {
    border: 'hover:border-cyan-500/40',
    bg: 'bg-cyan-500/10',
    accent: 'text-cyan-400',
    glow: 'from-cyan-500/10 to-transparent',
  },
};

export const SkillsSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = SKILL_CATEGORIES.map((category) => {
    if (!searchQuery.trim()) return category;
    const query = searchQuery.toLowerCase();
    const matchesCategory = category.title.toLowerCase().includes(query);
    const matchingSkills = category.skills.filter((s) => s.name.toLowerCase().includes(query));
    if (matchesCategory) return category;
    if (matchingSkills.length > 0) return { ...category, skills: matchingSkills };
    return null;
  }).filter(Boolean) as typeof SKILL_CATEGORIES;

  return (
    <section id="skills" className="py-24 relative bg-[#060810] text-slate-100 overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Technical Competencies"
          title="Skills Matrix & Tech Stack"
          subtitle="Compétences techniques structurées par domaines d'ingénierie, vérifiées et éprouvées en projets réels."
        />

        {/* Search bar & Live Filter */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une technologie (ex: Neo4j, RabbitMQ, Docker...)"
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-200 placeholder-slate-500 text-xs font-mono focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all shadow-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-500 hover:text-slate-300 bg-slate-800 px-2 py-0.5 rounded"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredCategories.map((category, index) => {
              const IconComponent = iconMap[category.iconName] || Code;
              const theme = categoryTheme[category.id] || categoryTheme.languages;

              return (
                <motion.div
                  key={category.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className={`group relative glass rounded-3xl p-6 sm:p-7 border border-slate-800/80 ${theme.border} transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between overflow-hidden`}
                >
                  {/* Subtle top gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${theme.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                  <div className="relative z-10">
                    {/* Category Header */}
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/80">
                      <div className="flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-2xl ${theme.bg} border border-slate-800 flex items-center justify-center ${theme.accent} shadow-md group-hover:scale-110 transition-transform`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-slate-100 group-hover:text-white transition-colors">
                            {category.title}
                          </h3>
                          <span className="text-[10px] font-mono text-slate-500">
                            {category.skills.length} compétences
                          </span>
                        </div>
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${theme.bg} ${theme.accent} border-slate-700/50 font-bold`}>
                        {category.id}
                      </span>
                    </div>

                    {/* Skills Grid Badges */}
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 cursor-default ${
                            skill.highlight
                              ? 'bg-slate-900/90 text-slate-100 border border-sky-500/30 font-semibold shadow-sm hover:border-sky-400 hover:bg-slate-800'
                              : 'bg-slate-950/70 text-slate-400 border border-slate-800/80 hover:border-slate-700 hover:text-slate-300'
                          }`}
                        >
                          {skill.highlight ? (
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400/30 shrink-0" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-600 shrink-0" />
                          )}
                          <span>{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="relative z-10 mt-6 pt-4 border-t border-slate-800/60 text-[10px] font-mono text-slate-500 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-slate-400">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Production Verified
                    </span>
                    <span className={`${theme.accent} font-semibold`}>
                      {category.skills.filter((s) => s.highlight).length} Core Focus
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
