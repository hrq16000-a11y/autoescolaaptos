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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      alert_config: {
        Row: {
          alert_queue_threshold: number
          email_enabled: boolean
          id: number
          slack_enabled: boolean
          updated_at: string
        }
        Insert: {
          alert_queue_threshold?: number
          email_enabled?: boolean
          id?: number
          slack_enabled?: boolean
          updated_at?: string
        }
        Update: {
          alert_queue_threshold?: number
          email_enabled?: boolean
          id?: number
          slack_enabled?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      alert_config_audit_log: {
        Row: {
          actor: string | null
          changed_at: string
          changed_fields: string[] | null
          id: number
          ip: string | null
          new_values: Json | null
          old_values: Json | null
          source: string | null
          user_agent: string | null
        }
        Insert: {
          actor?: string | null
          changed_at?: string
          changed_fields?: string[] | null
          id?: number
          ip?: string | null
          new_values?: Json | null
          old_values?: Json | null
          source?: string | null
          user_agent?: string | null
        }
        Update: {
          actor?: string | null
          changed_at?: string
          changed_fields?: string[] | null
          id?: number
          ip?: string | null
          new_values?: Json | null
          old_values?: Json | null
          source?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      campaign_events: {
        Row: {
          anon_id: string | null
          campaign: string
          created_at: string
          device: string | null
          event_type: string
          id: string
          page_path: string
          source: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          anon_id?: string | null
          campaign: string
          created_at?: string
          device?: string | null
          event_type: string
          id?: string
          page_path: string
          source?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          anon_id?: string | null
          campaign?: string
          created_at?: string
          device?: string | null
          event_type?: string
          id?: string
          page_path?: string
          source?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: []
      }
      marketing_optin: {
        Row: {
          campaign_source: string | null
          created_at: string
          data_aceite: string
          data_cadastro: string
          id: string
          ip: string | null
          origem: string
          origem_url: string | null
          quantidade_campanhas: number
          sheet_attempts: number
          sheet_last_attempt_at: string | null
          sheet_sync_error: string | null
          sheet_sync_status: string
          sheet_synced_at: string | null
          sheet_updated_range: string | null
          status: string
          telefone: string
          tipo: string
          ultima_campanha: string | null
          ultimo_template_enviado: string | null
          updated_at: string
          user_agent: string | null
        }
        Insert: {
          campaign_source?: string | null
          created_at?: string
          data_aceite?: string
          data_cadastro?: string
          id?: string
          ip?: string | null
          origem?: string
          origem_url?: string | null
          quantidade_campanhas?: number
          sheet_attempts?: number
          sheet_last_attempt_at?: string | null
          sheet_sync_error?: string | null
          sheet_sync_status?: string
          sheet_synced_at?: string | null
          sheet_updated_range?: string | null
          status?: string
          telefone: string
          tipo?: string
          ultima_campanha?: string | null
          ultimo_template_enviado?: string | null
          updated_at?: string
          user_agent?: string | null
        }
        Update: {
          campaign_source?: string | null
          created_at?: string
          data_aceite?: string
          data_cadastro?: string
          id?: string
          ip?: string | null
          origem?: string
          origem_url?: string | null
          quantidade_campanhas?: number
          sheet_attempts?: number
          sheet_last_attempt_at?: string | null
          sheet_sync_error?: string | null
          sheet_sync_status?: string
          sheet_synced_at?: string | null
          sheet_updated_range?: string | null
          status?: string
          telefone?: string
          tipo?: string
          ultima_campanha?: string | null
          ultimo_template_enviado?: string | null
          updated_at?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      marketing_optin_sync_attempts: {
        Row: {
          attempted_at: string
          error: string | null
          http_status: number | null
          id: number
          ok: boolean
          optin_id: string | null
          source: string | null
          telefone: string
          updated_range: string | null
        }
        Insert: {
          attempted_at?: string
          error?: string | null
          http_status?: number | null
          id?: number
          ok: boolean
          optin_id?: string | null
          source?: string | null
          telefone: string
          updated_range?: string | null
        }
        Update: {
          attempted_at?: string
          error?: string | null
          http_status?: number | null
          id?: number
          ok?: boolean
          optin_id?: string | null
          source?: string | null
          telefone?: string
          updated_range?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "marketing_optin_sync_attempts_optin_id_fkey"
            columns: ["optin_id"]
            isOneToOne: false
            referencedRelation: "marketing_optin"
            referencedColumns: ["id"]
          },
        ]
      }
      triagem_leads: {
        Row: {
          aceita_email: boolean | null
          aceita_whats: boolean | null
          categoria: string | null
          conhece_procedimento: string | null
          created_at: string
          data_inicio: string | null
          device: string | null
          email: string | null
          experiencia: string | null
          id: string
          ip: string | null
          lgpd_aceite: boolean
          nome: string | null
          origem: string | null
          prazo: string | null
          referrer: string | null
          servico: string | null
          situacao: string | null
          status: string
          status_funil: string
          telefone: string | null
          tempo_gasto_segundos: number | null
          updated_at: string
          user_agent: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          aceita_email?: boolean | null
          aceita_whats?: boolean | null
          categoria?: string | null
          conhece_procedimento?: string | null
          created_at?: string
          data_inicio?: string | null
          device?: string | null
          email?: string | null
          experiencia?: string | null
          id?: string
          ip?: string | null
          lgpd_aceite?: boolean
          nome?: string | null
          origem?: string | null
          prazo?: string | null
          referrer?: string | null
          servico?: string | null
          situacao?: string | null
          status?: string
          status_funil?: string
          telefone?: string | null
          tempo_gasto_segundos?: number | null
          updated_at?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          aceita_email?: boolean | null
          aceita_whats?: boolean | null
          categoria?: string | null
          conhece_procedimento?: string | null
          created_at?: string
          data_inicio?: string | null
          device?: string | null
          email?: string | null
          experiencia?: string | null
          id?: string
          ip?: string | null
          lgpd_aceite?: boolean
          nome?: string | null
          origem?: string | null
          prazo?: string | null
          referrer?: string | null
          servico?: string | null
          situacao?: string | null
          status?: string
          status_funil?: string
          telefone?: string | null
          tempo_gasto_segundos?: number | null
          updated_at?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      submit_marketing_optin: { Args: { payload: Json }; Returns: Json }
      submit_triagem: { Args: { payload: Json }; Returns: Json }
    }
    Enums: {
      app_role: "admin" | "user"
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
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
