import { useState } from "react";
import { BLOOD_BOARD, type BloodRow } from "../data";
import { statusOf } from "../data";
import { cx, useInterval, useInView, useScramble } from "../hooks";
import {
  EcgLine,
  IconArrow,
  IconDropSolid,
  IconTrendDown,
  IconTrendFlat,
  IconTrendUp,
} from "./Icons";

const STATUS_STYLE: Record<string, string> = {
  CRITICAL: "text-blood-bright border-blood-bright/50",
  LOW: "text-plasma border-plasma/50",
  STABLE: "text-bone/60 border-bone/25",
  OPTIMAL: "text-[#8fd4c3] border-life/70",
};

const FILL_STYLE: Record<string, string> = {
  CRITICAL: "bg-blood-bright",
  LOW: "bg-plasma",
  STABLE: "bg-blood",
  OPTIMAL: "bg-life",
};

function BoardRow({ row, loaded }: { row: BloodRow; loaded: boolean }) {
  const status = statusOf(row.units, row.capacity);
  const pct = Math.round((row.units / row.capacity) * 100);
  const Trend = row.trend === "up" ? IconTrendUp : row.trend === "down" ? IconTrendDown : IconTrendFlat;
  return (
    <li className="grid grid-cols-[52px_1fr_86px_84px] items-center gap-3 py-[11px] border-t border-bone/10 group hover:bg-bone/[0.03] transition-colors">
      <span className="font-display text-2xl text-bone leading-none">{row.group}</span>
      <span className="h-[7px] bg-bone/10 rounded-full overflow-hidden">
        <span
          className={cx("fill-bar block h-full rounded-full", FILL_STYLE[status], status === "CRITICAL" && "blink")}
          style={{ width: loaded ? `${pct}%` : "0%" }}
        />
      </span>
      <span className="flex items-center justify-end gap-1.5 font-mono text-[11px] text-bone/70 tabular-nums">
        <Trend
          className={cx(
            "w-3 h-3",
            row.trend === "up" && "text-[#8fd4c3]",
            row.trend === "down" && "text-blood-bright",
            row.trend === "flat" && "text-bone/40"
          )}
        />
        {row.units}/{row.capacity} u
      </span>
      <span className="flex justify-end">
        <span
          className={cx(
            "font-mono text-[9px] tracking-[0.14em] px-1.5 py-[3px] border",
            STATUS_STYLE[status],
            status === "CRITICAL" && "blink"
          )}
        >
          {status}
        </span>
      </span>
    </li>
  );
}

function BloodBoard({ onDonate, onRequest }: { onDonate: () => void; onRequest: () => void }) {
  const [rows, setRows] = useState<BloodRow[]>(BLOOD_BOARD);
  const [sync, setSync] = useState(2);
  const [boardRef, boardIn] = useInView<HTMLDivElement>(0.25);
  const feedLabel = useScramble("DAR ES SALAAM HOSPITAL NETWORK", boardIn, 26);

  useInterval(() => {
    setRows((prev) => {
      const i = Math.floor(Math.random() * prev.length);
      const delta = (Math.random() > 0.45 ? 1 : -1) * (1 + Math.floor(Math.random() * 3));
      const next = [...prev];
      const units = Math.min(next[i].capacity, Math.max(1, next[i].units + delta));
      next[i] = { ...next[i], units, trend: units > next[i].units ? "up" : units < next[i].units ? "down" : "flat" };
      return next;
    });
    setSync(0);
  }, 3800);

  useInterval(() => setSync((s) => Math.min(s + 1, 99)), 1000);

  const totalOnHand = rows.reduce((a, r) => a + r.units, 0);

  return (
    <div ref={boardRef} className="relative">
      <div className="absolute -inset-3 md:-inset-4 border border-blood/25 pointer-events-none" aria-hidden="true" />
      <div className="relative bg-ink text-bone shadow-[0_30px_80px_-20px_rgba(74,8,18,0.45)]">
        <div className="flex items-center justify-between gap-3 px-5 pt-5 pb-4">
          <div>
            <p className="font-mono text-[9px] tracking-[0.32em] text-bone/50 uppercase">Regional supply board</p>
            <p className="font-mono text-[11px] tracking-[0.14em] text-bone/85 mt-1.5 min-h-[16px]">{feedLabel || "\u00A0"}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex w-2.5 h-2.5">
              <span className="ping-dot relative inline-flex w-2.5 h-2.5 rounded-full bg-blood-bright text-blood-bright" />
            </span>
            <span className="font-mono text-[10px] tracking-[0.24em] text-blood-bright">LIVE</span>
          </div>
        </div>

        <ul className="px-5">
          {rows.map((r) => (
            <BoardRow key={r.group} row={r} loaded={boardIn} />
          ))}
        </ul>

        <div className="flex items-center justify-between px-5 py-4 border-t border-bone/10">
          <p className="font-mono text-[10px] tracking-[0.14em] text-bone/45 tabular-nums">
            {totalOnHand} UNITS ON HAND · SYNCED {sync}s AGO
          </p>
          <span className="font-mono text-[10px] tracking-[0.14em] text-bone/45 hidden sm:block">COLD-CHAIN OK · 4°C</span>
        </div>

        <div className="grid grid-cols-2 border-t border-bone/10">
          <button
            onClick={onDonate}
            className="group flex items-center justify-center gap-2 py-4 font-mono text-[11px] uppercase tracking-[0.18em] bg-blood text-bone hover:bg-blood-deep transition-colors"
          >
            <IconDropSolid className="w-3.5 h-3.5" /> Restock a group
          </button>
          <button
            onClick={onRequest}
            className="group flex items-center justify-center gap-2 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-bone/80 hover:text-bone hover:bg-bone/5 transition-colors"
          >
            Request units <IconArrow className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* rotating circular badge */}
      <div className="absolute -top-10 -right-6 md:-right-12 w-28 h-28 md:w-36 md:h-36 hidden sm:block" aria-hidden="true">
        <svg viewBox="0 0 100 100" className="w-full h-full spin-slow">
          <defs>
            <path id="circ" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
          </defs>
          <circle cx="50" cy="50" r="49" fill="var(--color-bone)" stroke="var(--color-blood)" strokeWidth="1" />
          <text className="font-mono" fontSize="8.2" letterSpacing="2.5" fill="var(--color-blood-deep)">
            <textPath href="#circ">DAMU NI UHAI · GIVE BLOOD · GIVE LIFE ·</textPath>
          </text>
        </svg>
        <IconDropSolid className="absolute inset-0 m-auto w-7 h-7 text-blood" />
      </div>
    </div>
  );
}

