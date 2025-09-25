-- Create function to handle vote transactions
CREATE OR REPLACE FUNCTION public.handle_vote_transaction(
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

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.handle_vote_transaction(UUID, TEXT, TEXT, UUID, TEXT, TEXT) TO authenticated;
