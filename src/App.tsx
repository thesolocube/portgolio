import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { useCommandPalette } from './hooks/useCommandPalette';
import { ScrollProgress } from './components/ScrollProgress';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { CommandPalette } from './components/CommandPalette';
import { CVModal } from './components/CVModal';

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

  return (
    <div className="min-h-screen bg-[#090d16] dark:bg-[#090d16] light:bg-slate-50 text-slate-100 dark:text-slate-100 light:text-slate-900 transition-colors duration-300 relative selection:bg-sky-500 selection:text-slate-950 font-sans">
      {/* Top Scroll Progress Bar */}
      <ScrollProgress />

      {/* Glassmorphic Navbar */}
      <Navbar
        onOpenCommandPalette={openCommand}
        onOpenCV={() => setIsCVOpen(true)}
      />

      {/* Main Content Sections */}
      <main id="main-content">
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
