"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { WEDDING } from "@/lib/content";

const { text: T, couple: C } = WEDDING;
const TASSELS = 15;

/** Ghunghat: a sheer red bridal chunari with gold zari borders covers the screen, the sunrise
 *  glowing faintly through it. Tapping lifts the veil — it curls up from the hem and floats away. */
export function Intro({ guest, autoOpen, onTap, onOpen, onDone }: { guest: string; autoOpen: boolean; onTap?: () => void; onOpen: () => void; onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const busy = useRef(false);

  const { contextSafe } = useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.from(".vl-cloth", { yPercent: -100, duration: 1.6, ease: "power3.out", delay: 2.1 });
    gsap.from(".vl-in > *", { y: 22, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out", delay: 2.8 });
    // the chunari breathes and sways a little; tassels swing out of step
    gsap.to(".vl-cloth", { skewX: 0.8, scaleY: 1.008, duration: 3.2, yoyo: true, repeat: -1, ease: "sine.inOut", transformOrigin: "50% 0%" });
    gsap.to(".vl-tassel", { rotate: (i: number) => (i % 2 ? 7 : -7), duration: (i: number) => 1.6 + (i % 4) * 0.25, yoyo: true, repeat: -1, ease: "sine.inOut" });
    gsap.fromTo(".vl-shine", { xPercent: -120 }, { xPercent: 220, duration: 3.2, repeat: -1, repeatDelay: 1.8, ease: "power2.inOut", delay: 3.4 });
  }, { scope: root });

  const open = contextSafe(() => {
    if (busy.current) return;
    busy.current = true;
    onTap?.();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onOpen(); gsap.to(root.current, { opacity: 0, duration: 0.3, onComplete: onDone }); return;
    }
    gsap.killTweensOf(".vl-cloth");
    const tl = gsap.timeline({ onComplete: onDone });
    tl.to(".vl-in > *", { opacity: 0, y: -14, duration: 0.45, stagger: 0.04, ease: "power2.in" })
      // the hem curls up first, then the whole chunari lifts and floats off the top
      .to(".vl-cloth", { borderBottomLeftRadius: "50% 30%", borderBottomRightRadius: "50% 30%", skewX: -4, duration: 0.7, ease: "power2.inOut" }, 0.15)
      .to(".vl-tassel", { rotate: (i: number) => (i < TASSELS / 2 ? 30 : -30), duration: 0.6, ease: "power2.out" }, 0.15)
      .to(".vl-cloth", { yPercent: -112, skewX: 6, rotate: -2, duration: 1.4, ease: "power3.in" }, 0.6)
      .to(".vl-glow", { opacity: 0, duration: 1.2 }, 0.8)
      .add(onOpen, 1.1)
      .to(root.current, { opacity: 0, duration: 0.35 }, 1.85);
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (autoOpen) { busy.current = true; onOpen(); onDone(); } }, [autoOpen]);

  return (
    <div className="vl" ref={root} onClick={open}>
      <div className="vl-glow" aria-hidden="true" />
      <div className="vl-cloth">
        <span className="vl-buti" aria-hidden="true" />
        <span className="vl-shine" aria-hidden="true" />
        <span className="vl-zari side l" aria-hidden="true" /><span className="vl-zari side r" aria-hidden="true" />
        <span className="vl-zari hem" aria-hidden="true" />
        <div className="vl-tassels" aria-hidden="true">
          {Array.from({ length: TASSELS }, (_, i) => <i key={i} className="vl-tassel" />)}
        </div>

        <div className="vl-in">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="vl-ganesh" src="/img/ganesh.webp" alt="" />
          <p className="vl-bless">{T.blessing}</p>
          <span className="vl-sv" aria-hidden="true" />
          <p className="vl-names">{C.groomPrefix} {C.groomFull}<i>{C.withWord}</i>{C.bridePrefix} {C.brideFull}</p>
          <p className="vl-date">{T.heroDate.weekday} · {T.countdownSub.replace("मंगलवार ", "")}</p>
          <span className="vl-rule" aria-hidden="true" />
          <p className="vl-for">{T.envelopeFor}</p>
          <p className="vl-guest">{guest || T.guestDefault}</p>
          <button type="button" className="vl-btn" onClick={e => { e.stopPropagation(); open(); }}>{T.tapToOpen}</button>
        </div>
      </div>
    </div>
  );
}
