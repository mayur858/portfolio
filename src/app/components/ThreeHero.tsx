"use client";

import { Component, type ErrorInfo, type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CanvasTexture, LinearFilter, MeshBasicMaterial, PlaneGeometry } from "three";
import { useDarkMode } from "../context/DarkModeContext";

class WebGLErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV !== "production") console.warn("Matrix hero fallback", error, info);
  }
  render() { return this.state.hasError ? this.props.fallback : this.props.children; }
}

function MatrixRain({ isDarkMode, isMobile }: { isDarkMode: boolean; isMobile: boolean }) {
  const { viewport } = useThree();
  const [material, setMaterial] = useState<MeshBasicMaterial | null>(null);
  const canvas = useMemo(() => {
    if (typeof document === "undefined") return null;
    const el = document.createElement("canvas");
    el.width = isMobile ? 240 : 420;
    el.height = isMobile ? 360 : 420;
    return el;
  }, [isMobile]);
  const textureRef = useRef<CanvasTexture | null>(null);
  const geometry = useMemo(() => new PlaneGeometry(1, 1), []);
  const accumulator = useRef(0);
  const drops = useMemo(() => Array.from({ length: isMobile ? 16 : 30 }, (_, i) => ({
    x: (i + 0.5) / (isMobile ? 16 : 30),
    y: Math.random(),
    speed: 0.12 + Math.random() * 0.26,
    length: 5 + Math.floor(Math.random() * 12),
    glyphs: Array.from({ length: 18 }, () => {
      const chars = "01アイウエオカキクケコ{}[]<>/\\|";
      return chars[Math.floor(Math.random() * chars.length)];
    }),
  })), [isMobile]);

  useEffect(() => {
    if (!canvas) return;
    const texture = new CanvasTexture(canvas);
    texture.minFilter = LinearFilter;
    texture.magFilter = LinearFilter;
    texture.generateMipmaps = false;
    textureRef.current = texture;
    const nextMaterial = new MeshBasicMaterial({
      map: texture, transparent: true, depthWrite: false, toneMapped: false,
      opacity: isDarkMode ? (isMobile ? 0.38 : 0.48) : 0.26,
    });
    setMaterial(nextMaterial);
    return () => {
      texture.dispose(); nextMaterial.dispose(); geometry.dispose();
      textureRef.current = null; setMaterial(null);
    };
  }, [canvas, geometry, isDarkMode, isMobile]);

  useFrame((_, delta) => {
    if (!canvas || !textureRef.current) return;
    accumulator.current += delta;
    if (accumulator.current < 0.05) return;
    const dt = accumulator.current; accumulator.current = 0;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const font = isMobile ? 10 : 12;
    ctx.font = `bold ${font}px monospace`;
    ctx.textAlign = "center";
    drops.forEach((drop, i) => {
      drop.y += drop.speed * dt;
      if (drop.y > 1.2) drop.y = -Math.random() * 0.8;
      // Spread the Matrix streams across the full canvas so the left side
      // stays visually alive while the gradient keeps the headline readable.
      const normalizedX = drop.x;
      for (let row = 0; row < drop.length; row++) {
        const y = drop.y * canvas.height - row * font;
        if (y < 0 || y > canvas.height) continue;
        const alpha = row === 0 ? 0.95 : Math.max(0.1, 0.62 - row / (drop.length + 2));
        ctx.fillStyle = row === 0
          ? "rgba(210,255,220,1)"
          : `rgba(74,255,120,${Math.min(1, alpha * 1.3)})`;
        ctx.fillText(drop.glyphs[(row + i) % drop.glyphs.length], normalizedX * canvas.width, y);
      }
    });
    textureRef.current.needsUpdate = true;
  });

  useEffect(() => () => geometry.dispose(), [geometry]);
  return (
    <mesh geometry={geometry} material={material ?? undefined} scale={[viewport.width, viewport.height, 1]} position={[0, 0, -0.2]}>
      {!material && <meshBasicMaterial transparent opacity={0} />}
    </mesh>
  );
}

function StaticFallback({ isDarkMode }: { isDarkMode: boolean }) {
  return <div aria-hidden="true" className={`h-full w-full ${isDarkMode
    ? "bg-[radial-gradient(ellipse_at_80%_45%,rgba(34,197,94,0.18),transparent_55%),linear-gradient(90deg,#050807,#07130b)]"
    : "bg-[radial-gradient(ellipse_at_80%_45%,rgba(34,197,94,0.12),transparent_55%)]"}`} />;
}

export default function ThreeHero() {
  const { isDarkMode } = useDarkMode();
  const [enabled, setEnabled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [isMobile, setIsMobile] = useState(true);
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReducedMotion(motion.matches);
      setIsMobile(window.matchMedia("(max-width: 767px)").matches);
    };
    update();
    motion.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      motion.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion || typeof IntersectionObserver === "undefined") { setEnabled(false); return; }
    const element = host.current;
    if (!element) return;
    let timer: number | undefined;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      timer = window.setTimeout(() => setEnabled(true), 500);
      observer.disconnect();
    }, { rootMargin: "100px" });
    observer.observe(element);
    return () => { observer.disconnect(); if (timer !== undefined) window.clearTimeout(timer); };
  }, [reducedMotion]);

  const fallback = <StaticFallback isDarkMode={isDarkMode} />;
  return (
    <div ref={host} aria-hidden="true" className="absolute inset-0 z-0 h-full w-full pointer-events-none">
      {enabled && !reducedMotion ? (
        <WebGLErrorBoundary fallback={fallback}>
          <Canvas camera={{ position: [0, 0, 2], fov: 50 }} dpr={isMobile ? 1 : [1, 1.2]}
            gl={{ alpha: true, antialias: false, powerPreference: "low-power", depth: false, stencil: false }}>
            <MatrixRain isDarkMode={isDarkMode} isMobile={isMobile} />
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
        </WebGLErrorBoundary>
      ) : fallback}
    </div>
  );
}
