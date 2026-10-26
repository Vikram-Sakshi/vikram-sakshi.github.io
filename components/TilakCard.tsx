"use client";

import { motion } from "framer-motion";
import { WEDDING } from "@/lib/content";
import { corner, divider, ui } from "@/lib/art";
import { Reveal } from "./Reveal";
import { SplitTitle } from "./SplitTitle";
import { Magnetic } from "./Magnetic";
import { Svg } from "./Svg";

const K = WEDDING.text.tilak;
const T = WEDDING.text;
const EASE = [0.2, 0.75, 0.2, 1] as const;
const VIEW = { once: true, amount: 0.3 } as const;

/** PDF page 3: the tilak ceremony, as a second card with its time and venue. */
export function TilakCard() {
  return (
    <section className="section invitation tilak-sec" id="tilak">
      <Reveal className="head">
        <span className="eyebrow">{K.eyebrow}</span>
        <SplitTitle className="title" text={K.title} />
      </Reveal>
      <Reveal variant="zoom" className="card">
        {["tl", "tr", "bl", "br"].map(c => <Svg key={c} className={`corner ${c}`} html={corner()} />)}
        <motion.img src="/img/florals.webp" className="flora a" alt="" loading="lazy"
          initial={{ opacity: 0, rotate: -25, scale: 0.7 }} whileInView={{ opacity: 1, rotate: 0, scale: 1 }} viewport={VIEW} transition={{ duration: 1.4, ease: EASE, delay: 0.2 }} />
        <motion.img src="/img/florals.webp" className="flora b" alt="" loading="lazy"
          initial={{ opacity: 0, rotate: 155, scale: 0.7 }} whileInView={{ opacity: 1, rotate: 180, scale: 1 }} viewport={VIEW} transition={{ duration: 1.4, ease: EASE, delay: 0.35 }} />
        <motion.img className="medal" src="/img/ganesh.webp" alt="" loading="lazy" style={{ x: "-50%", y: "-50%" }}
          initial={{ rotate: -120, scale: 0.4, opacity: 0 }} whileInView={{ rotate: 0, scale: 1, opacity: 1 }} viewport={VIEW} transition={{ type: "spring", stiffness: 70, damping: 14, delay: 0.2 }} />
        <div className="body">
          <p className="invocations"><span className="inv">{T.blessing}</span></p>
          <p className="shloka">{K.shloka}</p>
          <Svg html={divider()} />
          <p className="grace"><span className="salute">{K.salute}</span><br />{K.text}</p>
          <Reveal as="h2" className="who" variant="blur">{K.name}</Reveal>
          {K.lines.map(l => <p className="fam" key={l}>{l}</p>)}

          <div className="tk-info">
            <motion.div className="tk-box" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEW} transition={{ duration: 1, ease: EASE }}>
              <span className="eyebrow solo">{K.whenTitle}</span>
              {K.when.map(l => <p key={l}>{l}</p>)}
            </motion.div>
            <motion.div className="tk-box" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEW} transition={{ duration: 1, ease: EASE, delay: 0.15 }}>
              <span className="eyebrow solo">{K.whereTitle}</span>
              {K.where.map(l => <p key={l}>{l}</p>)}
              <Magnetic>
                <a className="btn" target="_blank" rel="noopener" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(K.map)}`}>
                  <Svg html={ui.pin} />{T.openMap}
                </a>
              </Magnetic>
            </motion.div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
