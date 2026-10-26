"use client";

import { motion, type Variants } from "framer-motion";
import { WEDDING } from "@/lib/content";
import { ui } from "@/lib/art";
import { Svg } from "./Svg";
import { Magnetic } from "./Magnetic";
import { scrollToId, useLenis } from "./SmoothScroll";

const { text: T, couple: C, events: EVENTS, contacts: CONTACTS } = WEDDING;
const EASE = [0.2, 0.75, 0.2, 1] as const;
const N = WEDDING.text.nav;
const LINKS = [["invitation", N.invitation], ["tilak", N.tilak], ["baraat", N.baraat], ["celebrations", N.celebrations], ["family", N.family]] as const;

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const rise: Variants = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } } };

/** Rich closing footer: couple names, the three celebrations, contacts, quick links and a back-to-top button. */
export function Footer() {
  const lenis = useLenis();
  const d = T.heroDate;
  const go = (id: string) => (e: React.MouseEvent) => { e.preventDefault(); scrollToId(lenis, id); };

  return (
    <footer className="ft">
      <div className="ft-scallop" aria-hidden="true" />
      <motion.div className="ft-inner" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
        <motion.div className="ft-brand" variants={rise}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/ganesh.webp" alt="" className="ft-ganesh" loading="lazy" />
          <p className="ft-names">{C.groom} <b>{C.withWord}</b> {C.bride}</p>
          <div className="ft-date">
            <motion.span className="ln" variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.2, ease: EASE } } }} />
            <span>{d.day} · 11 · {d.year}</span>
            <motion.span className="ln" variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.2, ease: EASE } } }} />
          </div>
          <p className="ft-place">{T.heroPlace}</p>
        </motion.div>

        <div className="ft-cols">
          <motion.div className="ft-col" variants={rise}>
            <h4>{T.footerCols.events}</h4>
            <ul>
              {EVENTS.map(e => (
                <li key={e.id}><span className="k">{e.short}</span><span className="v">{e.name}</span></li>
              ))}
            </ul>
          </motion.div>
          <motion.div className="ft-col" variants={rise}>
            <h4>{T.footerCols.contact}</h4>
            <ul>
              {CONTACTS.map(c => (
                <li key={c.phone}>
                  <span className="k">{c.name}</span>
                  <a className="v" href={`tel:+91${c.phone}`}><Svg html={ui.phone} />+91 {c.phone.replace(/(\d{5})(\d{5})/, "$1 $2")}</a>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div className="ft-col" variants={rise}>
            <h4>{T.footerCols.explore}</h4>
            <ul className="ft-links">
              {LINKS.map(([id, label]) => <li key={id}><a href={`#${id}`} onClick={go(id)}>{label}</a></li>)}
            </ul>
          </motion.div>
        </div>
      </motion.div>

      <div className="ft-bottom">
        <p>{T.blessing} <i>✦</i> {T.welcomeSign}</p>
        <Magnetic>
          <motion.a href="#top" className="ft-top" aria-label="ऊपर जाएँ" onClick={go("top")} whileHover={{ y: -3 }} whileTap={{ scale: 0.92 }}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </motion.a>
        </Magnetic>
      </div>
    </footer>
  );
}
