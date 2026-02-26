import React, { useRef, useEffect, useMemo } from "react";
import {
  RUNE_DICTIONARY_PATHS,
  RUNE_VIEWBOX,
  RUNE_OFFSETS,
} from "../../../constants/runes";

interface RuneCanvasProps {
  text: string;
  size?: number;
  spacing?: number;
  /**
   * Pode ser:
   * - "#a796ff" / "rgb(...)" etc
   * - "var(--color-hover-purple)"
   * - "currentColor"
   * Se omitido, usa "currentColor".
   */
  color?: string;
  className?: string;
}

/**
 * Resolve QUALQUER string CSS de cor (incluindo var(...) e currentColor)
 * para um valor computado RGB(a), que o canvas entende.
 */
function resolveToComputedColor(canvas: HTMLCanvasElement, color: string): string {
  const input = (color || "").trim() || "currentColor";

  // Elemento de referência: pai (onde normalmente está a color do .back)
  const refEl = canvas.parentElement || canvas;

  // currentColor: pega a cor computada do elemento de referência
  if (input === "currentColor") {
    return getComputedStyle(refEl).color || "rgb(167, 150, 255)";
  }

  // Para var(...), hex, hsl, etc: usa um span temporário pra “forçar” o browser a computar
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

const RuneCanvas: React.FC<RuneCanvasProps> = ({
  text,
  size = 32,
  spacing = 10,
  color = "currentColor",
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const runePaths = useMemo(() => {
    const cache: Record<string, Path2D> = {};
    const chars = Array.from(new Set(text.toUpperCase()));
    chars.forEach((char) => {
      const pathData = RUNE_DICTIONARY_PATHS[char];
      if (pathData) cache[char] = new Path2D(pathData);
    });
    return cache;
  }, [text]);

  useEffect(() => {
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

    canvas.width = Math.ceil(totalWidth * dpr);
    canvas.height = Math.ceil(size * dpr);
    canvas.style.width = `${totalWidth}px`;
    canvas.style.height = `${size}px`;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, totalWidth, size);

    // ✅ AQUI está a correção real: cor computada (RGB) sempre válida pro canvas
    ctx.fillStyle = resolveToComputedColor(canvas, color);

    chars.forEach((char, i) => {
      const path = runePaths[char];
      if (path) {
        ctx.save();
        ctx.translate(positions[i], 0);
        ctx.scale(scale, scale);
        ctx.fill(path);
        ctx.restore();
      }
    });
  }, [text, size, spacing, runePaths, color]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      onContextMenu={(e) => e.preventDefault()}
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        willChange: "transform",
        transform: "translateZ(0)",
      }}
    />
  );
};

export default RuneCanvas;