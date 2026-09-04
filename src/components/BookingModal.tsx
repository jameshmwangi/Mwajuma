import { useEffect, useState } from "react";
import { BLOOD_TYPES, CENTERS, type Drive } from "../data";
import { cx, useBodyLock } from "../hooks";
import { IconArrow, IconCheck, IconDropSolid, IconHeart, IconX } from "./Icons";

export type ModalState = { mode: "donate" | "request"; drive?: Drive } | null;

const MONTHS: Record<string, string> = { JAN: "01", FEB: "02", MAR: "03", APR: "04", MAY: "05", JUN: "06", JUL: "07", AUG: "08", SEP: "09", OCT: "10", NOV: "11", DEC: "12" };

const driveLocation = (d: Drive) => `${d.title} — ${d.day} ${d.month}`;
const driveDate = (d: Drive) => `2026-${MONTHS[d.month]}-${d.day.padStart(2, "0")}`;
const todayISO = () => new Date().toISOString().slice(0, 10);

const inputCls = (bad: boolean) =>
  cx(
    "w-full bg-paper border px-3.5 py-3 text-ink placeholder:text-ink-faint/70 focus:outline-none focus:border-blood transition-colors",
    bad ? "border-blood-bright" : "border-ink/20"
  );

function Field({
  label,
  error,
  children,
  span2,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  span2?: boolean;
}) {
  return (
    <label className={cx("block", span2 && "sm:col-span-2")}>
      <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft mb-2">{label}</span>
      {children}
      {error && <span className="block mt-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-blood-bright">{error}</span>}
    </label>
  );
}

