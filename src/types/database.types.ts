export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5";
  };
  graphql_public: {
    Tables: Record<never, never>;
    Views: Record<never, never>;
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: Record<never, never>;
    CompositeTypes: Record<never, never>;
  };
  public: {
    Tables: {
      friend_requests: {
        Row: {
          addressee_id: string;
          created_at: string;
          id: string;
          requester_id: string;
        };
        Insert: {
          addressee_id?: string;
          created_at?: string;
          id?: string;
          requester_id?: string;
        };
        Update: {
          addressee_id?: string;
          created_at?: string;
          id?: string;
          requester_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "friend_requests_addressee_id_fkey";
            columns: ["addressee_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["auth_id"];
          },
          {
            foreignKeyName: "friend_requests_requester_id_fkey";
            columns: ["requester_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["auth_id"];
          },
        ];
      };
      friends: {
        Row: {
          created_at: string;
          id: string;
          user1_id: string;
          user2_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          user1_id?: string;
          user2_id?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          user1_id?: string;
          user2_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "friends_user1_id_fkey";
            columns: ["user1_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["auth_id"];
          },
          {
            foreignKeyName: "friends_user2_id_fkey";
            columns: ["user2_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["auth_id"];
          },
        ];
      };
      guestbook_comments: {
        Row: {
          author_id: string;
          content: string | null;
          created_at: string;
          id: string;
          post_id: string;
        };
        Insert: {
          author_id?: string;
          content?: string | null;
          created_at?: string;
          id?: string;
          post_id?: string;
        };
        Update: {
          author_id?: string;
          content?: string | null;
          created_at?: string;
          id?: string;
          post_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "guestbook_comments_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["auth_id"];
          },
          {
            foreignKeyName: "guestbook_comments_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "guestbook_posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "guestbook_replies_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["auth_id"];
          },
        ];
      };
      guestbook_posts: {
        Row: {
          author_id: string | null;
          content: string | null;
          created_at: string;
          homepage_id: string;
          id: string;
          is_read: boolean;
        };
        Insert: {
          author_id?: string | null;
          content?: string | null;
          created_at?: string;
          homepage_id: string;
          id?: string;
          is_read?: boolean;
        };
        Update: {
          author_id?: string | null;
          content?: string | null;
          created_at?: string;
          homepage_id?: string;
          id?: string;
          is_read?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "guestbook_posts_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["auth_id"];
          },
          {
            foreignKeyName: "guestbook_posts_homepage_id_fkey";
            columns: ["homepage_id"];
            isOneToOne: false;
            referencedRelation: "homepages";
            referencedColumns: ["id"];
          },
        ];
      };
      homepage_gallery_image_comments: {
        Row: {
          author_id: string | null;
          content: Json | null;
          created_at: string;
          id: string;
          post_id: string;
        };
        Insert: {
          author_id?: string | null;
          content?: Json | null;
          created_at?: string;
          id?: string;
          post_id: string;
        };
        Update: {
          author_id?: string | null;
          content?: Json | null;
          created_at?: string;
          id?: string;
          post_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "homepage_gallery_image_relies_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["auth_id"];
          },
          {
            foreignKeyName: "homepage_gallery_image_relies_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "homepage_gallery_images";
            referencedColumns: ["id"];
          },
        ];
      };
      homepage_gallery_image_likes: {
        Row: {
          created_at: string;
          id: string;
          image_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          image_id?: string;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          image_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "homepage_gallery_likes_image_id_fkey";
            columns: ["image_id"];
            isOneToOne: false;
            referencedRelation: "homepage_gallery_images";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "homepage_gallery_likes_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["auth_id"];
          },
        ];
      };
      homepage_gallery_images: {
        Row: {
          author_id: string;
          caption: string | null;
          created_at: string;
          homepage_id: string;
          id: string;
          image_url: string | null;
          visibility: Database["public"]["Enums"]["visibility"] | null;
        };
        Insert: {
          author_id: string;
          caption?: string | null;
          created_at?: string;
          homepage_id: string;
          id?: string;
          image_url?: string | null;
          visibility?: Database["public"]["Enums"]["visibility"] | null;
        };
        Update: {
          author_id?: string;
          caption?: string | null;
          created_at?: string;
          homepage_id?: string;
          id?: string;
          image_url?: string | null;
          visibility?: Database["public"]["Enums"]["visibility"] | null;
        };
        Relationships: [
          {
            foreignKeyName: "homepage_gallery_images_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["auth_id"];
          },
          {
            foreignKeyName: "homepage_gallery_images_homepage_id_fkey";
            columns: ["homepage_id"];
            isOneToOne: false;
            referencedRelation: "homepages";
            referencedColumns: ["id"];
          },
        ];
      };
      homepage_post_comments: {
        Row: {
          author_id: string | null;
          content: Json | null;
          created_at: string;
          id: string;
          post_id: string;
        };
        Insert: {
          author_id?: string | null;
          content?: Json | null;
          created_at?: string;
          id?: string;
          post_id: string;
        };
        Update: {
          author_id?: string | null;
          content?: Json | null;
          created_at?: string;
          id?: string;
          post_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "homepage_post_replies_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["auth_id"];
          },
          {
            foreignKeyName: "homepage_post_replies_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "homepage_posts";
            referencedColumns: ["id"];
          },
        ];
      };
      homepage_post_likes: {
        Row: {
          created_at: string;
          id: string;
          post_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          post_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          post_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "homepage_post_likes_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "homepage_posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "homepage_post_likes_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["auth_id"];
          },
        ];
      };
      homepage_posts: {
        Row: {
          content: Json | null;
          created_at: string;
          homepage_id: string;
          id: string;
          title: string | null;
          visibility: Database["public"]["Enums"]["visibility"] | null;
        };
        Insert: {
          content?: Json | null;
          created_at?: string;
          homepage_id: string;
          id?: string;
          title?: string | null;
          visibility?: Database["public"]["Enums"]["visibility"] | null;
        };
        Update: {
          content?: Json | null;
          created_at?: string;
          homepage_id?: string;
          id?: string;
          title?: string | null;
          visibility?: Database["public"]["Enums"]["visibility"] | null;
        };
        Relationships: [
          {
            foreignKeyName: "homepage_posts_homepage_id_fkey";
            columns: ["homepage_id"];
            isOneToOne: false;
            referencedRelation: "homepages";
            referencedColumns: ["id"];
          },
        ];
      };
      homepage_settings: {
        Row: {
          allow_guestbook: boolean | null;
          allow_show_visits: boolean | null;
          bgm_url: string | null;
          created_at: string;
          homepage_id: string;
          id: string;
          is_private: boolean | null;
        };
        Insert: {
          allow_guestbook?: boolean | null;
          allow_show_visits?: boolean | null;
          bgm_url?: string | null;
          created_at?: string;
          homepage_id: string;
          id?: string;
          is_private?: boolean | null;
        };
        Update: {
          allow_guestbook?: boolean | null;
          allow_show_visits?: boolean | null;
          bgm_url?: string | null;
          created_at?: string;
          homepage_id?: string;
          id?: string;
          is_private?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: "homepage_settings_homepage_id_fkey";
            columns: ["homepage_id"];
            isOneToOne: false;
            referencedRelation: "homepages";
            referencedColumns: ["id"];
          },
        ];
      };
      homepages: {
        Row: {
          created_at: string;
          id: string;
          owner_id: string;
          visit_count: number;
        };
        Insert: {
          created_at?: string;
          id?: string;
          owner_id: string;
          visit_count?: number;
        };
        Update: {
          created_at?: string;
          id?: string;
          owner_id?: string;
          visit_count?: number;
        };
        Relationships: [
          {
            foreignKeyName: "homepages_owner_id_fkey";
            columns: ["owner_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["auth_id"];
          },
        ];
      };
      os_gallery_images: {
        Row: {
          author_id: string;
          caption: string | null;
          created_at: string;
          id: string;
          image_url: string | null;
        };
        Insert: {
          author_id: string;
          caption?: string | null;
          created_at?: string;
          id?: string;
          image_url?: string | null;
        };
        Update: {
          author_id?: string;
          caption?: string | null;
          created_at?: string;
          id?: string;
          image_url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "gallery_images_owner_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["auth_id"];
          },
        ];
      };
      profiles: {
        Row: {
          auth_id: string;
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
          email: string;
          nickname: string | null;
        };
        Insert: {
          auth_id?: string;
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          email: string;
          nickname?: string | null;
        };
        Update: {
          auth_id?: string;
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          email?: string;
          nickname?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<never, never>;
    Functions: {
      check_email_exists: { Args: { target_email: string }; Returns: boolean };
      check_nickname_exists: {
        Args: { target_nickname: string };
        Returns: boolean;
      };
      get_user_friendships: {
        Args: never;
        Returns: {
          created_at: string;
          friend_id: string;
          id: string;
          status: string;
        }[];
      };
    };
    Enums: {
      visibility: "public" | "friend" | "private";
    };
    CompositeTypes: Record<never, never>;
  };
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      visibility: ["public", "friend", "private"],
    },
  },
} as const;
