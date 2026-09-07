import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { useCommandPalette } from './hooks/useCommandPalette';
import { ScrollProgress } from './components/ScrollProgress';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { CommandPalette } from './components/CommandPalette';
import { CVModal } from './components/CVModal';
import { LoadingScreen } from './components/hud/LoadingScreen';
import { HUDOverlay } from './components/hud/HUDOverlay';
import { EngineeringLab3D } from './components/3d/EngineeringLab3D';
import { audioManager } from './utils/audioSFX';

import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { ExperienceSection } from './sections/ExperienceSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { SkillsSection } from './sections/SkillsSection';
import { EducationSection } from './sections/EducationSection';
import { CertificationsSection } from './sections/CertificationsSection';
import { LanguagesSection } from './sections/LanguagesSection';
import { ContactSection } from './sections/ContactSection';

export const AppContent: React.FC = () => {
  const { isOpen: isCommandOpen, open: openCommand, close: closeCommand } = useCommandPalette();
  const [isCVOpen, setIsCVOpen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [resetCameraTrigger, setResetCameraTrigger] = useState(0);

  return (
    <div className="min-h-screen bg-[#060810] dark:bg-[#060810] light:bg-slate-50 text-slate-100 dark:text-slate-100 light:text-slate-900 transition-colors duration-300 relative selection:bg-sky-500 selection:text-slate-950 font-sans">
      {/* Jesse Zhou Style Loading Boot Screen */}
      {!hasStarted && (
        <LoadingScreen onStart={() => setHasStarted(true)} />
      )}

      {/* Top Scroll Progress Bar */}
      <ScrollProgress />

      {/* Glassmorphic Navbar */}
      <Navbar
        onOpenCommandPalette={openCommand}
        onOpenCV={() => setIsCVOpen(true)}
      />

      {/* Main Content Sections */}
      <main id="main-content">
        {/* 3D WebGL Lab Mode vs 2D Clean Mode Header */}
        {viewMode === '3d' ? (
          <section className="pt-28 pb-12 px-4 max-w-7xl mx-auto text-center space-y-6">
            <EngineeringLab3D onResetCameraTrigger={resetCameraTrigger} />
          </section>
        ) : null}

        <HeroSection onOpenCV={() => setIsCVOpen(true)} />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <CertificationsSection />
        <LanguagesSection />
        <ContactSection />
      </main>

      {/* Jesse Zhou Floating HUD Controls */}
      <HUDOverlay
        viewMode={viewMode}
        onToggleViewMode={() => setViewMode((prev) => (prev === '3d' ? '2d' : '3d'))}
        onResetCamera={() => setResetCameraTrigger((prev) => prev + 1)}
        onOpenCommandPalette={openCommand}
        audioEnabled={audioEnabled}
        onToggleAudio={() => setAudioEnabled(audioManager.toggleAudio())}
      />

      {/* Footer */}
      <Footer />

      {/* Back To Top Floating Action */}
      <BackToTop />

      {/* Command Palette (Cmd+K / Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={closeCommand}
        onOpenCV={() => setIsCVOpen(true)}
      />

      {/* CV Modal */}
      <CVModal
        isOpen={isCVOpen}
        onClose={() => setIsCVOpen(false)}
      />
    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
