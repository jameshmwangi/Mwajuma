import { STATS, STEPS } from "../data";
import { cx, useCountUp, useInView } from "../hooks";
import { IconArrow, IconBag, IconClipboard, IconCup, IconPulse } from "./Icons";

const STEP_ICONS = {
  clipboard: IconClipboard,
  pulse: IconPulse,
  bag: IconBag,
  cup: IconCup,
};

function Stat({ value, suffix, label, note, delay }: { value: number; suffix: string; label: string; note: string; delay: number }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.4);
  const n = useCountUp(value, inView);
  return (
    <div ref={ref} className={cx("reveal", inView && "is-in")} style={{ transitionDelay: `${delay}ms` }}>
      <p className="font-display text-5xl md:text-6xl text-bone tabular-nums leading-none">
        {n.toLocaleString()}
        <span className="text-blood-bright">{suffix}</span>
      </p>
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone/80 mt-4">{label}</p>
      <p className="text-sm text-bone/45 mt-2 leading-relaxed max-w-[240px]">{note}</p>
    </div>
  );
}

export function StatsBand() {
  const [ref, inView] = useInView<HTMLElement>(0.15);
  return (
    <section ref={ref} className="relative bg-ink text-bone overflow-hidden">
      <div className="absolute inset-0 dotgrid-dark opacity-60" aria-hidden="true" />
      <p className="absolute -left-6 -bottom-10 font-display text-[22vw] leading-none outline-type-bone select-none" aria-hidden="true">
        UHAI
      </p>
      <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <div className={cx("flex items-center gap-4 mb-12 reveal", inView && "is-in")}>
          <span className="h-px w-12 bg-blood-bright" aria-hidden="true" />
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone/60">
            Twelve years of quiet, urgent work
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {STATS.map((s, i) => (
            <Stat key={s.label} {...s} delay={i * 110} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process({ onBook }: { onBook: () => void }) {
  const [leftRef, leftIn] = useInView<HTMLDivElement>(0.2);
  return (
    <section id="process" className="relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div ref={leftRef} className="lg:sticky lg:top-28">
              <p className={cx("flex items-center gap-3 mb-5 reveal", leftIn && "is-in")}>
                <span className="h-px w-10 bg-blood" aria-hidden="true" />
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-blood-deep">How it works</span>
              </p>
              <h2 className={cx("font-display uppercase text-ink leading-[0.95] text-5xl md:text-6xl xl:text-7xl reveal", leftIn && "is-in")} style={{ transitionDelay: "80ms" }}>
                Forty minutes.<br />
                <span className="text-blood">Three lives.</span>
              </h2>
              <p className={cx("mt-7 text-lg text-ink-soft leading-relaxed max-w-md reveal", leftIn && "is-in")} style={{ transitionDelay: "160ms" }}>
                Most first-timers expect a hospital ordeal. What they get is a chair, a soft ball, warm mandazi and the
                strangest, best feeling in medicine. Here is the whole journey, minute by minute.
              </p>
              <div className={cx("mt-9 reveal", leftIn && "is-in")} style={{ transitionDelay: "240ms" }}>
                <button
                  onClick={onBook}
                  className="btn-sweep bg-ink text-bone font-mono text-xs uppercase tracking-[0.2em] px-8 py-4 hover:text-bone inline-flex items-center gap-3"
                >
                  Start at step 01 <IconArrow className="w-4 h-4" />
                </button>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint mt-4">
                  Walk-ins welcome at all six centres · no appointment penalty
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ol className="relative border-l-2 border-ink/15 ml-4 md:ml-6">
              {STEPS.map((step, i) => {
                const Icon = STEP_ICONS[step.icon];
                return (
                  <StepCard key={step.n} step={step} Icon={Icon} index={i} />
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  Icon,
  index,
}: {
  step: (typeof STEPS)[number];
  Icon: React.ComponentType<{ className?: string }>;
  index: number;
}) {
  const [ref, inView] = useInView<HTMLLIElement>(0.25);
  return (
    <li ref={ref} className={cx("relative pl-10 md:pl-16 pb-12 last:pb-0 reveal", inView && "is-in")} style={{ transitionDelay: `${index * 60}ms` }}>
      <span className="absolute -left-[13px] top-1.5 w-6 h-6 rounded-full bg-paper border-2 border-blood flex items-center justify-center" aria-hidden="true">
        <span className={cx("w-2 h-2 rounded-full transition-colors duration-500", inView ? "bg-blood" : "bg-transparent")} />
      </span>
      <div className="group bg-bone border border-ink/10 p-7 md:p-8 hover:border-blood/40 hover:shadow-[8px_8px_0_0_rgba(193,31,47,0.12)] hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-start justify-between gap-4">
          <span className="font-display text-6xl md:text-7xl leading-none outline-type group-hover:[-webkit-text-stroke-color:rgba(193,31,47,0.5)] transition-all" aria-hidden="true">
            {step.n}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-blood-deep border border-blood/30 bg-blood/5 px-2.5 py-1.5 whitespace-nowrap">
            {step.mins}
          </span>
        </div>
        <div className="flex items-center gap-3 mt-5">
          <span className="w-10 h-10 bg-blood text-bone flex items-center justify-center shrink-0 group-hover:bg-blood-deep transition-colors">
            <Icon className="w-5 h-5" />
          </span>
          <h3 className="font-display text-2xl md:text-[27px] uppercase text-ink leading-tight">{step.title}</h3>
        </div>
        <p className="mt-4 text-ink-soft leading-relaxed">{step.body}</p>
      </div>
    </li>
  );
}
