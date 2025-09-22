-- Cleanup script to fix voting data
-- This will remove duplicate votes and reset scores properly

-- First, let's see what we have
SELECT 
  u.email,
  COUNT(DISTINCT uav.parable_id || '-' || uav.altitude) as unique_votes,
  COUNT(*) as total_vote_records
FROM users u
LEFT JOIN user_altitude_votes uav ON u.id = uav.user_id
WHERE u.email = 'dalmomendonca@gmail.com'
GROUP BY u.email;

-- Remove any duplicate votes (keep only the most recent one for each parable-altitude combination)
DELETE FROM user_altitude_votes 
WHERE id NOT IN (
  SELECT DISTINCT ON (user_id, parable_id, altitude) id
  FROM user_altitude_votes
  ORDER BY user_id, parable_id, altitude, created_at DESC
);

-- Remove the score columns from users table (if they exist)
ALTER TABLE users DROP COLUMN IF EXISTS magenta_score;
ALTER TABLE users DROP COLUMN IF EXISTS red_score;
ALTER TABLE users DROP COLUMN IF EXISTS amber_score;
ALTER TABLE users DROP COLUMN IF EXISTS orange_score;
ALTER TABLE users DROP COLUMN IF EXISTS green_score;
ALTER TABLE users DROP COLUMN IF EXISTS teal_score;
ALTER TABLE users DROP COLUMN IF EXISTS turquoise_score;

-- Verify the cleanup
SELECT 
  u.email,
  uav.parable_id,
  uav.altitude,
  uav.vote_type,
  uav.created_at
FROM users u
LEFT JOIN user_altitude_votes uav ON u.id = uav.user_id
WHERE u.email = 'dalmomendonca@gmail.com'
ORDER BY uav.parable_id, uav.altitude;

-- Count votes per altitude for verification
SELECT 
  u.email,
  uav.altitude,
  SUM(CASE WHEN uav.vote_type = 'upvote' THEN 1 ELSE -1 END) as score
FROM users u
LEFT JOIN user_altitude_votes uav ON u.id = uav.user_id
WHERE u.email = 'dalmomendonca@gmail.com'
GROUP BY u.email, uav.altitude
ORDER BY uav.altitude;