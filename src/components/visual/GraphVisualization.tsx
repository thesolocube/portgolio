import React, { useState } from 'react';
import { Plane, Database, Code, CheckCircle, Info } from 'lucide-react';

interface NodeItem {
  id: string;
  code: string;
  name: string;
  city: string;
  x: number;
  y: number;
  connections: string[];
}

const NODES: NodeItem[] = [
  { id: '1', code: 'CMN', name: 'Mohammed V Intl', city: 'Casablanca', x: 20, y: 55, connections: ['CDG', 'LHR', 'DXB'] },
  { id: '2', code: 'CDG', name: 'Charles de Gaulle', city: 'Paris', x: 45, y: 25, connections: ['CMN', 'JFK', 'LHR'] },
  { id: '3', code: 'JFK', name: 'John F. Kennedy', city: 'New York', x: 80, y: 35, connections: ['CDG', 'LHR'] },
  { id: '4', code: 'LHR', name: 'Heathrow', city: 'London', x: 45, y: 75, connections: ['CMN', 'CDG', 'JFK', 'DXB'] },
  { id: '5', code: 'DXB', name: 'Dubai Intl', city: 'Dubai', x: 75, y: 80, connections: ['CMN', 'LHR'] },
];

export const GraphVisualization: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<NodeItem>(NODES[0]);

  return (
    <div className="bg-slate-900/90 border border-slate-700/60 rounded-xl p-5 text-slate-200 shadow-2xl backdrop-blur-md">
      {/* Header info */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-sky-400" />
          <span className="font-mono text-sm font-semibold text-sky-300">Neo4j Graph Database Explorer</span>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 font-mono">
          Cypher Engine Active
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Graph Canvas representation */}
        <div className="lg:col-span-2 relative min-h-[260px] bg-slate-950/80 rounded-lg border border-slate-800 p-4 overflow-hidden flex items-center justify-center">
          {/* Background Cypher Grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />

          {/* SVG Flight Routes Connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {NODES.map((node) =>
              node.connections.map((targetCode) => {
                const target = NODES.find((n) => n.code === targetCode);
                if (!target) return null;
                const isSelected = selectedNode.code === node.code || selectedNode.code === target.code;
                return (
                  <line
                    key={`${node.code}-${target.code}`}
                    x1={`${node.x}%`}
                    y1={`${node.y}%`}
                    x2={`${target.x}%`}
                    y2={`${target.y}%`}
                    stroke={isSelected ? '#38bdf8' : '#334155'}
                    strokeWidth={isSelected ? 2 : 1}
                    strokeDasharray={isSelected ? '4 2' : 'none'}
                    className="transition-all duration-300"
                  />
                );
              })
            )}
          </svg>

          {/* Interactive Graph Nodes */}
          {NODES.map((node) => {
            const isSelected = selectedNode.code === node.code;
            return (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node)}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group transition-all duration-300 ${
                  isSelected ? 'z-20 scale-110' : 'z-10 hover:scale-105'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-xs shadow-lg transition-all ${
                    isSelected
                      ? 'bg-sky-500 text-slate-950 ring-4 ring-sky-400/30 shadow-sky-500/40'
                      : 'bg-slate-800 text-slate-300 border border-slate-600 hover:border-sky-400'
                  }`}
                >
                  {node.code}
                </div>
                <span className="mt-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900/90 text-slate-300 border border-slate-800 whitespace-nowrap">
                  {node.city}
                </span>
              </button>
            );
          })}

          <div className="absolute bottom-2 left-3 text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-sky-400" /> Click airport nodes to inspect graph relations & Cypher queries
          </div>
        </div>

        {/* Node Detail & Cypher Snippet Panel */}
        <div className="flex flex-col justify-between bg-slate-950/60 border border-slate-800 rounded-lg p-4 font-mono text-xs">
          <div>
            <div className="flex items-center gap-2 mb-3 text-sky-400 font-semibold border-b border-slate-800/80 pb-2">
              <Plane className="w-4 h-4" /> Node: ({selectedNode.code}:Airport)
            </div>
            
            <div className="space-y-1.5 text-slate-300 mb-4">
              <div><span className="text-slate-500">Name:</span> {selectedNode.name}</div>
              <div><span className="text-slate-500">Location:</span> {selectedNode.city}</div>
              <div>
                <span className="text-slate-500">Outbound Routes:</span>{' '}
                <span className="text-sky-300">{selectedNode.connections.join(', ')}</span>
              </div>
            </div>

            {/* Generated Cypher Query */}
            <div className="bg-slate-900 border border-slate-800 rounded p-2.5 text-[11px]">
              <div className="flex items-center justify-between text-slate-400 mb-1.5">
                <span className="flex items-center gap-1"><Code className="w-3.5 h-3.5" /> Cypher Query</span>
                <span className="text-[9px] text-emerald-400 flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Executed</span>
              </div>
              <pre className="text-sky-300 overflow-x-auto font-mono whitespace-pre-wrap leading-relaxed">
{`MATCH (a:Airport {code: '${selectedNode.code}'})-[r:FLIGHT_TO]->(target:Airport)
RETURN a.name, r.duration, target.code
ORDER BY r.duration ASC;`}
              </pre>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-800/60 text-[10px] text-slate-400 flex justify-between">
            <span>Graph API: Aviationstack</span>
            <span className="text-sky-400">Neo4j Bolt Protocol</span>
          </div>
        </div>
      </div>
    </div>
  );
};
