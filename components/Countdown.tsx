"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { WEDDING } from "@/lib/content";
import { Reveal } from "./Reveal";
import { SplitTitle } from "./SplitTitle";

const T = WEDDING.text;
const target = new Date(WEDDING.config.countdownTo).getTime();

function parts(): number[] | null {
  const diff = Math.max(0, target - Date.now());
  if (!diff) return null;
  return [Math.floor(diff / 864e5), Math.floor(diff / 36e5) % 24, Math.floor(diff / 6e4) % 60, Math.floor(diff / 1e3) % 60];
}

/** One split-flap digit: the old top half folds down while the new bottom half unfolds. */
function Flap({ d }: { d: string }) {
  const [shown, setShown] = useState(d);   // static top half
  const [under, setUnder] = useState(d);   // static bottom half
  const [prev, setPrev] = useState(d);
  const topFlap = useRef<HTMLSpanElement>(null);
  const botFlap = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (d === shown) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPrev(shown);
    setShown(d);
    if (reduce) { setUnder(d); return; }
    const tl = gsap.timeline({ onComplete: () => setUnder(d) });
    tl.fromTo(topFlap.current, { rotateX: 0, opacity: 1 }, { rotateX: -90, duration: 0.28, ease: "power2.in" })
      .set(topFlap.current, { opacity: 0 })
      .fromTo(botFlap.current, { rotateX: 90, opacity: 1 }, { rotateX: 0, duration: 0.32, ease: "bounce.out" })
      .set(botFlap.current, { opacity: 0 });
    return () => { tl.kill(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [d]);

  return (
    <span className="fl">
      <span className="fl-half fl-top"><span>{shown}</span></span>
      <span className="fl-half fl-bot"><span>{under}</span></span>
      <span className="fl-half fl-top fl-flap" ref={topFlap} style={{ opacity: 0 }}><span>{prev}</span></span>
      <span className="fl-half fl-bot fl-flap" ref={botFlap} style={{ opacity: 0 }}><span>{shown}</span></span>
      <span className="fl-hinge" />
    </span>
  );
}

const MAX = [60, 24, 60, 60];

/** Four floating glass cards with big split-flap digits, a gold progress bar each,
 *  a soft glow on every tick, all over the darkened Ganga painting. */
export function Countdown() {
  const [v, setV] = useState<number[] | null | undefined>(undefined);
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    setV(parts());
    const id = setInterval(() => setV(parts()), 1000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = root.current?.querySelector(".fx-card.sec");
    if (el) gsap.fromTo(el, { "--glow": 1 }, { "--glow": 0, duration: 0.9, ease: "power2.out" });
  }, [v]);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = gsap.to(".fx-card", { y: -8, duration: 2.6, yoyo: true, repeat: -1, ease: "sine.inOut", stagger: { each: 0.5 } });
    const h = gsap.to(".fx-halo", { rotate: 360, duration: 80, repeat: -1, ease: "none" });
    return () => { t.kill(); h.kill(); };
  }, []);

  return (
    <section className="section flipcd" ref={root}>
      <div className="flipcd-bg" aria-hidden="true" />
      <div className="fx-halo" aria-hidden="true" />
      <div className="fx-dust" aria-hidden="true">{Array.from({ length: 18 }, (_, i) => <i key={i} style={{ left: `${(i * 53) % 100}%`, animationDelay: `${(i % 9) * 0.9}s`, animationDuration: `${9 + (i % 5) * 2}s` }} />)}</div>
      <Reveal className="head">
        <span className="eyebrow">{T.countdownEyebrow}</span>
        <SplitTitle className="title" text={T.countdownTitle} />
      </Reveal>
      {v === null ? (
        <div className="cd-done">{T.countdownDone}</div>
      ) : (
        <div className="fx-grid" role="timer" aria-label={v ? `${v[0]} ${T.units[0]} ${v[1]} ${T.units[1]} ${v[2]} ${T.units[2]}` : undefined}>
          {T.units.map((u, i) => {
            const val = v ? v[i] : 0;
            return (
              <motion.div className="fx-wrap" key={u}
                initial={{ opacity: 0, rotateY: -70, y: 50 }} whileInView={{ opacity: 1, rotateY: 0, y: 0 }}
                viewport={{ once: true, amount: 0.4 }} transition={{ duration: 1.2, ease: [0.2, 0.75, 0.2, 1], delay: i * 0.14 }}>
              <div className={`fx-card${i === 3 ? " sec" : ""}`}>
                <span className="fx-corner tl" /><span className="fx-corner br" />
                <div className="fc-digits" aria-hidden="true">
                  {String(val).padStart(2, "0").split("").map((ch, k) => <Flap key={k} d={ch} />)}
                </div>
                <span className="fc-label">{u}</span>
                <span className="fx-bar"><motion.i animate={{ scaleX: Math.min(1, val / MAX[i]) }} transition={{ duration: 0.8, ease: "easeOut" }} /></span>
              </div>
              </motion.div>
            );
          })}
        </div>
      )}
      <Reveal as="p" className="fc-sub" delay={0.3}>{T.countdownSub}</Reveal>
    </section>
  );
}
