import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import {
  ArrowRight, Download, Mail, Linkedin, Github,
  Cpu, Database, Zap, Sparkles, Activity, CheckCircle2,
  Server, Layers, ChevronDown, Code2, GitBranch
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArchitectureCanvas } from '../components/visual/ArchitectureCanvas';

interface HeroSectionProps {
  onOpenCV: () => void;
}

const ROTATING_ROLES = [
  'Full-Stack Developer',
  'Microservices Architect',
  'Data & AI Engineer',
  'Event-Driven Systems',
  'Software Engineer',
];

const STATS = [
  { value: 8, label: 'Projets Réalisés', suffix: '+', icon: GitBranch },
  { value: 2, label: 'Stages Effectués', suffix: '', icon: Cpu },
  { value: 9, label: 'Certifications', suffix: '', icon: CheckCircle2 },
  { value: 15, label: 'Technologies Maîtrisées', suffix: '+', icon: Code2 },
];

function useCountUp(target: number, duration = 1600, delay = 600) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime: number | null = null;
    let raf: number;
    const timeout = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * target));
        if (progress < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay);
    return () => { clearTimeout(timeout); cancelAnimationFrame(raf); };
  }, [target, duration, delay]);
  return count;
}

const StatCard: React.FC<{ value: number; label: string; suffix: string; icon: React.ElementType; delay: number }> = ({
  value, label, suffix, icon: Icon, delay,
}) => {
  const count = useCountUp(value, 1400, delay);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000, duration: 0.5 }}
      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm group hover:border-sky-500/30 transition-all duration-300"
    >
      <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:bg-sky-500/20 transition-colors flex-shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <div className="text-xl font-extrabold text-slate-100 leading-none stat-number">
          {count}{suffix}
        </div>
        <div className="text-[10px] text-slate-500 font-mono mt-0.5 leading-none">{label}</div>
      </div>
    </motion.div>
  );
};

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCV }) => {
  const [activeTab, setActiveTab] = useState<'blueprint' | 'telemetry'>('blueprint');
  const [roleIndex, setRoleIndex] = useState(0);
  const [fadeRole, setFadeRole] = useState(true);

  // Parallax mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeRole(false);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % ROTATING_ROLES.length);
        setFadeRole(true);
      }, 300);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 15);
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 15);
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden bg-slate-50 dark:bg-[#060810]"
    >
      {/* Layered backgrounds */}
      <div className="absolute inset-0 dot-grid opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 dark:from-sky-950/20 via-transparent to-indigo-500/5 dark:to-indigo-950/20" />

      {/* Animated background orbs */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-sky-500/10 dark:bg-sky-600/5 blur-[120px] pointer-events-none"
      />
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-indigo-500/10 dark:bg-indigo-600/5 blur-[100px] pointer-events-none"
      />

      {/* Interactive Architecture Canvas */}
      <ArchitectureCanvas />

      {/* Portrait — faded */}
      <div className="absolute right-0 bottom-0 top-10 w-full lg:w-1/2 pointer-events-none flex items-end justify-center lg:justify-end z-0">
        <img
          src="/sami-portrait.jpg"
          alt="Sami Rahni Software Engineer"
          className="h-[88%] max-h-[780px] object-contain object-bottom opacity-[0.14] dark:opacity-[0.22] filter drop-shadow-[0_0_60px_rgba(56,189,248,0.2)] [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]"
        />
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-50 dark:from-[#060810] to-transparent pointer-events-none z-10" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ═══ LEFT COLUMN ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-7"
          >
            {/* Status pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-700/60 text-slate-300 text-xs font-mono backdrop-blur-md shadow-xl"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span>Open to Software Engineering opportunities</span>
              <span className="w-px h-3.5 bg-slate-700" />
              <span className="text-sky-400 font-semibold">Casablanca, MA</span>
            </motion.div>

            {/* Main headline */}
            <div className="space-y-3">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-slate-500 font-mono text-sm tracking-widest uppercase"
              >
                Hello, I&apos;m
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-slate-50 leading-[0.95]"
              >
                {PERSONAL_INFO.name}
              </motion.h1>

              {/* Rotating typewriter */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2 h-10"
              >
                <span className="text-2xl sm:text-3xl font-bold font-mono text-sky-500">{'>'}</span>
                <span
                  className={`text-2xl sm:text-3xl font-bold font-mono gradient-text transition-all duration-300 ${
                    fadeRole ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
                  }`}
                >
                  {ROTATING_ROLES[roleIndex]}
                </span>
                <span className="w-[3px] h-8 rounded-full bg-sky-400 animate-pulse" />
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl"
            >
              {PERSONAL_INFO.heroText}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center gap-3 pt-1"
            >
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm text-slate-950 overflow-hidden shadow-lg shadow-sky-500/25 transition-all duration-300 hover:shadow-sky-500/40 hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-500 transition-all duration-300 group-hover:from-sky-300 group-hover:to-blue-400" />
                <span className="relative">View My Work</span>
                <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={onOpenCV}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 text-slate-200 border border-slate-700/80 hover:border-slate-600 font-semibold text-sm transition-all duration-200 backdrop-blur-sm active:scale-[0.98]"
              >
                <Download className="w-4 h-4 text-sky-400" />
                <span>Download CV</span>
              </button>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-slate-400 hover:text-sky-300 font-medium text-sm transition-all duration-200 border border-transparent hover:border-slate-800 active:scale-[0.98]"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                <span>Contact Me</span>
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2"
            >
              {STATS.map((stat, i) => (
                <StatCard key={stat.label} {...stat} delay={800 + i * 150} />
              ))}
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex items-center gap-3 pt-2 border-t border-slate-800/60"
            >
              <span className="text-xs font-mono text-slate-600 uppercase tracking-widest">Connect</span>
              <div className="flex items-center gap-2">
                {[
                  { href: PERSONAL_INFO.linkedinUrl, icon: Linkedin, label: 'LinkedIn', color: 'hover:text-sky-400 hover:border-sky-500/40' },
                  { href: PERSONAL_INFO.githubUrl, icon: Github, label: 'GitHub', color: 'hover:text-purple-400 hover:border-purple-500/40' },
                  { href: `mailto:${PERSONAL_INFO.contactEmail}`, icon: Mail, label: 'Email', color: 'hover:text-amber-400 hover:border-amber-500/40' },
                ].map(({ href, icon: Icon, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    aria-label={label}
                    className={`p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-500 ${color} transition-all duration-200 hover:scale-110 hover:shadow-lg`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ═══ RIGHT COLUMN — Interactive Card ═══ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Glow behind card */}
            <div className="absolute -inset-4 bg-gradient-to-r from-sky-500/15 via-indigo-500/15 to-purple-500/15 rounded-3xl blur-2xl" />

            {/* Card */}
            <div className="relative glass rounded-2xl p-5 sm:p-6 shadow-2xl border border-slate-700/40 space-y-5">
              {/* Window bar */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/90 shadow-sm shadow-rose-500/50" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/90 shadow-sm shadow-amber-500/50" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-sm shadow-emerald-500/50" />
                  <span className="ml-3 font-mono text-xs text-slate-400 flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-sky-400" />
                    system-blueprint.v3
                  </span>
                </div>
                {/* Tab switcher */}
                <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-[10px] font-mono">
                  <button
                    onClick={() => setActiveTab('blueprint')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      activeTab === 'blueprint'
                        ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30 font-bold'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    Blueprint
                  </button>
                  <button
                    onClick={() => setActiveTab('telemetry')}
                    className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
                      activeTab === 'telemetry'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Activity className="w-3 h-3 text-emerald-400 animate-pulse" /> Live
                  </button>
                </div>
              </div>

              {activeTab === 'blueprint' ? (
                <div className="space-y-2.5 font-mono text-xs">
                  {[
                    { icon: Sparkles, color: 'emerald', title: 'Data & AI Intelligence', sub: 'NLP & Machine Learning Pipelines', badge: 'NLP / ML' },
                    { icon: Zap, color: 'amber', title: 'Event-Driven Streaming', sub: 'Asynchronous Message Brokers', badge: 'RabbitMQ' },
                    { icon: Cpu, color: 'purple', title: 'Microservices & Full-Stack', sub: 'Decoupled REST & Distributed APIs', badge: 'Node / Laravel' },
                    { icon: Database, color: 'sky', title: 'Graph & Distributed DB', sub: 'Cypher Queries & Relational Schemas', badge: 'Neo4j / PG' },
                  ].map(({ icon: Icon, color, title, sub, badge }) => (
                    <div
                      key={title}
                      className={`group flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 hover:border-${color}-500/40 hover:bg-slate-900/60 transition-all duration-200 cursor-default`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`p-1.5 rounded-lg bg-${color}-500/10 border border-${color}-500/20 text-${color}-400 group-hover:scale-110 group-hover:bg-${color}-500/20 transition-all`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className={`text-slate-100 font-semibold group-hover:text-${color}-300 transition-colors text-[11px]`}>{title}</div>
                          <div className="text-[10px] text-slate-500 font-sans">{sub}</div>
                        </div>
                      </div>
                      <span className={`text-[9px] px-2 py-1 rounded bg-${color}-500/10 text-${color}-300 border border-${color}-500/20 font-bold shrink-0`}>
                        {badge}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3 font-mono text-xs p-1">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-emerald-500/25 text-emerald-400">
                    <span className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                      </span>
                      Event Bus Health
                    </span>
                    <span className="font-bold text-[11px]">HEALTHY (99.9%)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    {[
                      { label: 'Latency', value: '3.8 ms', color: 'text-sky-400' },
                      { label: 'Throughput', value: '1,450 / sec', color: 'text-amber-400' },
                      { label: 'Queue Depth', value: '12 msgs', color: 'text-purple-400' },
                      { label: 'Consumers', value: '4 active', color: 'text-emerald-400' },
                    ].map(({ label, value, color }) => (
                      <div key={label} className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
                        <div className="text-slate-500 text-[10px] mb-0.5">{label}</div>
                        <div className={`${color} font-bold text-sm`}>{value}</div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl text-[10px] text-slate-400 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-slate-300 font-semibold mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Services Status
                    </div>
                    {['Auth Service', 'RabbitMQ Exchange', 'Neo4j Engine', 'API Gateway'].map((svc) => (
                      <div key={svc} className="flex items-center justify-between">
                        <span>{svc}</span>
                        <span className="text-emerald-400 font-mono">● Active</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="pt-3 flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-slate-800/60">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3 h-3 text-sky-400" />
                  <span className="text-slate-300">5th Year · EMSI Casablanca</span>
                </span>
                <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20 font-bold">Master 1</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-slate-600 hover:text-sky-400 transition-colors group"
      >
        <span className="text-[9px] font-mono uppercase tracking-[0.2em]">Explore</span>
        <ChevronDown className="w-4 h-4 animate-bounce group-hover:text-sky-400" />
      </motion.a>
    </section>
  );
};
