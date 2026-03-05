'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { DEFAULT_CONFIG } from './FlyingBugsAnimation';

interface SplatEffect {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  scale: number;
}

interface SplatParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  angle: number;
  distance: number;
}

interface BugInteractionOverlayProps {
  totalBugs?: number;
}

interface MissPopup {
  id: number;
  x: number;
  y: number;
}

// Splat SVG component
const SplatSVG = ({ rotation, scale }: { rotation: number; scale: number }) => (
  <svg
    width="296"
    height="242"
    viewBox="0 0 296 242"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      transform: `rotate(${rotation}deg) scale(${scale})`,
    }}
  >
    <path
      d="M84.5 0C84.5 0 128.674 64.8254 95.4275 83C62.5 101 0 93 0 93C0 93 91.2312 115.816 100 174C104.618 204.64 95.4275 241.907 95.4275 241.907C95.4275 241.907 128.468 179.207 151 174C187.715 165.515 226.837 205.035 226.837 205.035C226.837 205.035 206.5 177 222.5 157C238.5 137 295.418 136.809 295.418 136.809C295.418 136.809 228.544 120.805 219.5 105C210.456 89.1954 248 42 248 42C248 42 191.5 72.5 156 61C120.5 49.5 84.5 0 84.5 0Z"
      fill="#000000"
    />
  </svg>
);

// Bug colors from FlyingBugsAnimation (RGB values)
const BUG_COLORS = [
  { r: 15, g: 151, b: 255 },   // #0F97FF - Blue
  { r: 41, g: 168, b: 115 },   // #29A873 - Green
  { r: 249, g: 103, b: 6 },    // #F96706 - Orange
];

// Check if a pixel color matches any bug color (with tolerance)
function isBugColor(r: number, g: number, b: number, tolerance = 80): string | null {
  for (const bugColor of BUG_COLORS) {
    const dr = Math.abs(r - bugColor.r);
    const dg = Math.abs(g - bugColor.g);
    const db = Math.abs(b - bugColor.b);
    if (dr < tolerance && dg < tolerance && db < tolerance) {
      return `rgb(${bugColor.r}, ${bugColor.g}, ${bugColor.b})`;
    }
  }
  return null;
}

const HIT_RADIUS = 40; // pixels - same as sampleRadius

