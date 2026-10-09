"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// Halftone point-cloud bust built at runtime from the profile photo.
// The photo has a flat backdrop, so a flood fill from the edges is enough to cut it out.

const SRC = "/img/foto.jpg";
const COLS = 230;
const BG_TOLERANCE = 28; // RGB distance from the backdrop colour; tuned on foto.jpg
const BUST_H = 2.4; // world units

const vert = /* glsl */ `
  uniform float uTime, uPx, uSize, uSweep, uScatter, uHalfH;
  attribute float aLum, aSeed, aEdge;
  varying float vLum, vEdge, vHot;
  void main() {
    vec3 p = position;
    p.z += sin(uTime * 0.9 + p.y * 3.0 + aSeed * 6.2831) * 0.012;
    float yN = 0.5 - p.y / (uHalfH * 2.0);
    float band = exp(-pow((yN - uSweep) * 12.0, 2.0));
    p.z += band * 0.22;
    p.x += band * 0.05 * sin(aSeed * 40.0);
    vec3 dir = normalize(vec3(sin(aSeed * 91.7), cos(aSeed * 47.3), sin(aSeed * 13.1) + 0.4));
    p += dir * uScatter * (0.4 + aSeed * 2.6);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float s = mix(0.12, 1.0, pow(aLum, 2.0));
    gl_PointSize = uSize * s * (1.0 + band * 0.9) * uPx / -mv.z;
    vLum = aLum; vEdge = aEdge; vHot = band;
  }
`;

const frag = /* glsl */ `
  uniform vec3 uPaper, uAccent;
  uniform float uDim;
  varying float vLum, vEdge, vHot;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    if (dot(c, c) > 0.25) discard;
    vec3 col = mix(uAccent, uPaper, smoothstep(0.3, 0.62, vLum));
    col = mix(col, uAccent, max(vEdge * 0.85, vHot));
    gl_FragColor = vec4(col * uDim, 1.0);
  }
`;

type Sample = { pos: Float32Array; lum: Float32Array; seed: Float32Array; edge: Float32Array; pitch: number };

function sample(img: HTMLImageElement): Sample {
  const W = COLS;
  const H = Math.round((COLS * img.naturalHeight) / img.naturalWidth);
  const cv = document.createElement("canvas");
  cv.width = W;
  cv.height = H;
  const g = cv.getContext("2d", { willReadFrequently: true })!;
  g.drawImage(img, 0, 0, W, H);
  const px = g.getImageData(0, 0, W, H).data;
  const at = (x: number, y: number) => (y * W + x) * 4;

  const ref = [0, 0, 0];
  for (let x = 0; x < W; x++) for (let c = 0; c < 3; c++) ref[c] += px[at(x, 0) + c] / W;
  const dist = (i: number, r: number[]) => Math.hypot(px[i] - r[0], px[i + 1] - r[1], px[i + 2] - r[2]);

  const bg = new Uint8Array(W * H);
  const stack: number[] = [];
  for (let x = 0; x < W; x++) stack.push(x);
  for (let y = 0; y < H; y++) stack.push(y * W, y * W + W - 1);
  while (stack.length) {
    const k = stack.pop()!;
    if (bg[k]) continue;
    const x = k % W, y = (k - x) / W;
    const i = k * 4;
    // backdrop is a soft gradient: also accept a pixel that barely differs from the bg pixel above it
    const nearAbove = y > 0 && bg[k - W] && dist(i, [px[i - W * 4], px[i - W * 4 + 1], px[i - W * 4 + 2]]) < 6;
    if (dist(i, ref) > BG_TOLERANCE && !nearAbove) continue;
    bg[k] = 1;
    if (x > 0) stack.push(k - 1);
    if (x < W - 1) stack.push(k + 1);
    if (y > 0) stack.push(k - W);
    if (y < H - 1) stack.push(k + W);
  }

  const pitch = (BUST_H * img.naturalWidth) / img.naturalHeight / W;
  const pos: number[] = [], lum: number[] = [], seed: number[] = [], edge: number[] = [];
  for (let y = 0; y < H; y++) {
    let l = -1, r = -1;
    for (let x = 0; x < W; x++) if (!bg[y * W + x]) { if (l < 0) l = x; r = x; }
    if (l < 0) continue;
    const mid = (l + r) / 2, half = Math.max((r - l) / 2, 1);
    for (let x = l; x <= r; x++) {
      const k = y * W + x;
      if (bg[k]) continue;
      const i = k * 4;
      const L = (0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2]) / 255;
      const u = (x - mid) / half;
      // each row is treated as a half-cylinder so the bust has volume when it turns
      const z = Math.sqrt(Math.max(0, 1 - u * u)) * half * pitch * 0.7 + L * 0.05;
      let isEdge = 0;
      for (let dy = -2; dy <= 2 && !isEdge; dy++)
        for (let dx = -2; dx <= 2; dx++) {
          const nx = x + dx, ny = y + dy;
          if (nx >= 0 && nx < W && ny >= 0 && ny < H && bg[ny * W + nx]) { isEdge = 1; break; }
        }
      pos.push((x - W / 2) * pitch, (H / 2 - y) * pitch, z);
      lum.push(L);
      seed.push(Math.random());
      edge.push(isEdge);
    }
  }
  return { pos: new Float32Array(pos), lum: new Float32Array(lum), seed: new Float32Array(seed), edge: new Float32Array(edge), pitch };
}

