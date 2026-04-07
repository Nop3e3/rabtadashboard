
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://pymaqejunqadcxavrlpd.supabase.co'
const supabaseKey='sb_publishable_R_ARD5x6oetpsR1hGNBP7g_mTgaeUk3'
export const supabase = createClient(supabaseUrl, supabaseKey)   