export default function BugInteractionOverlay({ totalBugs = DEFAULT_CONFIG.bugCount }: BugInteractionOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [splats, setSplats] = useState<SplatEffect[]>([]);
  const [particles, setParticles] = useState<SplatParticle[]>([]);
  const [missPopups, setMissPopups] = useState<MissPopup[]>([]);
  const [kills, setKills] = useState(0);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  // Track mouse position
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos(null);
  }, []);

  // Clear expired splats, particles and miss popups
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setSplats((prev) => prev.filter((s) => now - s.id < 600));
      setParticles((prev) => prev.filter((p) => now - p.id < 800));
      setMissPopups((prev) => prev.filter((m) => now - m.id < 500));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Listen for bug kill results from FlyingBugsAnimation
  useEffect(() => {
    const handleBugKillResult = (e: CustomEvent<{ killedCount: number }>) => {
      setKills((prev) => prev + e.detail.killedCount);
    };

    window.addEventListener('bugKillResult', handleBugKillResult as EventListener);
    return () => {
      window.removeEventListener('bugKillResult', handleBugKillResult as EventListener);
    };
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      const now = Date.now();

      // Find the canvas element
      const canvas = overlayRef.current?.parentElement?.querySelector('canvas');
      let isHit = false;
      let hitColor = '#F96706';

      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Convert click position to canvas coordinates
          const canvasRect = canvas.getBoundingClientRect();
          const scaleX = canvas.width / canvasRect.width;
          const scaleY = canvas.height / canvasRect.height;
          const canvasX = Math.floor((e.clientX - canvasRect.left) * scaleX);
          const canvasY = Math.floor((e.clientY - canvasRect.top) * scaleY);

          // Sample in a circular pattern around the click point
          const step = 4;
          for (let dy = -HIT_RADIUS; dy <= HIT_RADIUS && !isHit; dy += step) {
            for (let dx = -HIT_RADIUS; dx <= HIT_RADIUS && !isHit; dx += step) {
              if (dx * dx + dy * dy > HIT_RADIUS * HIT_RADIUS) continue;

              const sx = canvasX + dx;
              const sy = canvasY + dy;
              if (sx >= 0 && sx < canvas.width && sy >= 0 && sy < canvas.height) {
                try {
                  const pixel = ctx.getImageData(sx, sy, 1, 1).data;
                  const matchedColor = isBugColor(pixel[0], pixel[1], pixel[2]);
                  if (matchedColor) {
                    isHit = true;
                    hitColor = matchedColor;
                  }
                } catch {
                  // Canvas might be tainted, ignore
                }
              }
            }
          }
        }
      }

      if (isHit && canvas) {
        // Dispatch bugKill event to remove the bug from animation
        const canvasRect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / canvasRect.width;
        const scaleY = canvas.height / canvasRect.height;
        const canvasX = (e.clientX - canvasRect.left) * scaleX;
        const canvasY = (e.clientY - canvasRect.top) * scaleY;

        window.dispatchEvent(
          new CustomEvent('bugKill', {
            detail: { canvasX, canvasY },
          })
        );

        // kills count is updated via bugKillResult event from FlyingBugsAnimation

        // Create main splat effect (the SVG splash)
        const newSplat: SplatEffect = {
          id: now,
          x: clickX,
          y: clickY,
          color: '#000000',
          rotation: Math.random() * 360,
          scale: 0.3 + Math.random() * 0.2,
        };
        setSplats((prev) => [...prev, newSplat]);

        // Create small particles flying outward
        const particleCount = 12;
        const newParticles: SplatParticle[] = [];
        for (let i = 0; i < particleCount; i++) {
          const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.3;
          const distance = 30 + Math.random() * 60;
          newParticles.push({
            id: now + i + 1,
            x: clickX,
            y: clickY,
            color: '#000000',
            size: 4 + Math.random() * 8,
            angle: angle,
            distance: distance,
          });
        }
        setParticles((prev) => [...prev, ...newParticles]);
      } else {
        // Miss
        setMissPopups((prev) => [...prev, { id: now, x: clickX, y: clickY }]);
      }
    },
    []
  );

  return (
    <div
      ref={overlayRef}
      className="absolute inset-0 cursor-none"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ zIndex: 5 }}
    >
      {/* Hit Range Indicator + Kill Counter */}
      {mousePos && (
        <div
          className="absolute pointer-events-none"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Circle */}
          <div
            style={{
              width: HIT_RADIUS * 3,
              height: HIT_RADIUS * 3,
              border: '1px dashed #000',
              borderRadius: '50%',
              position: 'relative',
            }}
          >
            {/* Crosshair */}
            <div
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                width: '20px',
                height: '2px',
                backgroundColor: '#000',
                transform: 'translate(-50%, -50%)',
              }}
            />
            <div
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                width: '2px',
                height: '20px',
                backgroundColor: '#000',
                transform: 'translate(-50%, -50%)',
              }}
            />
          </div>
          {/* Kill Counter - below the circle */}
          <div
            className="font-mono text-center mt-2"
            style={{
              fontSize: '14px',
              color: '#000',
              whiteSpace: 'nowrap',
            }}
          >
            {kills} / {totalBugs}
          </div>
        </div>
      )}

      {/* Miss Popups */}
      {missPopups.map((miss) => (
        <div
          key={miss.id}
          className="absolute pointer-events-none font-mono font-bold animate-miss-popup"
          style={{
            left: miss.x,
            top: miss.y,
            color: '#000',
            fontSize: '18px',
            transform: 'translate(-50%, -50%)',
          }}
        >
          MISS
        </div>
      ))}

      {/* Main Splat SVG Effects */}
      {splats.map((splat) => (
        <div
          key={splat.id}
          className="absolute pointer-events-none animate-splat-svg"
          style={{
            left: splat.x,
            top: splat.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <SplatSVG rotation={splat.rotation} scale={splat.scale} />
        </div>
      ))}

      {/* Flying Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute pointer-events-none animate-particle"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: '50%',
            // boxShadow: `0 0 6px ${particle.color}`,
            '--particle-x': `${Math.cos(particle.angle) * particle.distance}px`,
            '--particle-y': `${Math.sin(particle.angle) * particle.distance}px`,
          } as React.CSSProperties}
        />
      ))}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes splat-svg {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
          }
          10% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(2.5);
          }
          30% {
            transform: translate(-50%, -50%) scale(1.8);
          }
          60% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(2);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        @keyframes particle {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(2);
          }
          100% {
            opacity: 0;
            transform: translate(
              calc(-50% + var(--particle-x)),
              calc(-50% + var(--particle-y))
            ) scale(0);
          }
        }
        @keyframes miss-popup {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0.5);
          }
          50% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        .animate-splat-svg {
          animation: splat-svg 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .animate-particle {
          animation: particle 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        .animate-miss-popup {
          animation: miss-popup 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
