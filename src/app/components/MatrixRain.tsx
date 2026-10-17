"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useDarkMode } from "../context/DarkModeContext";

/**
 * Subtle "matrix rain" background for the hero.
 *
 * Rendered as a single full-screen quad with a fragment shader, so the cost is
 * one draw call regardless of how many glyphs are on screen. Glyphs are looked
 * up from a small texture atlas that is drawn once on a 2D canvas.
 *
 * Tweak the look from the constants below.
 */

// --- Look & feel ------------------------------------------------------------
const THEME = {
  dark: { color: "#39ff70", opacity: 0.86 },
  light: { color: "#047857", opacity: 0.62 },
} as const;

const CELL_SIZE = { desktop: 18, mobile: 14 }; // CSS px per glyph cell
const MOBILE_BREAKPOINT = 640;
const STATIC_TIME = 14; // frame shown when the user prefers reduced motion

// --- Glyph atlas ------------------------------------------------------------
const ATLAS_GRID = 8; // 8 x 8 cells
const ATLAS_CELL = 64; // px per cell in the atlas
const GLYPHS =
  "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789:.=*+-<>|";

function buildAtlas() {
  const size = ATLAS_GRID * ATLAS_CELL;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.font = `${ATLAS_CELL * 0.62}px ui-monospace, "SFMono-Regular", Menlo, Consolas, "MS Gothic", "Hiragino Kaku Gothic ProN", monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#fff";

  const draw = (ch: string, x: number, y: number) => {
    ctx.clearRect(x, y, ATLAS_CELL, ATLAS_CELL);
    ctx.fillText(ch, x + ATLAS_CELL / 2, y + ATLAS_CELL / 2);
  };
  const read = (x: number, y: number) =>
    ctx.getImageData(x, y, ATLAS_CELL, ATLAS_CELL).data;

  // A private-use code point renders as the font's "missing glyph" box (or
  // nothing). Any glyph that looks identical to it is unsupported on this
  // device and gets dropped, so we never show tofu boxes.
  draw("", 0, 0);
  const missing = read(0, 0);
  ctx.clearRect(0, 0, ATLAS_CELL, ATLAS_CELL);

  const supported: string[] = [];
  for (const ch of GLYPHS) {
    if (supported.length >= ATLAS_GRID * ATLAS_GRID) break;
    const x = (supported.length % ATLAS_GRID) * ATLAS_CELL;
    const y = Math.floor(supported.length / ATLAS_GRID) * ATLAS_CELL;
    draw(ch, x, y);
    const px = read(x, y);
    let blank = true;
    let sameAsMissing = true;
    for (let i = 3; i < px.length; i += 4) {
      if (px[i] > 0) blank = false;
      if (px[i] !== missing[i]) sameAsMissing = false;
      if (!blank && !sameAsMissing) break;
    }
    if (blank || sameAsMissing) ctx.clearRect(x, y, ATLAS_CELL, ATLAS_CELL);
    else supported.push(ch);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = false; // sample with canvas (top-down) coordinates
  texture.needsUpdate = true;
  return { texture, count: Math.max(supported.length, 1) };
}

// --- Shader -----------------------------------------------------------------
const vertexShader = /* glsl */ `
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uRes;       // drawing-buffer size in device px
  uniform float uCell;     // cell size in device px
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform sampler2D uAtlas;
  uniform float uCount;

  float hash11(float p) {
    p = fract(p * 0.1031);
    p *= p + 33.33;
    p *= p + p;
    return fract(p);
  }

  float hash21(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  void main() {
    // Top-down pixel coordinates.
    vec2 frag = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
    vec2 grid = frag / uCell;
    vec2 cell = floor(grid);
    vec2 local = fract(grid);

    float rows = ceil(uRes.y / uCell);

    // Per-column randomness: only some columns are ever active, each with its
    // own speed, trail length and phase.
    float isOn = step(0.4, hash11(cell.x * 7.31 + 3.7));
    float trailLen = mix(8.0, 20.0, hash11(cell.x * 3.17 + 9.1));
    float speed = mix(2.0, 4.5, hash11(cell.x * 5.53 + 1.3));
    float gap = mix(6.0, 40.0, hash11(cell.x * 2.71 + 4.2));
    float cycle = rows + trailLen + gap;
    float phase = hash11(cell.x * 1.93 + 0.5) * cycle;

    float head = mod(uTime * speed + phase, cycle);
    float d = head - cell.y; // rows behind the head
    float trail = (d >= 0.0 && d < trailLen) ? pow(1.0 - d / trailLen, 1.5) : 0.0;
    float lead = 1.0 - smoothstep(0.0, 1.2, d); // brighter leading glyph
    float strength = trail * (0.55 + 0.45 * lead);

    // Glyph choice; each cell re-rolls slowly and at its own rate.
    float rate = 0.25 + 0.9 * hash21(cell + 11.0);
    float tick = floor(uTime * rate);
    float idx = floor(hash21(cell + vec2(tick * 1.37, tick * 7.13)) * uCount);
    vec2 atlasCell = vec2(mod(idx, ${ATLAS_GRID}.0), floor(idx / ${ATLAS_GRID}.0));
    vec2 uv = (atlasCell + local) / ${ATLAS_GRID}.0;
    float glyph = texture2D(uAtlas, uv).a;

    // Keep the centre (where the hero text sits) calm, and fade towards the
    // bottom so the effect melts into the next section.
    vec2 p = gl_FragCoord.xy / uRes;
    float centre = length((p - 0.5) * vec2(uRes.x / uRes.y, 1.0));
    float vignette = mix(0.48, 1.0, smoothstep(0.1, 0.65, centre));
    float bottom = smoothstep(0.0, 0.3, p.y);

    float alpha = glyph * strength * isOn * vignette * bottom * uOpacity;
    // Make the leading glyph of each stream visibly brighter than its trail.
    float headGlow = (1.0 - smoothstep(0.0, 1.25, d)) * step(0.0, d);
    vec3 headColor = mix(uColor, vec3(0.72, 1.0, 0.78), headGlow * 0.95);
    gl_FragColor = vec4(headColor, alpha);
    #include <colorspace_fragment>
  }
`;

// --- Scene ------------------------------------------------------------------
function Rain({
  isDarkMode,
  reducedMotion,
}: {
  isDarkMode: boolean;
  reducedMotion: boolean;
}) {
  const { size, gl, invalidate } = useThree();
  const atlas = useMemo(() => buildAtlas(), []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: STATIC_TIME },
      uRes: { value: new THREE.Vector2(1, 1) },
      uCell: { value: 16 },
      uColor: { value: new THREE.Color() },
      uOpacity: { value: 0.4 },
      uAtlas: { value: atlas.texture },
      uCount: { value: atlas.count },
    }),
    [atlas],
  );

  useEffect(() => () => atlas.texture.dispose(), [atlas]);

  // Resolution / cell size.
  useEffect(() => {
    const dpr = gl.getPixelRatio();
    const cssCell =
      size.width < MOBILE_BREAKPOINT ? CELL_SIZE.mobile : CELL_SIZE.desktop;
    uniforms.uRes.value.set(size.width * dpr, size.height * dpr);
    uniforms.uCell.value = cssCell * dpr;
    invalidate();
  }, [size.width, size.height, gl, uniforms, invalidate]);

  // Theme.
  useEffect(() => {
    const theme = isDarkMode ? THEME.dark : THEME.light;
    uniforms.uColor.value.set(theme.color);
    uniforms.uOpacity.value = theme.opacity;
    invalidate();
  }, [isDarkMode, uniforms, invalidate]);

  useFrame((_, delta) => {
    if (!reducedMotion) {
      // Clamp so returning to a background tab doesn't cause a jump.
      uniforms.uTime.value += Math.min(delta, 0.1);
    }
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

const MatrixRain = () => {
  const { isDarkMode } = useDarkMode();
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Respect "reduce motion": render a single still frame instead.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // Stop rendering while the hero is scrolled out of view.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        frameloop={reducedMotion ? "demand" : visible ? "always" : "never"}
      >
        <Rain isDarkMode={isDarkMode} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
};

export default MatrixRain;
