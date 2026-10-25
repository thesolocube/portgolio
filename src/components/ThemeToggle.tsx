import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="relative p-2 rounded-xl bg-slate-200/90 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-all duration-300 active:scale-95 shadow-sm group"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 rotate-0 group-hover:rotate-90" />
      ) : (
        <Moon className="w-4 h-4 text-indigo-600 transition-transform duration-300 rotate-0 group-hover:-rotate-12" />
      )}
    </button>
  );
};
