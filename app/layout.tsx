import type { Metadata, Viewport } from "next";
import { Amita, Cinzel, Cormorant_Garamond, Jost, Mukta, Pinyon_Script, Playfair_Display, Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500", "600"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });
const pinyon = Pinyon_Script({ subsets: ["latin"], weight: "400", variable: "--font-pinyon", display: "swap" });
const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-cinzel", display: "swap" });
const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-jost", display: "swap" });
// Hindi typefaces: each Latin font falls back to these for Devanagari letters
const tiro = Tiro_Devanagari_Hindi({ subsets: ["devanagari", "latin"], weight: "400", style: ["normal", "italic"], variable: "--font-tiro", display: "swap" });
const amita = Amita({ subsets: ["devanagari", "latin"], weight: ["400", "700"], variable: "--font-amita", display: "swap" });
const mukta = Mukta({ subsets: ["devanagari", "latin"], weight: ["300", "400", "500", "600"], variable: "--font-mukta", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], variable: "--font-playfair", display: "swap" });

// Set this to your live address (e.g. https://ravisaumya.in) so WhatsApp shows the preview image.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vikram-sakshi.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "विक्रम संग साक्षी · शुभविवाह · 24-11-2026",
  description: "चि. विक्रम दुबे संग आयु. कु. साक्षी मिश्रा का पाणिग्रहण संस्कार · मंगलवार दि. 24-11-2026 · नालासोपारा (पूर्व)",
  icons: { icon: [{ url: "/icon-vs.svg", type: "image/svg+xml" }, { url: "/icon-vs-64.png", sizes: "64x64", type: "image/png" }], apple: "/apple-touch-icon.png" },
  openGraph: {
    type: "website",
    title: "विक्रम संग साक्षी · शुभविवाह",
    description: "मंगलवार दि. 24-11-2026 · नव दुर्गा ग्राउण्ड, नालासोपारा (पूर्व) · आप सपरिवार सादर आमंत्रित हैं",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#0F1640", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fonts = [cormorant, pinyon, cinzel, jost, playfair, tiro, amita, mukta].map(f => f.variable).join(" ");
  return (
    <html lang="hi" className={fonts}>
      <body className="is-sealed">{children}</body>
    </html>
  );
}
