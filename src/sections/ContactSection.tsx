import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail, Linkedin, MapPin, Send, CheckCircle2, AlertCircle,
  Loader2, Copy, Check, MessageSquare, ArrowUpRight
} from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.contactEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setErrorMessage('Veuillez saisir une adresse email valide.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    const subject = encodeURIComponent(
      formData.subject || `Message de ${formData.name} via Portfolio`
    );
    const body = encodeURIComponent(
      `Nom: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );
    const mailtoLink = `mailto:${PERSONAL_INFO.contactEmail}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      window.location.href = mailtoLink;
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 6000);
    }, 600);
  };

  return (
    <section id="contact" className="py-24 relative bg-slate-50 dark:bg-[#060810] text-slate-900 dark:text-slate-100 overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-sky-500/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Let's Connect"
          title="Prêt à Collaborer ?"
          subtitle="Vous avez une opportunité d'ingénierie logicielle, un projet ambitieux ou souhaitez échanger autour des architectures distribuées ? Parlons-en."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto items-start">
          {/* Left Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="glass rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
              <div>
                <h3 className="text-xl font-black text-slate-100">
                  Coordonnées Directes
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Disponible immédiatement pour échanger
                </p>
              </div>

              <div className="space-y-4 text-sm font-sans">
                {/* Email with copy button */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                      <Mail className="w-4 h-4 text-sky-400" />
                      <span>Email Professionnel</span>
                    </div>
                    <button
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-sky-300 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800 transition-colors"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copié !</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copier</span>
                        </>
                      )}
                    </button>
                  </div>
                  <a
                    href={`mailto:${PERSONAL_INFO.contactEmail}`}
                    className="block font-semibold text-slate-200 hover:text-sky-400 font-mono text-xs truncate transition-colors"
                  >
                    {PERSONAL_INFO.contactEmail}
                  </a>
                </div>

                {/* LinkedIn Card */}
                <a
                  href={PERSONAL_INFO.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-sky-500/40 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 group-hover:scale-110 transition-transform">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-400">Réseau Professionnel</div>
                      <div className="font-semibold text-slate-200 group-hover:text-sky-300 transition-colors text-xs">
                        linkedin.com/in/sami-rahni
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* Location Card */}
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-400">Localisation Actuelle</div>
                    <div className="font-semibold text-slate-200 text-xs">{PERSONAL_INFO.location}</div>
                  </div>
                </div>
              </div>

              {/* Status banner */}
              <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-xs font-mono text-emerald-400 flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span>À l&apos;écoute d&apos;opportunités CDI & PFE (Casablanca & Remote)</span>
              </div>
            </div>
          </motion.div>

          {/* Right Interactive Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              className="glass rounded-3xl p-6 sm:p-9 border border-slate-800 shadow-2xl space-y-5"
            >
              <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
                <MessageSquare className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-mono text-slate-300 font-semibold uppercase tracking-wider">
                  Envoyer un message direct
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-xs font-mono text-slate-300">
                    Nom Complet <span className="text-sky-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="ex: Alex Dupont"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all font-sans"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-mono text-slate-300">
                    Adresse Email <span className="text-sky-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@entreprise.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all font-sans"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label htmlFor="subject" className="block text-xs font-mono text-slate-300">
                  Objet du message
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Opportunité Software Engineer / Stage / Projet..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all font-sans"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="block text-xs font-mono text-slate-300">
                  Votre Message <span className="text-sky-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Présentez votre projet, les compétences recherchées ou vos disponibilités..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all resize-none font-sans"
                />
              </div>

              {/* Error Toast */}
              {status === 'error' && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Success Toast */}
              {status === 'success' && (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Votre messagerie s&apos;est ouverte avec votre message pré-rempli !</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full relative group overflow-hidden py-3.5 px-6 rounded-2xl bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 font-bold text-sm transition-all duration-300 shadow-xl shadow-sky-500/25 active:scale-[0.99] disabled:opacity-50"
              >
                <div className="relative flex items-center justify-center gap-2">
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Préparation du message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Envoyer le Message</span>
                    </>
                  )}
                </div>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
