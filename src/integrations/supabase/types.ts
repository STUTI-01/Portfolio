export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      adornments: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          display_order: number | null
          footnote: string | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          materials: string | null
          title: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          footnote?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          materials?: string | null
          title: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          footnote?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          materials?: string | null
          title?: string
        }
        Relationships: []
      }
      bird_logs: {
        Row: {
          common_name: string | null
          created_at: string
          description: string | null
          footnote: string | null
          habitat: string | null
          id: string
          image_url: string | null
          location: string | null
          sighting_date: string | null
          species_name: string
        }
        Insert: {
          common_name?: string | null
          created_at?: string
          description?: string | null
          footnote?: string | null
          habitat?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          sighting_date?: string | null
          species_name: string
        }
        Update: {
          common_name?: string | null
          created_at?: string
          description?: string | null
          footnote?: string | null
          habitat?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          sighting_date?: string | null
          species_name?: string
        }
        Relationships: []
      }
      detail_images: {
        Row: {
          caption: string | null
          created_at: string
          display_order: number | null
          entity_id: string
          entity_type: string
          id: string
          image_url: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          display_order?: number | null
          entity_id: string
          entity_type: string
          id?: string
          image_url: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          display_order?: number | null
          entity_id?: string
          entity_type?: string
          id?: string
          image_url?: string
        }
        Relationships: []
      }
      education: {
        Row: {
          created_at: string
          degree: string
          display_order: number | null
          id: string
          institution: string
          score: string | null
          year: string
        }
        Insert: {
          created_at?: string
          degree: string
          display_order?: number | null
          id?: string
          institution: string
          score?: string | null
          year: string
        }
        Update: {
          created_at?: string
          degree?: string
          display_order?: number | null
          id?: string
          institution?: string
          score?: string | null
          year?: string
        }
        Relationships: []
      }
      experiences: {
        Row: {
          company: string
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          role: string
          stats: Json | null
          tech_stack: string[] | null
          timeline: string
          type: string
          type_color: string
        }
        Insert: {
          company: string
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          role: string
          stats?: Json | null
          tech_stack?: string[] | null
          timeline: string
          type?: string
          type_color?: string
        }
        Update: {
          company?: string
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          role?: string
          stats?: Json | null
          tech_stack?: string[] | null
          timeline?: string
          type?: string
          type_color?: string
        }
        Relationships: []
      }
      gallery_photos: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          display_order: number | null
          footnote: string | null
          id: string
          image_url: string
          is_featured: boolean | null
          location: string | null
          title: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          footnote?: string | null
          id?: string
          image_url: string
          is_featured?: boolean | null
          location?: string | null
          title?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          footnote?: string | null
          id?: string
          image_url?: string
          is_featured?: boolean | null
          location?: string | null
          title?: string | null
        }
        Relationships: []
      }
      honors: {
        Row: {
          created_at: string
          display_order: number | null
          id: string
          title: string
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          id?: string
          title: string
        }
        Update: {
          created_at?: string
          display_order?: number | null
          id?: string
          title?: string
        }
        Relationships: []
      }
      poems: {
        Row: {
          content: string
          created_at: string
          id: string
          is_featured: boolean | null
          language: string
          theme: string | null
          title: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_featured?: boolean | null
          language?: string
          theme?: string | null
          title: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_featured?: boolean | null
          language?: string
          theme?: string | null
          title?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string
          demo_url: string | null
          display_order: number | null
          github_url: string | null
          id: string
          metrics: string | null
          summary: string | null
          tech_stack: string[] | null
          title: string
        }
        Insert: {
          created_at?: string
          demo_url?: string | null
          display_order?: number | null
          github_url?: string | null
          id?: string
          metrics?: string | null
          summary?: string | null
          tech_stack?: string[] | null
          title: string
        }
        Update: {
          created_at?: string
          demo_url?: string | null
          display_order?: number | null
          github_url?: string | null
          id?: string
          metrics?: string | null
          summary?: string | null
          tech_stack?: string[] | null
          title?: string
        }
        Relationships: []
      }
      skill_categories: {
        Row: {
          category: string
          created_at: string
          display_order: number | null
          id: string
          skills: string[] | null
        }
        Insert: {
          category: string
          created_at?: string
          display_order?: number | null
          id?: string
          skills?: string[] | null
        }
        Update: {
          category?: string
          created_at?: string
          display_order?: number | null
          id?: string
          skills?: string[] | null
        }
        Relationships: []
      }
      thoughts: {
        Row: {
          category: string | null
          content: string
          cover_image_url: string | null
          created_at: string
          footnote: string | null
          id: string
          is_published: boolean | null
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          content: string
          cover_image_url?: string | null
          created_at?: string
          footnote?: string | null
          id?: string
          is_published?: boolean | null
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          content?: string
          cover_image_url?: string | null
          created_at?: string
          footnote?: string | null
          id?: string
          is_published?: boolean | null
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
