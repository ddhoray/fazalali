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
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      cms_articles: {
        Row: {
          author_id: string | null
          body_html: string
          cover_image: string
          created_at: string
          excerpt: string
          id: string
          og_image: string | null
          principles: Json | null
          publish_at: string
          seo_description: string | null
          seo_title: string | null
          slug: string
          status: string
          tags: string[]
          title: string
          topic: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          body_html?: string
          cover_image?: string
          created_at?: string
          excerpt?: string
          id?: string
          og_image?: string | null
          principles?: Json | null
          publish_at?: string
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          status?: string
          tags?: string[]
          title: string
          topic?: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          body_html?: string
          cover_image?: string
          created_at?: string
          excerpt?: string
          id?: string
          og_image?: string | null
          principles?: Json | null
          publish_at?: string
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          status?: string
          tags?: string[]
          title?: string
          topic?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cms_articles_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "cms_staff"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_audit: {
        Row: {
          action: string
          created_at: string
          entity: string
          entity_id: string | null
          id: string
          staff_id: string | null
          staff_name: string | null
          summary: string | null
        }
        Insert: {
          action: string
          created_at?: string
          entity: string
          entity_id?: string | null
          id?: string
          staff_id?: string | null
          staff_name?: string | null
          summary?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          entity?: string
          entity_id?: string | null
          id?: string
          staff_id?: string | null
          staff_name?: string | null
          summary?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cms_audit_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "cms_staff"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_entries: {
        Row: {
          body: string | null
          collection: string
          created_at: string
          data: Json
          featured: boolean
          id: string
          image_url: string | null
          link_url: string | null
          position: number
          published: boolean
          subtitle: string | null
          title: string
          updated_at: string
        }
        Insert: {
          body?: string | null
          collection: string
          created_at?: string
          data?: Json
          featured?: boolean
          id?: string
          image_url?: string | null
          link_url?: string | null
          position?: number
          published?: boolean
          subtitle?: string | null
          title?: string
          updated_at?: string
        }
        Update: {
          body?: string | null
          collection?: string
          created_at?: string
          data?: Json
          featured?: boolean
          id?: string
          image_url?: string | null
          link_url?: string | null
          position?: number
          published?: boolean
          subtitle?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      cms_media: {
        Row: {
          alt: string
          content_type: string
          created_at: string
          created_by: string | null
          filename: string
          id: string
          path: string
          size: number
          url: string
        }
        Insert: {
          alt?: string
          content_type?: string
          created_at?: string
          created_by?: string | null
          filename: string
          id?: string
          path: string
          size?: number
          url: string
        }
        Update: {
          alt?: string
          content_type?: string
          created_at?: string
          created_by?: string | null
          filename?: string
          id?: string
          path?: string
          size?: number
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "cms_media_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "cms_staff"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_messages: {
        Row: {
          archived: boolean
          created_at: string
          email: string
          id: string
          message: string
          name: string
          read: boolean
        }
        Insert: {
          archived?: boolean
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          read?: boolean
        }
        Update: {
          archived?: boolean
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          read?: boolean
        }
        Relationships: []
      }
      cms_page_views: {
        Row: {
          created_at: string
          id: number
          path: string
        }
        Insert: {
          created_at?: string
          id?: never
          path: string
        }
        Update: {
          created_at?: string
          id?: never
          path?: string
        }
        Relationships: []
      }
      cms_pages: {
        Row: {
          data: Json
          key: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          data?: Json
          key: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          data?: Json
          key?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cms_pages_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "cms_staff"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_sessions: {
        Row: {
          created_at: string
          expires_at: string
          staff_id: string
          token_hash: string
        }
        Insert: {
          created_at?: string
          expires_at: string
          staff_id: string
          token_hash: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          staff_id?: string
          token_hash?: string
        }
        Relationships: [
          {
            foreignKeyName: "cms_sessions_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "cms_staff"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_staff: {
        Row: {
          active: boolean
          avatar_url: string | null
          bio: string | null
          created_at: string
          email: string | null
          id: string
          last_login_at: string | null
          name: string
          otp_hash: string
          phone: string
        }
        Insert: {
          active?: boolean
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          id?: string
          last_login_at?: string | null
          name?: string
          otp_hash: string
          phone: string
        }
        Update: {
          active?: boolean
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string | null
          id?: string
          last_login_at?: string | null
          name?: string
          otp_hash?: string
          phone?: string
        }
        Relationships: []
      }
      cms_staff_roles: {
        Row: {
          id: string
          role: string
          staff_id: string
        }
        Insert: {
          id?: string
          role?: string
          staff_id: string
        }
        Update: {
          id?: string
          role?: string
          staff_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cms_staff_roles_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: true
            referencedRelation: "cms_staff"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
