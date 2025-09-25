'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageCircle, Lock, BookOpen, ThumbsUp, ThumbsDown, UserCircle, Users, ArrowLeft, Loader2, Edit, Save, X } from 'lucide-react';
import { parables } from '@/data/parables';
import { supabase } from '@/lib/supabase-client';
import { User } from '@supabase/supabase-js';
import type { Database, ColorAltitude, UserScores } from '@/lib/database.types';

// Type is used in type definitions but not directly in the code
// Keeping it for future reference
// type NoteUpdateResult = {
//   id: string;
//   content: string;
//   upvotes: number;
//   downvotes: number;
//   updated_at: string;
// };

interface Note {
  id: string;
  altitude: ColorAltitude;
  content: string;
  upvotes: number;
  downvotes: number;
}

interface ParableComment {
  id: string;
  created_at: string;
  content: string;
  user_scores_snapshot: string;
}

const DEFAULT_USER_SCORES: UserScores = {
  magenta: 0,
  red: 0,
  amber: 0,
  orange: 0,
  green: 0,
  teal: 0,
  turquoise: 0,
};
const altitudeInfo = {
  magenta: { name: 'Miracle', color: 'var(--magenta)' },
  red: { name: 'Warrior', color: 'var(--red)' },
  amber: { name: 'Traditional', color: 'var(--amber)' },
  orange: { name: 'Rational', color: 'var(--orange)' },
  green: { name: 'Pluralistic', color: 'var(--green)' },
  teal: { name: 'Integral', color: 'var(--teal)' },
  turquoise: { name: 'Holistic', color: 'var(--turquoise)' }
};

const altitudeEntries = Object.entries(altitudeInfo) as Array<[ColorAltitude, { name: string; color: string }]>;

// Type imports from database schema
type UsersInsert = Database['public']['Tables']['users']['Insert'];
type UsersUpdate = Database['public']['Tables']['users']['Update'];
type UserAltitudeVoteRow = Database['public']['Tables']['user_altitude_votes']['Row'];
type NoteVoteRow = Database['public']['Tables']['note_votes']['Row'];
type ParableNoteRow = Database['public']['Tables']['parable_notes']['Row'];
type UserParableNoteInsert = Database['public']['Tables']['user_parable_notes']['Insert'];
type UserParableVoteInsert = Database['public']['Tables']['user_parable_votes']['Insert'];

// Extend the Database type to include our RPC function
// This type is used for documentation and future type safety
type HandleVoteTransactionParams = {
  p_user_id: string;
  p_parable_id: string;
  p_altitude: string;
  p_note_id: string;
  p_vote_type: 'upvote' | 'downvote' | null;
  p_current_vote: 'upvote' | 'downvote' | null;
};

declare module '@supabase/supabase-js' {
  interface Database {
    public: {
      Functions: {
        handle_vote_transaction: (params: HandleVoteTransactionParams) => Promise<{
          data: unknown;
          error: Error | null;
        }>;
      };
    };
  }
}

