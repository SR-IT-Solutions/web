import { PostgrestClient } from "@supabase/postgrest-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const CATALOG_TABLE = "products";

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

let client = null;

export function getSupabaseClient() {
  if (!isSupabaseConfigured) return null;
  if (!client) {
    client = new PostgrestClient(`${SUPABASE_URL}/rest/v1`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });
  }
  return client;
}
