'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { User, Settings, BookOpen, Trophy, Target, Sparkles, Star, ThumbsUp, ThumbsDown, ArrowLeft, LogOut, Users } from 'lucide-react';

import { supabase } from '@/lib/supabase-client';
import { User as SupabaseUser } from '@supabase/supabase-js';
import type { Database, UserScores } from '@/lib/database.types';

interface ProfileIconProps {
    scores: UserScores;
    size?: number;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({ scores, size = 48 }) => {
    // Reverse order so holistic (turquoise) is on top
    const altitudes: (keyof UserScores)[] = ['turquoise', 'teal', 'green', 'orange', 'amber', 'red', 'magenta'];
    const scoreValues = Object.values(scores).filter(value => !Number.isNaN(value));

    return (
        <div
            className="flex aspect-square flex-col justify-between rounded-lg flex-shrink-0"
            style={{ width: size, height: size, minWidth: size, minHeight: size, backgroundColor: 'transparent' }}
        >
            {altitudes.map((altitude, index) => {
                const rawMin = Math.min(...scoreValues);
                const rawMax = Math.max(...scoreValues);
                const denominator = Math.max(1, rawMax - rawMin);
                const numerator = Math.max(1, scores[altitude] - rawMin);
                const fillPercentage = (numerator / denominator) * 100;
                console.log(altitude + ': ' + fillPercentage + '%');

                const altitudeColor = altitudeInfo[altitude].color;
                const isFirst = index === 0;
                const isLast = index === altitudes.length - 1;

                return (
                    <div
                        key={altitude}
                        className="relative flex-1 mx-0.5 flex items-center justify-center"
                        style={{
                            backgroundColor: 'rgba(243, 244, 246, 0.3)',
                            borderRadius: isFirst ? '4px 4px 2px 2px' : isLast ? '2px 2px 4px 4px' : '2px'
                        }}
                    >
                        <div
                            className="h-full transition-all duration-300"
                            style={{
                                width: `${fillPercentage}%`,
                                backgroundColor: altitudeColor,
                                borderRadius: isFirst ? '4px 4px 2px 2px' : isLast ? '2px 2px 4px 4px' : '2px'
                            }}
                        />
                    </div>
                );
            })}

        </div>
    );
};

const altitudeInfo = {
    magenta: {
        name: 'Miracle',
        color: '#d81b60',
        description: 'Supernatural & Mystical',
        summary: 'Jesus is our wonder-working Lord God whose mysterious power transforms the natural world with miraculous signs in our favor if we ask with faith.',
        icon: '✨'
    },
    red: {
        name: 'Warrior',
        color: '#e53935',
        description: 'Power & Action',
        summary: 'Jesus is the fearless warrior who confronts darkness head-on, who rallies us to battle evil in His name, and who will return to judge the world and take his chosen people home.',
        icon: '⚔️'
    },
    amber: {
        name: 'Traditional',
        color: '#ffb300',
        description: 'Order & Authority',
        summary: 'Jesus is the fully divine and fully human Son of God who died on the cross for our sins and whose sacrificial love and redemptive act form the unwavering foundation of our faith.',
        icon: '⛪'
    },
    orange: {
        name: 'Rational',
        color: '#fb8c00',
        description: 'Logic & Achievement',
        summary: 'Jesus is the most revolutionary human teacher and moral exemplar whose life challenges me to pursue personal transformation and social progress.',
        icon: '🔬'
    },
    green: {
        name: 'Pluralistic',
        color: '#7cb342',
        description: 'Compassion & Inclusion',
        summary: 'Jesus is one compelling narrative among many, a symbol of liberation whose meaning unfolds uniquely for every seeker, but ultimately a prime example of the realized divine potential for human love and inclusion.',
        icon: '🌱'
    },
    teal: {
        name: 'Integral',
        color: '#26a69a',
        description: 'Integration & Wholeness',
        summary: 'Jesus is all of the above, the ultimate embodied archetype, an eternally transcendent presence that unifies spiritual mystery, cultural insight, and evolutionary truth.',
        icon: '🌀'
    },
    turquoise: {
        name: 'Holistic',
        color: '#26c6da',
        description: 'Cosmic Consciousness',
        summary: 'Jesus is God for us, God with us, and God as us.',
        icon: '🌐'
    }
};

type UsersInsert = Database['public']['Tables']['users']['Insert'];
type UserAltitudeVote = Pick<Database['public']['Tables']['user_altitude_votes']['Row'], 'altitude' | 'vote_type' | 'parable_id'>;

function getFirstName(fullNameOrEmail: string): string {
    if (fullNameOrEmail.includes('@')) {
        return fullNameOrEmail.split('@')[0];
    }
    return fullNameOrEmail.split(' ')[0] || 'User';
}

export default function ProfilePage() {
    const [user, setUser] = useState<SupabaseUser | null>(null);
    const [userScores, setUserScores] = useState<UserScores>({
        magenta: 0, red: 0, amber: 0, orange: 0, green: 0, teal: 0, turquoise: 0
    });
    const [preferredVersion, setPreferredVersion] = useState('ESV');
    const [commentsUnlocked, setCommentsUnlocked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [displayName, setDisplayName] = useState('');
    const [parablesStudied, setParablesStudied] = useState(0);
    const [totalVotes, setTotalVotes] = useState(0);
    const [centerOfGravity, setCenterOfGravity] = useState<keyof typeof altitudeInfo>('magenta');

    const calculateScoresFromVotes = useCallback(async (userId: string) => {
        // Get all votes for this user across all parables
        const { data: allVotes } = await supabase
            .from('user_altitude_votes')
            .select('altitude, vote_type, parable_id')
            .eq('user_id', userId);

        const scores: UserScores = {
            magenta: 0, red: 0, amber: 0, orange: 0, green: 0, teal: 0, turquoise: 0
        };

        const uniqueParables = new Set<string>();
        let totalVoteCount = 0;

        if (allVotes) {
            allVotes.forEach((vote: UserAltitudeVote) => {
                const voteValue = vote.vote_type === 'upvote' ? 1 : -1;
                scores[vote.altitude] += voteValue;
                uniqueParables.add(vote.parable_id);
                totalVoteCount++;
            });
        }

        // Calculate center of gravity (highest scoring altitude)
        const highestScore = Math.max(...Object.values(scores));
        let centerAltitude: keyof typeof altitudeInfo = 'magenta';

        for (const [altitude, score] of Object.entries(scores)) {
            if (score === highestScore) {
                centerAltitude = altitude as keyof typeof altitudeInfo;
                break;
            }
        }

        setUserScores(scores);
        setParablesStudied(uniqueParables.size);
        setTotalVotes(totalVoteCount);
        setCenterOfGravity(centerAltitude);
        console.log('Profile: Calculated scores from votes:', scores);
    }, [setCenterOfGravity, setParablesStudied, setTotalVotes, setUserScores]);

    const loadUserData = useCallback(async () => {
        setLoading(true);

        try {
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();

            if (sessionError) {
                console.error('Error fetching auth session:', sessionError);
                setUser(null);
                return;
            }

            const currentUser = session?.user ?? null;
            setUser(currentUser);

            if (!currentUser) {
                return;
            }

            const { data: userRecord, error } = await supabase
                .from('users')
                .select('id, email, preferred_bible_version, display_name, comments_unlocked')
                .eq('id', currentUser.id)
                .maybeSingle();

            if (error) {
                console.error('Error loading user record:', error);
            }

            if (userRecord) {
                const fallbackName = getFirstName(currentUser.user_metadata?.full_name || currentUser.email || '');
                setPreferredVersion(userRecord.preferred_bible_version || 'ESV');
                setCommentsUnlocked(userRecord.comments_unlocked ?? false);
                setDisplayName(userRecord.display_name || fallbackName);
            } else if (!error) {
                const fallbackName = getFirstName(currentUser.user_metadata?.full_name || currentUser.email || '');

                if (!currentUser.email) {
                    console.error('Authenticated user missing email address');
                    return;
                }

                const insertPayload: UsersInsert = {
                    id: currentUser.id,
                    email: currentUser.email,
                    preferred_bible_version: 'ESV',
                    display_name: fallbackName,
                    comments_unlocked: false,
                };

                const { error: insertError } = await supabase
                    .from('users')
                    .insert(insertPayload);

                if (insertError) {
                    console.error('Error creating user record:', insertError);
                } else {
                    setDisplayName(fallbackName);
                    setPreferredVersion('ESV');
                    setCommentsUnlocked(false);
                }
            }

            await calculateScoresFromVotes(currentUser.id);
        } catch (error) {
            console.error('Unexpected error loading profile data:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, [
        calculateScoresFromVotes,
        setCommentsUnlocked,
        setDisplayName,
        setLoading,
        setPreferredVersion,
        setUser,
    ]);

    useEffect(() => {
        void loadUserData();
    }, [loadUserData]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        window.location.href = '/';
    };

    const handleSignIn = async () => {
        if (typeof window === 'undefined') return;

        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(`${window.location.origin}/profile`)}`
            }
        });
    };

    const updateDisplayName = async (newName: string) => {
        if (!user) return;

        const { error } = await supabase
            .from('users')
            .update({ display_name: newName })
            .eq('id', user.id);

        if (!error) {
            setDisplayName(newName);
        }
    };

    const updatePreferredVersion = async (version: string) => {
        if (!user) return;

        const { error } = await supabase
            .from('users')
            .update({ preferred_bible_version: version })
            .eq('id', user.id);

        if (!error) {
            setPreferredVersion(version);
        }
    };



    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="spinner mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading your spiritual profile...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <User size={32} className="text-gray-500" />
                    </div>
                    <h1 className="text-2xl font-bold mb-4">Please sign in to view your profile</h1>
                    <Link href="/" className="btn btn-primary">
                        Return Home
                    </Link>
                </div>
            </div>
        );
    }

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
                                <button
                                    onClick={handleSignOut}
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-purple-600 transition whitespace-nowrap"
                                >
                                    <LogOut size={16} />
                                    <span className="whitespace-nowrap">Sign Out</span>
                                </button>
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
                        <div className="flex flex-col items-center gap-4 mb-6 sm:gap-6">
                            <span className="text-sm font-semibold uppercase tracking-widest text-white/80">Your Spiritual Profile</span>
                            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6">
                                <ProfileIcon scores={userScores} size={80} />
                                <div className="text-center sm:text-left">
                                    <h1 className="text-4xl md:text-6xl font-bold">{displayName}</h1>
                                </div>
                            </div>
                        </div>

                        {/* 
                        <p className="text-xl opacity-90 mb-2">{user.email}</p>
                        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                            <span className="text-2xl">{altitudeInfo[centerOfGravity].icon}</span>
                            <span className="font-medium">
                                Primary Altitude: {altitudeInfo[centerOfGravity].name}
                            </span>
                        </div>
                         */}
                    </motion.div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-4 py-12">


                {/* Altitude Scores */}
                <motion.section
                    className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-8 border border-white/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

                        {Object.values(userScores).some(score => score > 0) && (
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    <Trophy size={20} className="text-yellow-600" />
                                    Your Top 3 Spiritual Altitudes
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {Object.entries(userScores)
                                        .sort(([, a], [, b]) => b - a)
                                        .slice(0, 3)
                                        .map(([altitude], index) => (
                                            <div
                                                key={altitude}
                                                className="flex items-center gap-2 px-4 py-2 altitude-badge text-white font-medium"
                                                style={{ backgroundColor: altitudeInfo[altitude as keyof typeof altitudeInfo].color }}
                                            >
                                                <span className="text-2xl">
                                                    {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                                                </span>
                                                <span className="text-md">
                                                    {altitudeInfo[altitude as keyof typeof altitudeInfo].name}
                                                </span>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}

                        {Object.entries(altitudeInfo).map(([altitude, info]) => {
                            const score = userScores[altitude as keyof UserScores];
                            const displayScore = Math.abs(score);
                            const isPositive = score >= 0;
                            const topThree = Object.entries(userScores)
                                .sort(([, a], [, b]) => b - a)
                                .slice(0, 3)
                                .map(([alt]) => alt);
                            const isTop3 = topThree.includes(altitude);
                            return (
                                <motion.div
                                    key={altitude}
                                    className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${isTop3
                                        ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 shadow-lg'
                                        : 'border-gray-200 bg-white/50 hover:bg-white/70'
                                        }`}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1 * Object.keys(altitudeInfo).indexOf(altitude) }}
                                >
                                    {isTop3 && (
                                        <div className="absolute -top-2 -right-2">
                                            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
                                                <Star size={16} className="text-white" />
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{info.icon}</span>
                                            <div>
                                                <span
                                                    className="altitude-badge text-sm text-white"
                                                    style={{ backgroundColor: info.color }}
                                                >
                                                    {info.name.toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {isPositive ? (
                                                <>
                                                    <ThumbsUp size={18} className="text-green-600" />
                                                    <span className="text-2xl font-bold text-green-600">{displayScore}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <ThumbsDown size={18} className="text-red-600" />
                                                    <span className="text-2xl font-bold text-red-600">{displayScore}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-gray-600 mb-3">{info.description}</p>
                                    <p className="text-sm text-gray-500 italic">{info.summary}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.section>

                {/* Stats Overview */}
                <motion.section
                    className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {/* Center of Gravity */}
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl"
                            style={{ backgroundColor: altitudeInfo[centerOfGravity].color }}
                        >
                            {altitudeInfo[centerOfGravity].icon}
                        </div>
                        <div className="text-2xl font-bold text-gray-900 mb-2">
                            {altitudeInfo[centerOfGravity].name}
                        </div>
                        <div className="text-gray-600 font-medium">Center of Gravity</div>
                    </div>

                    {/* Parables Studied */}
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <BookOpen size={24} className="text-white" />
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                            {parablesStudied}
                        </div>
                        <div className="text-gray-600 font-medium">Parables Studied</div>
                    </div>

                    {/* Total Votes */}
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Target size={24} className="text-white" />
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-2">{totalVotes}</div>
                        <div className="text-gray-600 font-medium">Total Votes</div>
                    </div>

                    {/* Comments Unlocked */}
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${commentsUnlocked
                            ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                            : 'bg-gradient-to-br from-gray-400 to-gray-500'
                            }`}>
                            <Sparkles size={24} className="text-white" />
                        </div>
                        <div className={`text-3xl font-bold mb-2 ${commentsUnlocked ? 'text-green-600' : 'text-gray-400'}`}>
                            {commentsUnlocked ? '✓' : '✗'}
                        </div>
                        <div className="text-gray-600 font-medium">Comments Unlocked</div>
                    </div>
                </motion.section>

                {/* Settings */}
                <motion.section
                    className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg flex items-center justify-center">
                            <Settings size={18} className="text-white" />
                        </div>
                        <h2 className="text-3xl font-bold gradient-text">Preferences</h2>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-lg font-semibold text-gray-700 mb-3">
                                Display Name
                            </label>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <input
                                    type="text"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    className="w-full p-4 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors sm:flex-1 sm:max-w-sm"
                                    placeholder="Enter your display name"
                                />
                                <button
                                    onClick={() => updateDisplayName(displayName)}
                                    className="w-full px-6 py-3 bg-blue-500 text-white rounded-xl font-medium transition-colors hover:bg-blue-600 sm:w-auto"
                                >
                                    Save
                                </button>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">
                                This name will be displayed when you post comments.
                            </p>
                        </div>

                        <div>
                            <label className="block text-lg font-semibold text-gray-700 mb-3">
                                Preferred Bible Version
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {['ESV', 'KJV', 'NIV'].map((version) => (
                                    <button
                                        key={version}
                                        onClick={() => updatePreferredVersion(version)}
                                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${preferredVersion === version
                                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                                            : 'border-gray-300 bg-white hover:border-gray-400'
                                            }`}
                                    >
                                        <div className="font-bold text-lg">{version}</div>
                                        <div className="text-sm text-gray-600">
                                            {version === 'ESV' && 'English Standard Version'}
                                            {version === 'KJV' && 'King James Version'}
                                            {version === 'NIV' && 'New International Version'}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.section>
            </div>
        </div>
    );
}


