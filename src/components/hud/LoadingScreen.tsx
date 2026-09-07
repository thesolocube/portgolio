import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Play, Radio } from 'lucide-react';
import { audioManager } from '../../utils/audioSFX';

interface LoadingScreenProps {
  onStart: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onStart }) => {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [currentTask, setCurrentTask] = useState('Initializing WebGL 3D Engine...');

  useEffect(() => {
    const tasks = [
      'Initializing WebGL 3D Engine...',
      'Connecting Event Streaming Brokers (RabbitMQ)...',
      'Loading Graph Database Models (Neo4j)...',
      'Loading Data & AI Intelligence Pipelines...',
      'System Ready. Initializing Cyberpunk Lab...',
    ];

    let taskIndex = 0;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReady(true);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 4;
        if (next > 25 && taskIndex === 0) { taskIndex = 1; setCurrentTask(tasks[1]); }
        if (next > 50 && taskIndex === 1) { taskIndex = 2; setCurrentTask(tasks[2]); }
        if (next > 75 && taskIndex === 2) { taskIndex = 3; setCurrentTask(tasks[3]); }
        if (next >= 95 && taskIndex === 3) { taskIndex = 4; setCurrentTask(tasks[4]); }
        return Math.min(next, 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    audioManager.playBoot();
    onStart();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#060810] text-slate-100 font-mono select-none overflow-hidden"
      >
        {/* Background Cyberpunk Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-sky-500/5 via-transparent to-purple-500/5 pointer-events-none" />

        <div className="relative z-10 max-w-md w-full mx-4 p-8 bg-slate-950/80 border border-slate-800/80 rounded-2xl shadow-2xl backdrop-blur-xl text-center space-y-6">
          {/* Header Icon */}
          <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 mx-auto flex items-center justify-center shadow-lg shadow-sky-500/10">
            <Terminal className="w-8 h-8 animate-pulse" />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-extrabold tracking-tight text-slate-100 uppercase">
              Sami Rahni // Lab OS
            </h2>
            <div className="text-xs text-sky-400 font-semibold">
              Software Engineer • Data & AI • EDA
            </div>
          </div>

          {/* Progress Section */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span className="truncate pr-2">{currentTask}</span>
              <span className="font-bold text-sky-400 shrink-0">{progress}%</span>
            </div>

            {/* Progress Bar */}
            <div className="h-2 w-full bg-slate-900 rounded-full border border-slate-800 overflow-hidden p-[1px]">
              <div
                className="h-full bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 rounded-full transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* START Button (Jesse Zhou style) */}
          <div className="pt-2">
            {isReady ? (
              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStart}
                onMouseEnter={() => audioManager.playHover()}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-slate-950 font-black text-sm tracking-wider uppercase shadow-xl shadow-sky-500/30 flex items-center justify-center gap-2 group transition-all"
              >
                <Play className="w-4 h-4 fill-slate-950 group-hover:translate-x-0.5 transition-transform" />
                <span>START SYSTEM</span>
              </motion.button>
            ) : (
              <div className="py-3 text-xs text-slate-500 flex items-center justify-center gap-2">
                <Radio className="w-3.5 h-3.5 animate-spin text-sky-400" />
                <span>Loading 3D Cyberpunk Workspace...</span>
              </div>
            )}
          </div>

          {/* Footer Specs */}
          <div className="pt-4 border-t border-slate-900 text-[10px] text-slate-500 flex justify-between">
            <span>Jesse Zhou Inspired Engine</span>
            <span className="text-sky-400">EMSI Master 1</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