export default function Hero({ onDonate, onRequest }: { onDonate: () => void; onRequest: () => void }) {
  const [headRef, headIn] = useInView<HTMLDivElement>(0.2);
  const [subRef, subIn] = useInView<HTMLDivElement>(0.2);

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 dotgrid [mask-image:radial-gradient(ellipse_90%_80%_at_50%_20%,black,transparent)]" aria-hidden="true" />
      <div
        className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(193,31,47,0.10), transparent 65%)" }}
        aria-hidden="true"
      />
      <p className="absolute -right-8 top-10 font-display text-[26vw] leading-none outline-type select-none hidden lg:block" aria-hidden="true">
        DAMU
      </p>

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-14 md:pt-20 pb-16 md:pb-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <div className="lg:col-span-7">
            <div ref={headRef} className={cx(headIn && "lines-in")}>
              <p className="flex items-center gap-3 mb-7">
                <span className="relative flex w-2.5 h-2.5">
                  <span className="ping-dot relative inline-flex w-2.5 h-2.5 rounded-full bg-blood text-blood" />
                </span>
                <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-blood-deep">
                  Mwajuma Blood Donation Initiative · Dar es Salaam · est. 2014
                </span>
              </p>
              <h1 className="font-display text-ink leading-[0.94] text-[15vw] sm:text-7xl lg:text-[86px] xl:text-[100px] uppercase">
                <span className="line-mask"><span>Every drop</span></span>
                <span className="line-mask"><span>is someone's</span></span>
                <span className="line-mask">
                  <span>
                    <span className="text-blood">tomorrow</span>
                    <span className="text-blood">.</span>
                  </span>
                </span>
              </h1>
            </div>

            <div ref={subRef} className={cx("mt-8 max-w-xl", subIn && "reveal is-in", !subIn && "reveal")}>
              <p className="text-lg md:text-xl text-ink-soft leading-relaxed">
                <strong className="text-ink font-semibold">Damu ni uhai</strong> — blood is life. Mwajuma connects
                12,000+ volunteer donors with the hospitals of Dar es Salaam, Zanzibar, Arusha and Mwanza. One
                donation takes <em className="font-semibold not-italic text-blood">40 minutes</em> of your day and can
                reach <em className="font-semibold not-italic text-blood">three patients</em> before nightfall.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <button
                  onClick={onDonate}
                  className="btn-sweep bg-blood text-bone font-mono text-xs uppercase tracking-[0.2em] px-8 py-4 hover:text-bone flex items-center gap-3"
                >
                  Book a donation <IconArrow className="w-4 h-4" />
                </button>
                <a
                  href="#compatibility"
                  className="btn-sweep btn-sweep-outline border border-ink/30 text-ink font-mono text-xs uppercase tracking-[0.2em] px-8 py-4 inline-flex items-center gap-3"
                >
                  Check my blood group
                </a>
              </div>

              <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-ink/15 pt-6 max-w-lg">
                {[
                  ["< 2 hrs", "emergency dispatch, citywide"],
                  ["38", "partner hospitals stocked daily"],
                  ["0 TSh", "donors never pay, patients never profit"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <dt className="font-display text-2xl md:text-3xl text-ink">{v}</dt>
                    <dd className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint mt-1.5 leading-relaxed">{l}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div id="board" className="lg:col-span-5 scroll-mt-28">
            <BloodBoard onDonate={onDonate} onRequest={onRequest} />
          </div>
        </div>
      </div>

      <div className="relative text-blood/30" aria-hidden="true">
        <EcgLine className="w-full h-16 md:h-24 -mb-6" />
      </div>
    </section>
  );
}
