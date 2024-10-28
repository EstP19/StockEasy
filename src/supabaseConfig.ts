import { createClient } from '@supabase/supabase-js';

// Lee las variables del entorno usando import.meta.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verificación: Asegúrate de que las variables existan
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables.');
}

// Crea el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);

