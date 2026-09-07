import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Eye, Box, RotateCcw, Command, Sparkles } from 'lucide-react';
import { audioManager } from '../../utils/audioSFX';

interface HUDOverlayProps {
  viewMode: '3d' | '2d';
  onToggleViewMode: () => void;
  onResetCamera: () => void;
  onOpenCommandPalette: () => void;
  audioEnabled: boolean;
  onToggleAudio: () => void;
}

export const HUDOverlay: React.FC<HUDOverlayProps> = ({
  viewMode,
  onToggleViewMode,
  onResetCamera,
  onOpenCommandPalette,
  audioEnabled,
  onToggleAudio,
}) => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-xl w-full px-4 pointer-events-none">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="pointer-events-auto bg-slate-950/85 border border-slate-800/90 rounded-full px-4 py-2 shadow-2xl backdrop-blur-xl flex items-center justify-between gap-3 text-xs font-mono text-slate-200"
      >
        {/* Left Status Pill */}
        <div className="flex items-center gap-2 pr-2 border-r border-slate-800/80">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[11px] font-bold text-sky-400 hidden sm:inline">
            {viewMode === '3d' ? '3D LAB MODE' : '2D CLEAN MODE'}
          </span>
        </div>

        {/* Center Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* View Switcher */}
          <button
            onClick={() => {
              audioManager.playClick();
              onToggleViewMode();
            }}
            onMouseEnter={() => audioManager.playHover()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition active:scale-95 text-xs font-medium"
            title="Toggle between 3D Cyberpunk Lab and 2D Clean View"
          >
            {viewMode === '3d' ? (
              <>
                <Eye className="w-3.5 h-3.5 text-sky-400" />
                <span className="text-[11px]">Switch to 2D</span>
              </>
            ) : (
              <>
                <Box className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-[11px]">Enter 3D Lab</span>
              </>
            )}
          </button>

          {/* Reset Camera (Only in 3D mode) */}
          {viewMode === '3d' && (
            <button
              onClick={() => {
                audioManager.playClick();
                onResetCamera();
              }}
              onMouseEnter={() => audioManager.playHover()}
              className="p-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 transition active:scale-95"
              title="Reset 3D Camera View"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400 hover:text-sky-400" />
            </button>
          )}

          {/* Command Palette Trigger */}
          <button
            onClick={() => {
              audioManager.playClick();
              onOpenCommandPalette();
            }}
            onMouseEnter={() => audioManager.playHover()}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 transition text-xs"
            title="Open Command Palette (Cmd+K)"
          >
            <Command className="w-3.5 h-3.5 text-sky-400" />
            <kbd className="text-[10px] px-1 rounded bg-slate-950 border border-slate-800 text-slate-400">
              ⌘K
            </kbd>
          </button>

          {/* Audio SFX Toggle */}
          <button
            onClick={() => {
              onToggleAudio();
            }}
            onMouseEnter={() => audioManager.playHover()}
            className="p-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 transition active:scale-95"
            title={audioEnabled ? 'Disable Audio SFX' : 'Enable Audio SFX'}
          >
            {audioEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-slate-500" />
            )}
          </button>
        </div>

        {/* Right Badge */}
        <div className="hidden md:flex items-center gap-1 text-[10px] text-slate-400 pl-2 border-l border-slate-800/80">
          <Sparkles className="w-3 h-3 text-purple-400" />
          <span>Sami Rahni OS</span>
        </div>
      </motion.div>
    </div>
  );
};
