import { useEffect, useState } from "react";
import { getCalendarDays } from "../services/calendar.service";
import type { CalendarDay } from "../types/calendar";
import { getToday, isDateLocked, isSameDay } from "../lib/date";
import CalendarGrid from "../components/CalendarGrid";
import InfoModal from "../components/InfoModal";
import { motion } from "framer-motion";
import { getOwnerToken } from "../lib/token";
import {
  getCalendarStateByToken,
  getPublicCalendarState,
  markDayAsOpened,
} from "../services/calendarState.service";
import { supabase } from "../lib/supabase";

// 🔹 Importa el registro de días
import dayComponents from "../days/DayRegistry";

export default function Home() {
  const today = getToday();

  const [infoMessage, setInfoMessage] = useState("");
  const [showInfoModal, setShowInfoModal] = useState(false);

  const [days, setDays] = useState<CalendarDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);

  const [openedDays, setOpenedDays] = useState<number[]>([]);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isInvalidToken, setIsInvalidToken] = useState(false);

  function normalizeOpenedDays(raw: any): number[] {
    if (!Array.isArray(raw)) return [];
    return raw.map(Number).filter((n) => !isNaN(n));
  }

  // 🔐 CARGA DE ESTADO SEGÚN TOKEN
  useEffect(() => {
    async function loadState() {
      const token = getOwnerToken();

      if (token === "") {
        setIsInvalidToken(true);
        return;
      }

      try {
        if (token) {
          setIsPrivate(true);
          const state = await getCalendarStateByToken(token);
          setOpenedDays(state.opened_days || []);
        } else {
          setIsPrivate(false);
          const state = await getPublicCalendarState();
          setOpenedDays(state.opened_days || []);
        }
      } catch {
        setIsInvalidToken(true);
      }
    }

    loadState();
  }, []);

  // 📅 CARGA DE DÍAS
  useEffect(() => {
    getCalendarDays()
      .then(setDays)
      .finally(() => setLoading(false));
  }, []);

  // 🔴 REALTIME — Escuchar cambios del PUBLIC
  useEffect(() => {
    // ⚠️ Solo público escucha realtime
    if (isPrivate) return;

    console.log("📡 Suscribiendo a realtime PUBLIC");

    const channel = supabase
      .channel("calendar-public-realtime")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "calendar_state",
          filter: "owner_token=eq.PUBLIC",
        },
        (payload) => {
          console.log("🔔 Cambio PUBLIC recibido:", payload);

          const updated = payload.new?.opened_days;
          const normalized = normalizeOpenedDays(updated);

          setOpenedDays(normalized);
        },
      )
      .subscribe((status) => {
        console.log("📡 Realtime status:", status);
      });

    return () => {
      console.log("🧹 Cerrando canal realtime");
      supabase.removeChannel(channel);
    };
  }, [isPrivate]);

  // 🚫 TOKEN INVÁLIDO → PANTALLA DEDICADA
  if (isInvalidToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F1EC]">
        <div className="max-w-md text-center px-6">
          <h1 className="text-2xl font-black mb-4">Este enlace no es válido</h1>

          <p className="text-black/60 mb-6">
            El acceso que intentas usar no existe o ya no está disponible.
          </p>

          <a
            href="/"
            className="inline-block px-6 py-3 rounded-xl bg-black text-white font-semibold"
          >
            Volver al calendario
          </a>
        </div>
      </div>
    );
  }

  // ⏳ CARGANDO
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F1EC]">
        <p className="text-sm text-black/60">Cargando…</p>
      </div>
    );
  }

  // 🔹 Obtiene el componente dinámico
  const DayComponent = selectedDay
    ? dayComponents[selectedDay.day_number]
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="min-h-screen bg-[#F5F1EC]"
    >
      {/* CONTENEDOR CENTRAL */}
      <div className="mx-auto max-w-[1300px] px-6 pb-24">
        <div className="pt-8 flex items-center justify-between">
          <h2 className="text-xs font-black uppercase tracking-[0.4em]">
            20 Collection
          </h2>
          <div className="text-[11px] font-black uppercase tracking-widest border border-charcoal/20 px-6 py-2 transition">
            M
          </div>
        </div>

        {/* HEADER / HERO */}
        <header className="pt-12 pb-16">
          <p className="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-4 text-center md:text-left">
            MARILYN : MM
          </p>
          <h1 className="mt-6 max-w-4xl text-4xl font-black uppercase leading-[1] tracking-tight md:text-7xl">
            Veinte días de <br /> Elegancia y Anticipación
          </h1>
          <p className="text-charcoal/80 lg:p-0 md:text-left font-medium mt-6 max-w-md">
            Fragmentos de elegancia que se suman día tras día
          </p>
        </header>

        <CalendarGrid
          days={days}
          today={today}
          openedDays={openedDays}
          isDateLocked={isDateLocked}
          isSameDay={isSameDay}
          onOpen={async (day) => {
            console.log("Click en día:", day);

            if (isDateLocked(day.unlock_date, today)) {
              const fechaBonita = new Date(
                `${day.unlock_date}T00:00:00`,
              ).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "long",
              });

              setInfoMessage(`Este día se abrirá el ${fechaBonita}`);
              setShowInfoModal(true);
              return;
            }

            if (!isPrivate) {
              if (!openedDays.includes(day.day_number)) {
                setInfoMessage(
                  "Este día aún no ha sido abierto por el anfitrión ✨",
                );
                setShowInfoModal(true);
                return;
              }
              setSelectedDay(day);
              return;
            }

            setSelectedDay(day);
            const token = getOwnerToken();
            if (!token) return;

            const updated = await markDayAsOpened(token, day.day_number);
            setOpenedDays(updated);
          }}
        />
      </div>

      {/* INFO MODAL */}
      <InfoModal isOpen={showInfoModal} onClose={() => setShowInfoModal(false)}>
        {infoMessage}
      </InfoModal>

      {/* DÍAS */}
      {DayComponent && <DayComponent onClose={() => setSelectedDay(null)} />}
    </motion.div>
  );
}
