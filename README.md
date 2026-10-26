# विक्रम संग साक्षी — शुभविवाह निमंत्रण (Next.js)

Wedding invitation website for चि. विक्रम दुबे and आयु. कु. साक्षी मिश्रा, built on the same Next.js + GSAP + Framer Motion + Lenis base as Ravi & Priyanka, with its own UP look:

- **Opening:** a lotus blooms on the night-time Ganga with floating diyas and reveals Shri Ganesh
- **Hero:** painted sunrise over Lucknow's Rumi Darwaza and the Banaras ghats, names on the side, round gold date badge
- **Sections:** welcome with the painted couple in a Lucknowi cusped arch, gold countdown rings, invitation card (PDF page 1), tilak card (PDF page 3), pinned baraat procession, stacked ceremony cards (PDF page 2), venues, family in three columns, closing
- **Colours:** Banarasi royal blue, gold and rose

All Hindi text is in `lib/content.ts`, copied as-is from the printed card. Labels marked `// UI` are short button and section names that are not on the card.

## Edit
- Text, dates, names, phones: `lib/content.ts`
- Baraat time (blank on the card): set `baraatHour` in `lib/content.ts`
- Music: put a file in `public/` and set `config.music`
- Artwork: `public/img/` (painted images generated for this site; line art from the card)

## Run and build
```bash
npm install
npm run dev
npm run build   # writes the static site to out/
```
Add `?open` to skip the lotus while editing, and `?to=शर्मा परिवार` for a personal greeting.

Older attempts are kept in `old-static/` and `old-modern/` (not part of the build).