export default function BookingModal({
  state,
  onClose,
  onBooked,
}: {
  state: ModalState;
  onClose: () => void;
  onBooked: (refCode: string) => void;
}) {
  const [tab, setTab] = useState<"donate" | "request">("donate");
  const [phase, setPhase] = useState<"form" | "processing" | "done">("form");
  const [refCode, setRefCode] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    name: "",
    phone: "",
    bloodType: "",
    location: "",
    date: "",
    hospital: "",
    units: "2",
    urgency: "Urgent — within 24 hours",
    notes: "",
    agree: false,
  });

  useBodyLock(!!state);

  useEffect(() => {
    if (!state) return;
    setTab(state.mode);
    setPhase("form");
    setErrors({});
    setForm({
      name: "",
      phone: "",
      bloodType: "",
      location: state.drive ? driveLocation(state.drive) : "",
      date: state.drive ? driveDate(state.drive) : "",
      hospital: "",
      units: "2",
      urgency: "Urgent — within 24 hours",
      notes: "",
      agree: false,
    });
  }, [state]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (state) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [state, onClose]);

  if (!state) return null;

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target instanceof HTMLInputElement && e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (tab === "donate") {
      if (form.name.trim().length < 3) e.name = "Please enter your full name";
      if (form.phone.replace(/\D/g, "").length < 9) e.phone = "Enter a valid phone number";
      if (!form.bloodType) e.bloodType = "Choose one — 'I don't know' is fine";
      if (!form.location) e.location = "Pick a drive or centre";
      if (!form.date || form.date < todayISO()) e.date = "Pick a date from today onwards";
      if (!form.agree) e.agree = "We need your consent to screen you";
    } else {
      if (form.name.trim().length < 3) e.name = "Enter the contact person's name";
      if (form.phone.replace(/\D/g, "").length < 9) e.phone = "Enter a valid phone number";
      if (form.hospital.trim().length < 3) e.hospital = "Which hospital needs the units?";
      if (!form.bloodType) e.bloodType = "Select the required group";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setPhase("processing");
    window.setTimeout(() => {
      setRefCode(`MWJ-${String(Date.now() % 1000000).padStart(6, "0")}`);
      setPhase("done");
    }, 1100);
  };

  const firstName = form.name.trim().split(" ")[0] || "donor";

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6" role="dialog" aria-modal="true" aria-label={tab === "donate" ? "Book a blood donation" : "Request blood units"}>
      <button className="absolute inset-0 bg-ink/70 fade-in cursor-default" onClick={onClose} aria-label="Close dialog" />
      <div className="modal-in relative w-full sm:max-w-2xl bg-bone shadow-2xl max-h-[92vh] overflow-y-auto">
        <div className="sticky top-0 z-10 bg-blood text-bone px-6 md:px-8 pt-5">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.26em] text-bone/80">
              <IconDropSolid className="w-3.5 h-3.5" /> Mwajuma · {tab === "donate" ? "Donor booking" : "Blood request line"}
            </p>
            <button onClick={onClose} aria-label="Close" className="w-9 h-9 flex items-center justify-center border border-bone/30 hover:bg-bone hover:text-blood transition-colors">
              <IconX className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-1 pb-0">
            {(["donate", "request"] as const).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setTab(m);
                  setErrors({});
                }}
                className={cx(
                  "flex items-center justify-center gap-2 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors",
                  tab === m ? "bg-bone text-blood" : "text-bone/75 hover:bg-blood-deep"
                )}
              >
                {m === "donate" ? <IconDropSolid className="w-3.5 h-3.5" /> : <IconHeart className="w-4 h-4" />}
                {m === "donate" ? "Give blood" : "Request blood"}
              </button>
            ))}
          </div>
        </div>

        {phase === "done" ? (
          <div className="px-6 md:px-10 py-12 text-center">
            <span className="check-pop inline-flex w-20 h-20 rounded-full bg-life text-bone items-center justify-center">
              <IconCheck className="w-9 h-9" />
            </span>
            <h3 className="mt-7 font-display text-4xl md:text-5xl uppercase text-ink">
              Asante, <span className="text-blood">{firstName}!</span>
            </h3>
            <p className="mt-4 text-ink-soft leading-relaxed max-w-md mx-auto">
              {tab === "donate"
                ? "Your chair is reserved. A coordinator will call to confirm, and we'll SMS you a preparation checklist the day before."
                : "Your request is on the dispatch board. The duty officer will call you within 15 minutes — keep this phone close."}
            </p>
            <div className="mt-8 inline-block border-2 border-dashed border-ink/30 px-8 py-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-faint">Reference</p>
              <p className="font-display text-3xl text-blood tracking-wide mt-1">{refCode}</p>
            </div>
            <dl className="mt-8 max-w-sm mx-auto text-left space-y-2.5 font-mono text-[11px] uppercase tracking-[0.1em]">
              {tab === "donate" ? (
                <>
                  <SummaryRow k="Where" v={form.location} />
                  <SummaryRow k="When" v={form.date} />
                  <SummaryRow k="Group" v={form.bloodType} />
                </>
              ) : (
                <>
                  <SummaryRow k="Hospital" v={form.hospital} />
                  <SummaryRow k="Units" v={`${form.units} × ${form.bloodType}`} />
                  <SummaryRow k="Priority" v={form.urgency.split(" — ")[0]} />
                </>
              )}
            </dl>
            <button
              onClick={() => {
                onBooked(refCode);
                onClose();
              }}
              className="btn-sweep mt-10 bg-ink text-bone font-mono text-xs uppercase tracking-[0.2em] px-10 py-4 hover:text-bone inline-flex items-center gap-3"
            >
              Sawa — done <IconArrow className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="px-6 md:px-10 py-8" noValidate>
            {state.drive && tab === "donate" && (
              <p className="mb-6 flex items-center gap-2.5 bg-plasma/15 border border-plasma/50 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                <IconDropSolid className="w-3.5 h-3.5 text-plasma" />
                Reserving for: {driveLocation(state.drive)} · {state.drive.time}
              </p>
            )}
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-6">
              <Field label={tab === "donate" ? "Full name" : "Contact person"} error={errors.name}>
                <input className={inputCls(!!errors.name)} value={form.name} onChange={set("name")} placeholder={tab === "donate" ? "e.g. Neema J. Kessy" : "e.g. Dr. Halima Omar"} />
              </Field>
              <Field label="Phone (SMS + call)" error={errors.phone}>
                <input className={inputCls(!!errors.phone)} value={form.phone} onChange={set("phone")} placeholder="+255 7XX XXX XXX" inputMode="tel" />
              </Field>
              <Field label={tab === "donate" ? "Your blood group" : "Group needed"} error={errors.bloodType}>
                <select className={inputCls(!!errors.bloodType)} value={form.bloodType} onChange={set("bloodType")}>
                  <option value="">— select —</option>
                  {BLOOD_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                  {tab === "donate" && <option value="I don't know yet">I don't know yet (we'll test free)</option>}
                </select>
              </Field>
              {tab === "donate" ? (
                <>
                  <Field label="Drive or centre" error={errors.location}>
                    <select className={inputCls(!!errors.location)} value={form.location} onChange={set("location")}>
                      <option value="">— select —</option>
                      {state.drive && <option value={driveLocation(state.drive)}>{driveLocation(state.drive)}</option>}
                      {CENTERS.map((c) => (
                        <option key={c.name} value={c.name}>{c.name} · {c.area}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Preferred date" error={errors.date}>
                    <input type="date" min={todayISO()} className={inputCls(!!errors.date)} value={form.date} onChange={set("date")} />
                  </Field>
                </>
              ) : (
                <>
                  <Field label="Hospital / ward" error={errors.hospital}>
                    <input className={inputCls(!!errors.hospital)} value={form.hospital} onChange={set("hospital")} placeholder="e.g. Muhimbili — maternity ward" />
                  </Field>
                  <Field label="Units needed">
                    <select className={inputCls(false)} value={form.units} onChange={set("units")}>
                      {Array.from({ length: 10 }, (_, i) => String(i + 1)).map((n) => (
                        <option key={n} value={n}>{n} unit{n === "1" ? "" : "s"}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="How urgent?" span2>
                    <select className={inputCls(false)} value={form.urgency} onChange={set("urgency")}>
                      <option>Emergency — needed now</option>
                      <option>Urgent — within 24 hours</option>
                      <option>Routine — within 3 days</option>
                    </select>
                  </Field>
                </>
              )}

              {tab === "donate" && (
                <Field label="Notes for the nurse (optional)" span2>
                  <textarea rows={2} className={inputCls(false)} value={form.notes} onChange={set("notes")} placeholder="Medication, last donation date, anything we should know…" />
                </Field>
              )}

              {tab === "donate" && (
                <div className="sm:col-span-2">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" checked={form.agree} onChange={set("agree")} className="mt-1 accent-[#c11f2f] w-4 h-4" />
                    <span className="text-sm text-ink-soft leading-relaxed">
                      I consent to a free, private mini health screening and understand donating is voluntary and unpaid.
                    </span>
                  </label>
                  {errors.agree && <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-blood-bright">{errors.agree}</p>}
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                type="submit"
                disabled={phase === "processing"}
                className="btn-sweep bg-blood text-bone font-mono text-xs uppercase tracking-[0.2em] px-9 py-4 hover:text-bone inline-flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {phase === "processing" ? (
                  <>
                    <span className="w-4 h-4 border-2 border-bone/40 border-t-bone rounded-full animate-spin" />
                    {tab === "donate" ? "Reserving your chair…" : "Pinging the dispatch board…"}
                  </>
                ) : (
                  <>
                    {tab === "donate" ? "Confirm my donation" : "Send the request"} <IconArrow className="w-4 h-4" />
                  </>
                )}
              </button>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint leading-relaxed">
                {tab === "donate" ? "Free · 40 minutes · chai included" : "Dispatched from the nearest stocked bank"}
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function SummaryRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-ink/10 pb-2">
      <dt className="text-ink-faint shrink-0">{k}</dt>
      <dd className="text-ink text-right">{v}</dd>
    </div>
  );
}
