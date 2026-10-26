"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { WEDDING } from "@/lib/content";

const { text: T, couple: C } = WEDDING;

/** A royal-blue, gold-foil invitation card standing over the blurred painting.
 *  It tilts in 3D with the pointer; tapping flips it over and it opens into the site. */
export function Intro({ guest, autoOpen, onTap, onOpen, onDone }: { guest: string; autoOpen: boolean; onTap?: () => void; onOpen: () => void; onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const busy = useRef(false);

  const { contextSafe } = useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    gsap.from(".ic-card", { y: 120, rotateX: 40, opacity: 0, duration: 1.8, ease: "expo.out", delay: 2.2 });
    gsap.from(".ic-front > *", { y: 18, opacity: 0, duration: 1, stagger: 0.09, ease: "power3.out", delay: 2.7 });
    gsap.fromTo(".ic-shine", { xPercent: -160 }, { xPercent: 160, duration: 2.6, ease: "power2.inOut", repeat: -1, repeatDelay: 2.2, delay: 3.4 });
    gsap.to(".ic-float", { y: -10, duration: 3, yoyo: true, repeat: -1, ease: "sine.inOut" });

    // 3D tilt following the pointer (or the phone's tilt)
    const rx = gsap.quickTo(".ic-tilt", "rotateX", { duration: 0.8, ease: "power3" });
    const ry = gsap.quickTo(".ic-tilt", "rotateY", { duration: 0.8, ease: "power3" });
    const onMove = (e: PointerEvent) => {
      if (busy.current) return;
      ry((e.clientX / innerWidth - 0.5) * 22);
      rx((e.clientY / innerHeight - 0.5) * -16);
    };
    const onTilt = (e: DeviceOrientationEvent) => {
      if (busy.current || e.gamma == null || e.beta == null) return;
      ry(Math.max(-18, Math.min(18, e.gamma * 0.6)));
      rx(Math.max(-14, Math.min(14, (e.beta - 45) * -0.4)));
    };
    addEventListener("pointermove", onMove);
    addEventListener("deviceorientation", onTilt);
    return () => { removeEventListener("pointermove", onMove); removeEventListener("deviceorientation", onTilt); };
  }, { scope: root });

  const open = contextSafe(() => {
    if (busy.current) return;
    busy.current = true;
    onTap?.();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onOpen(); gsap.to(root.current, { opacity: 0, duration: 0.3, onComplete: onDone }); return;
    }
    gsap.killTweensOf(".ic-float");
    const tl = gsap.timeline({ onComplete: onDone });
    tl.to(".ic-tilt", { rotateX: 0, rotateY: 0, duration: 0.3, ease: "power2.out" })
      .to(".ic-flip", { rotateY: 180, duration: 1.1, ease: "power3.inOut" })
      .fromTo(".ic-back-glow", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1.2, duration: 0.8, ease: "power2.out" }, "-=0.4")
      .add(onOpen, "+=0.2")
      .to(".ic-card", { scale: 7, opacity: 0, duration: 1.1, ease: "power3.in" }, "+=0.05")
      .to(".ic-bg", { opacity: 0, filter: "blur(0px)", duration: 1 }, "<0.2")
      .to(root.current, { opacity: 0, duration: 0.4 }, "-=0.3");
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (autoOpen) { busy.current = true; onOpen(); onDone(); } }, [autoOpen]);

  return (
    <div className="ic" ref={root} onClick={open}>
      <div className="ic-bg" aria-hidden="true" />
      <div className="ic-vignette" aria-hidden="true" />

      <div className="ic-card">
        <div className="ic-float">
          <div className="ic-tilt">
            <button type="button" className="ic-flip" aria-label={T.tapToOpen} onClick={e => { e.stopPropagation(); open(); }}>
              {/* front */}
              <span className="ic-face ic-front">
                <span className="ic-shine" aria-hidden="true" />
                <span className="ic-frame" aria-hidden="true" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="ic-ganesh" src="/img/ganesh.webp" alt="" />
                <span className="ic-bless">{T.blessing}</span>
                <span className="ic-sv" aria-hidden="true" />
                <span className="ic-names">{C.groom}<i>{C.withWord}</i>{C.bride}</span>
                <span className="ic-date">{T.heroDate.weekday} · {T.countdownSub.replace("मंगलवार ", "")}</span>
                <span className="ic-rule" aria-hidden="true" />
                <span className="ic-for">{T.envelopeFor}</span>
                <span className="ic-guest">{guest || T.guestDefault}</span>
                <span className="ic-cta">{T.tapToOpen} <b aria-hidden="true">→</b></span>
              </span>
              {/* back */}
              <span className="ic-face ic-back" aria-hidden="true">
                <span className="ic-back-glow" />
                <span className="ic-frame" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/img/ganesh.webp" alt="" />
                <span className="ic-back-t">{T.sanskar}</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
