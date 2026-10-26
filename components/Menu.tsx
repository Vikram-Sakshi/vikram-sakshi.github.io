"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { WEDDING } from "@/lib/content";
import { ui } from "@/lib/art";
import { Svg } from "./Svg";
import { scrollToId, useLenis } from "./SmoothScroll";

const { text: T, couple: C } = WEDDING;
const N = T.nav;
const LINKS = [["top", N.home], ["welcome", N.invitation], ["tilak", N.tilak], ["baraat", N.baraat], ["celebrations", N.celebrations], ["family", N.family]] as const;
const EASE = [0.76, 0, 0.24, 1] as const;

/** Monogram chip + round menu button; the menu opens as a full-screen night-blue sheet. */
export function Menu({ opened }: { opened: boolean }) {
  const lenis = useLenis();
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop(); else if (opened) lenis.start();
  }, [open, opened, lenis]);
  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    addEventListener("keydown", esc);
    return () => removeEventListener("keydown", esc);
  }, []);

  const go = (id: string) => { setOpen(false); setTimeout(() => scrollToId(lenis, id), 450); };

  return (
    <>
      {opened && <motion.div className="scroll-progress" style={{ scaleX: progress }} />}
      <AnimatePresence>
        {opened && (
          <motion.div className="mn-bar" initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -80, opacity: 0 }}
            transition={{ delay: 1.8, duration: 0.9, ease: [0.2, 0.75, 0.2, 1] }}>
            <button type="button" className="mn-mono" onClick={() => scrollToId(lenis, "top")} aria-label="ऊपर जाएँ">
              {C.monogram[0]}<i>✦</i>{C.monogram[1]}
            </button>
            <button type="button" className={`mn-btn${open ? " x" : ""}`} onClick={() => setOpen(o => !o)} aria-expanded={open} aria-label="मेन्यू">
              <span /><span /><span />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div className="mn-sheet" role="dialog" aria-label="मेन्यू"
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 40px)" }} animate={{ clipPath: "circle(150% at calc(100% - 44px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 40px)" }} transition={{ duration: 0.9, ease: EASE }}>
            <div className="mn-art" aria-hidden="true" />
            <nav className="mn-links">
              {LINKS.map(([id, label], i) => (
                <motion.button key={id} type="button" onClick={() => go(id)}
                  initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.8, ease: [0.2, 0.75, 0.2, 1] }}>
                  <small>{String(i + 1).padStart(2, "0")}</small>{label}
                </motion.button>
              ))}
            </nav>
            <motion.div className="mn-foot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
              <p>{C.groomPrefix} {C.groomFull} <b>{C.withWord}</b> {C.bridePrefix} {C.brideFull}</p>
              <div className="mn-calls">
                {WEDDING.contacts.map(c => (
                  <a key={c.phone} className="btn light" href={`tel:+91${c.phone}`}><Svg html={ui.phone} />{c.name} · {c.phone}</a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
