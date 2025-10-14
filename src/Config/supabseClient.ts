import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://brywwnmpucfnwgoppkqo.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyeXd3bm1wdWNmbndnb3Bwa3FvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzMzM3OTAsImV4cCI6MjA2OTkwOTc5MH0.6gNXNYouNia_MBxUMsxZRLNKBQpI0xIeNbLarJd8KCE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
