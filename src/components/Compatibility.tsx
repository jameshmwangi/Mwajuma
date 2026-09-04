import { useState } from "react";
import { BLOOD_TYPES, COMPAT_FACTS, ELIGIBILITY, GIVES_TO, RECEIVES_FROM, type BloodType } from "../data";
import { cx, useInView } from "../hooks";
import { IconArrow, IconCheck, IconDrop, IconShield } from "./Icons";

export default function Compatibility({ onBook }: { onBook: () => void }) {
  const [selected, setSelected] = useState<BloodType>("A+");
  const [headRef, headIn] = useInView<HTMLDivElement>(0.2);
  const [gridRef, gridIn] = useInView<HTMLDivElement>(0.2);

  const gives = GIVES_TO[selected];
  const receives = RECEIVES_FROM[selected];

  return (
    <section id="compatibility" className="relative bg-paper-deep scroll-mt-20 overflow-hidden">
      <div className="absolute right-0 top-0 w-1/3 h-full halftone opacity-40 [mask-image:linear-gradient(to_left,black,transparent)]" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <div ref={headRef} className={cx(headIn && "lines-in")}>
          <p className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-blood" aria-hidden="true" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-blood-deep">Compatibility map</span>
          </p>
          <h2 className="font-display uppercase text-ink leading-[0.95] text-5xl md:text-6xl xl:text-7xl max-w-3xl">
            <span className="line-mask"><span>Tap your group.</span></span>
            <span className="line-mask"><span>See who you <span className="text-blood">save</span>.</span></span>
          </h2>
        </div>

        <div className="mt-14 grid lg:grid-cols-12 gap-10">
          <div ref={gridRef} className="lg:col-span-5">
            <div className="grid grid-cols-4 gap-2.5 md:gap-3" role="tablist" aria-label="Select blood group">
              {BLOOD_TYPES.map((t, i) => {
                const active = t === selected;
                return (
                  <button
                    key={t}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelected(t)}
                    className={cx(
                      "reveal aspect-square border-2 flex flex-col items-center justify-center gap-0.5 transition-all duration-300",
                      gridIn && "is-in",
                      active
                        ? "bg-blood border-blood text-bone shadow-[6px_6px_0_0_rgba(33,19,24,0.9)] -translate-y-0.5"
                        : "bg-bone border-ink/15 text-ink hover:border-blood hover:text-blood hover:-translate-y-0.5"
                    )}
                    style={{ transitionDelay: `${i * 45}ms` }}
                  >
                    <span className="font-display text-2xl md:text-3xl leading-none">{t}</span>
                    <span className={cx("font-mono text-[8px] uppercase tracking-[0.14em]", active ? "text-bone/70" : "text-ink-faint")}>
                      {t === "O−" ? "univ. donor" : t === "AB+" ? "univ. recipient" : "group"}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex items-start gap-3 bg-ink text-bone p-5">
              <IconDrop className="w-5 h-5 text-blood-bright shrink-0 mt-0.5" />
              <p className="text-sm leading-relaxed text-bone/85">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blood-bright block mb-1">Field note</span>
                {COMPAT_FACTS[selected]}
              </p>
            </div>

            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint leading-relaxed">
              Don't know your group? 1 in 3 of our donors learns it free at screening.{" "}
              <button onClick={onBook} className="text-blood underline underline-offset-4 hover:text-blood-deep">
                Book and find out →
              </button>
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-bone border border-ink/10 h-full flex flex-col" key={selected}>
              <div className="px-7 md:px-9 pt-8 pb-6 border-b border-ink/10 flex items-center gap-5">
                <span className="font-display text-6xl md:text-7xl text-blood leading-none">{selected}</span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-faint">Red-cell compatibility</p>
                  <p className="font-display text-xl md:text-2xl uppercase text-ink mt-1 leading-tight">
                    {gives.length === 8 ? "The universal donor" : receives.length === 8 ? "The universal recipient" : `${gives.length} groups need you`}
                  </p>
                </div>
              </div>

              <div className="p-7 md:p-9 flex-1 grid md:grid-cols-2 gap-8 fade-in">
                <div>
                  <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-blood-deep">
                    <IconArrow className="w-4 h-4 rotate-[-45deg]" /> Can donate red cells to
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {gives.map((g, i) => (
                      <span
                        key={g}
                        className="fade-in font-display text-xl bg-blood text-bone px-3.5 py-1.5 leading-none"
                        style={{ animationDelay: `${i * 60}ms` }}
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-ink-soft leading-relaxed">
                    {gives.length === 8
                      ? "Every single patient in every single ward. In emergencies, hospitals call O− first — always."
                      : `Your red cells are a match for ${gives.length} of the 8 groups on our hospital request lists.`}
                  </p>
                </div>
                <div>
                  <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-life">
                    <IconArrow className="w-4 h-4 rotate-[135deg]" /> Can receive from
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {receives.map((g, i) => (
                      <span
                        key={g}
                        className="fade-in font-display text-xl border-2 border-life text-life px-3.5 py-1.5 leading-none bg-life/5"
                        style={{ animationDelay: `${i * 60 + 120}ms` }}
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-ink-soft leading-relaxed">
                    {receives.length === 8
                      ? "You can accept a unit from any donor — but your own donations are rare, so give when you can."
                      : `In an emergency, the bank can clear ${receives.length} donor groups for you.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Eligibility />
      </div>
    </section>
  );
}

function Eligibility() {
  const [ref, inView] = useInView<HTMLDivElement>(0.15);
  return (
    <div ref={ref} className="mt-16 md:mt-20 border-t-2 border-ink/15 pt-12">
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <h3 className={cx("font-display uppercase text-3xl md:text-4xl text-ink leading-tight reveal", inView && "is-in")}>
            Can I give?<br />
            <span className="text-blood">The honest checklist.</span>
          </h3>
          <div className={cx("flex items-start gap-3 mt-6 reveal", inView && "is-in")} style={{ transitionDelay: "120ms" }}>
            <IconShield className="w-6 h-6 text-blood shrink-0" />
            <p className="text-sm text-ink-soft leading-relaxed">
              Every donation is screened by a licensed nurse — privately, free, and without judgement. If you tick most
              of these, come in; the nurse decides the rest on the spot.
            </p>
          </div>
        </div>
        <ul className="lg:col-span-8 grid sm:grid-cols-2 gap-x-10 gap-y-5">
          {ELIGIBILITY.map((item, i) => (
            <li
              key={item}
              className={cx("flex items-start gap-3.5 border-b border-ink/10 pb-4 reveal", inView && "is-in")}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <span className="w-5 h-5 bg-blood text-bone flex items-center justify-center shrink-0 mt-0.5">
                <IconCheck className="w-3 h-3" />
              </span>
              <span className="text-ink-soft leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
