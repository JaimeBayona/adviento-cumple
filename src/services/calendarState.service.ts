import { supabase } from "../lib/supabase"

function normalizeOpenedDays(raw: any): number[] {
  if (!Array.isArray(raw)) return []
  return raw.map(Number).filter((n) => !isNaN(n))
}

/**
 * 🔐 OWNER / DEV
 */
export async function getCalendarStateByToken(ownerToken: string) {
  const { data, error } = await supabase
    .from("calendar_state")
    .select("*")
    .eq("owner_token", ownerToken)
    .single()

  if (error || !data) {
    throw new Error("TOKEN_NOT_AUTHORIZED")
  }

  return {
    ...data,
    opened_days: normalizeOpenedDays(data.opened_days),
  }
}

/**
 * 🌍 PUBLIC
 */
export async function getPublicCalendarState() {
  const { data, error } = await supabase
    .from("calendar_state")
    .select("*")
    .eq("owner_token", "PUBLIC")
    .single()

  if (error || !data) {
    throw new Error("PUBLIC_STATE_NOT_FOUND")
  }

  return {
    ...data,
    opened_days: normalizeOpenedDays(data.opened_days),
  }
}

/**
 * 🔓 Abrir día
 */
export async function markDayAsOpened(
  ownerToken: string,
  dayNumber: number
) {
  // 1️⃣ Estado OWNER / DEV
  const ownerState = await getCalendarStateByToken(ownerToken)

  if (ownerState.opened_days.includes(dayNumber)) {
    return ownerState.opened_days
  }

  const updatedOwnerDays = [...ownerState.opened_days, dayNumber]

  // 2️⃣ Guardar OWNER / DEV
  const { error: ownerError } = await supabase
    .from("calendar_state")
    .update({ opened_days: updatedOwnerDays })
    .eq("owner_token", ownerToken)

  if (ownerError) throw ownerError

  // 3️⃣ SOLO el OWNER REAL afecta al PUBLIC
  if (!ownerToken.endsWith("-dev")) {
    const publicState = await getPublicCalendarState()

    if (!publicState.opened_days.includes(dayNumber)) {
      const updatedPublicDays = [
        ...publicState.opened_days,
        dayNumber,
      ]

      const { error: publicError } = await supabase
        .from("calendar_state")
        .update({ opened_days: updatedPublicDays })
        .eq("owner_token", "PUBLIC")

      if (publicError) throw publicError
    }
  }

  return updatedOwnerDays
}

/**
 * 🧪 DEV — Resetear días
 */
export async function resetDevCalendar(ownerToken: string) {
  if (!ownerToken.endsWith("-dev")) return []

  const { error } = await supabase
    .from("calendar_state")
    .update({ opened_days: [] })
    .eq("owner_token", ownerToken)

  if (error) throw error
  return []
}

/**
 * 🧪 DEV — Abrir todos los días
 */
export async function openAllDaysDev(
  ownerToken: string,
  totalDays: number
) {
  if (!ownerToken.endsWith("-dev")) return []

  const allDays = Array.from({ length: totalDays }, (_, i) => i + 1)

  const { error } = await supabase
    .from("calendar_state")
    .update({ opened_days: allDays })
    .eq("owner_token", ownerToken)

  if (error) throw error
  return allDays
}

