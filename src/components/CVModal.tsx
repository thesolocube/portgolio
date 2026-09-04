import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, GraduationCap, Briefcase, Award } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, EDUCATION, CERTIFICATIONS } from '../data/portfolioData';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  const handleDownload = () => {
    // Generate clean text-based CV Blob for instant download
    const cvText = `
====================================================================
SAMI RAHNI - SOFTWARE ENGINEER & FULL-STACK DEVELOPER
====================================================================
Email: ${PERSONAL_INFO.contactEmail}
LinkedIn: ${PERSONAL_INFO.linkedinUrl}
Location: ${PERSONAL_INFO.location}

PROFIL & SPECIALITE
${PERSONAL_INFO.aboutText}

EXPERIENCES PROFESSIONNELLES
--------------------------------------------------------------------
${EXPERIENCES.map(
  (exp) => `
* ${exp.role} - ${exp.company} (${exp.period})
  ${exp.description}
  Réalisations:
  ${exp.highlights.map((h) => `  - ${h}`).join('\n')}
`
).join('\n')}

FORMATION
--------------------------------------------------------------------
${EDUCATION.map(
  (edu) => `
* ${edu.degree} - ${edu.institution} (${edu.period})
  ${edu.currentStatus || ''}
`
).join('\n')}

CERTIFICATIONS & SCORES
--------------------------------------------------------------------
${CERTIFICATIONS.map((cert) => `* ${cert.institution}: ${cert.title} (${cert.score})`).join('\n')}

LANGUES
* Arabe: Langue maternelle
* Français: Bilingue
* Anglais: Compétence professionnelle
====================================================================
`;

    const blob = new Blob([cvText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Sami_Rahni_CV.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden z-10 my-8 max-h-[85vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100">Curriculum Vitae — Sami Rahni</h3>
                  <p className="text-xs text-slate-400 font-mono">Software Engineer & Full-Stack Developer</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-sky-500 text-slate-950 hover:bg-sky-400 font-semibold text-xs transition active:scale-95 shadow-md shadow-sky-500/20"
                >
                  <Download className="w-3.5 h-3.5" /> Download CV
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body Preview */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300 font-sans">
              {/* Summary */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <h4 className="text-xs font-mono font-semibold text-sky-400 uppercase tracking-wider mb-2">
                  Résumé Professionnel
                </h4>
                <p className="text-slate-300 text-xs leading-relaxed">{PERSONAL_INFO.aboutText}</p>
              </div>

              {/* Experience */}
              <div>
                <h4 className="text-xs font-mono font-semibold text-sky-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> Expériences Clés
                </h4>
                <div className="space-y-3">
                  {EXPERIENCES.map((exp) => (
                    <div key={exp.id} className="bg-slate-950/40 p-3.5 rounded-lg border border-slate-800">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-bold text-slate-200">{exp.role}</span>
                          <span className="text-sky-400 text-xs font-mono block">{exp.company}</span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-2">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h4 className="text-xs font-mono font-semibold text-sky-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" /> Formation Academic
                </h4>
                <div className="space-y-2">
                  {EDUCATION.map((edu) => (
                    <div key={edu.id} className="bg-slate-950/40 p-3 rounded-lg border border-slate-800 flex justify-between items-center text-xs">
                      <div>
                        <div className="font-semibold text-slate-200">{edu.degree}</div>
                        <div className="text-slate-400">{edu.institution}</div>
                      </div>
                      <span className="font-mono text-slate-400">{edu.period}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications Highlights */}
              <div>
                <h4 className="text-xs font-mono font-semibold text-sky-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4" /> Certifications Importantes
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {CERTIFICATIONS.map((cert) => (
                    <div key={cert.id} className="bg-slate-950/40 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="font-medium text-slate-200">{cert.title}</div>
                        <div className="text-[11px] text-slate-400">{cert.institution}</div>
                      </div>
                      <span className="font-mono font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                        {cert.score}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/50 flex justify-end">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition"
              >
                <Download className="w-4 h-4" /> Télécharger la version complète
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
