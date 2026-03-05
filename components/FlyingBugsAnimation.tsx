'use client';

import { useEffect, useRef } from 'react';
import { parseGIF, decompressFrames } from 'gifuct-js';

// Type definitions
interface AsciiConfig {
  width: number;
  height: number;
  cellSize: number;
  fontSize: number;
  bugFontSize: number;
  bugCount: number;
  bugSpeed: number;
  bugChars: string[];
  bugMorphSpeed: number;
  backgroundChar: string;
  backgroundColor: string;
  canvasBackgroundColor: string;
  bugColors: string[];
  density: number;
  spacing: number;
  animationSpeed: number;
  trail: boolean;
  preprocessing: {
    blur: number;
    grain: number;
    gamma: number;
    blackPoint: number;
    whitePoint: number;
    threshold: number;
    showEffect: boolean;
    dithering: boolean;
    ditheringStrength: number;
    invert: boolean;
  };
  useBrightnessMapping: boolean;
  brightnessLevels: Array<{
    threshold: number;
    char: string;
    name: string;
  }>;
}

interface FlyingBugsAnimationProps {
  config?: Partial<AsciiConfig>;
  imageUrl?: string;
  isGif?: boolean;
  className?: string;
  style?: React.CSSProperties;
  canvasStyle?: React.CSSProperties;
}

export const DEFAULT_CONFIG: AsciiConfig = {
  "width": 1800,
  "height": 1800,
  "cellSize": 12,
  "fontSize": 27,
  "bugFontSize": 67,
  "bugCount": 40,
  "bugSpeed": 2,
  "bugChars": [
    "※",
    "*",
    "✱",
    "✦",
    "❋",
    "❊",
    "✳︎"
  ],
  "bugMorphSpeed": 680,
  "backgroundChar": "-",
  "backgroundColor": "#cb976c",
  "canvasBackgroundColor": "#e8d7c9",
  "bugColors": [
    "#1c875b",
    "#a9490a",
    "#0c558d"
  ],
  "density": 0,
  "spacing": 0,
  "animationSpeed": 10,
  "trail": false,
  "preprocessing": {
    "blur": 1,
    "grain": 0,
    "gamma": 1.14,
    "blackPoint": 255,
    "whitePoint": 233,
    "threshold": 231,
    "showEffect": true,
    "invert": true,
    "dithering": true,
    "ditheringStrength": 50
  },
  "useBrightnessMapping": true,
  "brightnessLevels": [
    {
      "threshold": 0,
      "char": " ",
      "name": "Very Dark"
    },
    {
      "threshold": 1,
      "char": "▓",
      "name": "Custom"
    },
    {
      "threshold": 100,
      "char": "▒",
      "name": "Custom"
    },
    {
      "threshold": 220,
      "char": "░",
      "name": "Custom"
    }
  ]
};

