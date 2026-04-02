"use client";

/**
 * Animated SVG dot grid — lightweight alternative to Three.js hero.
 * Pure CSS animations, no JS runtime cost.
 * Infrastructure topology aesthetic: dots on a grid with faint connecting lines,
 * some dots pulsing at staggered intervals.
 *
 * Respects `prefers-reduced-motion` via CSS `@media` query.
 */

const GRID_SIZE = 20;
const DOT_RADIUS = 1;
const SPACING = 28;
const WIDTH = GRID_SIZE * SPACING;
const HEIGHT = GRID_SIZE * SPACING;

/** Deterministic "random" based on grid position — no Math.random for SSR safety */
function seeded(x: number, y: number): number {
  return ((x * 131 + y * 97 + 37) % 100) / 100;
}

/** Select dots that will pulse — ~15% of dots */
function shouldPulse(x: number, y: number): boolean {
  return seeded(x, y) < 0.15;
}

/** Select dots that get connections — ~8% of dots connect to a neighbor */
function shouldConnect(x: number, y: number): boolean {
  return seeded(y, x) < 0.08;
}

function DotGrid() {
  const dots: React.ReactNode[] = [];
  const lines: React.ReactNode[] = [];

  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      const cx = col * SPACING + SPACING / 2;
      const cy = row * SPACING + SPACING / 2;
      const pulse = shouldPulse(col, row);
      const delay = seeded(col, row) * 4;

      dots.push(
        <circle
          key={`d-${col}-${row}`}
          cx={cx}
          cy={cy}
          r={DOT_RADIUS}
          className={pulse ? "dot-grid-pulse" : "dot-grid-static"}
          style={pulse ? { animationDelay: `${delay}s` } : undefined}
        />
      );

      // Connecting lines to right or bottom neighbor
      if (shouldConnect(col, row) && col < GRID_SIZE - 1) {
        const nx = (col + 1) * SPACING + SPACING / 2;
        lines.push(
          <line
            key={`lh-${col}-${row}`}
            x1={cx}
            y1={cy}
            x2={nx}
            y2={cy}
            className="dot-grid-line"
            style={{ animationDelay: `${delay + 0.5}s` }}
          />
        );
      }
      if (shouldConnect(row, col) && row < GRID_SIZE - 1) {
        const ny = (row + 1) * SPACING + SPACING / 2;
        lines.push(
          <line
            key={`lv-${col}-${row}`}
            x1={cx}
            y1={cy}
            x2={cx}
            y2={ny}
            className="dot-grid-line"
            style={{ animationDelay: `${delay + 1}s` }}
          />
        );
      }
    }
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      aria-hidden="true"
      role="presentation"
    >
      {/* Radial fade mask */}
      <div className="absolute inset-0 bg-glow-hero" />
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="dot-grid-svg h-full w-full max-w-none opacity-40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>{lines}</g>
        <g>{dots}</g>
      </svg>

      <style jsx>{`
        .dot-grid-static {
          fill: rgba(161, 161, 161, 0.3);
        }
        .dot-grid-pulse {
          fill: rgba(129, 140, 248, 0.6);
          animation: dotPulse 3s ease-in-out infinite;
        }
        .dot-grid-line {
          stroke: rgba(129, 140, 248, 0.15);
          stroke-width: 0.5;
          animation: lineFade 4s ease-in-out infinite;
        }
        @keyframes dotPulse {
          0%,
          100% {
            opacity: 0.3;
            r: 1;
          }
          50% {
            opacity: 1;
            r: 2;
          }
        }
        @keyframes lineFade {
          0%,
          100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.4;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .dot-grid-pulse {
            animation: none;
            opacity: 0.6;
          }
          .dot-grid-line {
            animation: none;
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
}

export { DotGrid };
