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
CREATE POLICY "Users can view their own data" ON users
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Anyone can view parable notes" ON parable_notes
  FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can insert parable notes" ON parable_notes
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can manage their own votes" ON note_votes
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view comments" ON comments
  FOR SELECT USING (true);

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