// src/lib/date.ts

/**
 * Devuelve la fecha de "hoy" en formato YYYY-MM-DD
 * Respeta DEV_MODE y DEV_TODAY
 */
export function getToday(): string {
    const isDev = import.meta.env.VITE_DEV_MODE === "true"
    const devToday = import.meta.env.VITE_DEV_TODAY

    if (isDev && devToday) {
    return devToday
    }

    return new Date().toISOString().split("T")[0]
}

/**
 * Convierte una fecha ISO (YYYY-MM-DD) a Date a medianoche
 */
export function toMidnight(dateISO: string): Date {
    return new Date(dateISO + "T00:00:00")
}

/**
 * Determina si un día está bloqueado
 */
export function isDateLocked(
    unlockDateISO: string,
    todayISO: string
    ): boolean {
    return toMidnight(unlockDateISO) > toMidnight(todayISO)
}

/**
 * Determina si dos fechas ISO son el mismo día
 */
export function isSameDay(aISO: string, bISO: string): boolean {
    return toMidnight(aISO).getTime() === toMidnight(bISO).getTime()
}

/** 
 * Determina si una fecha ya pasó respecto a "hoy"
 */
export function isPast(dateISO: string, todayISO: string): boolean {
  return toMidnight(dateISO).getTime() < toMidnight(todayISO).getTime()
}