export default function FlyingBugsAnimation({
  config: customConfig,
  imageUrl = '/animation.gif',
  isGif = true,
  className,
  style,
  canvasStyle,
}: FlyingBugsAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const config: AsciiConfig = { ...DEFAULT_CONFIG, ...customConfig };
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = config.width;
    canvas.height = config.height;

    let bugs: any[] = [];
    let lastTime = 0;
    let gifFrameIndex = 0;
    let imageFrames: ImageData[] | null = null;
    let gifFrameDelay = 100;
    let animationId: number;

    // ASCII Engine functions
    
    // ============================================
    // Bug initialization and movement
    // ============================================
    function initializeBugs(config: AsciiConfig) {
      const bugs = [];
      const cols = Math.floor(config.width / config.cellSize);
      const rows = Math.floor(config.height / config.cellSize);

      for (let i = 0; i < config.bugCount; i++) {
        bugs.push({
          id: i,
          x: Math.random() * cols,
          y: Math.random() * rows,
          vx: (Math.random() - 0.5) * config.bugSpeed,
          vy: (Math.random() - 0.5) * config.bugSpeed,
          char: config.bugChars[Math.floor(Math.random() * config.bugChars.length)],
          color: config.bugColors[Math.floor(Math.random() * config.bugColors.length)],
        });
      }
      return bugs;
    }

    function updateBugs(bugs: any[], config: AsciiConfig) {
      const cols = Math.floor(config.width / config.cellSize);
      const rows = Math.floor(config.height / config.cellSize);
      const morphChance = (config.bugMorphSpeed || 50) / 100 * 0.1;

      return bugs.map((bug, index) => {
        let newVx = bug.vx;
        let newVy = bug.vy;

        // Apply separation force to prevent clustering
        let separationX = 0;
        let separationY = 0;
        const separationRadius = Math.max(cols, rows) * 0.1;

        bugs.forEach((otherBug, otherIndex) => {
          if (index === otherIndex) return;

          const dx = bug.x - otherBug.x;
          const dy = bug.y - otherBug.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < separationRadius && distance > 0) {
            const force = (separationRadius - distance) / separationRadius;
            separationX += (dx / distance) * force * 0.1;
            separationY += (dy / distance) * force * 0.1;
          }
        });

        newVx += separationX;
        newVy += separationY;

        if (Math.random() < 0.05) {
          newVx += (Math.random() - 0.5) * config.bugSpeed * 0.3;
          newVy += (Math.random() - 0.5) * config.bugSpeed * 0.3;
        }

        const speed = Math.sqrt(newVx * newVx + newVy * newVy);
        const maxSpeed = config.bugSpeed * 1.5;
        if (speed > maxSpeed) {
          newVx = (newVx / speed) * maxSpeed;
          newVy = (newVy / speed) * maxSpeed;
        }

        let newX = bug.x + newVx;
        let newY = bug.y + newVy;

        if (newX < 0 || newX >= cols) {
          newVx = -newVx;
          newX = Math.max(0, Math.min(cols - 1, newX));
        }
        if (newY < 0 || newY >= rows) {
          newVy = -newVy;
          newY = Math.max(0, Math.min(rows - 1, newY));
        }

        let newChar = bug.char;
        if (Math.random() < morphChance) {
          newChar = config.bugChars[Math.floor(Math.random() * config.bugChars.length)];
        }

        return { ...bug, x: newX, y: newY, vx: newVx, vy: newVy, char: newChar };
      });
    }

    // ============================================
    // Brightness-based character selection
    // (matches ascii-engine.ts selectCharByBrightness)
    // ============================================
    function selectCharByBrightness(brightness: number, levels: AsciiConfig['brightnessLevels'], fallbackChar: string) {
      const sorted = [...levels].sort((a, b) => a.threshold - b.threshold);
      for (const level of sorted) {
        if (brightness <= level.threshold) {
          return level.char;
        }
      }
      return fallbackChar;
    }

    // ============================================
    // Floyd-Steinberg dithering
    // (matches ascii-engine.ts applyDithering)
    // ============================================
    function applyDithering(brightnessMap: number[][], levels: AsciiConfig['brightnessLevels'], strength: number) {
      const rows = brightnessMap.length;
      const cols = brightnessMap[0]?.length || 0;
      const dithered = brightnessMap.map(row => [...row]);
      const sorted = [...levels].sort((a, b) => a.threshold - b.threshold);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const oldPixel = dithered[y][x];
          let newPixel = 255;

          for (const level of sorted) {
            if (oldPixel <= level.threshold) {
              newPixel = level.threshold;
              break;
            }
          }

          dithered[y][x] = newPixel;
          const error = (oldPixel - newPixel) * (strength / 100);

          if (x + 1 < cols) {
            dithered[y][x + 1] = Math.max(0, Math.min(255, dithered[y][x + 1] + error * 7 / 16));
          }
          if (y + 1 < rows) {
            if (x > 0) {
              dithered[y + 1][x - 1] = Math.max(0, Math.min(255, dithered[y + 1][x - 1] + error * 3 / 16));
            }
            dithered[y + 1][x] = Math.max(0, Math.min(255, dithered[y + 1][x] + error * 5 / 16));
            if (x + 1 < cols) {
              dithered[y + 1][x + 1] = Math.max(0, Math.min(255, dithered[y + 1][x + 1] + error * 1 / 16));
            }
          }
        }
      }
      return dithered;
    }

    // ============================================
    // Image preprocessing
    // (matches ascii-engine.ts preprocessImage)
    // Returns a NEW ImageData to avoid modifying original
    // ============================================
    function applyPreprocessing(imageData: ImageData, preprocessing: AsciiConfig['preprocessing']) {
      const { gamma, blackPoint, whitePoint, blur, grain, invert } = preprocessing;
      const width = imageData.width;
      const height = imageData.height;

      // Create a copy to avoid modifying original (prevents accumulation on loops)
      const processed = new ImageData(width, height);
      const data = processed.data;

      // Copy original data first
      for (let i = 0; i < imageData.data.length; i++) {
        data[i] = imageData.data[i];
      }

      // Gamma correction
      if (gamma !== 1.0) {
        const gammaCorrection = 1 / gamma;
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.pow(data[i] / 255, gammaCorrection) * 255;
          data[i + 1] = Math.pow(data[i + 1] / 255, gammaCorrection) * 255;
          data[i + 2] = Math.pow(data[i + 2] / 255, gammaCorrection) * 255;
        }
      }

      // Black/White Point
      const range = whitePoint - blackPoint;
      if (range > 0) {
        for (let i = 0; i < data.length; i += 4) {
          for (let c = 0; c < 3; c++) {
            let value = data[i + c];
            value = ((value - blackPoint) / range) * 255;
            value = Math.max(0, Math.min(255, value));
            data[i + c] = value;
          }
        }
      }

      // Blur
      if (blur > 0) {
        const tempData = new Uint8ClampedArray(data);
        const radius = Math.floor(blur);
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            let r = 0, g = 0, b = 0, count = 0;
            for (let dy = -radius; dy <= radius; dy++) {
              for (let dx = -radius; dx <= radius; dx++) {
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                  const idx = (ny * width + nx) * 4;
                  r += tempData[idx];
                  g += tempData[idx + 1];
                  b += tempData[idx + 2];
                  count++;
                }
              }
            }
            const idx = (y * width + x) * 4;
            data[idx] = r / count;
            data[idx + 1] = g / count;
            data[idx + 2] = b / count;
          }
        }
      }

      // Grain
      if (grain > 0) {
        const grainAmount = grain / 100;
        for (let i = 0; i < data.length; i += 4) {
          const noise = (Math.random() - 0.5) * 255 * grainAmount;
          data[i] = Math.max(0, Math.min(255, data[i] + noise));
          data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
          data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
        }
      }

      // Invert
      if (invert) {
        for (let i = 0; i < data.length; i += 4) {
          const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
          if (brightness < 240) {
            data[i] = 255 - data[i];
            data[i + 1] = 255 - data[i + 1];
            data[i + 2] = 255 - data[i + 2];
          }
        }
      }

      return processed;
    }

    // ============================================
    // Frame generation with pre-computed brightness map
    // (for GIF: uses decoded brightness map directly)
    // (for static image: extracts brightness from imageData)
    // (matches ascii-engine.ts generateFrame)
    // ============================================
    function generateFrameWithBrightness(bugs: any[], config: AsciiConfig & { imageData?: ImageData }, precomputedBrightnessMap: number[][] | null, imageData: ImageData | null) {
      const cols = Math.floor(config.width / config.cellSize);
      const rows = Math.floor(config.height / config.cellSize);
      const grid: string[][] = [];
      const colors: string[][] = [];

      // Build brightness map
      let brightnessMap = precomputedBrightnessMap;

      // If no precomputed map but has imageData, extract brightness
      if (!brightnessMap && imageData) {
        // Apply preprocessing if enabled (returns NEW ImageData, doesn't modify original)
        let processedImageData = imageData;
        if (config.preprocessing && config.preprocessing.showEffect) {
          processedImageData = applyPreprocessing(imageData, config.preprocessing);
        }

        brightnessMap = [];
        for (let row = 0; row < rows; row++) {
          brightnessMap[row] = [];
          for (let col = 0; col < cols; col++) {
            const imgX = Math.floor((col / cols) * processedImageData.width);
            const imgY = Math.floor((row / rows) * processedImageData.height);
            const pixelIndex = (imgY * processedImageData.width + imgX) * 4;
            const r = processedImageData.data[pixelIndex];
            const g = processedImageData.data[pixelIndex + 1];
            const b = processedImageData.data[pixelIndex + 2];
            brightnessMap[row][col] = (r + g + b) / 3;
          }
        }
      }

      // Apply dithering if enabled
      if (brightnessMap && config.preprocessing && config.preprocessing.dithering &&
          config.useBrightnessMapping && config.brightnessLevels && config.brightnessLevels.length > 0) {
        brightnessMap = applyDithering(brightnessMap, config.brightnessLevels, config.preprocessing.ditheringStrength);
      }

      // Generate grid
      for (let row = 0; row < rows; row++) {
        grid[row] = [];
        colors[row] = [];
        for (let col = 0; col < cols; col++) {
          let char = ' ';

          if (brightnessMap && brightnessMap[row]) {
            const brightness = brightnessMap[row][col];

            if (config.useBrightnessMapping && config.brightnessLevels && config.brightnessLevels.length > 0) {
              // Use brightness mapping
              if (brightness < config.preprocessing.threshold) {
                char = selectCharByBrightness(brightness, config.brightnessLevels, config.backgroundChar);
              }
            } else {
              // Simple threshold
              const shouldDraw = brightness < config.preprocessing.threshold;
              char = shouldDraw ? config.backgroundChar : ' ';
            }
          } else {
            // No image - use density pattern
            const hash = (row * 2654435761 + col * 2246822519) >>> 0;
            const pseudoRandom = (hash % 1000) / 1000;
            const shouldDraw = pseudoRandom < config.density;
            char = shouldDraw ? config.backgroundChar : ' ';
          }

          grid[row][col] = char;
          colors[row][col] = config.backgroundColor;
        }
      }

      return { grid, colors };
    }

    // ============================================
    // Legacy generateFrame wrapper for React component
    // (React component uses config.imageData)
    // ============================================
    function generateFrame(bugs: any[], config: AsciiConfig & { imageData?: ImageData }) {
      return generateFrameWithBrightness(bugs, config, null, config.imageData ?? null);
    }

    // ============================================
    // Draw frame to canvas
    // (matches AsciiCanvas.tsx drawFrame exactly)
    // ============================================
    function drawFrame(ctx: CanvasRenderingContext2D, frame: { grid: string[][]; colors: string[][] }, config: AsciiConfig, bugs: any[]) {
      const cols = Math.floor(config.width / config.cellSize);
      const rows = Math.floor(config.height / config.cellSize);
      const actualCellSize = config.cellSize + (config.spacing || 0);

      // Use explicit font sizes from config
      const backgroundFontSize = config.fontSize;
      const bugFontSize = config.bugFontSize;

      // Clear canvas
      ctx.fillStyle = config.canvasBackgroundColor || '#000000';
      ctx.fillRect(0, 0, config.width, config.height);

      // Draw background pattern
      ctx.font = backgroundFontSize + 'px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const char = frame.grid[row][col];
          if (char === ' ') continue;

          const x = col * actualCellSize + actualCellSize / 2;
          const y = row * actualCellSize + actualCellSize / 2;

          ctx.fillStyle = frame.colors[row][col];
          ctx.fillText(char, x, y);
        }
      }

      // Draw bugs on top with their own font size
      ctx.font = bugFontSize + 'px monospace';
      bugs.forEach(bug => {
        const col = Math.floor(bug.x);
        const row = Math.floor(bug.y);

        if (row >= 0 && row < rows && col >= 0 && col < cols) {
          const x = col * actualCellSize + actualCellSize / 2;
          const y = row * actualCellSize + actualCellSize / 2;

          ctx.fillStyle = bug.color;
          ctx.fillText(bug.char, x, y);
        }
      });
    }
    

    // Load GIF frames from file
    async function loadGifFrames(gifUrl: string): Promise<{ frames: ImageData[]; delay: number }> {
      // Fetch GIF file
      const response = await fetch(gifUrl);
      if (!response.ok) {
        throw new Error(`Failed to load GIF: ${response.status} ${response.statusText}`);
      }
      const arrayBuffer = await response.arrayBuffer();

      // Parse GIF using imported functions
      const gif = parseGIF(arrayBuffer);
      const frames = decompressFrames(gif, true);

      if (frames.length === 0) {
        throw new Error('No frames found in GIF');
      }

      // Get GIF dimensions
      const gifWidth = frames[0].dims.width;
      const gifHeight = frames[0].dims.height;
      const cols = Math.floor(config.width / config.cellSize);
      const rows = Math.floor(config.height / config.cellSize);

      // Create persistent canvas for building frames
      const gifCanvas = document.createElement('canvas');
      gifCanvas.width = gifWidth;
      gifCanvas.height = gifHeight;
      const gifCtx = gifCanvas.getContext('2d');
      if (!gifCtx) throw new Error('Failed to get context');

      const imageFrames: ImageData[] = [];
      let totalDelay = 0;

      // Limit frames for performance (max 100 frames)
      const maxFrames = 100;
      const frameStep = frames.length > maxFrames ? Math.ceil(frames.length / maxFrames) : 1;
      const framesToProcess = frames.length > maxFrames
        ? frames.filter((_: any, i: number) => i % frameStep === 0).slice(0, maxFrames)
        : frames;

      if (frames.length > maxFrames) {
        console.warn(`GIF has ${frames.length} frames. Limiting to ${framesToProcess.length} frames for performance.`);
      }

      // Process each frame
      for (let i = 0; i < framesToProcess.length; i++) {
        const frame = framesToProcess[i];
        const { dims, patch, delay, disposalType } = frame;

        if (!dims || !patch || patch.length === 0) continue;
        if (!dims.width || !dims.height || dims.width <= 0 || dims.height <= 0) continue;

        totalDelay += delay || 100;

        // Handle disposal method
        if (disposalType === 2) {
          gifCtx.clearRect(0, 0, gifWidth, gifHeight);
        }

        // Create ImageData for this frame patch
        const patchData = new ImageData(
          new Uint8ClampedArray(patch),
          dims.width,
          dims.height
        );

        // Draw patch at its position
        gifCtx.putImageData(patchData, dims.left, dims.top);

        // Get complete frame
        const completeFrame = gifCtx.getImageData(0, 0, gifWidth, gifHeight);

        // Scale to target size
        const canvas = document.createElement('canvas');
        canvas.width = cols;
        canvas.height = rows;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Failed to get context');

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, cols, rows);

        // Create temp canvas for scaling
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = gifWidth;
        tempCanvas.height = gifHeight;
        const tempCtx = tempCanvas.getContext('2d');
        if (!tempCtx) throw new Error('Failed to get context');
        tempCtx.putImageData(completeFrame, 0, 0);

        // Calculate scaling
        const imgAspect = gifWidth / gifHeight;
        const targetAspect = cols / rows;

        let drawWidth = cols;
        let drawHeight = rows;
        let offsetX = 0;
        let offsetY = 0;

        if (imgAspect > targetAspect) {
          drawHeight = cols / imgAspect;
          offsetY = (rows - drawHeight) / 2;
        } else {
          drawWidth = rows * imgAspect;
          offsetX = (cols - drawWidth) / 2;
        }

        // Draw scaled frame
        ctx.drawImage(tempCanvas, offsetX, offsetY, drawWidth, drawHeight);
        const scaledImageData = ctx.getImageData(0, 0, cols, rows);

        // Note: preprocessing will be applied in generateFrameWithBrightness
        // DO NOT apply here to avoid double-preprocessing

        imageFrames.push(scaledImageData);
      }

      const averageDelay = totalDelay > 0 ? Math.round(totalDelay / imageFrames.length) : 100;

      return { frames: imageFrames, delay: averageDelay };
    }

    // Load image helper
    async function loadImageData(url: string): Promise<ImageData | null> {
      if (!url) return null;

      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          const cols = Math.floor(config.width / config.cellSize);
          const rows = Math.floor(config.height / config.cellSize);

          const tempCanvas = document.createElement('canvas');
          tempCanvas.width = cols;
          tempCanvas.height = rows;
          const tempCtx = tempCanvas.getContext('2d');
          if (!tempCtx) {
            reject(new Error('Failed to get context'));
            return;
          }

          tempCtx.fillStyle = '#FFFFFF';
          tempCtx.fillRect(0, 0, cols, rows);

          const imgAspect = img.width / img.height;
          const targetAspect = cols / rows;

          let drawWidth = cols;
          let drawHeight = rows;
          let offsetX = 0;
          let offsetY = 0;

          if (imgAspect > targetAspect) {
            drawHeight = cols / imgAspect;
            offsetY = (rows - drawHeight) / 2;
          } else {
            drawWidth = rows * imgAspect;
            offsetX = (cols - drawWidth) / 2;
          }

          tempCtx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
          const imageData = tempCtx.getImageData(0, 0, cols, rows);

          // Note: preprocessing will be applied in generateFrameWithBrightness
          // DO NOT apply here to avoid double-preprocessing

          resolve(imageData);
        };
        img.onerror = reject;
        img.src = url;
      });
    }

    // Note: applyPreprocessing is defined in generateInlineEngine()

    // Initialize and load
    async function init() {
      try {
        if (imageUrl && isGif) {
          // Load GIF
          const gifData = await loadGifFrames(imageUrl);
          imageFrames = gifData.frames;
          gifFrameDelay = gifData.delay;
          (config as any).imageData = imageFrames[0];
        } else if (imageUrl) {
          // Load static image
          const imgData = await loadImageData(imageUrl);
          if (imgData) {
            (config as any).imageData = imgData;
          }
        }

        bugs = initializeBugs(config);
        animate(0);
      } catch (error) {
        console.error('Failed to load:', error);
      }
    }

    function animate(timestamp: number) {
      const frameInterval = 1000 / config.animationSpeed;

      if (timestamp - lastTime >= frameInterval) {
        lastTime = timestamp;

        if (imageFrames && imageFrames.length > 1) {
          gifFrameIndex = (gifFrameIndex + 1) % imageFrames.length;
          (config as any).imageData = imageFrames[gifFrameIndex];
        }

        bugs = updateBugs(bugs, config);
        const frame = generateFrame(bugs, config);
        drawFrame(ctx!, frame, config, bugs);
      }

      animationId = requestAnimationFrame(animate);
    }

    init();

    // Listen for bug kill events from interaction overlay
    const handleBugKill = (e: CustomEvent<{ canvasX: number; canvasY: number }>) => {
      const { canvasX, canvasY } = e.detail;
      const actualCellSize = config.cellSize + (config.spacing || 0);

      // Convert canvas coordinates to grid coordinates
      const gridX = canvasX / actualCellSize;
      const gridY = canvasY / actualCellSize;

      // Find and remove bugs within kill radius
      const killRadius = 6;
      const prevCount = bugs.length;
      bugs = bugs.filter(bug => {
        const dx = bug.x - gridX;
        const dy = bug.y - gridY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance > killRadius;
      });
      const killedCount = prevCount - bugs.length;

      // Dispatch result event with killed count
      if (killedCount > 0) {
        window.dispatchEvent(
          new CustomEvent('bugKillResult', {
            detail: { killedCount },
          })
        );
      }
    };

    window.addEventListener('bugKill', handleBugKill as EventListener);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener('bugKill', handleBugKill as EventListener);
    };
  }, [customConfig, imageUrl, isGif]);

  return (
    <div className={className} style={{ position: 'relative', ...style }}>
      <canvas
        ref={canvasRef}
        style={{
          imageRendering: 'pixelated',
          maxWidth: '100%',
          height: 'auto',
        }}
      />
    </div>
  );
}
