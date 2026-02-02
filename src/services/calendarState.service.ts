import { supabase } from "../lib/supabase"

/**
 * Normaliza opened_days para evitar null / strings
 */
function normalizeOpenedDays(raw: any): number[] {
  if (!Array.isArray(raw)) return []
  return raw.map(Number).filter((n) => !isNaN(n))
}

/**
 * 🔐 OWNER / DEV
 * Sirve SOLO para validar el token
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
 * 🌍 PÚBLICO
 * Estado GLOBAL real del calendario
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
 * - OWNER / DEV: solo AUTORIZAN
 * - El día se abre PARA TODOS (PUBLIC)
 */
export async function markDayAsOpened(
  ownerToken: string,
  dayNumber: number
) {
  // 1️⃣ Validar que el token sea válido
  await getCalendarStateByToken(ownerToken)

  // 2️⃣ Obtener estado público actual
  const publicState = await getPublicCalendarState()

  // 3️⃣ Si ya está abierto, no hacer nada
  if (publicState.opened_days.includes(dayNumber)) {
    return publicState.opened_days
  }

  const updatedDays = [...publicState.opened_days, dayNumber]

  // 4️⃣ Guardar el nuevo estado GLOBAL
  const { error } = await supabase
    .from("calendar_state")
    .update({ opened_days: updatedDays })
    .eq("owner_token", "PUBLIC")

  if (error) throw error

  return updatedDays
}
