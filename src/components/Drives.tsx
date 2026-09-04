import { CENTERS, DRIVES, IMAGES, STORIES, type Drive } from "../data";
import { cx, useInView } from "../hooks";
import { IconArrow, IconCalendar, IconClock, IconDropSolid, IconPin, IconUsers } from "./Icons";

function DriveRow({ drive, index, onReserve }: { drive: Drive; index: number; onReserve: (d: Drive) => void }) {
  const [ref, inView] = useInView<HTMLLIElement>(0.2);
  const takenPct = Math.round(((drive.slotsTotal - drive.slotsLeft) / drive.slotsTotal) * 100);
  const low = drive.slotsLeft <= 15;
  return (
    <li ref={ref} className={cx("reveal", inView && "is-in")} style={{ transitionDelay: `${index * 90}ms` }}>
      <div className="group grid md:grid-cols-[110px_1fr_220px_auto] gap-6 md:gap-8 items-center border-t-2 border-ink/15 py-7 px-2 md:px-4 hover:bg-bone hover:px-6 md:hover:px-8 transition-all duration-300">
        <div className="flex md:flex-col items-center md:items-start gap-2 md:gap-0">
          <span className="font-display text-5xl md:text-6xl text-ink leading-none group-hover:text-blood transition-colors">
            {drive.day}
          </span>
          <span className="font-mono text-[11px] tracking-[0.28em] text-blood-deep">
            {drive.month} · {drive.weekday.slice(0, 3).toUpperCase()}
          </span>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-2xl md:text-3xl uppercase text-ink leading-tight">{drive.title}</h3>
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-soft border border-ink/20 px-2 py-1 bg-paper">
              {drive.tag}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
            <span className="flex items-center gap-1.5"><IconPin className="w-3.5 h-3.5 text-blood" /> {drive.venue} — {drive.area}</span>
            <span className="flex items-center gap-1.5"><IconClock className="w-3.5 h-3.5 text-blood" /> {drive.time}</span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
            <span className={cx("flex items-center gap-1.5", low && "text-blood font-semibold")}>
              <IconUsers className="w-3.5 h-3.5" />
              {drive.slotsLeft} slots left
            </span>
            <span className="tabular-nums text-ink-faint">{takenPct}% full</span>
          </div>
          <div className="mt-2 h-[7px] bg-ink/10 overflow-hidden">
            <div
              className={cx("fill-bar h-full", low ? "bg-blood-bright" : "bg-blood")}
              style={{ width: inView ? `${takenPct}%` : "0%" }}
            />
          </div>
        </div>

        <button
          onClick={() => onReserve(drive)}
          className="btn-sweep justify-self-start md:justify-self-end bg-ink text-bone font-mono text-[11px] uppercase tracking-[0.18em] px-6 py-3.5 hover:text-bone inline-flex items-center gap-2.5"
        >
          Reserve <IconArrow className="w-3.5 h-3.5" />
        </button>
      </div>
    </li>
  );
}

