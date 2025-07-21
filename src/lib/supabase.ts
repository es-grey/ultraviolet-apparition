import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create client only if environment variables are properly set
export const supabase = supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('https://') 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null

// Helper function to check if Supabase is connected
export const isSupabaseConnected = () => {
  return supabase !== null
}

// Helper function to get connection status
export const getConnectionStatus = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    return { connected: false, message: 'Environment variables not set' }
  }
  if (!supabaseUrl.startsWith('https://')) {
    return { connected: false, message: 'Invalid Supabase URL format' }
  }
  return { connected: true, message: 'Connected to Supabase' }
}

// Database types
export interface ExportRecord {
  id: string
  filename: string
  format: string
  content_type: string
  file_data: any
  metadata: any
  created_at: string
  user_id?: string
}

export interface NoteRecord {
  id: string
  title: string
  content: string
  type: 'thought' | 'code' | 'analysis' | 'vision'
  tags: string[]
  created_at: string
  updated_at: string
  user_id?: string
}

export interface ChatRecord {
  id: string
  message_type: 'user' | 'nova'
  content: string
  mode?: 'researcher' | 'strategist' | 'creative'
  created_at: string
  user_id?: string
}