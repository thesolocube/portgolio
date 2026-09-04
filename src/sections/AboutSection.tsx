import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Code2, Zap, Server, Sparkles } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { PERSONAL_INFO, ABOUT_CARDS } from '../data/portfolioData';

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  Code2,
  Zap,
  Sparkles,
  CloudServer: Server,
  Server,
};

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 relative bg-dark-bg/95 text-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="About Me"
          title="Ingénieur Logiciel & Architecte en Devenir"
          subtitle="Passionné par les architectures complexes, le découplage des systèmes et les expériences web modernes."
        />

        {/* Narrative text block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-16 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-xl text-center"
        >
          <p className="text-slate-300 dark:text-slate-300 light:text-slate-700 text-base sm:text-lg leading-relaxed font-sans">
            {PERSONAL_INFO.aboutText}
          </p>
        </motion.div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ABOUT_CARDS.map((card, index) => {
            const IconComponent = iconMap[card.icon] || Code2;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-slate-900/90 dark:bg-slate-900/90 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 hover:border-sky-500/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-sky-500/10 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-slate-950 transition-all">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 group-hover:text-sky-400 transition-colors">
                    {card.title}
                  </h3>

                  <div className="text-xs font-mono text-sky-400 mt-1 mb-3 font-semibold">
                    {card.subtitle}
                  </div>

                  <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 leading-relaxed font-sans">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
