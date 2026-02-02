import { supabase } from "../lib/supabase"
import type { CalendarDay } from "../types/calendar"

export async function getCalendarDays() {
    const { data, error } = await supabase
    .from("calendar_days")
    .select("id, day_number, title, unlock_date")
    .order("day_number")

    if (error) throw error
    return data

    return data as CalendarDay[]
}