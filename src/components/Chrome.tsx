import { useState } from "react";
import { NAV_LINKS, TICKER_ITEMS } from "../data";
import { useScrollProgress } from "../hooks";
import { IconDropSolid, IconMenu, IconX, LogoMark } from "./Icons";

export function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="bg-blood-deep text-bone overflow-hidden" aria-label="Urgent blood requests">
      <div className="marquee-track flex w-max items-center gap-8 py-2 pr-8">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.18em] whitespace-nowrap">
            <span className={t.startsWith("URGENT") ? "text-bone" : "text-bone/70"}>
              {t.startsWith("URGENT") && <span className="mr-2 inline-block w-1.5 h-1.5 rounded-full bg-blood-bright align-middle blink" />}
              {t}
            </span>
            <IconDropSolid className="w-2.5 h-2.5 text-blood-bright/70 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function Header({ onBook }: { onBook: () => void }) {
  const [open, setOpen] = useState(false);
  const progress = useScrollProgress();

  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur-[2px] border-b border-ink/10">
      <div className="absolute top-0 left-0 h-[3px] bg-blood" style={{ width: `${progress * 100}%` }} aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-[68px] flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-3 group" aria-label="Mwajuma Blood Donation Initiative — home">
          <LogoMark className="w-9 h-9 transition-transform duration-500 group-hover:-rotate-6" />
          <span className="leading-none">
            <span className="block font-display text-xl tracking-wide text-ink">MWAJUMA</span>
            <span className="block font-mono text-[9px] tracking-[0.3em] text-blood uppercase mt-1">
              Blood Donation Initiative
            </span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="link-under font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft hover:text-ink transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:+255754000112"
            className="hidden md:flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-blood border border-blood/40 px-3.5 py-2.5 hover:bg-blood hover:text-bone transition-colors"
          >
            <span className="relative flex w-2 h-2">
              <span className="ping-dot relative inline-flex w-2 h-2 rounded-full bg-blood text-blood" />
            </span>
            24/7 Hotline
          </a>
          <button
            onClick={onBook}
            className="btn-sweep bg-blood text-bone font-mono text-[11px] uppercase tracking-[0.18em] px-5 py-2.5 hover:text-bone transition-colors"
          >
            Give blood
          </button>
          <button
            className="lg:hidden p-2 -mr-2 text-ink"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <IconX className="w-6 h-6" /> : <IconMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden fade-in border-t border-ink/10 bg-bone px-6 py-6" aria-label="Mobile">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl text-ink py-2 border-b border-ink/10 hover:text-blood hover:pl-2 transition-all"
                style={{ transitionDelay: `${i * 30}ms` }}
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                onBook();
              }}
              className="mt-4 bg-blood text-bone font-mono text-xs uppercase tracking-[0.2em] py-4"
            >
              Book a donation
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
