import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Briefcase, FolderGit2, Cpu, GraduationCap, Award, Mail, Sun, Moon, Copy, Check, ExternalLink, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { PERSONAL_INFO } from '../data/portfolioData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCV: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onOpenCV }) => {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { theme, toggleTheme } = useTheme();

  const actions = [
    {
      id: 'about',
      label: 'Go to About Me',
      category: 'Navigation',
      icon: User,
      action: () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'experience',
      label: 'Go to Work Experience',
      category: 'Navigation',
      icon: Briefcase,
      action: () => {
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'projects',
      label: 'Go to Featured Projects',
      category: 'Navigation',
      icon: FolderGit2,
      action: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'skills',
      label: 'Go to Technical Skills',
      category: 'Navigation',
      icon: Cpu,
      action: () => {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'education',
      label: 'Go to Education',
      category: 'Navigation',
      icon: GraduationCap,
      action: () => {
        document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'certifications',
      label: 'Go to Certifications',
      category: 'Navigation',
      icon: Award,
      action: () => {
        document.getElementById('certifications')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'languages',
      label: 'Go to Languages',
      category: 'Navigation',
      icon: Globe,
      action: () => {
        document.getElementById('languages')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'contact',
      label: 'Go to Contact Form',
      category: 'Navigation',
      icon: Mail,
      action: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'cv',
      label: 'Download / View Resume',
      category: 'Actions',
      icon: Award,
      action: () => {
        onOpenCV();
        onClose();
      },
    },
    {
      id: 'copy-email',
      label: 'Copy Email Address',
      category: 'Actions',
      icon: Copy,
      action: () => {
        navigator.clipboard.writeText(PERSONAL_INFO.contactEmail);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
    },
    {
      id: 'theme',
      label: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      category: 'Preferences',
      icon: theme === 'dark' ? Sun : Moon,
      action: () => {
        toggleTheme();
        onClose();
      },
    },
    {
      id: 'linkedin',
      label: 'Open LinkedIn Profile',
      category: 'External',
      icon: ExternalLink,
      action: () => {
        window.open(PERSONAL_INFO.linkedinUrl, '_blank');
        onClose();
      },
    },
    {
      id: 'github',
      label: 'Open GitHub Profile',
      category: 'External',
      icon: ExternalLink,
      action: () => {
        window.open(PERSONAL_INFO.githubUrl, '_blank');
        onClose();
      },
    },
  ];

  const filteredActions = actions.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredActions.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % (filteredActions.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredActions[selectedIndex]) {
          filteredActions[selectedIndex].action();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredActions, selectedIndex]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/50 backdrop-blur-md"
        />

        {/* Command Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-2xl overflow-hidden z-10"
        >
          {/* Input field */}
          <div className="flex items-center px-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60">
            <Search className="w-4 h-4 text-sky-600 dark:text-sky-400 mr-3 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or jump to section..."
              autoFocus
              className="w-full py-4 bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none font-sans"
            />
            <kbd className="px-2 py-1 rounded bg-slate-200 dark:bg-slate-800 text-[10px] font-mono text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700">
              ESC
            </kbd>
          </div>

          {/* Action List */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-1">
            {filteredActions.length === 0 ? (
              <div className="p-6 text-center text-xs font-mono text-slate-500">
                No matching actions found for &quot;{query}&quot;
              </div>
            ) : (
              filteredActions.map((item, index) => {
                const IconComponent = item.icon;
                const isSelected = index === selectedIndex;
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs text-left transition-all group font-sans ${
                      isSelected
                        ? 'bg-sky-50 dark:bg-sky-500/15 text-slate-900 dark:text-slate-100 border border-sky-200 dark:border-sky-500/30'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg transition-colors ${
                        isSelected
                          ? 'bg-sky-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400 group-hover:bg-sky-500 group-hover:text-white'
                      }`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="font-medium group-hover:text-sky-600 dark:group-hover:text-sky-300 transition">
                        {item.label}
                      </span>
                    </div>
                    {item.id === 'copy-email' && copied ? (
                      <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Copied!
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-500 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                        {item.category}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Footer tip */}
          <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-500 flex justify-between items-center">
            <span>
              Use <kbd className="text-slate-700 dark:text-slate-300">↑↓</kbd> to navigate, <kbd className="text-slate-700 dark:text-slate-300">Enter</kbd> to select
            </span>
            <span className="text-sky-600 dark:text-sky-400">Sami Rahni · Portfolio</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
