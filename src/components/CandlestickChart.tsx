import { useEffect, useRef, useState } from 'react';

interface Candle {
  open: number;
  high: number;
  low: number;
  close: number;
}

interface CandlestickChartProps {
  showAnnotations?: boolean;
  scenario?: 'default' | 'quiz' | 'orderblock' | 'liquidity' | 'fvg' | 'bos';
}

// Generate realistic looking candlestick data
function generateCandles(count: number, scenario: string): Candle[] {
  const candles: Candle[] = [];
  let price = 100;

  for (let i = 0; i < count; i++) {
    const volatility = 2 + Math.random() * 3;
    const trend = scenario === 'quiz' ? (i < count / 2 ? 0.3 : -0.1) :
                  scenario === 'orderblock' ? (i < count * 0.3 ? -0.2 : 0.4) :
                  scenario === 'liquidity' ? (i < count * 0.6 ? 0.2 : (i < count * 0.75 ? -0.5 : 0.3)) :
                  scenario === 'fvg' ? (i < count * 0.4 ? 0.1 : (i < count * 0.5 ? 0.8 : 0.1)) :
                  scenario === 'bos' ? (i < count * 0.5 ? -0.1 : 0.4) :
                  Math.sin(i / 5) * 0.3;

    const direction = Math.random() > 0.5 - trend ? 1 : -1;
    const bodySize = volatility * Math.random();
    const wickUp = volatility * Math.random() * 0.5;
    const wickDown = volatility * Math.random() * 0.5;

    const open = price;
    const close = price + bodySize * direction;
    const high = Math.max(open, close) + wickUp;
    const low = Math.min(open, close) - wickDown;

    candles.push({ open, high, low, close });
    price = close;
  }

  return candles;
}

export function CandlestickChart({ showAnnotations = false, scenario = 'default' }: CandlestickChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [candles] = useState(() => generateCandles(40, scenario));
  const [animationProgress, setAnimationProgress] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

  // Handle responsive sizing
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const height = Math.min(400, Math.max(250, width * 0.5));
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    ctx.scale(dpr, dpr);

    // Calculate price range
    const prices = candles.flatMap(c => [c.high, c.low]);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;
    const padding = { top: 20, bottom: 30, left: 10, right: 60 };

    const chartWidth = dimensions.width - padding.left - padding.right;
    const chartHeight = dimensions.height - padding.top - padding.bottom;
    const candleWidth = chartWidth / candles.length;

    const priceToY = (price: number) => {
      return padding.top + (1 - (price - minPrice) / priceRange) * chartHeight;
    };

    // Clear canvas
    ctx.fillStyle = '#0a0e17';
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);

    // Draw grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(dimensions.width - padding.right, y);
      ctx.stroke();

      // Price labels
      const price = maxPrice - (priceRange / 5) * i;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.font = `${Math.max(9, Math.min(11, dimensions.width / 80))}px JetBrains Mono, monospace`;
      ctx.textAlign = 'left';
      ctx.fillText(price.toFixed(1), dimensions.width - padding.right + 5, y + 4);
    }

    // Draw candles with animation
    const visibleCandles = Math.floor(candles.length * animationProgress);

    candles.slice(0, visibleCandles).forEach((candle, i) => {
      const x = padding.left + i * candleWidth + candleWidth / 2;
      const isBullish = candle.close > candle.open;

      // Wick
      ctx.strokeStyle = isBullish ? '#00d4ff' : '#ff6b6b';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, priceToY(candle.high));
      ctx.lineTo(x, priceToY(candle.low));
      ctx.stroke();

      // Body
      const bodyTop = priceToY(Math.max(candle.open, candle.close));
      const bodyBottom = priceToY(Math.min(candle.open, candle.close));
      const bodyHeight = Math.max(1, bodyBottom - bodyTop);

      ctx.fillStyle = isBullish ? '#00d4ff' : '#ff6b6b';
      ctx.fillRect(
        x - candleWidth * 0.35,
        bodyTop,
        candleWidth * 0.7,
        bodyHeight
      );
    });

    // Draw annotations if enabled
    if (showAnnotations && animationProgress > 0.5) {
      const annotationAlpha = Math.min(1, (animationProgress - 0.5) * 2);

      // Order Block zone
      ctx.fillStyle = `rgba(0, 212, 255, ${0.1 * annotationAlpha})`;
      ctx.fillRect(
        padding.left + candleWidth * 8,
        priceToY(candles[10].high),
        candleWidth * 6,
        priceToY(candles[10].low) - priceToY(candles[10].high)
      );

      // Order block label
      ctx.fillStyle = `rgba(0, 212, 255, ${annotationAlpha})`;
      ctx.font = `bold ${Math.max(9, Math.min(11, dimensions.width / 70))}px JetBrains Mono, monospace`;
      ctx.textAlign = 'left';
      ctx.fillText('ORDER BLOCK', padding.left + candleWidth * 8, priceToY(candles[10].high) - 5);

      // FVG zone
      if (candles.length > 25) {
        ctx.fillStyle = `rgba(255, 193, 7, ${0.15 * annotationAlpha})`;
        ctx.fillRect(
          padding.left + candleWidth * 22,
          priceToY(candles[23].low),
          candleWidth * 4,
          priceToY(candles[21].high) - priceToY(candles[23].low)
        );

        ctx.fillStyle = `rgba(255, 193, 7, ${annotationAlpha})`;
        ctx.fillText('FVG', padding.left + candleWidth * 22, priceToY(candles[23].low) - 5);
      }

      // Liquidity sweep marker
      if (candles.length > 35) {
        ctx.strokeStyle = `rgba(255, 107, 107, ${annotationAlpha})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        const sweepY = priceToY(Math.min(...candles.slice(30, 35).map(c => c.low)));
        ctx.moveTo(padding.left, sweepY);
        ctx.lineTo(dimensions.width - padding.right, sweepY);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = `rgba(255, 107, 107, ${annotationAlpha})`;
        ctx.fillText('LIQUIDITY', padding.left + candleWidth * 30, sweepY + 15);
      }
    }
  }, [candles, animationProgress, showAnnotations, dimensions]);

  // Animate on mount
  useEffect(() => {
    let start: number | null = null;
    const duration = 1500;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(1, elapsed / duration);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimationProgress(eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <canvas
        ref={canvasRef}
        style={{ width: dimensions.width, height: dimensions.height }}
        className="rounded-lg max-w-full"
      />
    </div>
  );
}
