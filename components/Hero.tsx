"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { WEDDING } from "@/lib/content";
import { scrollToId, useLenis } from "./SmoothScroll";

const { text: T, couple: C } = WEDDING;

/** Sunrise over Lucknow and Banaras. Names sit to one side on a soft silk veil,
 *  with a round gold date badge; the painting drifts with scroll and the mouse. */
export function Hero({ opened }: { opened: boolean }) {
  const root = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const d = T.heroDate;

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
      gsap.to(".hx-img", { yPercent: 12, ease: "none", scrollTrigger: st });
      gsap.to(".hx-copy", { yPercent: -18, opacity: 0, ease: "none", scrollTrigger: st });
      gsap.to(".hx-badge", { rotate: 30, ease: "none", scrollTrigger: st });
    });
    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const lx = gsap.quickTo(".hx-img", "x", { duration: 1.4, ease: "power3" });
      const onMove = (e: PointerEvent) => lx((e.clientX / innerWidth - 0.5) * -30);
      root.current!.addEventListener("pointermove", onMove);
      return () => root.current?.removeEventListener("pointermove", onMove);
    });
  }, { scope: root });

  useGSAP(() => {
    if (!opened) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { gsap.set(".hx-in, .hx-word i", { opacity: 1, yPercent: 0 }); return; }
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.fromTo(".hx-img", { scale: 1.18 }, { scale: 1.04, duration: 6, ease: "power2.out" }, 0)
      .fromTo(".hx-veil", { opacity: 0 }, { opacity: 1, duration: 1.6 }, 0.3)
      .fromTo(".hx-in", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.12 }, 0.6)
      .fromTo(".hx-word i", { yPercent: 115 }, { yPercent: 0, duration: 1.5, stagger: 0.18 }, 0.9)
      .fromTo(".hx-sang", { scale: 0, rotate: -40, opacity: 0 }, { scale: 1, rotate: 0, opacity: 1, duration: 1.2, ease: "back.out(2)" }, 1.2)
      .fromTo(".hx-rule", { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "power3.inOut" }, 1.3)
      .fromTo(".hx-badge", { scale: 0, rotate: -120 }, { scale: 1, rotate: 0, duration: 1.6, ease: "back.out(1.5)" }, 1.4);
    gsap.to(".hx-badge-ring", { rotate: 360, duration: 40, repeat: -1, ease: "none" });
  }, { scope: root, dependencies: [opened] });

  return (
    <section className="hx" id="top" ref={root}>
      <div className="hx-layer">
        <picture>
          <source media="(min-aspect-ratio: 1/1)" srcSet="/img/hero-wide.webp 2560w, /img/hero-wide-2x.webp 2688w" sizes="100vw" />
          <img className="hx-img" src="/img/hero-portrait.webp" srcSet="/img/hero-portrait.webp 1440w, /img/hero-portrait-2x.webp 1520w" sizes="100vw"
            alt="लखनऊ का रूमी दरवाज़ा और बनारस के घाट, भोर की रोशनी में" fetchPriority="high" />
        </picture>
      </div>
      <div className="hx-veil" />

      <div className="hx-copy">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="hx-ganesh hx-in" src="/img/ganesh.webp" alt="श्री गणेश" />
        <p className="hx-bless hx-in">{T.blessing}</p>
        <h1 className="hx-names" aria-label={`${C.groomPrefix} ${C.groomFull} ${C.withWord} ${C.bridePrefix} ${C.brideFull}`}>
          <span className="hx-pre hx-in" aria-hidden="true">{C.groomPrefix}</span>
          <span className="hx-word" aria-hidden="true"><i>{C.groom}</i></span>
          <span className="hx-sang" aria-hidden="true">{C.withWord}</span>
          <span className="hx-pre hx-in" aria-hidden="true">{C.bridePrefix}</span>
          <span className="hx-word" aria-hidden="true"><i>{C.bride}</i></span>
        </h1>
        <span className="hx-rule" />
        <p className="hx-sanskar hx-in">{T.sanskar}</p>
        <p className="hx-place hx-in">{T.venueName} · {T.heroPlace}</p>
        <div className="hx-badge" aria-label={`${d.weekday}, ${d.day} ${d.month} ${d.year}`}>
          <svg className="hx-badge-ring" viewBox="0 0 120 120" aria-hidden="true">
            <defs><path id="hxRing" d="M60 60 m-48 0 a48 48 0 1 1 96 0 a48 48 0 1 1 -96 0" /></defs>
            <text><textPath href="#hxRing" textLength="298" lengthAdjust="spacing">✦ शुभविवाह ✦ शुभविवाह ✦ शुभविवाह </textPath></text>
          </svg>
          <div className="hx-badge-in" aria-hidden="true">
            <small>{d.weekday}</small>
            <b>{d.day}</b>
            <small>{d.month} {d.year}</small>
          </div>
        </div>
        <div className="hx-cta hx-in">
          <button type="button" className="btn solid" onClick={() => scrollToId(lenis, "welcome")}>{T.scroll} <span aria-hidden="true">↓</span></button>
        </div>
      </div>

    </section>
  );
}
