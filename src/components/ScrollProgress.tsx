import React from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';

export const ScrollProgress: React.FC = () => {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-sky-400 via-brand-blue to-brand-violet transition-all duration-150 shadow-[0_0_8px_rgba(56,189,248,0.6)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
