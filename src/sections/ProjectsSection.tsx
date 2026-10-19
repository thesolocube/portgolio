import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github, ExternalLink, Cpu, CheckCircle2,
  Terminal, Sparkles, ArrowUpRight, ChevronRight
} from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { PROJECTS } from '../data/portfolioData';
import { Project, ProjectCategory } from '../types/portfolio';
import { GraphVisualization } from '../components/visual/GraphVisualization';
import { RabbitMQDiagram } from '../components/visual/RabbitMQDiagram';

const CATEGORY_TABS: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'event-driven', label: 'Event-Driven & AI' },
  { id: 'fullstack', label: 'Full-Stack & Mobile' },
  { id: 'systems', label: 'Systems & Networking' },
];

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [featuredId, setFeaturedId] = useState<string>('flight-management-system');

  const filteredProjects = PROJECTS.filter((project) => {
    if (selectedCategory === 'all') return true;
    return project.category === selectedCategory;
  });

  const featuredProject = PROJECTS.find((p) => p.id === featuredId) || PROJECTS[0];

  const renderProjectVisualization = (project: Project) => {
    if (project.visualizationType === 'graph') {
      return <GraphVisualization />;
    }
    if (project.visualizationType === 'rabbitmq') {
      return <RabbitMQDiagram />;
    }
    return (
      <div className="h-full min-h-[300px] rounded-2xl bg-slate-950/80 border border-slate-800 p-6 flex flex-col justify-between font-mono text-xs">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-sky-400 font-semibold flex items-center gap-2">
              <Terminal className="w-4 h-4" /> {project.title} Blueprint
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
              Production Validated
            </span>
          </div>

          <div className="space-y-2 text-slate-400">
            {project.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2 bg-slate-900/90 p-3 rounded-xl border border-slate-800/80">
                <span className="text-sky-400 font-bold">#0{i + 1}</span>
                <span className="text-slate-300">{h}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 flex justify-between items-center">
          <span>Stack: {project.technologies.slice(0, 3).join(', ')}</span>
          <span className="text-sky-400 font-semibold">Architected by Sami</span>
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="py-24 relative bg-[#060810] text-slate-100 overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-sky-500/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Featured Engineering Works"
          title="Architectures Logicielles & Réalisations"
          subtitle="Projets majeurs axés sur les systèmes distribués, les bases de données orientées graphes, l'IA et le développement Full-Stack."
        />

        {/* ═══ FLAGSHIP HERO SHOWCASE ═══ */}
        <div className="mb-20">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">
                Flagship Project Showcase
              </span>
            </div>

            {/* Selector between flagship projects */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'flight-management-system', label: 'Neo4j Graph System' },
                { id: 'event-driven-student-portal', label: 'RabbitMQ EDA' },
                { id: 'b2b-customer-retention', label: 'Microservices & AI' },
                { id: 'ecommerce-nlp-anomaly-detector', label: 'NLP Anomaly Detection' },
              ].map((flagship) => (
                <button
                  key={flagship.id}
                  onClick={() => setFeaturedId(flagship.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 ${
                    featuredId === flagship.id
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/50 shadow-md shadow-sky-500/10 font-bold'
                      : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {flagship.label}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            key={featuredProject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative glass rounded-3xl p-7 sm:p-10 border border-sky-500/30 shadow-2xl overflow-hidden"
          >
            {/* Top accent light */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-400 via-indigo-500 to-sky-400" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Specs & Info */}
              <div className="lg:col-span-6 space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-mono border border-sky-500/30 font-bold">
                    {featuredProject.subtitle}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-400 text-xs font-mono border border-slate-800">
                    Flagship Architecture
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-black text-slate-50 tracking-tight">
                  {featuredProject.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                  {featuredProject.description}
                </p>

                {/* Architecture overview box */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300 space-y-1.5 shadow-inner">
                  <div className="text-sky-400 font-semibold flex items-center gap-1.5">
                    <Cpu className="w-4 h-4" /> Technical Architecture
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {featuredProject.architecture}
                  </p>
                </div>

                {/* Key Capabilities */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {featuredProject.features.slice(0, 4).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {featuredProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-slate-900/90 text-slate-200 text-xs font-mono border border-slate-700/60 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-3">
                  {featuredProject.githubUrl && (
                    <a
                      href={featuredProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-100 font-mono text-xs border border-slate-700 hover:border-sky-500/50 transition-all duration-200 shadow-lg hover:scale-[1.02]"
                    >
                      <Github className="w-4 h-4 text-purple-400" />
                      <span>Explore Repository</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-400" />
                    </a>
                  )}
                  {featuredProject.liveUrl && (
                    <a
                      href={featuredProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 font-bold text-xs transition-all duration-200 shadow-lg shadow-sky-500/20 hover:scale-[1.02]"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demonstration</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Right Interactive Diagram / Visual Preview */}
              <div className="lg:col-span-6">
                {renderProjectVisualization(featuredProject)}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ═══ ALL PROJECTS MASONRY / GRID ═══ */}
        <div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-800/80">
            <div>
              <h3 className="text-2xl font-black text-slate-100">
                Catalogue Complet des Projets
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-1">
                {filteredProjects.length} projets répertoriés avec code source GitHub
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800">
              {CATEGORY_TABS.map((cat) => {
                const count = PROJECTS.filter((p) => cat.id === 'all' || p.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 flex items-center gap-1.5 ${
                      selectedCategory === cat.id
                        ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/25'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      selectedCategory === cat.id ? 'bg-slate-950/20 text-slate-950 font-extrabold' : 'bg-slate-900 text-slate-500'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid Layout */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group relative glass rounded-3xl p-6 border border-slate-800/80 hover:border-sky-500/40 transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between overflow-hidden"
                >
                  {/* Subtle top gradient */}
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-sky-500/20 to-transparent group-hover:via-sky-400 transition-colors" />

                  <div className="space-y-4">
                    {/* Header: Subtitle + Category Tag */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20 font-bold">
                        {project.subtitle}
                      </span>
                      {project.visualizationType && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" /> Interactive
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h4 className="text-lg font-bold text-slate-100 group-hover:text-sky-300 transition-colors leading-snug">
                      {project.title}
                    </h4>

                    {/* Description */}
                    <p className="text-xs text-slate-400 leading-relaxed font-sans line-clamp-3">
                      {project.description}
                    </p>

                    {/* Highlights bullet */}
                    {project.highlights && project.highlights.length > 0 && (
                      <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[11px] font-mono text-slate-400">
                        <span className="text-sky-400 font-semibold">Key: </span>
                        <span>{project.highlights[0]}</span>
                      </div>
                    )}

                    {/* Technologies tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md bg-slate-900 text-slate-400 text-[11px] font-mono border border-slate-800"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-1.5 py-0.5 rounded-md bg-slate-900 text-slate-500 text-[10px] font-mono">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Footer Card Actions */}
                  <div className="pt-5 mt-5 border-t border-slate-800/60 flex items-center justify-between">
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-sky-300 transition-colors group/btn"
                      >
                        <Github className="w-3.5 h-3.5 text-purple-400" />
                        <span>Source Code</span>
                        <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </a>
                    ) : (
                      <span className="text-xs font-mono text-slate-500">Repository</span>
                    )}

                    <button
                      onClick={() => {
                        setFeaturedId(project.id);
                        window.scrollTo({ top: document.getElementById('projects')?.offsetTop || 0, behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-sky-400 hover:text-sky-300 font-semibold"
                    >
                      <span>Showcase</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
