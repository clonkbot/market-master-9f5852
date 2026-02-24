import { useState } from 'react';

interface Phase {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  details: string[];
  color: string;
}

const phases: Phase[] = [
  {
    id: 'accumulation',
    name: 'Accumulation',
    subtitle: 'Building Positions',
    description: 'Smart money quietly accumulates positions at low prices while keeping the market range-bound. This phase can last weeks or months.',
    details: [
      'Price consolidates in a range',
      'Volume decreases during consolidation',
      'Retail traders get bored and exit',
      'Institutions slowly build positions',
      'False breakdowns trap sellers',
    ],
    color: 'cyan',
  },
  {
    id: 'manipulation',
    name: 'Manipulation',
    subtitle: 'The Hunt',
    description: 'Before the major move, market makers hunt liquidity by pushing price to trigger stop losses and induce wrong-side positions.',
    details: [
      'Quick moves to obvious levels',
      'Stop loss hunting above/below range',
      'Creates maximum retail pain',
      'Trap breakout traders',
      'Final shakeout before the move',
    ],
    color: 'amber',
  },
  {
    id: 'distribution',
    name: 'Distribution',
    subtitle: 'The Real Move',
    description: 'After accumulating and hunting liquidity, smart money drives price in their intended direction, distributing positions to latecomers.',
    details: [
      'Strong impulsive move begins',
      'Volume expands significantly',
      'Retail traders chase the move',
      'Multiple timeframe alignment',
      'Institutions offload positions',
    ],
    color: 'emerald',
  },
];

