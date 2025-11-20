import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

// ==========================
// CONFIGURA TU SUPABASE
// ==========================
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wdXJneHN4cXZyZGZyeGticnJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NjExODksImV4cCI6MjA3NjEzNzE4OX0.Xjny_CN8fp0hmqvvlQJCjevN2-7lhvIpXG4cL_xz8f8"
const SUPABASE_URL = "https://npurgxsxqvrdfrxkbrri.supabase.co"

// Crear cliente una sola vez
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
