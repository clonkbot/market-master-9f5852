import { useState } from 'react';
import { CandlestickChart } from './components/CandlestickChart';
import { ConceptCard } from './components/ConceptCard';
import { MarketMakerSection } from './components/MarketMakerSection';
import { PatternGallery } from './components/PatternGallery';
import { Navigation } from './components/Navigation';

type Section = 'intro' | 'patterns' | 'marketmaker' | 'practice';

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('intro');

  return (
    <div className="min-h-screen bg-[#0a0e17] text-gray-100 font-sans relative overflow-x-hidden">
      {/* Background grid effect */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Gradient orbs */}
      <div className="fixed top-20 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-20 -right-40 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className="relative z-10 pt-20">
        {activeSection === 'intro' && <IntroSection />}
        {activeSection === 'patterns' && <PatternGallery />}
        {activeSection === 'marketmaker' && <MarketMakerSection />}
        {activeSection === 'practice' && <PracticeSection />}
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 mt-16 border-t border-white/5">
        <p className="text-center text-xs text-gray-500 font-mono tracking-wide">
          Requested by <span className="text-gray-400">@modzzdude</span> · Built by <span className="text-gray-400">@clonkbot</span>
        </p>
      </footer>
    </div>
  );
}

function IntroSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16">
      {/* Hero */}
      <div className="text-center mb-12 md:mb-20 animate-fadeIn">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-4 md:mb-6">
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <span className="text-cyan-400 text-xs md:text-sm font-mono tracking-wider">LIVE LEARNING</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 tracking-tight">
          <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Master the
          </span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 to-amber-400 bg-clip-text text-transparent">
            Market Makers
          </span>
        </h1>
        <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed px-4">
          Learn institutional trading concepts, technical analysis patterns, and how smart money
          moves the markets. Interactive charts. Real knowledge.
        </p>
      </div>

      {/* Live Chart Demo */}
      <div className="mb-12 md:mb-20 animate-slideUp" style={{ animationDelay: '0.2s' }}>
        <div className="bg-gradient-to-b from-[#0f1419] to-[#0a0e17] rounded-xl md:rounded-2xl border border-white/10 p-4 md:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 md:mb-6">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-gray-400 font-mono text-xs md:text-sm">BTC/USD · 1H</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-lg md:text-2xl font-bold">$67,842.50</span>
              <span className="text-green-400 text-xs md:text-sm font-mono">+2.34%</span>
            </div>
          </div>
          <CandlestickChart showAnnotations />
        </div>
      </div>

      {/* Concept Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 animate-slideUp" style={{ animationDelay: '0.4s' }}>
        <ConceptCard
          title="Order Blocks"
          description="Institutional zones where smart money accumulates or distributes positions before major moves."
          icon="block"
          color="cyan"
        />
        <ConceptCard
          title="Liquidity Sweeps"
          description="Price movements that hunt stop losses before reversing, trapping retail traders."
          icon="sweep"
          color="amber"
        />
        <ConceptCard
          title="Fair Value Gaps"
          description="Imbalances in price action that often get filled as the market seeks equilibrium."
          icon="gap"
          color="emerald"
        />
      </div>
    </div>
  );
}

function PracticeSection() {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowResult(true);
  };

  const resetQuiz = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-16">
      <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 text-center">
        <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
          Test Your Knowledge
        </span>
      </h2>
      <p className="text-gray-400 text-center mb-8 md:mb-12 text-sm md:text-base">Identify the pattern and make the right call</p>

      <div className="bg-gradient-to-b from-[#0f1419] to-[#0a0e17] rounded-xl md:rounded-2xl border border-white/10 p-4 md:p-8">
        <div className="mb-6 md:mb-8">
          <CandlestickChart scenario="quiz" />
        </div>

        <div className="mb-6 md:mb-8">
          <h3 className="text-base md:text-lg font-semibold mb-4">What pattern do you see forming?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {['Bullish Order Block', 'Bearish Liquidity Sweep', 'Fair Value Gap Fill', 'Break of Structure'].map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showResult}
                className={`p-3 md:p-4 rounded-lg border text-left transition-all text-sm md:text-base min-h-[48px] ${
                  showResult
                    ? index === 2
                      ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                      : selectedAnswer === index
                      ? 'border-red-500 bg-red-500/20 text-red-300'
                      : 'border-white/10 text-gray-500'
                    : 'border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/5'
                }`}
              >
                <span className="font-mono text-xs mr-2 opacity-50">{String.fromCharCode(65 + index)}.</span>
                {answer}
              </button>
            ))}
          </div>
        </div>

        {showResult && (
          <div className="animate-fadeIn">
            <div className={`p-4 md:p-6 rounded-lg mb-4 ${selectedAnswer === 2 ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-amber-500/10 border border-amber-500/30'}`}>
              <h4 className={`font-bold mb-2 text-sm md:text-base ${selectedAnswer === 2 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {selectedAnswer === 2 ? 'Correct!' : 'Not quite!'}
              </h4>
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                This chart shows a clear <strong className="text-cyan-400">Fair Value Gap (FVG)</strong> that formed during
                an impulsive move. Price is now returning to fill this imbalance before continuing the trend.
                FVGs represent areas where orders were not fully processed, creating inefficiency that the market
                tends to revisit.
              </p>
            </div>
            <button
              onClick={resetQuiz}
              className="w-full py-3 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 font-semibold hover:bg-cyan-500/30 transition-all text-sm md:text-base min-h-[48px]"
            >
              Try Another Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
