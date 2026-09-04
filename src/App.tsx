import { useCallback, useRef, useState } from "react";
import BookingModal, { type ModalState } from "./components/BookingModal";
import { Header, Ticker } from "./components/Chrome";
import { CtaBand, Faq, Footer } from "./components/Closing";
import Compatibility from "./components/Compatibility";
import { Drives, Stories } from "./components/Drives";
import Hero from "./components/Hero";
import { IconCheck } from "./components/Icons";
import { Process, StatsBand } from "./components/Impact";
import type { Drive } from "./data";

export default function App() {
  const [modal, setModal] = useState<ModalState>(null);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);

  const openDonate = useCallback((drive?: Drive) => {
    setModal({ mode: "donate", drive });
  }, []);

  const openRequest = useCallback(() => {
    setModal({ mode: "request" });
  }, []);

  const handleBooked = useCallback((refCode: string) => {
    setToast(`Booking confirmed · ref ${refCode} — a coordinator will call you shortly.`);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 5000);
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink font-body antialiased">
      <div className="noise-overlay" aria-hidden="true" />

      <Ticker />
      <Header onBook={() => openDonate()} />

      <main>
        <Hero onDonate={() => openDonate()} onRequest={openRequest} />
        <StatsBand />
        <Process onBook={() => openDonate()} />
        <Compatibility onBook={() => openDonate()} />
        <Drives onReserve={(d) => openDonate(d)} />
        <Stories />
        <Faq />
        <CtaBand onDonate={() => openDonate()} onRequest={openRequest} />
      </main>

      <Footer />

      <BookingModal state={modal} onClose={() => setModal(null)} onBooked={handleBooked} />

      {toast && (
        <div className="toast-in fixed bottom-6 left-1/2 -translate-x-1/2 z-[110] w-[calc(100%-2.5rem)] max-w-md">
          <div className="flex items-center gap-3.5 bg-ink text-bone border border-bone/15 shadow-2xl px-5 py-4">
            <span className="shrink-0 w-8 h-8 rounded-full bg-life flex items-center justify-center">
              <IconCheck className="w-4 h-4" />
            </span>
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] leading-relaxed text-bone/90">{toast}</p>
          </div>
        </div>
      )}
    </div>
  );
}
