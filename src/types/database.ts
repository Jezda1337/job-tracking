export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      job: {
        Row: {
          companyName: string | null
          created_at: string | null
          id: string
          position: string | null
          status: string | null
          submitedDate: string | null
        }
        Insert: {
          companyName?: string | null
          created_at?: string | null
          id: string
          position?: string | null
          status?: string | null
          submitedDate?: string | null
        }
        Update: {
          companyName?: string | null
          created_at?: string | null
          id?: string
          position?: string | null
          status?: string | null
          submitedDate?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
