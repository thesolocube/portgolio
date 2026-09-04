import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Cpu, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from '../components/SectionHeader';
import { PROJECTS } from '../data/portfolioData';
import { Project, ProjectCategory } from '../types/portfolio';
import { GraphVisualization } from '../components/visual/GraphVisualization';
import { RabbitMQDiagram } from '../components/visual/RabbitMQDiagram';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');

  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'event-driven', label: 'Event-Driven & Distributed' },
    { id: 'fullstack', label: 'Full-Stack & Mobile' },
    { id: 'systems', label: 'Systems & Networking' },
  ];

  const filteredProjects = PROJECTS.filter((project) => {
    if (selectedCategory === 'all') return true;
    return project.category === selectedCategory;
  });

  const renderProjectVisualization = (project: Project) => {
    if (project.visualizationType === 'graph') {
      return <GraphVisualization />;
    }
    if (project.visualizationType === 'rabbitmq') {
      return <RabbitMQDiagram />;
    }
    return null;
  };

  return (
    <section id="projects" className="py-24 relative bg-dark-bg/95 text-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Featured Projects"
          title="Architectures Logicielles & Réalisations"
          subtitle="Projets majeurs axés sur les systèmes distribués, les bases de données orientées graphes et le développement Full-Stack."
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 ${
                selectedCategory === cat.id
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-lg shadow-sky-500/25 scale-105'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Stack */}
        <div className="space-y-16">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border border-slate-800 dark:border-slate-800 light:border-slate-200 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Specs & Info */}
                  <div className="lg:col-span-6 space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-md bg-sky-500/10 text-sky-400 text-xs font-mono border border-sky-500/20 font-semibold">
                        {project.subtitle}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100 dark:text-slate-100 light:text-slate-900">
                      {project.title}
                    </h3>

                    <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed font-sans">
                      {project.description}
                    </p>

                    {/* Architecture overview box */}
                    <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
                      <div className="text-sky-400 font-semibold flex items-center gap-1.5 mb-1">
                        <Cpu className="w-4 h-4" /> Technical Architecture
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        {project.architecture}
                      </p>
                    </div>

                    {/* Features list */}
                    <div className="space-y-2 pt-2">
                      <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
                        Key Capabilities:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {project.features.map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Stack tags */}
                    <div className="flex flex-wrap gap-2 pt-3">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-slate-800/90 text-slate-300 text-xs font-mono border border-slate-700/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 pt-4">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs border border-slate-700 transition"
                        >
                          <Github className="w-4 h-4 text-purple-400" /> View Code on GitHub
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition"
                        >
                          <ExternalLink className="w-4 h-4" /> Live Demo
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right Interactive Diagram / Visual Preview */}
                  <div className="lg:col-span-6">
                    {renderProjectVisualization(project) || (
                      <div className="h-full min-h-[280px] rounded-2xl bg-slate-950/80 border border-slate-800 p-6 flex flex-col justify-between font-mono text-xs">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                            <span className="text-sky-400 font-semibold">{project.title} Blueprint</span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              System Validated
                            </span>
                          </div>

                          <div className="space-y-2 text-slate-400">
                            {project.highlights.map((h, i) => (
                              <div key={i} className="flex items-start gap-2 bg-slate-900 p-2.5 rounded border border-slate-850">
                                <span className="text-sky-400 font-bold">#0{i + 1}</span>
                                <span>{h}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 flex justify-between">
                          <span>Stack: {project.technologies.slice(0, 3).join(', ')}</span>
                          <span className="text-sky-400">Production Ready</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
