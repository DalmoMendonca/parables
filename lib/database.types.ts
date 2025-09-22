export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
          preferred_bible_version: string;
          display_name: string;
          magenta_score: number;
          red_score: number;
          amber_score: number;
          orange_score: number;
          green_score: number;
          teal_score: number;
          turquoise_score: number;
          comments_unlocked: boolean;
        };
        Insert: {
          id: string;
          email: string;
          preferred_bible_version?: string;
          display_name?: string;
          magenta_score?: number;
          red_score?: number;
          amber_score?: number;
          orange_score?: number;
          green_score?: number;
          teal_score?: number;
          turquoise_score?: number;
          comments_unlocked?: boolean;
        };
        Update: {
          id?: string;
          email?: string;
          preferred_bible_version?: string;
          display_name?: string;
          magenta_score?: number;
          red_score?: number;
          amber_score?: number;
          orange_score?: number;
          green_score?: number;
          teal_score?: number;
          turquoise_score?: number;
          comments_unlocked?: boolean;
        };
      };
      parable_notes: {
        Row: {
          id: string;
          parable_id: string;
          altitude: string;
          content: string;
          upvotes: number;
          downvotes: number;
          created_at: string;
        };
        Insert: {
          parable_id: string;
          altitude: string;
          content: string;
          upvotes?: number;
          downvotes?: number;
        };
        Update: {
          id?: string;
          parable_id?: string;
          altitude?: string;
          content?: string;
          upvotes?: number;
          downvotes?: number;
        };
      };
      note_votes: {
        Row: {
          id: string;
          user_id: string;
          note_id: string;
          vote_type: 'upvote' | 'downvote';
          created_at: string;
        };
        Insert: {
          user_id: string;
          note_id: string;
          vote_type: 'upvote' | 'downvote';
        };
        Update: {
          vote_type: 'upvote' | 'downvote';
        };
      };
      comments: {
        Row: {
          id: string;
          parable_id: string;
          user_id: string;
          content: string;
          user_scores_snapshot: string; // JSON string of color scores at time of posting
          upvotes: number;
          created_at: string;
        };
        Insert: {
          parable_id: string;
          user_id: string;
          content: string;
          user_scores_snapshot: string;
          upvotes?: number;
        };
        Update: {
          content?: string;
          upvotes?: number;
        };
      };
      comment_votes: {
        Row: {
          id: string;
          user_id: string;
          comment_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          comment_id: string;
        };
        Update: never;
      };
      user_parable_votes: {
        Row: {
          id: string;
          user_id: string;
          parable_id: string;
          has_voted: boolean;
          created_at: string;
        };
        Insert: {
          user_id: string;
          parable_id: string;
          has_voted?: boolean;
        };
        Update: {
          has_voted: boolean;
        };
      };
      user_altitude_votes: {
        Row: {
          id: string;
          user_id: string;
          parable_id: string;
          altitude: 'magenta' | 'red' | 'amber' | 'orange' | 'green' | 'teal' | 'turquoise';
          vote_type: 'upvote' | 'downvote';
          created_at: string;
        };
        Insert: {
          user_id: string;
          parable_id: string;
          altitude: 'magenta' | 'red' | 'amber' | 'orange' | 'green' | 'teal' | 'turquoise';
          vote_type: 'upvote' | 'downvote';
        };
        Update: {
          altitude?: 'magenta' | 'red' | 'amber' | 'orange' | 'green' | 'teal' | 'turquoise';
          vote_type?: 'upvote' | 'downvote';
        };
      };
      user_parable_notes: {
        Row: {
          id: string;
          user_id: string;
          parable_id: string;
          content: string;
          updated_at: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          parable_id: string;
          content: string;
        };
        Update: {
          content?: string;
        };
      };
    };
  };
}

export type ColorAltitude = 'magenta' | 'red' | 'amber' | 'orange' | 'green' | 'teal' | 'turquoise';

export interface UserScores {
  magenta: number;
  red: number;
  amber: number;
  orange: number;
  green: number;
  teal: number;
  turquoise: number;
}



