// src/lib/date.ts

/**
 * Devuelve la fecha de "hoy" en Perú (YYYY-MM-DD)
 */
export function getToday(): string {
  const peruNow = new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "America/Lima",
    })
  )

  const year = peruNow.getFullYear()
  const month = String(peruNow.getMonth() + 1).padStart(2, "0")
  const day = String(peruNow.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

/**
 * Determina si un día está bloqueado por fecha
 */
export function isDateLocked(
  unlockDateISO: string,
  todayISO: string
): boolean {
  return unlockDateISO > todayISO
}

/**
 * Determina si dos fechas ISO son el mismo día
 */
export function isSameDay(
  aISO: string,
  bISO: string
): boolean {
  return aISO === bISO
}

/**
 * Determina si una fecha ya pasó respecto a hoy
 */
export function isPast(
  dateISO: string,
  todayISO: string
): boolean {
  return dateISO < todayISO
}
