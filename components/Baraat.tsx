"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { WEDDING } from "@/lib/content";
import { ui } from "@/lib/art";
import { SplitTitle } from "./SplitTitle";
import { Magnetic } from "./Magnetic";
import { Svg } from "./Svg";
import { burstPetals } from "./Petals";

gsap.registerPlugin(Draggable, ScrollTrigger, MotionPathPlugin);

const T = WEDDING.text;
const EASE = [0.2, 0.75, 0.2, 1] as const;

/* ---------- Fireworks canvas you can fire by hand ---------- */
type FireHandle = { burst: (x?: number, y?: number, big?: boolean) => void };
const Fireworks = forwardRef<FireHandle, { auto: boolean }>(function Fireworks({ auto }, ref) {
  const cv = useRef<HTMLCanvasElement>(null);
  const api = useRef<FireHandle["burst"]>(() => {});
  const on = useRef(auto);
  on.current = auto;
  useImperativeHandle(ref, () => ({ burst: (x, y, big) => api.current(x, y, big) }), []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c = cv.current!, ctx = c.getContext("2d")!;
    type P = { x: number; y: number; vx: number; vy: number; life: number; max: number; c: string; s: number };
    let parts: P[] = [], raf = 0, last = 0, w = 0, h = 0;
    const small = window.matchMedia("(max-width: 700px), (pointer: coarse)").matches;
    const COLS = ["#F1DFAE", "#FFD27A", "#FF9F1C", "#F4C7CC", "#E77FA0", "#9FB4FF", "#FFFFFF"];
    const size = () => {
      const dpr = small ? 1 : Math.min(2, devicePixelRatio || 1), r = c.getBoundingClientRect();
      w = r.width; h = r.height; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    api.current = (x = w * (0.15 + Math.random() * 0.7), y = h * (0.12 + Math.random() * 0.35), big = false) => {
      const col = COLS[(Math.random() * COLS.length) | 0], col2 = COLS[(Math.random() * COLS.length) | 0];
      const n = (small ? 34 : 60) * (big ? 1.6 : 1);
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2, sp = (1.4 + Math.random() * 2.6) * (big ? 1.4 : 1);
        parts.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 0, max: 60 + Math.random() * 35, c: i % 2 ? col : col2, s: 1.2 + Math.random() * 1.5 });
      }
    };
    const loop = (t: number) => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,.2)"; ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      if (on.current && t - last > (small ? 2200 : 1400) + Math.random() * 1200) { api.current(); last = t; }
      parts = parts.filter(p => p.life < p.max);
      for (const p of parts) {
        p.life++; p.vx *= 0.975; p.vy = p.vy * 0.975 + 0.035; p.x += p.vx; p.y += p.vy;
        ctx.globalAlpha = Math.max(0, 1 - p.life / p.max);
        ctx.fillStyle = p.c; ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, 6.283); ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    };
    size(); addEventListener("resize", size); raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", size); };
  }, []);
  return <canvas ref={cv} className="bx-fw" aria-hidden="true" />;
});

/* ---------- A dhol beat made in the browser (no audio file) ---------- */
let ac: AudioContext | null = null;
function dhol() {
  try {
    ac = ac || new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const now = ac.currentTime;
    const hit = (t: number, f0: number, f1: number, vol: number, slap = false) => {
      const o = ac!.createOscillator(), g = ac!.createGain();
      o.type = "sine"; o.frequency.setValueAtTime(f0, now + t); o.frequency.exponentialRampToValueAtTime(f1, now + t + 0.18);
      g.gain.setValueAtTime(0.0001, now + t); g.gain.exponentialRampToValueAtTime(vol, now + t + 0.008); g.gain.exponentialRampToValueAtTime(0.0001, now + t + 0.35);
      o.connect(g).connect(ac!.destination); o.start(now + t); o.stop(now + t + 0.4);
      if (slap) {
        const len = 0.06 * ac!.sampleRate, buf = ac!.createBuffer(1, len, ac!.sampleRate), d = buf.getChannelData(0);
        for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
        const s = ac!.createBufferSource(), bp = ac!.createBiquadFilter(), sg = ac!.createGain();
        bp.type = "bandpass"; bp.frequency.value = 1800; sg.gain.value = vol * 0.6;
        s.buffer = buf; s.connect(bp).connect(sg).connect(ac!.destination); s.start(now + t);
      }
    };
    // dha  dhin  dhin  dha — dha
    [[0, 140, 55, 0.9, false], [0.22, 320, 180, 0.5, true], [0.37, 320, 180, 0.5, true], [0.6, 140, 55, 0.9, true], [0.82, 160, 60, 1, true]]
      .forEach(([t, a, b, v, s]) => hit(t as number, a as number, b as number, v as number, s as boolean));
  } catch { /* sound is a bonus */ }
}


