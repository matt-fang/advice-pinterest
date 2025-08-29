import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Database = {
  public: {
    Tables: {
      advice_pins: {
        Row: {
          id: string
          created_at: string
          user_query: string
          title: string
          content: string
          style_type: 'square' | 'tall' | 'quote'
          color_scheme: string
          background_image?: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_query: string
          title: string
          content: string
          style_type: 'square' | 'tall' | 'quote'
          color_scheme: string
          background_image?: string
        }
        Update: {
          id?: string
          created_at?: string
          user_query?: string
          title?: string
          content?: string
          style_type?: 'square' | 'tall' | 'quote'
          color_scheme?: string
          background_image?: string
        }
      }
    }
  }
}