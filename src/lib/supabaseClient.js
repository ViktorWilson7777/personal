import { createClient } from "@supabase/supabase-js";

const defaultUrl = "https://jmerauzuflwenwxvtzml.supabase.co";
const defaultKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptZXJhdXp1Zmx3ZW53eHZ0em1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3NDUwNzEsImV4cCI6MjEwNjMyMTA3MX0.C6mLcLlOkJed6eN56Ry2WSdjVIVDo7dqN-hWYgG-HEY";

const supabaseUrl =
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_SUPABASE_URL) ||
  (typeof import.meta !== "undefined" && import.meta.env?.NEXT_PUBLIC_SUPABASE_URL) ||
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_URL) ||
  defaultUrl;

const supabaseAnonKey =
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY) ||
  (typeof import.meta !== "undefined" && import.meta.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY) ||
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_ANON_KEY) ||
  defaultKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