const WIDE = { vb: "0 0 1000 520", d: "M90 430 C 250 440, 250 290, 410 300 S 580 430, 690 330 S 770 120, 905 105", start: [9, 82.7], end: [90.5, 20.2], mids: [[41, 57.7], [69, 63.5]] };
const TALL = { vb: "0 0 600 780", d: "M110 90 C 110 210, 480 190, 470 300 S 125 400, 130 500 S 470 600, 490 690", start: [18.3, 11.5], end: [81.7, 88.5], mids: [[78.3, 38.5], [21.7, 64.1]] };

/** Night baraat: an illustrated route from home to the wedding ground. A gold road draws itself as you
 *  scroll while the groom on his ghodi travels along it; fireworks greet him on arrival. Below, the
 *  procession dances past — play the dhol, tap the sky for fireworks, or drag the baraat. */
export function Baraat() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const pro = useRef<HTMLDivElement>(null);
  const fw = useRef<FireHandle>(null);
  const [inView, setInView] = useState(false);
  const [beats, setBeats] = useState(0);
  const [tall, setTall] = useState<boolean | null>(null);
  const [arrived, setArrived] = useState(false);
  const walk = useRef<gsap.core.Tween | null>(null);
  const stars = useRef(Array.from({ length: 46 }, (_, i) => ({ l: `${(i * 37) % 100}%`, t: `${(i * 23) % 50}%`, s: 1 + (i % 3), d: `${(i % 7) * 0.6}s` }))).current;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 700px)");
    const set = () => setTall(mq.matches);
    set(); mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  const L = tall ? TALL : WIDE;

  // Route map: road draws + groom travels with scroll
  useGSAP(() => {
    if (tall === null) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { gsap.set(".bm-road", { strokeDashoffset: 0 }); setArrived(true); return; }
    let fired = false;
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: ".bm", start: "top 72%", end: "bottom 45%", scrub: 0.9,
        onUpdate: self => {
          const done = self.progress > 0.97;
          setArrived(done);
          if (done && !fired) {
            fired = true;
            const box = root.current!.querySelector<HTMLElement>(".bx-stage")!.getBoundingClientRect();
            const end = root.current!.querySelector<HTMLElement>(".bm-pin.end")!.getBoundingClientRect();
            const x = end.left - box.left + end.width / 2, y = end.top - box.top;
            [0, 0.25, 0.5].forEach((d, i) => gsap.delayedCall(d, () => fw.current?.burst(x + (i - 1) * 50, y - 30 - i * 20, true)));
          }
          if (self.progress < 0.9) fired = false;
        },
      },
    });
    tl.fromTo(".bm-road", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1 }, 0)
      .to(".bm-token", { duration: 1, motionPath: { path: ".bm-path", align: ".bm-path", alignOrigin: [0.5, 0.5] } }, 0)
      .fromTo(".bm-mid", { scale: 0 }, { scale: 1, duration: 0.08, stagger: 0.32, ease: "back.out(3)" }, 0.25)
      .fromTo(".bm-card.end", { opacity: 0.35, y: 10 }, { opacity: 1, y: 0, duration: 0.15 }, 0.85);
    gsap.to(".bm-token-in", { y: -4, rotate: 3, duration: 0.35, yoyo: true, repeat: -1, ease: "sine.inOut" });
    gsap.from(".bm", { y: 60, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ".bm", start: "top 88%" } });
  }, { scope: root, dependencies: [tall], revertOnUpdate: true });

  // Marching procession: auto-walk, dance steps, drag
  useGSAP((_ctx, contextSafe) => {
    ScrollTrigger.create({ trigger: root.current, start: "top 75%", end: "bottom 25%", onToggle: s => setInView(s.isActive) });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = pro.current!, tr = track.current!;
    const startWalk = contextSafe!((fromX?: number) => {
      walk.current?.kill();
      const W = tr.offsetWidth, P = el.offsetWidth;
      const from = fromX ?? W;
      walk.current = gsap.fromTo(el, { x: from }, { x: -P, ease: "none", duration: (from + P) / 70, onComplete: () => startWalk() });
    });
    gsap.to(".bx-dance", { y: -5, duration: 0.32, yoyo: true, repeat: -1, ease: "sine.inOut" });
    const st = ScrollTrigger.create({ trigger: tr, start: "top 95%", once: true, onEnter: () => startWalk(tr.offsetWidth * 0.5) });
    const drag = Draggable.create(el, {
      type: "x", cursor: "grab", activeCursor: "grabbing",
      onPress: () => walk.current?.pause(),
      onRelease: () => startWalk(gsap.getProperty(el, "x") as number),
    })[0];
    return () => { drag.kill(); st.kill(); walk.current?.kill(); };
  }, { scope: root });

  const playDhol = () => {
    dhol();
    setBeats(b => b + 1);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    walk.current?.timeScale(2.2);
    gsap.delayedCall(1.4, () => walk.current?.timeScale(1));
    const j = pro.current!.querySelector(".bx-jump");
    gsap.timeline().to(j, { y: -34, duration: 0.18, ease: "power2.out" }).to(j, { y: 0, duration: 0.5, ease: "bounce.out" })
      .to(j, { y: -22, duration: 0.15, ease: "power2.out" }, 0.6).to(j, { y: 0, duration: 0.45, ease: "bounce.out" });
    gsap.fromTo(".bx-dhol-btn", { scale: 0.88 }, { scale: 1, duration: 0.6, ease: "elastic.out(1.2, 0.4)" });
    gsap.fromTo(".bm-token-in", { scale: 1.25 }, { scale: 1, duration: 0.6, ease: "elastic.out(1.2, 0.4)" });
    [0, 0.22, 0.6].forEach((d, i) => gsap.delayedCall(d, () => fw.current?.burst(undefined, undefined, i === 2)));
    burstPetals(24);
  };

  const skyTap = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button, a, .bm, .bx-pro")) return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    fw.current?.burst(e.clientX - r.left, e.clientY - r.top, true);
  };

  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(T.baraatMap)}`;
  const pos = (p: number[]) => ({ left: `${p[0]}%`, top: `${p[1]}%` });

  return (
    <section className="bx" id="baraat" ref={root}>
      <div className="bx-stage" onPointerDown={skyTap}>
        <div className="bx-sky" />
        <div className="bx-stars" aria-hidden="true">{stars.map((s, i) => <i key={i} style={{ left: s.l, top: s.t, width: s.s, height: s.s, animationDelay: s.d }} />)}</div>
        <div className="bx-moon" aria-hidden="true" />
        <Fireworks ref={fw} auto={inView} />
        <div className="bx-city" aria-hidden="true" />

        <div className="bx-head">
          <motion.span className="eyebrow" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: EASE }}>{T.baraatEyebrow}</motion.span>
          <SplitTitle className="title" text={T.baraatTitle} />
          <span className="bx-date"><Svg html={ui.cal} />{T.baraatTime}</span>
        </div>

        {tall !== null && (
          <div className={`bm${tall ? " tall" : ""}${arrived ? " arrived" : ""}`}>
            <svg className="bm-svg" viewBox={L.vb} preserveAspectRatio="none" aria-hidden="true">
              <path className="bm-path" d={L.d} />
              <path className="bm-base" d={L.d} />
              <path className="bm-road" d={L.d} pathLength={1} />
            </svg>
            {L.mids.map((m, i) => <span key={i} className="bm-mid" style={pos(m)} aria-hidden="true"><i /></span>)}

            <span className="bm-pin start" style={pos(L.start)} aria-hidden="true"><Svg html={HOME} /></span>
            <a className="bm-pin end" style={pos(L.end)} href={mapHref} target="_blank" rel="noopener" aria-label={`${T.baraatTo} — ${T.directions}`}><Svg html={MANDAP} /></a>

            <div className="bm-card start">
              <small>{T.ticketFrom}</small><b>{T.baraatFrom}</b><span>{T.baraatFromSub}</span>
            </div>
            <div className="bm-card end">
              <small>{T.ticketTo}</small><b>{T.baraatTo}</b><span>{T.baraatToSub}</span>
              <a className="btn light" href={mapHref} target="_blank" rel="noopener"><Svg html={ui.pin} />{T.directions}</a>
            </div>

            <div className="bm-token" aria-hidden="true">
              <span className="bm-token-in">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/img/groom-token.webp" alt="" />
              </span>
            </div>
          </div>
        )}

        <div className="bx-controls">
          <motion.button type="button" className="bx-dhol-btn" onClick={playDhol} whileTap={{ scale: 0.9 }} aria-label={T.dholBtn}>
            <span className="bx-dhol-ico" aria-hidden="true" />
            <span className="bx-dhol-txt">{T.dholBtn}</span>
            {beats > 0 && <span className="bx-beats" aria-hidden="true">× {beats}</span>}
          </motion.button>
          <span className="bx-hint">{T.baraatHint}</span>
        </div>

        <div className="bx-track" ref={track}>
          <div className="bx-road" />
          <div className="bx-pro" ref={pro}>
            <div className="bx-jump">
              <div className="bx-dance">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/img/baraat.webp" alt="बारात: बैंड-बाजा, ढोल, सजी घोड़ी पर दूल्हा और नाचते बाराती" draggable={false} onLoad={() => ScrollTrigger.refresh()} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const HOME = `<svg viewBox="0 0 24 24"><path d="M3.5 11 12 4l8.5 7M6 9.5V20h12V9.5M10 20v-5h4v5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const MANDAP = `<svg viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.5v2"/><path d="M4 9c2-4 14-4 16 0"/><path d="M3 9h18M5 9v11M19 9v11M9 9v11M15 9v11M2.5 20h19"/><path d="M10 16c0-2 4-2 4 0"/></g></svg>`;
