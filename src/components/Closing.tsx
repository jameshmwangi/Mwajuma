import { useState } from "react";
import { FAQS } from "../data";
import { cx, useInView } from "../hooks";
import {
  IconArrow,
  IconCheck,
  IconDropSolid,
  IconFacebook,
  IconInsta,
  IconPhone,
  IconPin,
  IconWhatsapp,
  LogoMark,
} from "./Icons";

function FaqItem({ q, a, open, onToggle, index }: { q: string; a: string; open: boolean; onToggle: () => void; index: number }) {
  return (
    <div className="border-b-2 border-ink/12">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-6 py-6 text-left group"
      >
        <span className="flex items-baseline gap-4">
          <span className="font-mono text-[11px] text-blood tabular-nums shrink-0">{String(index + 1).padStart(2, "0")}</span>
          <span className={cx("font-display text-xl md:text-2xl uppercase leading-snug transition-colors", open ? "text-blood" : "text-ink group-hover:text-blood-deep")}>
            {q}
          </span>
        </span>
        <span className={cx("shrink-0 w-9 h-9 border flex items-center justify-center transition-all duration-300", open ? "bg-blood border-blood text-bone rotate-45" : "border-ink/25 text-ink group-hover:border-blood group-hover:text-blood")}>
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" aria-hidden="true">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div className={cx("acc-body", open && "open")}>
        <div>
          <p className="pb-7 pl-[44px] pr-4 text-ink-soft leading-relaxed max-w-2xl">{a}</p>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  const [openIdx, setOpenIdx] = useState<number>(0);
  const [ref, inView] = useInView<HTMLDivElement>(0.15);
  return (
    <section id="faq" className="relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div ref={ref} className="lg:sticky lg:top-28">
              <p className={cx("flex items-center gap-3 mb-5 reveal", inView && "is-in")}>
                <span className="h-px w-10 bg-blood" aria-hidden="true" />
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-blood-deep">Questions, answered</span>
              </p>
              <h2 className={cx("font-display uppercase text-ink leading-[0.95] text-5xl md:text-6xl reveal", inView && "is-in")} style={{ transitionDelay: "80ms" }}>
                Asked in the<br /><span className="text-blood">donor chair.</span>
              </h2>
              <p className={cx("mt-6 text-lg text-ink-soft leading-relaxed max-w-md reveal", inView && "is-in")} style={{ transitionDelay: "160ms" }}>
                Seven questions our nurses hear every single day — answered the way they answer them: plainly,
                kindly, and without rushing you.
              </p>
              <div className={cx("mt-9 bg-ink text-bone p-6 reveal", inView && "is-in")} style={{ transitionDelay: "240ms" }}>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone/50">Still unsure? Talk to a human</p>
                <div className="mt-4 flex flex-col gap-3">
                  <a href="tel:+255754000112" className="flex items-center gap-3 text-bone hover:text-blood-bright transition-colors">
                    <IconPhone className="w-4 h-4 text-blood-bright" />
                    <span className="font-mono text-sm tracking-wide">+255 754 000 112 · 24/7</span>
                  </a>
                  <a href="https://wa.me/255754000112" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-bone hover:text-blood-bright transition-colors">
                    <IconWhatsapp className="w-4 h-4 text-blood-bright" />
                    <span className="font-mono text-sm tracking-wide">WhatsApp the duty nurse</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="border-t-2 border-ink/12">
              {FAQS.map((f, i) => (
                <FaqItem
                  key={f.q}
                  q={f.q}
                  a={f.a}
                  index={i}
                  open={openIdx === i}
                  onToggle={() => setOpenIdx((v) => (v === i ? -1 : i))}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CtaBand({ onDonate, onRequest }: { onDonate: () => void; onRequest: () => void }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.25);
  return (
    <section className="relative bg-blood text-bone overflow-hidden">
      <div className="absolute inset-0 halftone opacity-30 [mask-image:linear-gradient(to_right,black,transparent_70%)]" aria-hidden="true" />
      <IconDropSolid className="absolute w-14 h-14 text-bone/10 left-[8%] top-10 drift" />
      <IconDropSolid className="absolute w-8 h-8 text-bone/10 right-[16%] top-1/2 drift" />
      <IconDropSolid className="absolute w-20 h-20 text-bone/10 right-[6%] -bottom-4 drift" />
      <div ref={ref} className="relative max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <div className={cx(inView && "lines-in")}>
          <h2 className="font-display uppercase leading-[0.93] text-[13vw] sm:text-7xl lg:text-8xl xl:text-[104px]">
            <span className="line-mask"><span>Your arm.</span></span>
            <span className="line-mask"><span className="text-ink">Someone's tomorrow.</span></span>
          </h2>
        </div>
        <div className={cx("mt-10 flex flex-wrap items-center gap-4 reveal", inView && "is-in")} style={{ transitionDelay: "200ms" }}>
          <button
            onClick={onDonate}
            className="btn-sweep bg-bone text-blood font-mono text-xs uppercase tracking-[0.2em] px-8 py-4 hover:text-bone inline-flex items-center gap-3"
            style={{ ["--color-ink" as string]: "var(--color-blood-deep)" }}
          >
            Book a donation <IconArrow className="w-4 h-4" />
          </button>
          <button
            onClick={onRequest}
            className="border-2 border-bone/70 text-bone font-mono text-xs uppercase tracking-[0.2em] px-8 py-4 hover:bg-bone hover:text-blood transition-colors"
          >
            Request blood for a patient
          </button>
          <p className="basis-full sm:basis-auto font-mono text-[10px] uppercase tracking-[0.18em] text-bone/60 sm:ml-4">
            Average wait from booking to chair: 2 days
          </p>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [err, setErr] = useState(false);

  const join = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErr(true);
      return;
    }
    setErr(false);
    setJoined(true);
  };

  return (
    <footer className="bg-ink text-bone relative overflow-hidden">
      <div className="absolute inset-0 dotgrid-dark opacity-30" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-16 md:pt-20 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <a href="#top" className="flex items-center gap-3">
              <LogoMark className="w-10 h-10" />
              <span className="leading-none">
                <span className="block font-display text-2xl tracking-wide">MWAJUMA</span>
                <span className="block font-mono text-[9px] tracking-[0.3em] text-blood-bright uppercase mt-1">Blood Donation Initiative</span>
              </span>
            </a>
            <p className="mt-6 text-bone/55 leading-relaxed max-w-sm text-sm">
              A registered Tanzanian NGO keeping 38 hospital blood banks stocked through volunteer donors, community
              drives and a 24/7 emergency dispatch line. No one pays for blood. No one profits from it.
            </p>
            <div className="mt-7 flex gap-3">
              {[
                { label: "Instagram", Icon: IconInsta, href: "https://instagram.com" },
                { label: "Facebook", Icon: IconFacebook, href: "https://facebook.com" },
                { label: "WhatsApp", Icon: IconWhatsapp, href: "https://wa.me/255754000112" },
              ].map(({ label, Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-10 h-10 border border-bone/25 flex items-center justify-center text-bone/70 hover:bg-blood hover:border-blood hover:text-bone transition-colors"
                >
                  <Icon className="w-[18px] h-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone/40">Explore</p>
            <ul className="mt-5 space-y-3">
              {[
                ["Supply board", "#board"],
                ["How it works", "#process"],
                ["Compatibility", "#compatibility"],
                ["Drives", "#drives"],
                ["Donor stories", "#stories"],
                ["FAQ", "#faq"],
              ].map(([l, h]) => (
                <li key={h}>
                  <a href={h} className="link-under text-sm text-bone/70 hover:text-bone">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone/40">Find us</p>
            <ul className="mt-5 space-y-4 text-sm text-bone/70">
              <li className="flex gap-2.5">
                <IconPin className="w-4 h-4 text-blood-bright shrink-0 mt-0.5" />
                <span>Mwajuma House, Swahili Street,<br />Kariakoo, Dar es Salaam</span>
              </li>
              <li className="flex gap-2.5">
                <IconPhone className="w-4 h-4 text-blood-bright shrink-0 mt-0.5" />
                <a href="tel:+255754000112" className="link-under">+255 754 000 112 · emergency 24/7</a>
              </li>
              <li className="font-mono text-xs text-bone/45">Mon–Sat 08:00–19:00 · Sunday by appointment</li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone/40">The Friday Pulse</p>
            <p className="mt-5 text-sm text-bone/55 leading-relaxed">
              One SMS a week: which groups are blinking red, which drive needs you, one donor story. No noise.
            </p>
            {joined ? (
              <p className="check-pop mt-5 flex items-center gap-2.5 bg-life/20 border border-life/50 px-4 py-3.5 font-mono text-xs uppercase tracking-[0.14em] text-[#8fd4c3]">
                <IconCheck className="w-4 h-4" /> Asante — you're on the list
              </p>
            ) : (
              <form onSubmit={join} className="mt-5">
                <div className={cx("flex border", err ? "border-blood-bright" : "border-bone/25")}>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErr(false);
                    }}
                    placeholder="you@example.co.tz"
                    aria-label="Email address"
                    className="flex-1 min-w-0 bg-transparent px-4 py-3.5 font-mono text-sm text-bone placeholder:text-bone/30 focus:outline-none"
                  />
                  <button type="submit" className="bg-blood text-bone px-5 font-mono text-[11px] uppercase tracking-[0.16em] hover:bg-blood-deep transition-colors">
                    Join
                  </button>
                </div>
                {err && <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-blood-bright">Enter a valid email address</p>}
              </form>
            )}
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-bone/12 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-bone/35">
          <p>© 2026 Mwajuma Blood Donation Initiative · NGO Reg. 00NGO/2014/0231</p>
          <p className="flex items-center gap-2">
            <IconDropSolid className="w-3 h-3 text-blood-bright" /> Damu ni uhai — blood is life
          </p>
        </div>
      </div>
    </footer>
  );
}
