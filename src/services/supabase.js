import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://latjsstohvstonbsjmin.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhdGpzc3RvaHZzdG9uYnNqbWluIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc3OTA1MDUsImV4cCI6MjAwMzM2NjUwNX0.giPYqzRH5aHAqbetqDvlwlbT_T9OueAEaZGSuzujJh8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
