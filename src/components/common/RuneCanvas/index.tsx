import React, {
  useRef,
  useEffect,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  RUNE_DICTIONARY_PATHS,
  RUNE_VIEWBOX,
  RUNE_OFFSETS,
} from "../../../constants/runes";

export interface RuneCanvasHandle {
  kick: (frames?: number) => void;
}

interface RuneCanvasProps {
  text: string;
  size?: number;
  spacing?: number;
  color?: string; // "#A796FF", "rgb(...)", "var(--...)" ou "currentColor"
  className?: string;
}

function resolveToComputedColor(
  canvas: HTMLCanvasElement,
  color: string
): string {
  const input = (color || "").trim() || "currentColor";
  const refEl = canvas.parentElement || canvas;

  if (input === "currentColor") {
    return getComputedStyle(refEl).color || "rgb(167, 150, 255)";
  }

  const probe = document.createElement("span");
  probe.style.position = "absolute";
  probe.style.left = "-99999px";
  probe.style.top = "0";
  probe.style.opacity = "0";
  probe.style.pointerEvents = "none";
  probe.style.color = input;

  refEl.appendChild(probe);
  const computed = getComputedStyle(probe).color;
  refEl.removeChild(probe);

  return computed || "rgb(167, 150, 255)";
}

const RuneCanvas = forwardRef<RuneCanvasHandle, RuneCanvasProps>(
  (
    { text, size = 32, spacing = 10, color = "currentColor", className },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number | null>(null);

    const runePaths = useMemo(() => {
      const cache: Record<string, Path2D> = {};
      const chars = Array.from(new Set(text.toUpperCase()));
      chars.forEach((char) => {
        const pathData = RUNE_DICTIONARY_PATHS[char];
        if (pathData) cache[char] = new Path2D(pathData);
      });
      return cache;
    }, [text]);

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return;

      const chars = text.toUpperCase().split("");
      const dpr = window.devicePixelRatio || 1;
      const scale = size / RUNE_VIEWBOX;

      let currentX = 0;
      const positions: number[] = [];
      const baseCharWidth = size * 0.75;

      chars.forEach((char, index) => {
        const offset = (RUNE_OFFSETS[char] || 0) * scale;
        positions.push(currentX + offset);

        const spaceWidth = (RUNE_OFFSETS[" "] || 400) * scale;
        const charWidth = char === " " ? spaceWidth : baseCharWidth;

        currentX += charWidth;
        if (index < chars.length - 1) currentX += spacing;
      });

      const totalWidth = currentX;

      // ✅ folga interna para não cortar runas (topo/baixo/laterais)
      const PAD_X = Math.ceil(size * 0.18);
      const PAD_Y = Math.ceil(size * 0.22);

      const safeWidth = Math.max(1, Math.ceil(totalWidth) + PAD_X * 2);
      const safeHeight = Math.max(1, Math.ceil(size) + PAD_Y * 2);

      canvas.width = Math.ceil(safeWidth * dpr);
      canvas.height = Math.ceil(safeHeight * dpr);
      canvas.style.width = `${safeWidth}px`;
      canvas.style.height = `${safeHeight}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, safeWidth, safeHeight);

      ctx.fillStyle = resolveToComputedColor(canvas, color);

      chars.forEach((char, i) => {
        const path = runePaths[char];
        if (path) {
          ctx.save();
          // ✅ aplica padding no desenho
          ctx.translate(PAD_X + positions[i], PAD_Y);
          ctx.scale(scale, scale);
          ctx.fill(path);
          ctx.restore();
        }
      });
    };

    useEffect(() => {
      draw();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text, size, spacing, color, runePaths]);

    const kick = (frames: number = 6) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      let remaining = Math.max(1, frames);
      const loop = () => {
        draw();
        remaining -= 1;
        if (remaining > 0) rafRef.current = requestAnimationFrame(loop);
        else rafRef.current = null;
      };

      rafRef.current = requestAnimationFrame(loop);
    };

    useImperativeHandle(ref, () => ({ kick }), []);

    useEffect(() => {
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }, []);

    return (
      <canvas
        ref={canvasRef}
        className={className}
        onContextMenu={(e) => e.preventDefault()}
        style={{
          display: "block",
          backfaceVisibility: "visible",
          WebkitBackfaceVisibility: "visible",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      />
    );
  }
);

RuneCanvas.displayName = "RuneCanvas";
export default RuneCanvas;