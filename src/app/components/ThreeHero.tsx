"use client";

import { Component, type ErrorInfo, type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useDarkMode } from "../context/DarkModeContext";

type ErrorBoundaryState = { hasError: boolean };

class WebGLErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("3D hero unavailable; showing static fallback.", error, info);
    }
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

function TorusKnot({ isDarkMode, reducedMotion }: { isDarkMode: boolean; reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const geometry = useMemo(() => {
    // A modest segment count keeps vertex and draw-call costs low.
    return new (require("three").TorusKnotGeometry)(0.78, 0.22, 96, 8, 2, 3);
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state, delta) => {
    if (!group.current || reducedMotion) return;
    const targetX = state.pointer.y * 0.12;
    const targetY = state.pointer.x * 0.18;
    group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(delta * 1.8, 1);
    group.current.rotation.y += delta * 0.07 + (targetY - group.current.rotation.y) * Math.min(delta, 1);
  });

  return (
    <group ref={group} rotation={[0.25, 0.15, -0.25]} scale={0.92}>
      <mesh geometry={geometry}>
        <meshBasicMaterial
          color={isDarkMode ? "#a78bfa" : "#5b21b6"}
          wireframe
          transparent
          opacity={isDarkMode ? 0.78 : 0.72}
        />
      </mesh>
      <mesh geometry={geometry} scale={1.015}>
        <meshBasicMaterial
          color={isDarkMode ? "#60a5fa" : "#2563eb"}
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  );
}

const StaticFallback = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <div
    className={`h-full w-full ${
      isDarkMode
        ? "bg-[radial-gradient(ellipse_at_50%_45%,rgba(139,92,246,0.22),transparent_65%)]"
        : "bg-[radial-gradient(ellipse_at_50%_45%,rgba(76,29,149,0.14),transparent_65%)]"
    }`}
    aria-hidden="true"
  />
);

const ThreeHero = () => {
  const { isDarkMode } = useDarkMode();
  const [shouldRenderCanvas, setShouldRenderCanvas] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(true);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreferences = () => {
      setReducedMotion(motionQuery.matches);
      setIsSmallScreen(window.matchMedia("(max-width: 767px)").matches);
    };

    updatePreferences();
    motionQuery.addEventListener("change", updatePreferences);
    window.addEventListener("resize", updatePreferences);

    return () => {
      motionQuery.removeEventListener("change", updatePreferences);
      window.removeEventListener("resize", updatePreferences);
    };
  }, []);

  useEffect(() => {
    // Keep the initial render lightweight. Only prepare WebGL when the hero
    // is near the viewport, the device is desktop-sized, and motion is allowed.
    if (reducedMotion || isSmallScreen || typeof IntersectionObserver === "undefined") {
      setShouldRenderCanvas(false);
      return;
    }

    const host = hostRef.current;
    if (!host) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          const idleWindow = window as Window & {
            requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
            cancelIdleCallback?: (id: number) => void;
          };
          let idleId: number | undefined;
          const timeoutId = window.setTimeout(() => setShouldRenderCanvas(true), 900);

          if (idleWindow.requestIdleCallback) {
            idleId = idleWindow.requestIdleCallback(() => setShouldRenderCanvas(true), { timeout: 1400 });
          }

          observer.disconnect();
          return () => {
            window.clearTimeout(timeoutId);
            if (idleId !== undefined) idleWindow.cancelIdleCallback?.(idleId);
          };
        }
      },
      { rootMargin: "120px", threshold: 0.01 },
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, [isSmallScreen, reducedMotion]);

  const fallback = <StaticFallback isDarkMode={isDarkMode} />;

  return (
    <div ref={hostRef} className="absolute inset-0 z-0 h-full w-full pointer-events-none" aria-hidden="true">
      {shouldRenderCanvas && !isSmallScreen && !reducedMotion ? (
        <WebGLErrorBoundary fallback={fallback}>
          <Canvas
            camera={{ position: [0, 0, 3.8], fov: 42 }}
            dpr={[1, 1.25]}
            frameloop="always"
            gl={{ alpha: true, antialias: false, powerPreference: "low-power", stencil: false, depth: true }}
            performance={{ min: 0.5 }}
          >
            <TorusKnot isDarkMode={isDarkMode} reducedMotion={reducedMotion} />
          </Canvas>
        </WebGLErrorBoundary>
      ) : fallback}
    </div>
  );
};

export default ThreeHero;
