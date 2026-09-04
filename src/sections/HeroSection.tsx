import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, Linkedin, Github, Cpu, Database, Zap, Sparkles, Activity, CheckCircle2, Server, Layers } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArchitectureCanvas } from '../components/visual/ArchitectureCanvas';

interface HeroSectionProps {
  onOpenCV: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCV }) => {
  const [activeTab, setActiveTab] = useState<'blueprint' | 'telemetry'>('blueprint');

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-dark-bg text-slate-100"
    >
      {/* Background Interactive Architecture Canvas */}
      <ArchitectureCanvas />

      {/* Radial Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-bg/60 to-dark-bg pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/25 text-sky-400 text-xs font-mono backdrop-blur-md shadow-lg shadow-sky-500/5">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span className="font-medium">Software Engineer | Data & AI | Full-Stack & Microservices</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h2 className="text-slate-400 font-mono text-sm sm:text-base font-medium tracking-wide">
                Hello, I'm
              </h2>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-100 leading-[1.1]">
                {PERSONAL_INFO.name}
              </h1>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-brand-blue to-indigo-400 font-mono pt-1">
                Architecting Scalable Systems & AI
              </div>
            </div>

            {/* Description pitch */}
            <p className="text-slate-300 dark:text-slate-300 light:text-slate-700 text-base sm:text-lg leading-relaxed max-w-2xl font-sans">
              {PERSONAL_INFO.heroText}
            </p>

            {/* 3 Call-To-Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#projects"
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 font-bold text-sm transition-all duration-200 shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 active:scale-95 group"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={onOpenCV}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-white text-slate-200 dark:text-slate-200 light:text-slate-800 border border-slate-700/80 dark:border-slate-700/80 light:border-slate-300 hover:border-sky-400 font-semibold text-sm transition-all duration-200 hover:bg-slate-800/80 shadow-md active:scale-95"
              >
                <Download className="w-4 h-4 text-sky-400" />
                <span>Download CV</span>
              </button>

              <a
                href="#contact"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/50 hover:bg-slate-800/60 text-slate-300 hover:text-sky-300 border border-slate-800 text-sm font-medium transition active:scale-95"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-6 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-500">Connect:</span>
              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-sky-400 hover:border-sky-500/40 transition hover:scale-105"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-purple-400 hover:border-purple-500/40 transition hover:scale-105"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.contactEmail}`}
                aria-label="Email"
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition hover:scale-105"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Right Architecture & Stack Visual Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Ambient Background Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/20 via-indigo-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-70 animate-pulse-slow" />

            {/* Tech Specs Interactive Glass Card */}
            <div className="relative bg-slate-900/95 dark:bg-slate-900/95 light:bg-white border border-slate-700/80 dark:border-slate-700/80 light:border-slate-200 rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-2xl space-y-5">
              {/* Card top bar with window controls & Tab switcher */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/90 shadow-sm shadow-rose-500/30" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/90 shadow-sm shadow-amber-500/30" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-sm shadow-emerald-500/30" />
                  <span className="ml-2 font-mono text-xs text-slate-300 font-semibold tracking-wide flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-sky-400" /> system-blueprint.v3
                  </span>
                </div>

                {/* Interactive Mode Selector */}
                <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-[10px] font-mono">
                  <button
                    onClick={() => setActiveTab('blueprint')}
                    className={`px-2.5 py-0.5 rounded transition ${
                      activeTab === 'blueprint'
                        ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30 font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Blueprint
                  </button>
                  <button
                    onClick={() => setActiveTab('telemetry')}
                    className={`px-2.5 py-0.5 rounded transition flex items-center gap-1 ${
                      activeTab === 'telemetry'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Activity className="w-3 h-3 text-emerald-400 animate-pulse" /> Telemetry
                  </button>
                </div>
              </div>

              {activeTab === 'blueprint' ? (
                /* Stack Architecture Highlights */
                <div className="space-y-2.5 font-mono text-xs">
                  {/* Item 1: Data & AI Pipelines */}
                  <div className="group flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-emerald-500/40 hover:bg-slate-900 transition-all duration-200 shadow-sm">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-slate-100 font-semibold group-hover:text-emerald-300 transition">
                          Data & AI Intelligence
                        </div>
                        <div className="text-[10px] text-slate-400 font-sans">NLP & Machine Learning Pipelines</div>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-bold">
                      NLP / ML
                    </span>
                  </div>

                  {/* Item 2: Event-Driven Streaming */}
                  <div className="group flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-amber-500/40 hover:bg-slate-900 transition-all duration-200 shadow-sm">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 group-hover:scale-110 transition-transform">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-slate-100 font-semibold group-hover:text-amber-300 transition">
                          Event-Driven Streaming
                        </div>
                        <div className="text-[10px] text-slate-400 font-sans">Asynchronous Message Brokers</div>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold">
                      RabbitMQ
                    </span>
                  </div>

                  {/* Item 3: Microservices Architecture */}
                  <div className="group flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-purple-500/40 hover:bg-slate-900 transition-all duration-200 shadow-sm">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 group-hover:scale-110 transition-transform">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-slate-100 font-semibold group-hover:text-purple-300 transition">
                          Microservices & Full-Stack
                        </div>
                        <div className="text-[10px] text-slate-400 font-sans">Decoupled REST & Distributed APIs</div>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-1 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 font-bold">
                      Node / Laravel
                    </span>
                  </div>

                  {/* Item 4: Graph & Relational Data */}
                  <div className="group flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-sky-500/40 hover:bg-slate-900 transition-all duration-200 shadow-sm">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 group-hover:scale-110 transition-transform">
                        <Database className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-slate-100 font-semibold group-hover:text-sky-300 transition">
                          Graph & Distributed DB
                        </div>
                        <div className="text-[10px] text-slate-400 font-sans">Cypher Queries & Relational Schemas</div>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-1 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20 font-bold">
                      Neo4j / Postgres
                    </span>
                  </div>
                </div>
              ) : (
                /* Live Telemetry Tab View */
                <div className="space-y-3 font-mono text-xs p-2">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-emerald-500/30 text-emerald-400">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Event Bus Health
                    </span>
                    <span className="font-bold">HEALTHY (99.9%)</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                      <div className="text-slate-500">Latency</div>
                      <div className="text-sky-400 font-bold text-sm mt-0.5">3.8 ms</div>
                    </div>
                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                      <div className="text-slate-500">Message Throughput</div>
                      <div className="text-amber-400 font-bold text-sm mt-0.5">1,450 / sec</div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 text-[11px] space-y-1">
                    <div className="text-slate-400 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Microservices State:
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono pl-5">
                      • Auth Service: Active | • RabbitMQ Exchange: Bound | • Neo4j Engine: Online
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Metric & Student Specs */}
              <div className="pt-3 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-800/80">
                <span className="flex items-center gap-1.5 text-slate-200">
                  <Layers className="w-3.5 h-3.5 text-sky-400" /> 5th Year Software Eng
                </span>
                <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  EMSI Master 1
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
