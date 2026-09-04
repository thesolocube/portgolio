import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Briefcase, FolderGit2, Cpu, GraduationCap, Award, Mail, Sun, Moon, Copy, Check, ExternalLink } from 'lucide-react';
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
  const { theme, toggleTheme } = useTheme();

  if (!isOpen) return null;

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

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Command Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden z-10"
        >
          {/* Input field */}
          <div className="flex items-center px-4 border-b border-slate-800 bg-slate-950/40">
            <Search className="w-4 h-4 text-slate-400 mr-3 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search section..."
              autoFocus
              className="w-full py-4 bg-transparent text-slate-100 placeholder-slate-500 text-sm focus:outline-none font-sans"
            />
            <kbd className="px-2 py-1 rounded bg-slate-800 text-[10px] font-mono text-slate-400 border border-slate-700">
              ESC
            </kbd>
          </div>

          {/* Action List */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-1">
            {filteredActions.length === 0 ? (
              <div className="p-6 text-center text-xs font-mono text-slate-500">
                No matching actions found for "{query}"
              </div>
            ) : (
              filteredActions.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg hover:bg-slate-800/80 text-slate-200 text-xs text-left transition group font-sans"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-md bg-slate-800 text-sky-400 group-hover:bg-sky-500 group-hover:text-slate-950 transition">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="font-medium group-hover:text-sky-300 transition">
                        {item.label}
                      </span>
                    </div>
                    {item.id === 'copy-email' && copied ? (
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Copied!
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-500 px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                        {item.category}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Footer tip */}
          <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800 text-[11px] font-mono text-slate-500 flex justify-between items-center">
            <span>
              Tip: Use <kbd className="text-slate-300">Cmd+K</kbd> or <kbd className="text-slate-300">Ctrl+K</kbd> anywhere
            </span>
            <span>Sami Rahni Portfolio</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