export function MarketMakerSection() {
  const [activePhase, setActivePhase] = useState<Phase>(phases[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16">
      <div className="text-center mb-8 md:mb-16">
        <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">
          <span className="bg-gradient-to-r from-amber-400 to-emerald-400 bg-clip-text text-transparent">
            Market Maker Models
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
          Understand the three-phase cycle that institutional traders use to move markets and profit from retail traders
        </p>
      </div>

      {/* Phase Timeline */}
      <div className="relative mb-8 md:mb-16">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-amber-500 to-emerald-500 transform -translate-y-1/2 hidden md:block" />

        <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0 relative">
          {phases.map((phase, index) => {
            const isActive = activePhase.id === phase.id;
            const colorClasses = {
              cyan: 'bg-cyan-500 border-cyan-500 shadow-cyan-500/50',
              amber: 'bg-amber-500 border-amber-500 shadow-amber-500/50',
              emerald: 'bg-emerald-500 border-emerald-500 shadow-emerald-500/50',
            };
            const hoverClasses = {
              cyan: 'hover:border-cyan-500/50 hover:bg-cyan-500/10',
              amber: 'hover:border-amber-500/50 hover:bg-amber-500/10',
              emerald: 'hover:border-emerald-500/50 hover:bg-emerald-500/10',
            };

            return (
              <button
                key={phase.id}
                onClick={() => setActivePhase(phase)}
                className={`flex-1 md:flex-initial text-center p-4 md:p-6 rounded-xl transition-all min-h-[80px] ${
                  isActive
                    ? `bg-white/10 border border-white/20`
                    : `bg-white/5 border border-white/10 ${hoverClasses[phase.color as keyof typeof hoverClasses]}`
                }`}
              >
                <div className="flex md:flex-col items-center md:items-center gap-3 md:gap-0">
                  {/* Circle indicator */}
                  <div
                    className={`w-8 h-8 md:w-12 md:h-12 rounded-full flex-shrink-0 flex items-center justify-center font-mono font-bold text-white transition-all ${
                      isActive
                        ? `${colorClasses[phase.color as keyof typeof colorClasses]} shadow-lg`
                        : 'bg-white/10 border-2 border-white/20'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="text-left md:text-center md:mt-4">
                    <h3 className={`font-bold text-sm md:text-base ${isActive ? 'text-white' : 'text-gray-400'}`}>
                      {phase.name}
                    </h3>
                    <p className="text-[10px] md:text-xs text-gray-500">{phase.subtitle}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Phase Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Visual Diagram */}
        <div className="bg-gradient-to-b from-[#0f1419] to-[#0a0e17] rounded-xl md:rounded-2xl border border-white/10 p-4 md:p-8">
          <PhaseVisualization phase={activePhase} />
        </div>

        {/* Description */}
        <div className="flex flex-col justify-center">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 md:mb-4 self-start ${
              activePhase.color === 'cyan'
                ? 'bg-cyan-500/10 border border-cyan-500/30'
                : activePhase.color === 'amber'
                ? 'bg-amber-500/10 border border-amber-500/30'
                : 'bg-emerald-500/10 border border-emerald-500/30'
            }`}
          >
            <span
              className={`text-xs font-mono ${
                activePhase.color === 'cyan'
                  ? 'text-cyan-400'
                  : activePhase.color === 'amber'
                  ? 'text-amber-400'
                  : 'text-emerald-400'
              }`}
            >
              Phase {phases.findIndex((p) => p.id === activePhase.id) + 1}
            </span>
          </div>

          <h3 className="text-xl md:text-3xl font-bold mb-1 md:mb-2 text-white">{activePhase.name}</h3>
          <p className="text-gray-500 text-xs md:text-sm mb-3 md:mb-4 uppercase tracking-wider">{activePhase.subtitle}</p>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4 md:mb-6">{activePhase.description}</p>

          <div className="space-y-2 md:space-y-3">
            {activePhase.details.map((detail, index) => (
              <div
                key={index}
                className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-white/5 rounded-lg animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <svg
                  className={`w-4 h-4 md:w-5 md:h-5 flex-shrink-0 ${
                    activePhase.color === 'cyan'
                      ? 'text-cyan-400'
                      : activePhase.color === 'amber'
                      ? 'text-amber-400'
                      : 'text-emerald-400'
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span className="text-gray-300 text-xs md:text-sm">{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Takeaway */}
      <div className="mt-8 md:mt-16 p-4 md:p-8 bg-gradient-to-r from-cyan-500/5 via-amber-500/5 to-emerald-500/5 rounded-xl md:rounded-2xl border border-white/10">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-amber-500 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 md:w-8 md:h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </div>
          <div>
            <h4 className="text-base md:text-lg font-bold text-white mb-1 md:mb-2">The Key Insight</h4>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              Market makers need retail traders to take the opposite side of their trades. By understanding their playbook,
              you can align with smart money instead of being their exit liquidity. Wait for manipulation before entering in the direction of accumulation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhaseVisualization({ phase }: { phase: Phase }) {
  const colors = {
    cyan: '#00d4ff',
    amber: '#ffc107',
    emerald: '#10b981',
  };

  return (
    <div className="h-48 md:h-64 relative">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Phase-specific visualizations */}
      <svg className="w-full h-full" viewBox="0 0 400 200">
        {phase.id === 'accumulation' && (
          <>
            {/* Range box */}
            <rect
              x="50"
              y="70"
              width="300"
              height="60"
              fill={`${colors.cyan}10`}
              stroke={colors.cyan}
              strokeWidth="1"
              strokeDasharray="4 4"
              className="animate-pulse"
            />
            {/* Price action */}
            <path
              d="M50 100 L80 90 L110 110 L140 95 L170 105 L200 100 L230 85 L260 110 L290 95 L320 100 L350 105"
              stroke="white"
              strokeWidth="2"
              fill="none"
              className="animate-drawLine"
            />
            {/* Accumulation arrows */}
            <g fill={colors.cyan} opacity="0.8">
              <polygon points="120,140 130,130 140,140" />
              <polygon points="200,140 210,130 220,140" />
              <polygon points="280,140 290,130 300,140" />
            </g>
            <text x="200" y="175" fill="white" fontSize="12" textAnchor="middle" fontFamily="JetBrains Mono">
              Range-bound accumulation
            </text>
          </>
        )}

        {phase.id === 'manipulation' && (
          <>
            {/* Previous range */}
            <rect
              x="50"
              y="80"
              width="150"
              height="40"
              fill="rgba(255,255,255,0.05)"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            {/* Stop loss zone */}
            <rect x="50" y="130" width="150" height="20" fill={`${colors.amber}20`} />
            <text x="125" y="145" fill={colors.amber} fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono">
              STOP LOSSES
            </text>
            {/* Manipulation wick */}
            <path
              d="M150 100 L200 100 L230 150 L260 140 L280 90"
              stroke={colors.amber}
              strokeWidth="2"
              fill="none"
              className="animate-drawLine"
            />
            {/* Sweep marker */}
            <circle cx="230" cy="150" r="8" fill={colors.amber} opacity="0.5" className="animate-ping" />
            <circle cx="230" cy="150" r="4" fill={colors.amber} />
            <text x="320" y="175" fill="white" fontSize="12" textAnchor="middle" fontFamily="JetBrains Mono">
              Liquidity sweep
            </text>
          </>
        )}

        {phase.id === 'distribution' && (
          <>
            {/* Upward momentum */}
            <path
              d="M50 150 L100 140 L150 120 L200 90 L250 60 L300 40 L350 30"
              stroke={colors.emerald}
              strokeWidth="3"
              fill="none"
              className="animate-drawLine"
            />
            {/* Distribution zone */}
            <rect x="280" y="20" width="70" height="40" fill={`${colors.emerald}20`} stroke={colors.emerald} strokeWidth="1" />
            {/* Sell arrows */}
            <g fill="rgba(255,100,100,0.8)">
              <polygon points="290,65 300,55 310,65" transform="rotate(180 300 60)" />
              <polygon points="320,65 330,55 340,65" transform="rotate(180 330 60)" />
            </g>
            <text x="315" y="75" fill="rgba(255,100,100,0.8)" fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono">
              DISTRIBUTION
            </text>
            <text x="200" y="175" fill="white" fontSize="12" textAnchor="middle" fontFamily="JetBrains Mono">
              Strong expansion move
            </text>
          </>
        )}
      </svg>
    </div>
  );
}
