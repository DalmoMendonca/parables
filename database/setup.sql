-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  preferred_bible_version TEXT DEFAULT 'ESV',
  display_name TEXT,
  comments_unlocked BOOLEAN DEFAULT FALSE
);

-- Create parable_notes table
CREATE TABLE IF NOT EXISTS parable_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  parable_id TEXT NOT NULL,
  altitude TEXT NOT NULL,
  content TEXT NOT NULL,
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(parable_id, altitude)
);

-- Create note_votes table
CREATE TABLE IF NOT EXISTS note_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  note_id UUID REFERENCES parable_notes(id) ON DELETE CASCADE,
  vote_type TEXT CHECK (vote_type IN ('upvote', 'downvote')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, note_id)
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  parable_id TEXT NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  user_scores_snapshot TEXT NOT NULL, -- JSON string
  upvotes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create comment_votes table
CREATE TABLE IF NOT EXISTS comment_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, comment_id)
);

-- Create user_parable_votes table to track which parables user has voted on
CREATE TABLE IF NOT EXISTS user_parable_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  parable_id TEXT NOT NULL,
  has_voted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, parable_id)
);

-- Create user_altitude_votes table to track votes on hardcoded content
CREATE TABLE IF NOT EXISTS user_altitude_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  parable_id TEXT NOT NULL,
  altitude TEXT NOT NULL,
  vote_type TEXT CHECK (vote_type IN ('upvote', 'downvote')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, parable_id, altitude)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE parable_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE note_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_parable_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_altitude_votes ENABLE ROW LEVEL SECURITY;

-- Create policies
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Anyone can view parable notes" ON parable_notes
  FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can insert parable notes" ON parable_notes
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow admin to update notes
CREATE POLICY "Admin can update parable notes" ON parable_notes
  FOR UPDATE USING (true) WITH CHECK (auth.jwt() ->> 'email' = 'dalmomendonca@gmail.com');

-- Grant necessary permissions to the function
GRANT EXECUTE ON FUNCTION update_note_content(UUID, TEXT) TO authenticated;

CREATE POLICY "Users can manage their own votes" ON note_vote

CREATE POLICY "Users can insert their own comments" ON comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their own comment votes" ON comment_votes
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own parable votes" ON user_parable_votes
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own altitude votes" ON user_altitude_votes
  FOR ALL USING (auth.uid() = user_id);

-- Create functions for updating vote counts
CREATE OR REPLACE FUNCTION update_note_vote_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.vote_type = 'upvote' THEN
      UPDATE parable_notes SET upvotes = upvotes + 1 WHERE id = NEW.note_id;
    ELSE
      UPDATE parable_notes SET downvotes = downvotes + 1 WHERE id = NEW.note_id;
    END IF;
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    -- Handle vote change
    IF OLD.vote_type = 'upvote' THEN
      UPDATE parable_notes SET upvotes = upvotes - 1 WHERE id = OLD.note_id;
    ELSE
      UPDATE parable_notes SET downvotes = downvotes - 1 WHERE id = OLD.note_id;
    END IF;
    
    IF NEW.vote_type = 'upvote' THEN
      UPDATE parable_notes SET upvotes = upvotes + 1 WHERE id = NEW.note_id;
    ELSE
      UPDATE parable_notes SET downvotes = downvotes + 1 WHERE id = NEW.note_id;
    END IF;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.vote_type = 'upvote' THEN
      UPDATE parable_notes SET upvotes = upvotes - 1 WHERE id = OLD.note_id;
    ELSE
      UPDATE parable_notes SET downvotes = downvotes - 1 WHERE id = OLD.note_id;
    END IF;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create function to handle vote transactions
CREATE OR REPLACE FUNCTION handle_vote_transaction(
  p_user_id UUID,
  p_parable_id TEXT,
  p_altitude TEXT,
  p_note_id UUID,
  p_vote_type TEXT,
  p_current_vote TEXT
) RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  -- Start a transaction
  BEGIN
    -- First, handle the altitude vote
    IF p_vote_type IS NULL THEN
      -- Remove the vote
      DELETE FROM user_altitude_votes
      WHERE user_id = p_user_id
        AND parable_id = p_parable_id
        AND altitude = p_altitude;

      -- Also remove from note_votes
      DELETE FROM note_votes
      WHERE user_id = p_user_id
        AND note_id = p_note_id;
    ELSE
      -- Upsert the altitude vote
      INSERT INTO user_altitude_votes (user_id, parable_id, altitude, vote_type)
      VALUES (p_user_id, p_parable_id, p_altitude, p_vote_type::TEXT)
      ON CONFLICT (user_id, parable_id, altitude)
      DO UPDATE SET vote_type = EXCLUDED.vote_type;

      -- Upsert the note vote (this will trigger the update_note_vote_counts function)
      INSERT INTO note_votes (user_id, note_id, vote_type)
      VALUES (p_user_id, p_note_id, p_vote_type::TEXT)
      ON CONFLICT (user_id, note_id)
      DO UPDATE SET vote_type = EXCLUDED.vote_type;
    END IF;

    -- Return success
    result := json_build_object('status', 'success');
    RETURN result;
  EXCEPTION WHEN OTHERS THEN
    -- Return error details
    result := json_build_object(
      'status', 'error',
      'message', SQLERRM,
      'detail', SQLSTATE
    );
    RETURN result;
  END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to safely update note content
CREATE OR REPLACE FUNCTION update_note_content(note_id UUID, new_content TEXT)
RETURNS SETOF parable_notes AS $$
BEGIN
  RETURN QUERY 
  UPDATE parable_notes 
  SET content = new_content,
      updated_at = NOW()
  WHERE id = note_id
  RETURNING *;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers
CREATE TRIGGER note_vote_counts_trigger
  AFTER INSERT OR UPDATE OR DELETE ON note_votes
  FOR EACH ROW EXECUTE FUNCTION update_note_vote_counts();

-- Function to check and unlock comments
CREATE OR REPLACE FUNCTION check_comments_unlock()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if user has voted on all parables (assuming 37 parables)
  IF (SELECT COUNT(DISTINCT parable_id) FROM user_parable_votes 
      WHERE user_id = NEW.user_id AND has_voted = true) >= 37 THEN
    UPDATE users SET comments_unlocked = true WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER comments_unlock_trigger
  AFTER INSERT OR UPDATE ON user_parable_votes
  FOR EACH ROW EXECUTE FUNCTION check_comments_unlock();