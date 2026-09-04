import React, { useState } from 'react';
import { Radio, ArrowRight, Bell, Zap, Play, CheckCircle2 } from 'lucide-react';

export const RabbitMQDiagram: React.FC = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "[RabbitMQ] Exchange 'student.events' bound to topic 'grade.published'",
    "[Consumer] Listening on queue 'notification-service-queue'...",
  ]);

  const triggerEventSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);

    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [
      `[${timestamp}] [PRODUCER] Event emitted: grade.published (Student ID: #2026-89)`,
      ...prev.slice(0, 4),
    ]);

    setTimeout(() => {
      setLogs((prev) => [
        `[${timestamp}] [RABBITMQ] Routed to queue 'notification.queue' & 'grades.queue'`,
        ...prev.slice(0, 4),
      ]);
    }, 600);

    setTimeout(() => {
      setLogs((prev) => [
        `[${timestamp}] [CONSUMER] SMS & Push Notification dispatched successfully!`,
        ...prev.slice(0, 4),
      ]);
      setIsSimulating(false);
    }, 1400);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-700/60 rounded-xl p-5 text-slate-200 shadow-2xl backdrop-blur-md">
      {/* Top Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          <span className="font-mono text-sm font-semibold text-amber-300">
            RabbitMQ Event Streaming Architecture
          </span>
        </div>
        <button
          onClick={triggerEventSimulation}
          disabled={isSimulating}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 font-mono text-xs transition-all active:scale-95 disabled:opacity-50"
        >
          <Play className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
          {isSimulating ? 'Publishing Event...' : 'Simulate Event Publish'}
        </button>
      </div>

      {/* Visual Pipeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative py-2">
        {/* Step 1: Producer */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-3 flex flex-col items-center text-center relative group hover:border-slate-700 transition">
          <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-2">
            <Radio className="w-5 h-5" />
          </div>
          <span className="font-mono text-xs font-bold text-slate-200">Producer</span>
          <span className="text-[10px] text-slate-400 font-mono mt-0.5">Node.js Publisher</span>
          <span className="text-[9px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 mt-2 font-mono">
            grade.published
          </span>
        </div>

        {/* Connector 1 */}
        <div className="hidden md:flex items-center justify-center absolute left-[24%] top-1/2 -translate-y-1/2 z-10">
          <ArrowRight className={`w-5 h-5 text-amber-400 ${isSimulating ? 'animate-pulse' : 'opacity-40'}`} />
        </div>

        {/* Step 2: RabbitMQ Broker */}
        <div className="bg-slate-950/80 border border-amber-500/30 rounded-lg p-3 flex flex-col items-center text-center relative group shadow-lg shadow-amber-500/5">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-2">
            <Zap className={`w-5 h-5 ${isSimulating ? 'animate-bounce text-amber-300' : ''}`} />
          </div>
          <span className="font-mono text-xs font-bold text-amber-300">RabbitMQ Broker</span>
          <span className="text-[10px] text-slate-400 font-mono mt-0.5">Topic Exchange</span>
          <span className="text-[9px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 mt-2 font-mono">
            Direct & Topic Binding
          </span>
        </div>

        {/* Connector 2 */}
        <div className="hidden md:flex items-center justify-center absolute left-[49%] top-1/2 -translate-y-1/2 z-10">
          <ArrowRight className={`w-5 h-5 text-amber-400 ${isSimulating ? 'animate-pulse' : 'opacity-40'}`} />
        </div>

        {/* Step 3: Consumer */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-3 flex flex-col items-center text-center relative group hover:border-slate-700 transition">
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <span className="font-mono text-xs font-bold text-slate-200">Consumers</span>
          <span className="text-[10px] text-slate-400 font-mono mt-0.5">Worker Queue</span>
          <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 mt-2 font-mono">
            Async Message Ack
          </span>
        </div>

        {/* Connector 3 */}
        <div className="hidden md:flex items-center justify-center absolute left-[74%] top-1/2 -translate-y-1/2 z-10">
          <ArrowRight className={`w-5 h-5 text-amber-400 ${isSimulating ? 'animate-pulse' : 'opacity-40'}`} />
        </div>

        {/* Step 4: Notification */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-3 flex flex-col items-center text-center relative group hover:border-slate-700 transition">
          <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-2">
            <Bell className="w-5 h-5" />
          </div>
          <span className="font-mono text-xs font-bold text-slate-200">Notifications</span>
          <span className="text-[10px] text-slate-400 font-mono mt-0.5">Real-Time Delivery</span>
          <span className="text-[9px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 mt-2 font-mono">
            SMS / Email / Web Push
          </span>
        </div>
      </div>

      {/* Real-time Log Output Console */}
      <div className="mt-4 bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-[11px]">
        <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> Real-Time Event Log Stream
        </div>
        <div className="space-y-1">
          {logs.map((log, idx) => (
            <div
              key={idx}
              className={`${
                idx === 0 ? 'text-amber-300 font-semibold' : 'text-slate-400'
              } truncate transition-all duration-200`}
            >
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
