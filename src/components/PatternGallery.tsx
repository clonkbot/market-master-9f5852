import { useState } from 'react';
import { CandlestickChart } from './CandlestickChart';

interface Pattern {
  id: string;
  name: string;
  description: string;
  keyPoints: string[];
  scenario: 'orderblock' | 'liquidity' | 'fvg' | 'bos';
}

const patterns: Pattern[] = [
  {
    id: 'orderblock',
    name: 'Order Blocks',
    description: 'Order blocks are the last bullish or bearish candle before a significant move in the opposite direction. These zones represent areas where institutional traders have placed large orders.',
    keyPoints: [
      'Look for the last opposing candle before a strong move',
      'Bullish OB: Last bearish candle before rally',
      'Bearish OB: Last bullish candle before drop',
      'Price often returns to test these zones',
    ],
    scenario: 'orderblock',
  },
  {
    id: 'liquidity',
    name: 'Liquidity Sweeps',
    description: 'Market makers hunt stop losses placed above swing highs or below swing lows. Understanding this helps you avoid being trapped and instead trade with smart money.',
    keyPoints: [
      'Retail traders place stops at obvious levels',
      'Smart money pushes price to trigger stops',
      'Watch for quick reversals after sweep',
      'Volume often spikes during sweeps',
    ],
    scenario: 'liquidity',
  },
  {
    id: 'fvg',
    name: 'Fair Value Gaps',
    description: 'FVGs occur when price moves so quickly that it leaves a gap between candle wicks. These imbalances often get filled as the market seeks equilibrium.',
    keyPoints: [
      'Gap between wick of candle 1 and candle 3',
      'Created during impulsive moves',
      'Act as magnets for price',
      'Can be used as entry zones',
    ],
    scenario: 'fvg',
  },
  {
    id: 'bos',
    name: 'Break of Structure',
    description: 'A break of structure occurs when price breaks a significant swing high or low, indicating a potential change in market direction or trend continuation.',
    keyPoints: [
      'Bullish BOS: Price breaks above swing high',
      'Bearish BOS: Price breaks below swing low',
      'Confirms trend direction change',
      'Look for retests after the break',
    ],
    scenario: 'bos',
  },
];

export function PatternGallery() {
  const [activePattern, setActivePattern] = useState<Pattern>(patterns[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">
          <span className="bg-gradient-to-r from-cyan-400 to-amber-400 bg-clip-text text-transparent">
            Pattern Recognition
          </span>
        </h2>
        <p className="text-gray-400 text-sm md:text-base">Learn to identify key market structures used by institutional traders</p>
      </div>

      {/* Pattern Tabs */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12">
        {patterns.map((pattern) => (
          <button
            key={pattern.id}
            onClick={() => setActivePattern(pattern)}
            className={`px-3 py-2 md:px-5 md:py-3 rounded-lg font-medium text-xs md:text-sm transition-all min-h-[44px] ${
              activePattern.id === pattern.id
                ? 'bg-gradient-to-r from-cyan-500/20 to-amber-500/20 border border-cyan-500/50 text-white'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/30'
            }`}
          >
            {pattern.name}
          </button>
        ))}
      </div>

      {/* Active Pattern Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Chart */}
        <div className="bg-gradient-to-b from-[#0f1419] to-[#0a0e17] rounded-xl md:rounded-2xl border border-white/10 p-4 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="font-mono text-xs md:text-sm text-gray-400">{activePattern.name} Example</span>
          </div>
          <CandlestickChart key={activePattern.id} scenario={activePattern.scenario} />
        </div>

        {/* Description */}
        <div className="flex flex-col justify-center">
          <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-white">{activePattern.name}</h3>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4 md:mb-6">{activePattern.description}</p>

          <div className="space-y-2 md:space-y-3">
            <h4 className="text-xs md:text-sm font-semibold text-cyan-400 uppercase tracking-wider">Key Points</h4>
            {activePattern.keyPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-2 md:gap-3">
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-cyan-400 text-[10px] md:text-xs font-mono">{index + 1}</span>
                </div>
                <p className="text-gray-300 text-xs md:text-sm">{point}</p>
              </div>
            ))}
          </div>

          {/* Visual Diagram */}
          <div className="mt-6 md:mt-8 p-3 md:p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-2 md:w-3 h-6 md:h-8 bg-cyan-400 rounded-sm" />
                <span className="text-[10px] md:text-xs text-gray-400">Bullish</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-2 md:w-3 h-6 md:h-8 bg-red-400 rounded-sm" />
                <span className="text-[10px] md:text-xs text-gray-400">Bearish</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-6 md:w-8 h-3 md:h-4 bg-amber-400/20 border border-amber-400/50 border-dashed rounded" />
                <span className="text-[10px] md:text-xs text-gray-400">Zone</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
