"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { WEDDING, type WeddingEvent } from "@/lib/content";
import { divider, ui } from "@/lib/art";
import { downloadIcs, googleCalendarUrl } from "@/lib/ics";
import { Reveal } from "./Reveal";
import { SplitTitle } from "./SplitTitle";
import { Magnetic } from "./Magnetic";
import { Svg } from "./Svg";

const T = WEDDING.text;
const EASE = [0.2, 0.75, 0.2, 1] as const;

/** "Add to calendar" opens a small menu: Google Calendar or a file for Apple/Outlook. */
function CalendarMenu({ e }: { e: WeddingEvent }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (ev: PointerEvent) => { if (!ref.current?.contains(ev.target as Node)) setOpen(false); };
    const esc = (ev: KeyboardEvent) => { if (ev.key === "Escape") setOpen(false); };
    addEventListener("pointerdown", close); addEventListener("keydown", esc);
    return () => { removeEventListener("pointerdown", close); removeEventListener("keydown", esc); };
  }, [open]);

  return (
    <div className="cal-wrap" ref={ref}>
      <Magnetic>
        <motion.button className="btn" type="button" aria-expanded={open} aria-haspopup="menu" whileTap={{ scale: 0.95 }} onClick={() => setOpen(o => !o)}>
          <Svg html={ui.cal} />{T.addCalendar}
        </motion.button>
      </Magnetic>
      <AnimatePresence>
        {open && (
          <motion.div className="cal-menu" role="menu"
            initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.25, ease: EASE }}>
            <a role="menuitem" href={googleCalendarUrl(e)} target="_blank" rel="noopener" onClick={() => setOpen(false)}>Google Calendar</a>
            <button role="menuitem" type="button" onClick={() => { downloadIcs(e); setOpen(false); }}>Apple / Outlook</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const ART: Record<string, string> = { tilak: "kalash", haldi: "haldi", vivah: "phere", vidai: "doli" };

/** One ceremony as a full-width card; cards pin and stack on top of each other as you scroll. */
function StackCard({ e, i, n }: { e: WeddingEvent; i: number; n: number }) {
  const art = `url(/img/${ART[e.id] || "kalash"}.png)`;
  return (
    <article className={`sc sc-${i % 2 ? "b" : "a"}`} style={{ top: `calc(84px + ${i * 26}px)`, zIndex: i + 1 }}>
      <div className="sc-inner">
        <div className="sc-art" aria-hidden="true">
          <span className="sc-halo" />
          <span className="sc-motif" style={{ WebkitMaskImage: art, maskImage: art }} />
        </div>
        <div className="sc-txt">
          <span className="sc-num">{String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
          <span className="eyebrow solo">{e.day}</span>
          <h3>{e.name}</h3>
          <p className="sc-date">{e.date}</p>
          {e.note && <p className="note">{e.note}</p>}
          {(e.time || e.venue) && <ul className="meta">
            {e.time && <li><Svg html={ui.clock} />{e.time}</li>}
            {e.venue && <li><Svg html={ui.pin} />{e.venue}</li>}
          </ul>}
          <div className="actions">
            <CalendarMenu e={e} />
            {e.mapQuery && <Magnetic>
              <motion.a className="btn" whileTap={{ scale: 0.95 }} target="_blank" rel="noopener"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e.mapQuery)}`}>
                <Svg html={ui.pin} />{T.openMap}
              </motion.a>
            </Magnetic>}
          </div>
        </div>
      </div>
    </article>
  );
}

/** Pinned stack: earlier cards shrink and dim as the next one slides over them. */
function Stack() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(".sc");
      cards.forEach((c, i) => {
        gsap.from(c.querySelector(".sc-motif"), { scale: 0.5, rotate: -12, opacity: 0, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: c, start: "top 75%" } });
        gsap.from(c.querySelectorAll(".sc-txt > *"), { y: 30, opacity: 0, duration: 1, stagger: 0.07, ease: "expo.out", scrollTrigger: { trigger: c, start: "top 70%" } });
        if (i < cards.length - 1) {
          gsap.to(c.querySelector(".sc-inner"), {
            scale: 0.9, opacity: 0.5, ease: "none",
            scrollTrigger: { trigger: cards[i + 1], start: "top bottom", end: "top 20%", scrub: true },
          });
        }
      });
    });
  }, { scope: root });
  const n = WEDDING.events.length;
  return <div className="stack" ref={root}>{WEDDING.events.map((e, i) => <StackCard key={e.id} e={e} i={i} n={n} />)}</div>;
}

/** Wedding venue and family home from the card, as two arched cards. */
function Venues() {
  const card = (title: string, name: string, lines: string[], map: string, phone?: string) => (
    <motion.article className="venue" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.1, ease: EASE }}>
      <span className="eyebrow solo">{title}</span>
      {name && <h3>{name}</h3>}
      {lines.map(l => <p key={l}>{l}</p>)}
      <div className="actions">
        {phone && <a className="btn" href={`tel:+91${phone}`}><Svg html={ui.phone} />{T.call}</a>}
        <Magnetic>
          <a className="btn" target="_blank" rel="noopener" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(map)}`}>
            <Svg html={ui.pin} />{T.openMap}
          </a>
        </Magnetic>
      </div>
    </motion.article>
  );
  return (
    <div className="venues">
      {card(T.venueTitle, T.venueName, T.venueLines, T.baraatMap)}
      {card(T.homeTitle, "", T.homeLines, T.homeMap, "7977274663")}
    </div>
  );
}

export function Events() {
  return (
    <section className="section events" id="celebrations">
      <Reveal className="head">
        <span className="eyebrow">{T.eventsEyebrow}</span>
        <SplitTitle className="title" text={T.eventsTitle} />
        <p className="doha">{T.eventsDoha}</p>
        {T.eventsDohaMeaning && <p className="lead small-meaning">{T.eventsDohaMeaning}</p>}
        <Svg html={divider()} />
      </Reveal>
      <Stack />
      <Venues />
    </section>
  );
}
