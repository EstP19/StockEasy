// Implementacion inicial SUPABASE
// No tocar
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sufixmhsobegeprstuif.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)