export function Drives({ onReserve }: { onReserve: (d: Drive) => void }) {
  const [headRef, headIn] = useInView<HTMLDivElement>(0.2);
  const [photoRef, photoIn] = useInView<HTMLDivElement>(0.2);
  return (
    <section id="drives" className="relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <div ref={headRef} className={cx("grid lg:grid-cols-12 gap-10 items-end", headIn && "lines-in")}>
          <div className="lg:col-span-6">
            <p className="flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-blood" aria-hidden="true" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-blood-deep">Upcoming drives</span>
            </p>
            <h2 className="font-display uppercase text-ink leading-[0.95] text-5xl md:text-6xl xl:text-7xl">
              <span className="line-mask"><span>Show up.</span></span>
              <span className="line-mask"><span>Roll up.</span></span>
              <span className="line-mask"><span className="text-blood">Save lives.</span></span>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:pb-3">
            <p className="text-lg text-ink-soft leading-relaxed max-w-lg">
              Four drives on the calendar, six walk-in centres open all week. Bring your ID, eat breakfast, drink
              water — we handle the rest, including the free blood-group test and the snacks.
            </p>
          </div>
        </div>

        <div ref={photoRef} className={cx("relative mt-12 overflow-hidden reveal", photoIn && "is-in")}>
          <div className="overflow-hidden">
            <img
              src={IMAGES.drive}
              alt="Donors reclining in chairs at a Mwajuma community blood drive, nurses in teal scrubs attending them"
              className="w-full h-[300px] md:h-[420px] object-cover transition-transform duration-[3000ms] ease-out hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" aria-hidden="true" />
          <p className="absolute bottom-5 left-6 md:bottom-7 md:left-8 text-bone">
            <span className="block font-display text-2xl md:text-3xl uppercase">Kariakoo drive, February</span>
            <span className="block font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-bone/70 mt-1.5">
              212 units in one Saturday · 96 first-time donors
            </span>
          </p>
        </div>

        <ul className="mt-12 border-b-2 border-ink/15">
          {DRIVES.map((d, i) => (
            <DriveRow key={d.id} drive={d} index={i} onReserve={onReserve} />
          ))}
        </ul>

        <div className="mt-16">
          <p className="flex items-center gap-3 mb-7">
            <IconCalendar className="w-4 h-4 text-blood" />
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-blood-deep">
              Can't make a drive? Walk-in centres
            </span>
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/15 border border-ink/15">
            {CENTERS.map((c, i) => (
              <CenterTile key={c.name} name={c.name} area={c.area} hours={c.hours} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CenterTile({ name, area, hours, index }: { name: string; area: string; hours: string; index: number }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.2);
  return (
    <div ref={ref} className={cx("group bg-paper p-6 hover:bg-bone transition-colors reveal", inView && "is-in")} style={{ transitionDelay: `${index * 60}ms` }}>
      <p className="font-display text-lg uppercase text-ink group-hover:text-blood transition-colors">{name}</p>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint flex items-center gap-1.5">
        <IconPin className="w-3 h-3 text-blood" /> {area}
      </p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint flex items-center gap-1.5">
        <IconClock className="w-3 h-3 text-blood" /> {hours}
      </p>
    </div>
  );
}

export function Stories() {
  const [headRef, headIn] = useInView<HTMLDivElement>(0.2);
  return (
    <section id="stories" className="relative bg-ink text-bone overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 dotgrid-dark opacity-40" aria-hidden="true" />
      <p className="absolute -right-10 -top-8 font-display text-[20vw] leading-none outline-type-bone select-none" aria-hidden="true">
        ASANTE
      </p>
      <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <div ref={headRef} className="grid lg:grid-cols-12 gap-8 items-end mb-14">
          <div className="lg:col-span-7">
            <p className={cx("flex items-center gap-3 mb-5 reveal", headIn && "is-in")}>
              <span className="h-px w-10 bg-blood-bright" aria-hidden="true" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone/60">Donor stories</span>
            </p>
            <h2 className={cx("font-display uppercase leading-[0.95] text-5xl md:text-6xl xl:text-7xl reveal", headIn && "is-in")} style={{ transitionDelay: "90ms" }}>
              The arm behind<br />
              <span className="text-blood-bright">the ambulance.</span>
            </h2>
          </div>
          <p className={cx("lg:col-span-5 text-bone/60 leading-relaxed reveal", headIn && "is-in")} style={{ transitionDelay: "180ms" }}>
            Every unit has a name behind it — a teacher, a bus driver, a law student. Drag through three of the
            12,480 people keeping the shelves stocked.
          </p>
        </div>

        <div className="snap-row flex gap-6 md:gap-8 overflow-x-auto pb-6 -mx-5 px-5 md:-mx-8 md:px-8">
          {STORIES.map((s, i) => (
            <StoryCard key={s.name} story={s} index={i} />
          ))}
          <div className="shrink-0 w-64 md:w-72 flex flex-col items-start justify-center border-2 border-dashed border-bone/20 p-8 text-bone/70">
            <IconDropSolid className="w-8 h-8 text-blood-bright mb-5" />
            <p className="font-display text-2xl uppercase leading-tight">Your story starts with one chair.</p>
            <a href="#faq" className="link-under mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-bone">
              Read the FAQ first →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryCard({ story, index }: { story: (typeof STORIES)[number]; index: number }) {
  const [ref, inView] = useInView<HTMLElement>(0.15);
  const tilts = ["-1.6deg", "1.2deg", "-0.8deg"];
  return (
    <article
      ref={ref}
      className={cx("group shrink-0 w-[300px] md:w-[360px] bg-bone text-ink reveal", inView && "is-in")}
      style={{ transitionDelay: `${index * 120}ms`, ["--tilt" as string]: tilts[index % 3] }}
    >
      <div className="drift" style={{ ["--tilt" as string]: tilts[index % 3] }}>
        <div className="relative overflow-hidden">
          <img
            src={story.img}
            alt={`Portrait of ${story.name}, Mwajuma volunteer blood donor`}
            className="w-full aspect-[4/4.6] object-cover transition-all duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <span
            className="absolute top-4 left-4 font-display text-xl text-bone px-3 py-1.5 leading-none"
            style={{ background: story.tint }}
          >
            {story.type}
          </span>
          <span className="absolute bottom-4 right-4 font-mono text-[9px] uppercase tracking-[0.16em] bg-ink/85 text-bone px-2.5 py-1.5">
            {story.count}
          </span>
        </div>
        <div className="p-7">
          <svg viewBox="0 0 24 24" className="w-7 h-7 text-blood mb-4" fill="currentColor" aria-hidden="true">
            <path d="M4 13.5C4 9 6.8 5.8 10.5 4.5l1 1.8C9 7.5 7.6 9.3 7.3 11c.3-.1.7-.2 1.2-.2 2 0 3.4 1.4 3.4 3.4S10.4 18 8.2 18C5.6 18 4 16.2 4 13.5Zm9.5 0c0-4.5 2.8-7.7 6.5-9l1 1.8c-2.5 1.2-3.9 3-4.2 4.7.3-.1.7-.2 1.2-.2 2 0 3.4 1.4 3.4 3.4S19.9 18 17.7 18c-2.6 0-4.2-1.8-4.2-4.5Z" />
          </svg>
          <p className="text-[15px] leading-relaxed text-ink-soft">{story.quote}</p>
          <p className="mt-6 font-display text-xl uppercase text-ink">{story.name}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint mt-1">{story.meta}</p>
        </div>
      </div>
    </article>
  );
}
