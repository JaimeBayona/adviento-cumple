import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getCalendarDays } from "../services/calendar.service";
import {
  getCalendarStateByToken,
  getPublicCalendarState,
  markDayAsOpened,
  resetDevCalendar,
  openAllDaysDev,
} from "../services/calendarState.service";

import { supabase } from "../lib/supabase";
import { getOwnerToken } from "../lib/token";
import { getToday, isDateLocked, isSameDay } from "../lib/date";

import CalendarGrid from "../components/CalendarGrid";
import InfoModal from "../components/InfoModal";

import type { CalendarDay } from "../types/calendar";
import dayComponents from "../days/DayRegistry";
import DayPlaceholder from "../days/DayPlaceholder";

function normalizeDays(raw: any): number[] {
  if (!Array.isArray(raw)) return [];
  return raw.map(Number).filter((n) => !isNaN(n));
}

export default function Home() {
  const today = getToday();
  const token = getOwnerToken();
  const isDev = token?.endsWith("-dev") ?? false;

  const [days, setDays] = useState<CalendarDay[]>([]);
  const [openedDays, setOpenedDays] = useState<number[]>([]);
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);

  const [infoMessage, setInfoMessage] = useState("");
  const [showInfoModal, setShowInfoModal] = useState(false);

  const [isPrivate, setIsPrivate] = useState(false);
  const [isInvalidToken, setIsInvalidToken] = useState(false);
  const [loading, setLoading] = useState(true);

  const [respectDates, setRespectDates] = useState(false);

  /* ============================
     1️⃣ CARGA INICIAL
  ============================ */
  useEffect(() => {
    async function init() {
      try {
        if (token) {
          setIsPrivate(true);
          const state = await getCalendarStateByToken(token);
          setOpenedDays(normalizeDays(state.opened_days));
        } else {
          setIsPrivate(false);
          const state = await getPublicCalendarState();
          setOpenedDays(normalizeDays(state.opened_days));
        }
      } catch {
        setIsInvalidToken(true);
      }
    }

    init();
  }, [token]);

  /* ============================
     2️⃣ CARGA DE DÍAS
  ============================ */
  useEffect(() => {
    getCalendarDays()
      .then(setDays)
      .finally(() => setLoading(false));
  }, []);

  /* ============================
     3️⃣ REALTIME (PUBLIC)
  ============================ */
  useEffect(() => {
    if (isPrivate) return;

    const channel = supabase
      .channel("public-calendar-realtime")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "calendar_state",
          filter: "owner_token=eq.PUBLIC",
        },
        (payload) => {
          const updated = normalizeDays(payload.new?.opened_days);
          setOpenedDays(updated);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isPrivate]);

  /* ============================
     4️⃣ ESTADOS ESPECIALES
  ============================ */
  if (isInvalidToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F1EC]">
        <div className="text-center max-w-md px-6">
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F1EC]">
        <p className="text-sm text-black/60">Cargando…</p>
      </div>
    );
  }

  const DayComponent = selectedDay && dayComponents[selectedDay.day_number];

  /* ============================
     5️⃣ RENDER
  ============================ */
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="min-h-screen bg-[#F5F1EC]"
    >
      <div className="mx-auto max-w-[1300px] px-6 pb-24">
        {/* HEADER */}
        <header className="pt-12 pb-16">
          <p className="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-4">
            MARILYN : MM
          </p>
          <h1 className="text-4xl md:text-7xl font-black uppercase leading-tight">
            Veinte días de <br /> Elegancia y Anticipación
          </h1>
        </header>

        <CalendarGrid
          days={days}
          today={today}
          openedDays={openedDays}
          isDateLocked={isDateLocked}
          isSameDay={isSameDay}
          respectDates={isDev && respectDates}
          onOpen={async (day) => {
            const shouldLockByDate = !isDev || (isDev && respectDates);

            if (shouldLockByDate && isDateLocked(day.unlock_date, today)) {
              const fecha = new Date(
                `${day.unlock_date}T00:00:00`,
              ).toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "long",
              });

              setInfoMessage(`Este día se abrirá el ${fecha}`);
              setShowInfoModal(true);
              return;
            }

            // 🌍 PUBLIC
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

            // 🔐 OWNER / DEV
            setSelectedDay(day);

            if (!token) return;
            const updated = await markDayAsOpened(token, day.day_number);
            setOpenedDays(updated);
          }}
        />
      </div>

      <InfoModal isOpen={showInfoModal} onClose={() => setShowInfoModal(false)}>
        {infoMessage}
      </InfoModal>

      {selectedDay &&
        (DayComponent ? (
          <DayComponent onClose={() => setSelectedDay(null)} />
        ) : (
          <DayPlaceholder
            day={selectedDay.day_number}
            onClose={() => setSelectedDay(null)}
          />
        ))}

      {isDev && (
        <div className="fixed bottom-4 right-4 z-50 bg-black text-white rounded-2xl p-4 space-y-2 shadow-xl">
          <p className="text-xs font-bold tracking-widest opacity-70">
            DEV MODE
          </p>

          <button
            className="block w-full text-sm px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20"
            onClick={async () => {
              const updated = await resetDevCalendar(token!);
              setOpenedDays(updated);
            }}
          >
            Resetear días
          </button>

          <button
            className="block w-full text-sm px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20"
            onClick={async () => {
              const updated = await openAllDaysDev(token!, days.length);
              setOpenedDays(updated);
            }}
          >
            Abrir todos
          </button>
          <button
            className={`block w-full text-sm px-4 py-2 rounded-lg transition ${
              respectDates
                ? "bg-white text-black"
                : "bg-white/10 hover:bg-white/20"
            }`}
            onClick={() => setRespectDates((v) => !v)}
          >
            Respetar fechas: {respectDates ? "ON" : "OFF"}
          </button>
        </div>
      )}
    </motion.div>
  );
}
