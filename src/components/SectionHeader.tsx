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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`mb-14 relative ${centered ? 'text-center' : 'text-left'}`}
    >
      {/* Decorative background glow behind badge */}
      {centered && (
        <div className="absolute left-1/2 -top-6 -translate-x-1/2 w-48 h-12 bg-sky-500/10 blur-2xl rounded-full pointer-events-none" />
      )}

      {/* Pill Badge */}
      <div
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/90 dark:bg-slate-900/80 border border-sky-500/30 text-sky-600 dark:text-sky-400 text-xs font-mono font-semibold tracking-wider uppercase mb-4 shadow-sm backdrop-blur-md ${
          centered ? 'mx-auto' : ''
        }`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 dark:bg-sky-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500 dark:bg-sky-400" />
        </span>
        <span>{badge}</span>
      </div>

      {/* Main Title */}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
        {title}
      </h2>

      {/* Gradient divider line */}
      <div
        className={`mt-4 h-[2px] w-24 bg-gradient-to-r from-transparent via-sky-500 dark:via-sky-400 to-transparent ${
          centered ? 'mx-auto' : ''
        }`}
      />

      {/* Subtitle */}
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
