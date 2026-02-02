import { supabase } from "../lib/supabase"

function normalizeOpenedDays(raw: any): number[] {
  if (!Array.isArray(raw)) return []
  return raw.map(Number).filter((n) => !isNaN(n))
}

/**
 * 🔐 OWNER / DEV
 * SOLO tokens existentes
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
 * 🌍 PÚBLICO (estado global)
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
 * 🔓 Abrir día (solo owner/dev)
 */
export async function markDayAsOpened(
  ownerToken: string,
  dayNumber: number
) {
  const state = await getCalendarStateByToken(ownerToken)

  if (state.opened_days.includes(dayNumber)) {
    return state.opened_days
  }

  const updatedDays = [...state.opened_days, dayNumber]

  const { error } = await supabase
    .from("calendar_state")
    .update({ opened_days: updatedDays })
    .eq("owner_token", ownerToken)

  if (error) throw error

  return updatedDays
}
