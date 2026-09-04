import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  badge: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  subtitle,
  centered = true,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}
    >
      <div
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 dark:bg-sky-500/10 light:bg-sky-100 text-sky-400 dark:text-sky-400 light:text-sky-700 border border-sky-500/20 dark:border-sky-500/20 light:border-sky-300 text-xs font-mono font-medium tracking-wide uppercase mb-3 ${
          centered ? 'mx-auto' : ''
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
        {badge}
      </div>

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-3 text-base sm:text-lg text-slate-400 dark:text-slate-400 light:text-slate-600 max-w-2xl mx-auto font-sans leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
