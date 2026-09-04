import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="relative p-2 rounded-lg bg-slate-800/80 dark:bg-slate-800/80 light:bg-slate-200 border border-slate-700/60 dark:border-slate-700/60 light:border-slate-300 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-sky-400 dark:hover:text-sky-400 transition-all duration-300 active:scale-95 shadow-sm"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-90" />
      ) : (
        <Moon className="w-4 h-4 text-indigo-600 transition-transform duration-300 rotate-0 hover:-rotate-12" />
      )}
    </button>
  );
};
