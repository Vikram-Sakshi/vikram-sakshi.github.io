"use client";

import { motion, type Variants } from "framer-motion";
import { WEDDING } from "@/lib/content";
import { divider, ui } from "@/lib/art";
import { Reveal } from "./Reveal";
import { SplitTitle } from "./SplitTitle";
import { Svg } from "./Svg";

const T = WEDDING.text;
const EASE = [0.2, 0.75, 0.2, 1] as const;
const col: Variants = { hidden: { opacity: 0, y: 60 }, show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE, staggerChildren: 0.06, delayChildren: 0.25 } } };
const item: Variants = { hidden: { opacity: 0, x: -14 }, show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } } };
const chip: Variants = { hidden: { opacity: 0, scale: 0.5 }, show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 260, damping: 16 } } };

/** The three family groups side by side, as on the printed card, each in a tall arched panel. */
export function Family() {
  return (
    <section className="section family3" id="family">
      <Reveal className="head">
        <span className="eyebrow">{T.familyEyebrow}</span>
        <SplitTitle className="title" text={T.familyTitle} />
        <Svg html={divider()} />
      </Reveal>
      <div className="f3-grid">
        {WEDDING.family.map((g, i) => (
          <motion.div key={g.title} className={`f3-col${i === 1 ? " mid" : ""}`} variants={col} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
            <span className="f3-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <motion.h3 variants={item}>✻ {g.title} ✻</motion.h3>
            {g.names.length > 0 && <ul>{g.names.map(n => <motion.li key={n} variants={item}>{n}</motion.li>)}</ul>}
            {g.extra.length > 0 && (
              <div className="f3-chips">
                {g.extra.join(", ").split(/,\s*/).map(n => <motion.span key={n} variants={chip}>{n}</motion.span>)}
              </div>
            )}
            {g.closing && <motion.p className="f3-close" variants={item}>{g.closing}</motion.p>}
            {g.sub && (
              <motion.a className="btn" variants={item} href={`tel:+91${g.sub.replace(/\D/g, "")}`}>
                <Svg html={ui.phone} />{g.sub}
              </motion.a>
            )}
          </motion.div>
        ))}
      </div>
      <motion.div className="f3-kids" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 1, ease: EASE }}>
        <span className="f3-nm" style={{ WebkitMaskImage: "url(/img/namaste.png)", maskImage: "url(/img/namaste.png)" }} aria-hidden="true" />
        <div>
          <span className="eyebrow solo">{T.mithiTitle}</span>
          <p className="t">{T.mithiText}</p>
          <p className="kids">{T.mithiNames}</p>
        </div>
        <span className="f3-nm flip" style={{ WebkitMaskImage: "url(/img/namaste.png)", maskImage: "url(/img/namaste.png)" }} aria-hidden="true" />
      </motion.div>
    </section>
  );
}