export default function ParablePage() {
  const params = useParams();
  const slug = params.slug as string;

  const [user, setUser] = useState<User | null>(null);
  const latestUserRef = useRef<User | null>(null);
  const [selectedVersion, setSelectedVersion] = useState('ESV');
  const [selectedGospel, setSelectedGospel] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);
  const [userVotes, setUserVotes] = useState<{ [noteId: string]: 'upvote' | 'downvote' }>({});
  const [, setUserScores] = useState<UserScores>(DEFAULT_USER_SCORES);
  const [commentsUnlocked, setCommentsUnlocked] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [personalNote, setPersonalNote] = useState('');
  const [isNoteLoading, setIsNoteLoading] = useState(false);
  const [noteStatus, setNoteStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [noteError, setNoteError] = useState<string | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(null);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editedNoteContent, setEditedNoteContent] = useState('');

  const parable = parables.find(p => p.slug === slug);
  const comments: ParableComment[] = [];

  const calculateAndSetScores = useCallback(async (userId: string) => {
    const { data: allVotes, error } = await supabase
      .from('user_altitude_votes')
      .select('altitude, vote_type')
      .eq('user_id', userId);

    if (error) {
      console.error('Error loading altitude votes:', error);
      return;
    }

    const scores: UserScores = { ...DEFAULT_USER_SCORES };
    const votes: Pick<UserAltitudeVoteRow, 'altitude' | 'vote_type'>[] = allVotes ?? [];

    votes.forEach((vote) => {
      if (!vote?.vote_type) {
        return;
      }

      const altitudeKey: ColorAltitude = vote.altitude;
      const current = scores[altitudeKey] ?? 0;
      scores[altitudeKey] = current + (vote.vote_type === 'upvote' ? 1 : -1);
    });

    setUserScores(scores);
    console.log('Calculated scores from votes:', scores);
  }, [setUserScores]);

  const loadUserData = useCallback(async (userId: string) => {
    const { data: userData, error } = await supabase
      .from('users')
      .select('id, email, preferred_bible_version, comments_unlocked')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error loading user record:', error);
      return;
    }

    if (userData) {
      setCommentsUnlocked(userData.comments_unlocked ?? false);
      setSelectedVersion(userData.preferred_bible_version ?? 'ESV');
      await calculateAndSetScores(userId);
      return;
    }

    const { data: session } = await supabase.auth.getSession();
    const sessionUser = session?.session?.user;

    if (!sessionUser?.email) {
      console.error('Cannot create user record without a valid email address');
      return;
    }

    const newUser: UsersInsert = {
      id: sessionUser.id,
      email: sessionUser.email,
      preferred_bible_version: 'ESV',
      comments_unlocked: false,
    };

    const { error: insertError } = await supabase.from('users').insert(newUser);

    if (insertError) {
      console.error('Error creating user record:', insertError);
      return;
    }

    setUserScores({ ...DEFAULT_USER_SCORES });
    setCommentsUnlocked(false);
    setSelectedVersion('ESV');
  }, [calculateAndSetScores, setCommentsUnlocked, setSelectedVersion, setUserScores]);

  const loadNotes = useCallback(async () => {
    if (!parable?.id) {
      return;
    }

    const { data: notesData, error } = await supabase
      .from('parable_notes')
      .select('id, altitude, content, upvotes, downvotes')
      .eq('parable_id', parable.id);

    if (error) {
      console.error('Error loading notes:', error);
      return;
    }

    const noteRows: Pick<ParableNoteRow, 'id' | 'altitude' | 'content' | 'upvotes' | 'downvotes'>[] = notesData ?? [];
    const mappedNotes: Note[] = noteRows.map((note) => ({
      id: note.id,
      altitude: note.altitude as ColorAltitude,
      content: note.content,
      upvotes: note.upvotes ?? 0,
      downvotes: note.downvotes ?? 0,
    }));

    setNotes(mappedNotes);
  }, [parable?.id, setNotes]);

  const loadUserVotes = useCallback(async (currentUser?: User) => {
    const activeUser = currentUser ?? latestUserRef.current;

    if (!activeUser || !parable?.id) {
      return;
    }

    console.log('Loading user votes for parable:', parable.id);

    const { data: votesData, error: noteVoteError } = await supabase
      .from('note_votes')
      .select('note_id, vote_type')
      .eq('user_id', activeUser.id);

    if (noteVoteError) {
      console.error('Error loading note votes:', noteVoteError);
      return;
    }

    const { data: altitudeVotesData, error: altitudeError } = await supabase
      .from('user_altitude_votes')
      .select('altitude, vote_type')
      .eq('user_id', activeUser.id)
      .eq('parable_id', parable.id);

    if (altitudeError) {
      console.error('Error loading altitude votes:', altitudeError);
      return;
    }

    const noteVotes: Pick<NoteVoteRow, 'note_id' | 'vote_type'>[] = votesData ?? [];
    const altitudeVotes: Pick<UserAltitudeVoteRow, 'altitude' | 'vote_type'>[] = altitudeVotesData ?? [];
    const votes: Record<string, 'upvote' | 'downvote'> = {};

    noteVotes.forEach((vote) => {
      if (vote?.note_id && vote.vote_type) {
        votes[vote.note_id] = vote.vote_type;
      }
    });

    altitudeVotes.forEach((vote) => {
      if (vote?.altitude && vote.vote_type) {
        votes[vote.altitude] = vote.vote_type;
      }
    });

    setUserVotes(votes);
    console.log('Loaded user votes:', votes);
  }, [parable?.id]);

  useEffect(() => {
    latestUserRef.current = user;
  }, [user]);

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!isMounted) {
        return;
      }

      setUser(session?.user ?? null);

      if (session?.user) {
        void loadUserData(session.user.id);
        if (parable) {
          void loadUserVotes(session.user);
        }
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!isMounted) {
        return;
      }

      setUser(session?.user ?? null);

      if (session?.user && event === 'SIGNED_IN') {
        await loadUserData(session.user.id);
        if (parable) {
          await loadUserVotes(session.user);
        }
      }
    });

    if (parable) {
      setSelectedGospel(Object.keys(parable.gospels)[0]);
      void loadNotes();
    }

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [loadNotes, loadUserData, loadUserVotes, parable]);

  useEffect(() => {
    if (!user || !parable) {
      return;
    }

    void loadUserVotes(user);
  }, [loadUserVotes, parable, user]);

  useEffect(() => {
    if (!user || !parable) return;

    let isMounted = true;

    const fetchPersonalNote = async () => {
      setIsNoteLoading(true);
      setNoteError(null);

      try {
        const { data, error } = await supabase
          .from('user_parable_notes')
          .select('content, updated_at')
          .eq('user_id', user.id)
          .eq('parable_id', parable.id)
          .maybeSingle();

        if (!isMounted) {
          return;
        }

        if (error) {
          console.error('Error loading personal note:', error);
          setNoteError('Could not load your note. Please try again.');
        } else {
          setPersonalNote(data?.content ?? '');
          setLastSavedAt(data?.updated_at ?? null);
          setNoteStatus('idle');
        }
      } catch (error) {
        if (!isMounted) {
          return;
        }
        console.error('Unexpected error loading personal note:', error);
        setNoteError('Could not load your note. Please try again.');
      } finally {
        if (isMounted) {
          setIsNoteLoading(false);
        }
      }
    };

    fetchPersonalNote();

    return () => {
      isMounted = false;
    };
  }, [parable, user]);

  useEffect(() => {
    if (!user) {
      setPersonalNote('');
      setLastSavedAt(null);
      setNoteStatus('idle');
      setNoteError(null);
    }
  }, [user]);


  const handleSignIn = async () => {
    if (typeof window === 'undefined') return;

    const redirectUrl = `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(window.location.href)}`;

    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
      },
    });
  };
  const handleSaveNote = async (noteId: string) => {
    if (!user || !parable) return;
    
    try {
      // Only update the content, don't touch the vote counts
      const { error } = await supabase
        .from('parable_notes')
        .update({ content: editedNoteContent })
        .eq('id', noteId);
      
      if (error) {
        console.error('Supabase update error:', error);
        throw error;
      }
      
      // Update local state
      setNotes(notes.map((note: Note) => 
        note.id === noteId 
          ? { ...note, content: editedNoteContent } 
          : note
      ));
      
      setEditingNoteId(null);
    } catch (error) {
      console.error('Error updating note:', error);
      if (error instanceof Error) {
        console.error('Error details:', {
          message: error.message,
          stack: error.stack,
          name: error.name
        });
      }
    }
  };

  const handleSavePersonalNote = async () => {
    if (!user || !parable) {
      return;
    }

    setNoteError(null);
    setNoteStatus('saving');

    try {
      const notePayload: UserParableNoteInsert = {
        user_id: user.id,
        parable_id: parable.id,
        content: personalNote,
      };

      const { data, error } = await supabase
        .from('user_parable_notes')
        .upsert(notePayload, { onConflict: 'user_id,parable_id' })
        .select('content, updated_at')
        .single();

      if (error) {
        throw error;
      }

      setPersonalNote(data?.content ?? personalNote);
      setLastSavedAt(data?.updated_at ?? new Date().toISOString());
      setNoteStatus('saved');
    } catch (error) {
      console.error('Error saving personal note:', error);
      setNoteStatus('error');
      setNoteError('Could not save your note. Please try again.');
    }
  };

  const handleVote = async (voteKey: string, altitudeKey: ColorAltitude, voteType: 'upvote' | 'downvote') => {
    if (!user || !parable) return;

    console.log(`Voting ${voteType} on ${voteKey}`);

    // Ensure user exists
    const userExists = await ensureUserExists(user.id, user.email!);
    if (!userExists) {
      console.error('Failed to create user record');
      return;
    }

    const currentVote = userVotes[voteKey];
    let newVoteType: 'upvote' | 'downvote' | null = voteType;

    // Determine the new vote state
    if (currentVote === voteType) {
      // Clicking the same vote removes it
      newVoteType = null;
      console.log(`Removing ${voteType} vote`);
    } else {
      // Either first vote or switching vote
      console.log(currentVote ? `Switching from ${currentVote} to ${voteType}` : `First ${voteType} vote`);
    }

    try {
      // Find the note ID for this altitude
      const { data: noteData, error: noteError } = await supabase
        .from('parable_notes')
        .select('id')
        .eq('parable_id', parable.id)
        .eq('altitude', altitudeKey)
        .single();

      if (noteError) {
        console.error('Error finding note:', noteError);
        return;
      }

      // Start a transaction to ensure both votes are in sync
      // Using type assertion to handle the RPC call
      type RpcFunction = (fn: string, params: HandleVoteTransactionParams) => Promise<{ error: Error | null }>;
      const { error: transactionError } = await (supabase.rpc as unknown as RpcFunction)('handle_vote_transaction', {
        p_user_id: user.id,
        p_parable_id: parable.id,
        p_altitude: altitudeKey,
        p_note_id: noteData.id,
        p_vote_type: newVoteType,
        p_current_vote: currentVote || null
      });

      if (transactionError) {
        console.error('Error in vote transaction:', transactionError);
        return;
      }

      console.log(`Vote transaction completed for ${altitudeKey}`);

      // Update local vote state
      const newVotes = { ...userVotes };
      if (newVoteType === null) {
        delete newVotes[voteKey];
      } else {
        newVotes[voteKey] = newVoteType;
      }
      setUserVotes(newVotes);

      // Recalculate scores from actual votes
      await calculateAndSetScores(user.id);

      // Mark parable as voted
      const parableVotePayload: UserParableVoteInsert = {
        user_id: user.id,
        parable_id: parable.id,
        has_voted: true
      };

      const { error: parableError } = await supabase
        .from('user_parable_votes')
        .upsert(parableVotePayload, { onConflict: 'user_id,parable_id' });

      if (parableError) {
        console.error('Error marking parable as voted:', parableError);
      }

      console.log('Vote recorded successfully');

      // Check comments unlock
      checkCommentsUnlock();
    } catch (error) {
      console.error('Voting error:', error);
    }

  };

  const ensureUserExists = async (userId: string, userEmail: string) => {
    console.log('Checking if user exists:', userId);

    const { data: existingUser, error: selectError } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId)
      .maybeSingle();

    if (selectError) {
      console.error('Error checking for existing user:', selectError);
    }

    if (existingUser) {
      return true;
    }

    console.log('Creating user record for:', userEmail);

    const newUserPayload: UsersInsert = {
      id: userId,
      email: userEmail,
      preferred_bible_version: 'ESV',
      comments_unlocked: false,
      magenta_score: 0,
      red_score: 0,
      amber_score: 0,
      orange_score: 0,
      green_score: 0,
      teal_score: 0,
      turquoise_score: 0,
    };

    const { error: insertError } = await supabase.from('users').insert(newUserPayload);

    if (insertError) {
      console.error('Error creating user:', insertError);
      return false;
    }
    console.log('User record created successfully');

    setUserScores({ ...DEFAULT_USER_SCORES });
    setCommentsUnlocked(false);
    setSelectedVersion('ESV');
    return true;
  };

  const checkCommentsUnlock = async () => {
    if (!user) return;

    // Check if user has voted on all parables
    const { data: userParableVotes } = await supabase
      .from('user_parable_votes')
      .select('parable_id')
      .eq('user_id', user.id)
      .eq('has_voted', true);

    if ((userParableVotes?.length ?? 0) >= 37) {
      const updatePayload: UsersUpdate = { comments_unlocked: true };
      const { error: updateError } = await supabase
        .from('users')
        .update(updatePayload)
        .eq('id', user.id);

      if (updateError) {
        console.error('Error unlocking comments:', updateError);
        return;
      }

      setCommentsUnlocked(true);
    }
  };

  if (!parable) {
    return <div>Parable not found</div>;
  }

  const currentText = parable.texts[selectedVersion as keyof typeof parable.texts]?.[selectedGospel];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen size={18} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">Parables.io</h1>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/#parables"
                scroll={false}
                aria-label="Back to Parables"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-purple-600 transition"
              >
                <ArrowLeft size={16} />
                <span className="hidden sm:inline">Back to Parables</span>
              </Link>
              {user ? (
                <Link href="/profile" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-purple-600 transition">
                  <UserCircle size={18} />
                  <span className="hidden sm:inline">Profile</span>
                </Link>
              ) : (
                <button
                  onClick={handleSignIn}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 hover:text-purple-700 transition whitespace-nowrap"
                >
                  <Users size={16} />
                  <span className="whitespace-nowrap">Sign In with Google</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="hero-gradient text-white py-8 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold">{parable.title}</h1>
          </motion.div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content - Text (takes 3/4 on desktop) */}
          <div className="lg:col-span-3 order-1 lg:order-1">
            <motion.section
              className="bg-white rounded-2xl shadow-lg p-4 sm:p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-4xl font-bold gradient-text">The Sacred Text</h2>
              </div>

              {/* The Text - HERO of the page */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 sm:p-10 border-l-4 sm:border-l-8 border-blue-500 mb-4">
                <div className="mb-4 flex flex-col gap-1 text-blue-700 sm:flex-row sm:items-center sm:gap-2">
                  <span className="font-bold capitalize text-lg">{selectedGospel}</span>
                  <span className="hidden text-blue-500 sm:inline">•</span>
                  <span className="font-medium">{parable.gospels[selectedGospel as keyof typeof parable.gospels]}</span>
                  <span className="hidden text-blue-500 sm:inline">•</span>
                  <span className="font-medium">{selectedVersion}</span>
                </div>
                <blockquote className="text-2xl leading-relaxed text-gray-800 font-serif italic">
                  {currentText}
                </blockquote>
              </div>
            </motion.section>
          </div>

          {/* Sidebar - Controls (takes 1/4 on desktop, full width on mobile) */}
          <div className="lg:col-span-1 order-2 lg:order-2">
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 mb-8 sticky top-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >

              {/* Gospel Selection */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3 text-gray-600 uppercase tracking-wide">Gospel</h4>
                <div className="space-y-2">
                  {Object.entries(parable.gospels).map(([gospel, reference]) => (
                    <button
                      key={gospel}
                      onClick={() => setSelectedGospel(gospel)}
                      className={`w-full text-left px-3 py-2 rounded-lg border transition-all duration-200 ${selectedGospel === gospel
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-gray-50 hover:border-gray-300 text-gray-700'
                        }`}
                    >
                      <div className="font-medium capitalize">{gospel}</div>
                      <div className="text-xs opacity-75">{reference}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Version Selection */}
              <div>
                <h4 className="text-sm font-semibold mb-3 text-gray-600 uppercase tracking-wide">Translation</h4>
                <div className="space-y-2">
                  {[
                    { key: 'ESV', name: 'English Standard' },
                    { key: 'KJV', name: 'King James' },
                    { key: 'NIV', name: 'New International' }
                  ].map((version) => (
                    <button
                      key={version.key}
                      onClick={() => setSelectedVersion(version.key)}
                      className={`w-full text-left px-3 py-2 rounded-lg border transition-all duration-200 ${selectedVersion === version.key
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 bg-gray-50 hover:border-gray-300 text-gray-700'
                        }`}
                    >
                      <div className="font-medium">{version.key}</div>
                      <div className="text-xs opacity-75">{version.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Section 2: Notes */}
        <div className="lg:col-span-4">
          <motion.section
            className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-4xl font-bold gradient-text">Perspectives & Interpretations</h2>
            </div>

            <div className="space-y-6">
              {altitudeEntries.map(([altitudeKey, info]) => {
                const note = notes.find(n => n.altitude === altitudeKey);
                const voteKey = note?.id || altitudeKey;
                const userVote = voteKey ? userVotes[voteKey] : undefined;
                const parableNote = parable.notes?.[altitudeKey as keyof typeof parable.notes];
                const content = note?.content || parableNote || 'Loading interpretation...';
                const isUpvote = userVote === 'upvote';
                const isDownvote = userVote === 'downvote';

                return (
                  <motion.div
                    key={altitudeKey}
                    className="note-card group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * altitudeEntries.findIndex(([key]) => key === altitudeKey) }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="altitude-badge text-white"
                        style={{ backgroundColor: info.color }}
                      >
                        {info.name}
                      </span>

                      {user ? (
                        <div className="flex items-center">
                          <div className="grid grid-cols-2 min-w-[100px] sm:min-w-[140px] overflow-hidden rounded-full border border-gray-300 shadow-sm">
                            <button
                              onClick={() => handleVote(voteKey, altitudeKey, 'upvote')}
                              aria-pressed={isUpvote}
                              aria-label="Agree"
                              className={`border flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 text-xs font-semibold transition-colors ${isUpvote ? 'text-white' : 'text-gray-600 hover:bg-green-50'}`}
                              style={isUpvote ? { backgroundColor: '#22c55e', borderColor: '#16a34a', color: '#ffffff' } : { backgroundColor: '#ffffff', borderColor: '#e5e7eb', color: '#4b5563' }}
                            >
                              <ThumbsUp size={14} />
                              <span className="hidden sm:inline">Agree</span>
                            </button>
                            <button
                              onClick={() => handleVote(voteKey, altitudeKey, 'downvote')}
                              aria-pressed={isDownvote}
                              aria-label="Disagree"
                              className={`border flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 text-xs font-semibold transition-colors ${isDownvote ? 'text-white' : 'text-gray-600 hover:bg-red-50'}`}
                              style={isDownvote ? { backgroundColor: '#ef4444', borderColor: '#dc2626', color: '#ffffff' } : { backgroundColor: '#ffffff', borderColor: '#e5e7eb', color: '#4b5563' }}
                            >
                              <ThumbsDown size={14} />
                              <span className="hidden sm:inline">Disagree</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={handleSignIn}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition whitespace-nowrap"
                        >
                          <Users size={14} />
                          <span className="whitespace-nowrap">Sign In to Rate</span>
                        </button>
                      )}
                    </div>

                    {editingNoteId === note?.id ? (
                      <div className="space-y-3">
                        <textarea
                          value={editedNoteContent}
                          onChange={(e) => setEditedNoteContent(e.target.value)}
                          className="w-full min-h-[150px] rounded-lg border border-gray-300 p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSaveNote(note.id)}
                            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                          >
                            <Save size={14} />
                            Save
                          </button>
                          <button
                            onClick={() => setEditingNoteId(null)}
                            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                          >
                            <X size={14} />
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="group relative">
                        <p className="text-gray-700 leading-relaxed font-serif text-lg">
                          {content}
                        </p>
                        {user?.email === 'dalmomendonca@gmail.com' && note && (
                          <button
                            onClick={() => {
                              setEditingNoteId(note.id);
                              setEditedNoteContent(note.content);
                            }}
                            className="absolute -right-2 -top-2 p-1.5 text-gray-400 bg-white rounded-full shadow-sm border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 hover:text-purple-600"
                            title="Edit note"
                          >
                            <Edit size={16} />
                          </button>
                        )}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        </div>

        {/* Section 3: My Notes */}
        <div className="lg:col-span-4">
          <motion.section
            className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-4xl font-bold gradient-text">My Notes</h2>
              {!user && <Lock size={20} className="text-gray-400" />}
            </div>

            {user ? (
              <div className="space-y-5">
                <p className="text-gray-600 text-lg">
                  This journal entry stays private to your account. Capture the stirrings, revelations, and questions this parable awakens in you.
                </p>

                {isNoteLoading ? (
                  <div className="min-h-[200px] rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 via-white to-purple-100 animate-pulse" />
                ) : (
                  <textarea
                    value={personalNote}
                    onChange={(e) => {
                      setPersonalNote(e.target.value);
                      if (noteStatus !== 'idle') {
                        setNoteStatus('idle');
                      }
                      if (noteError) {
                        setNoteError(null);
                      }
                    }}
                    placeholder="Pour out your reflections, prayers, and insights here..."
                    className="w-full min-h-[220px] rounded-2xl border border-purple-200 bg-white/80 backdrop-blur-sm p-5 text-lg text-gray-700 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
                  />
                )}

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={handleSavePersonalNote}
                    disabled={noteStatus === 'saving' || isNoteLoading}
                    className={[
                      'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-white shadow-lg transition-transform focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2',
                      noteStatus === 'saving' || isNoteLoading
                        ? 'cursor-not-allowed bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 opacity-90'
                        : 'bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-600 hover:-translate-y-0.5 hover:shadow-xl',
                    ].join(' ')}
                  >
                    {noteStatus === 'saving' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <span>Save Note</span>
                    )}
                  </button>

                  <div
                    className={[
                      'text-sm',
                      noteStatus === 'error' ? 'text-red-500' : 'text-gray-500',
                    ].join(' ')}
                  >
                    {noteStatus === 'saving' && 'Saving your reflections...'}
                    {noteStatus === 'saved' && 'Saved!'}
                    {noteStatus === 'error' && (noteError || 'Could not save your note.')}
                    {noteStatus === 'idle' && lastSavedAt && 'Last saved ' + new Date(lastSavedAt).toLocaleString()}
                    {noteStatus === 'idle' && !lastSavedAt && 'We save these notes only to your account.'}
                  </div>
                </div>

                {noteError && (
                  <p className="text-sm text-red-500">{noteError}</p>
                )}
              </div>
            ) : (
              <div className="text-center py-12 px-6 rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 via-white to-purple-100 shadow-inner">
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Sign into your account to record your private notes, insights, and impressions on this parable.
                </p>
                <button
                  onClick={handleSignIn}
                  className="mt-6 inline-flex items-center justify-center gap-3 px-8 py-3 text-base font-semibold text-white bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-600 rounded-full shadow-lg shadow-purple-200 hover:shadow-xl hover:-translate-y-0.5 transition-transform focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 whitespace-nowrap"
                >
                  <Users size={18} />
                  <span className="whitespace-nowrap">Sign In with Google</span>
                </button>
              </div>
            )}
          </motion.section>
        </div>


        {/* Section 4: Comments */}
        <div className="lg:col-span-4">
          <motion.section
            className="bg-white rounded-2xl shadow-lg p-4 sm:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-4xl font-bold gradient-text">Community Discussion</h2>
              {!commentsUnlocked && <Lock size={20} className="text-gray-400" />}
              {/* TODO: If user is not signed in, add beautiful purple button to Sign In with Google and "Sign into your account to record your private notes, insights, and impressions on this parable." If the user IS signed in, add an input box that saves to and loads from supabase (new setup required). */}
            </div>

            {!commentsUnlocked ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Lock size={32} className="text-gray-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-700">Comments Locked</h3>
                <p className="text-lg text-gray-600 mb-2">
                  Vote on interpretations across all 37 parables to unlock community discussions
                </p>
                <p className="text-sm text-gray-500">
                  This ensures thoughtful participation from engaged community members
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-8">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts on this parable..."
                    className="w-full p-4 border border-gray-300 rounded-xl bg-white/80 backdrop-blur-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                  />
                  <button className="btn btn-primary mt-4">
                    <MessageCircle size={16} className="mr-2" />
                    Post Comment
                  </button>
                </div>

                <div className="space-y-6">
                  {comments.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <MessageCircle size={48} className="mx-auto mb-4 text-gray-300" />
                      <p>Be the first to share your thoughts on this parable!</p>
                    </div>
                  ) : (
                    comments.map((comment) => (
                      <div key={comment.id} className="bg-white/50 rounded-xl p-6 border border-gray-200">
                        <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                          <span className="font-medium">{new Date(comment.created_at).toLocaleDateString()}</span>
                          <span>â€¢</span>
                          <span>Color Profile: {JSON.stringify(JSON.parse(comment.user_scores_snapshot))}</span>
                        </div>
                        <p className="text-gray-700 font-serif text-lg leading-relaxed">{comment.content}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </motion.section>
        </div>
      </div>
    </div>
  );
}




