export interface PortraitProps {
  docked: boolean;
  pulse: number;
  still: boolean;
}

type Api = { setDocked(v: boolean): void; sweep(): void };

export default function Portrait({ docked, pulse, still }: PortraitProps) {
  const host = useRef<HTMLDivElement>(null);
  const api = useRef<Api | null>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    } catch {
      return; // no WebGL: the menu still works without the bust
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
    camera.position.set(0, 0, 3.2);
    const group = new THREE.Group();
    scene.add(group);

    const uniforms = {
      uTime: { value: 0 },
      uPx: { value: 1 },
      uSize: { value: 0.01 },
      uSweep: { value: -1 },
      uScatter: { value: still ? 0 : 1.8 },
      uHalfH: { value: BUST_H / 2 },
      uDim: { value: 1 },
      uPaper: { value: new THREE.Color("#e9e6dc") },
      uAccent: { value: new THREE.Color("#ff4d00") },
    };
    const geo = new THREE.BufferGeometry();
    const mat = new THREE.ShaderMaterial({ uniforms, vertexShader: vert, fragmentShader: frag, depthTest: false });
    const points = new THREE.Points(geo, mat);
    points.frustumCulled = false; // geometry arrives after the first frame and the shader moves points outside it anyway
    group.add(points);

    const state = { docked: false, sweepT: -1, pointer: new THREE.Vector2(), aspect: 1 };
    api.current = {
      setDocked: (v) => { state.docked = v; },
      sweep: () => { state.sweepT = 0; },
    };

    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      state.aspect = w / h;
      uniforms.uPx.value = (h * renderer.getPixelRatio()) / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)));
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: PointerEvent) => {
      state.pointer.set((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
    };
    if (!still) window.addEventListener("pointermove", onMove);

    const img = new Image();
    img.src = SRC;
    img.onload = () => {
      const s = sample(img);
      geo.setAttribute("position", new THREE.BufferAttribute(s.pos, 3));
      geo.setAttribute("aLum", new THREE.BufferAttribute(s.lum, 1));
      geo.setAttribute("aSeed", new THREE.BufferAttribute(s.seed, 1));
      geo.setAttribute("aEdge", new THREE.BufferAttribute(s.edge, 1));
      uniforms.uSize.value = s.pitch * 1.3;
    };

    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(clock.getDelta(), 0.05);
      const k = 1 - Math.exp(-dt * 4);
      const halfW = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z * state.aspect;
      const narrow = state.aspect < 0.9;

      const tx = narrow ? 0 : state.docked ? halfW * 0.62 : -halfW * 0.34;
      const ty = narrow ? -0.05 : -0.2;
      const dim = state.docked ? (narrow ? 0.14 : 0.3) : narrow ? 0.55 : 1;
      const turn = state.docked && !narrow ? -0.35 : 0.12;

      group.position.x += (tx - group.position.x) * k;
      group.position.y += (ty - group.position.y) * k;
      group.rotation.y += (turn + state.pointer.x * 0.3 - group.rotation.y) * k;
      group.rotation.x += (state.pointer.y * 0.1 - group.rotation.x) * k;
      uniforms.uDim.value += (dim - uniforms.uDim.value) * k;

      if (!still) {
        uniforms.uTime.value += dt;
        uniforms.uScatter.value += (0 - uniforms.uScatter.value) * (1 - Math.exp(-dt * 2.6));
        if (state.sweepT >= 0) {
          state.sweepT += dt / 0.75;
          uniforms.uSweep.value = -0.15 + state.sweepT * 1.3;
          if (state.sweepT >= 1) { state.sweepT = -1; uniforms.uSweep.value = -1; }
        }
      }
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      img.onload = null;
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      api.current = null;
    };
  }, [still]);

  useEffect(() => api.current?.setDocked(docked), [docked]);
  useEffect(() => {
    if (pulse && !still) api.current?.sweep();
  }, [pulse, still]);

  return <div ref={host} aria-hidden="true" className="pl-portrait" />;
}
