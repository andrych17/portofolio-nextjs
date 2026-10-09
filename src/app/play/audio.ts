// Everything here is synthesized with WebAudio: no sample files, no licensed music.

type Sfx = "move" | "select" | "back" | "page";

let ctx: AudioContext | null = null;
let out: GainNode | null = null;
let musicBus: GainNode | null = null;
let timer = 0;
let enabled = false;

function ensure(): AudioContext {
  if (ctx) return ctx;
  ctx = new AudioContext();
  const comp = ctx.createDynamicsCompressor();
  out = ctx.createGain();
  out.gain.value = 0.7;
  out.connect(comp).connect(ctx.destination);
  musicBus = ctx.createGain();
  musicBus.gain.value = 0;
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 5200;
  musicBus.connect(lp).connect(out);
  return ctx;
}

function env(g: GainNode, t: number, peak: number, attack: number, decay: number) {
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(peak, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
}

function tone(dest: AudioNode, type: OscillatorType, f: number, t: number, peak: number, decay: number, attack = 0.004) {
  const c = ensure();
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.value = f;
  env(g, t, peak, attack, decay);
  o.connect(g).connect(dest);
  o.start(t);
  o.stop(t + attack + decay + 0.05);
  return o;
}

let noiseBuf: AudioBuffer | null = null;
function noise(dest: AudioNode, t: number, dur: number, peak: number, type: BiquadFilterType, f0: number, f1 = f0) {
  const c = ensure();
  if (!noiseBuf) {
    noiseBuf = c.createBuffer(1, c.sampleRate, c.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }
  const s = c.createBufferSource();
  s.buffer = noiseBuf;
  const f = c.createBiquadFilter();
  f.type = type;
  f.frequency.setValueAtTime(f0, t);
  f.frequency.exponentialRampToValueAtTime(f1, t + dur);
  f.Q.value = 0.9;
  const g = c.createGain();
  env(g, t, peak, 0.003, dur);
  s.connect(f).connect(g).connect(dest);
  s.start(t, Math.random() * 0.5);
  s.stop(t + dur + 0.05);
}

export function sfx(kind: Sfx) {
  if (!enabled || !ctx || !out) return;
  const t = ctx.currentTime;
  if (kind === "move") {
    tone(out, "square", 1480, t, 0.05, 0.035);
    noise(out, t, 0.04, 0.05, "highpass", 6000);
  } else if (kind === "select") {
    tone(out, "triangle", 660, t, 0.18, 0.08);
    tone(out, "triangle", 990, t + 0.06, 0.16, 0.16);
    noise(out, t, 0.22, 0.12, "bandpass", 900, 5200);
  } else if (kind === "back") {
    tone(out, "triangle", 880, t, 0.15, 0.07);
    tone(out, "triangle", 520, t + 0.05, 0.13, 0.12);
  } else {
    noise(out, t, 0.18, 0.14, "bandpass", 3200, 700);
  }
}

// --- music: a 4-bar ii-V-I-vi loop in C, boom-bap drums, FM keys, sine bass ---

const BPM = 86;
const STEP = 60 / BPM / 4;
const SWING = 0.18;
const midi = (n: number) => 440 * 2 ** ((n - 69) / 12);
const CHORDS = [
  { root: 38, notes: [53, 57, 60, 64] }, // Dm9
  { root: 43, notes: [53, 57, 59, 64] }, // G13
  { root: 36, notes: [52, 55, 59, 62] }, // Cmaj9
  { root: 45, notes: [55, 58, 61, 64] }, // A7b9
];
const KICK = [0, 7, 10];
const SNARE = [4, 12];

function keys(dest: AudioNode, f: number, t: number, peak: number, dur: number) {
  const c = ensure();
  const car = c.createOscillator();
  const mod = c.createOscillator();
  const mg = c.createGain();
  const g = c.createGain();
  car.frequency.value = f;
  mod.frequency.value = f;
  mg.gain.setValueAtTime(f * 1.6, t);
  mg.gain.exponentialRampToValueAtTime(f * 0.05, t + 0.5);
  mod.connect(mg).connect(car.frequency);
  env(g, t, peak, 0.006, dur);
  car.connect(g).connect(dest);
  car.start(t); mod.start(t);
  car.stop(t + dur + 0.1); mod.stop(t + dur + 0.1);
}

function kick(dest: AudioNode, t: number) {
  const c = ensure();
  const o = c.createOscillator();
  const g = c.createGain();
  o.frequency.setValueAtTime(130, t);
  o.frequency.exponentialRampToValueAtTime(42, t + 0.12);
  env(g, t, 0.55, 0.002, 0.28);
  o.connect(g).connect(dest);
  o.start(t);
  o.stop(t + 0.35);
}

let step = 0;
let next = 0;
let delay: DelayNode | null = null;

function schedule() {
  const c = ensure();
  const bus = musicBus!;
  if (!delay) {
    delay = c.createDelay();
    delay.delayTime.value = STEP * 3;
    const fb = c.createGain();
    fb.gain.value = 0.28;
    const wet = c.createGain();
    wet.gain.value = 0.22;
    delay.connect(fb).connect(delay);
    delay.connect(wet).connect(bus);
  }
  while (next < c.currentTime + 0.12) {
    const s = step % 16;
    const bar = Math.floor(step / 16) % 4;
    const ch = CHORDS[bar];
    const t = next + (s % 2 ? STEP * SWING : 0);
    if (KICK.includes(s)) kick(bus, t);
    if (SNARE.includes(s)) {
      noise(bus, t, 0.16, 0.22, "bandpass", 1800, 1200);
      tone(bus, "triangle", 190, t, 0.08, 0.08);
    }
    if (s % 2 === 0) noise(bus, t, s % 4 === 2 ? 0.07 : 0.03, 0.05, "highpass", 7500);
    if (s === 0 || s === 11) tone(bus, "sine", midi(ch.root), t, 0.32, s === 0 ? 0.9 : 0.35, 0.01);
    if (s === 0) ch.notes.forEach((n, i) => keys(bus, midi(n), t + i * 0.012, 0.045, 1.6));
    if (s === 6 || s === 14 || (s === 9 && Math.random() < 0.5)) {
      const n = ch.notes[Math.floor(Math.random() * ch.notes.length)] + 12;
      keys(delay, midi(n), t, 0.05, 0.4);
      keys(bus, midi(n), t, 0.035, 0.4);
    }
    next += STEP;
    step++;
  }
}

export function setSound(on: boolean) {
  const c = ensure();
  enabled = on;
  if (on) void c.resume();
  musicBus!.gain.setTargetAtTime(on ? 0.55 : 0, c.currentTime, on ? 0.4 : 0.12);
  if (on && !timer) {
    next = c.currentTime + 0.05;
    timer = window.setInterval(schedule, 25);
  } else if (!on) {
    window.clearInterval(timer);
    timer = 0;
  }
}

export function stopAll() {
  window.clearInterval(timer);
  timer = 0;
  enabled = false;
  void ctx?.close();
  ctx = out = musicBus = delay = null;
  noiseBuf = null;
}
