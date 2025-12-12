
import { createClient } from '@supabase/supabase-js'

export type MotionJob = {
    id: number
    user_id: string
    created_at: string
    status: 'pending' | 'processing' | 'completed' | 'failed'
    video_filename: string
    asset_id?: string
    blockchain_tx?: string
    error_message?: string
    video_cid?: string
    motion_cid?: string
    metadata_cid?: string
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
