"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useDarkMode } from "../context/DarkModeContext";

// Generate points manually to avoid NaN issues
function generateSpherePoints(count: number, radius: number) {
  const points = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const r = Math.cbrt(Math.random()) * radius;

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    points[i * 3] = x;
    points[i * 3 + 1] = y;
    points[i * 3 + 2] = z;
  }
  return points;
}

function Stars(props: any) {
  const ref = useRef<any>({
    rotation: [0, 0, Math.PI / 4],
  });
  // Generate 5000 random points in a sphere
  const sphere = useMemo(() => generateSpherePoints(3000, 1.5), []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color={props.isDarkMode ? "#8b5cf6" : "#4c1d95"} // Light Violet vs Dark Violet
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

const ThreeHero = () => {
  const { isDarkMode } = useDarkMode();
  const [useStaticFallback, setUseStaticFallback] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      setUseStaticFallback(motionQuery.matches || window.innerWidth < 640);
    };

    updatePreference();
    window.addEventListener("resize", updatePreference);
    motionQuery.addEventListener("change", updatePreference);
    return () => {
      window.removeEventListener("resize", updatePreference);
      motionQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 h-full w-full" aria-hidden="true">
      {useStaticFallback ? (
        <div
          className={`h-full w-full ${
            isDarkMode
              ? "bg-[radial-gradient(ellipse_at_50%_35%,rgba(139,92,246,0.18),transparent_65%)]"
              : "bg-[radial-gradient(ellipse_at_50%_35%,rgba(76,29,149,0.12),transparent_65%)]"
          }`}
        />
      ) : (
        <Canvas
          camera={{ position: [0, 0, 1] }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, powerPreference: "low-power" }}
        >
          <Stars isDarkMode={isDarkMode} />
        </Canvas>
      )}
    </div>
  );
};

export default ThreeHero;
