'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Users, UserCircle, Heart, Star, ArrowRight } from 'lucide-react';
import { parables } from '@/data/parables';
import { supabase } from '@/lib/supabase-client';
import { User } from '@supabase/supabase-js';

const altitudeColors = [
  { name: 'Magenta', color: 'var(--magenta)', description: 'Miracle' },
  { name: 'Red', color: 'var(--red)', description: 'Warrior' },
  { name: 'Amber', color: 'var(--amber)', description: 'Traditional' },
  { name: 'Orange', color: 'var(--orange)', description: 'Rational' },
  { name: 'Green', color: 'var(--green)', description: 'Pluralistic' },
  { name: 'Teal', color: 'var(--teal)', description: 'Integral' },
  { name: 'Turquoise', color: 'var(--turquoise)', description: 'Holistic' },
];

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hash = window.location.hash;
    if (!hash || hash === '#') return;

    const id = decodeURIComponent(hash.slice(1));
    if (!/^[-_a-zA-Z0-9]+$/.test(id)) return;

    const scrollToHash = () => {
      const target = document.getElementById(id);
      if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    requestAnimationFrame(() => scrollToHash());
  }, []);
  useEffect(() => {
    let isMounted = true;

    const loadSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (!isMounted) {
          return;
        }

        if (error) {
          console.error('Error fetching auth session:', error);
        }

        setUser(session?.user ?? null);
      } catch (error) {
        if (!isMounted) {
          return;
        }
        console.error('Unexpected error loading auth session:', error);
      }
    };

    loadSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) {
        return;
      }
      setUser(session?.user ?? null);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);
  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen size={18} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">Parables.io</h1>
                <p className="text-xs text-gray-600 hidden sm:block">Integral Christianity</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <Link
                  href="/profile"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-purple-600 transition"
                >
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

      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
              The Parables of
              <span className="text-5xl md:text-7xl block text-white drop-shadow-lg">
                Jesus Christ
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Explore timeless wisdom through the lens of <strong>Integral Christianity</strong>.
              Journey across seven altitudes of consciousness and discover how different perspectives
              illuminate the same divine truth.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <div className="text-sm opacity-75">
              <span className="font-semibold">{parables.length}</span> parables •
              <span className="font-semibold"> 7</span> perspectives •
              <span className="font-semibold"> ∞</span> insights
            </div>
            {!user ? (
              <button
                onClick={handleSignIn}
                className="btn btn-secondary text-lg px-8 py-4 group"
              >
                <Heart size={20} className="mr-2 group-hover:animate-pulse" />
                Begin Your Journey
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <Link href="#parables" className="btn btn-secondary text-lg px-8 py-4 group">
                <BookOpen size={20} className="mr-2" />
                Explore Parables
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
            
          </motion.div>

          {/* Altitude Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Sparkles size={16} className="text-yellow-300" />
            <span className="text-sm font-medium">Discover Your Spiritual Center of Gravity</span>
          </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
          >
            {altitudeColors.map((altitude, index) => (
              <motion.div
                key={altitude.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30"
              >
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: altitude.color }}
                  ></div>
                  <span className="text-sm font-medium text-white drop-shadow-sm">{altitude.description}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <Star size={24} className="animate-pulse" />
        </div>
        <div className="absolute top-40 right-20 opacity-20">
          <Sparkles size={32} className="animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute bottom-20 left-20 opacity-20">
          <Heart size={28} className="animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 gradient-text">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each parable is explored through seven different altitudes of consciousness,
              helping you understand how spiritual development shapes our interpretation of divine truth.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Read & Reflect",
                description: "Explore each parable across multiple gospel accounts and Bible versions"
              },
              {
                icon: Star,
                title: "Seven Perspectives",
                description: "Discover interpretations from Magenta to Turquoise consciousness levels"
              },
              {
                icon: Users,
                title: "Find Your Center",
                description: "Vote on interpretations to discover your spiritual center of gravity"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/20 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Parables Grid */}
      <section id="parables" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 gradient-text">
              The Sacred Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Journey through the parables that have shaped hearts and minds for over two millennia.
              Each story contains layers of meaning waiting to be discovered.
            </p>
          </motion.div>

          <div className="parable-grid">
            {parables.map((parable, index) => (
              <motion.div
                key={parable.id}
                initial={{ opacity: 0.4, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.24) }}
                viewport={{ once: true, amount: 0.2 }}
                className="scale-in"
              >
                <Link href={`/parable/${parable.slug}`}>
                  <div className="parable-card group cursor-pointer">
                    <div className="parable-card-image">
                      <Image
                        src={parable.imageUrl}
                        alt={parable.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index < 3}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="parable-card-content">
                      <h3 className="parable-card-title group-hover:text-blue-600 transition-colors">
                        {parable.title}
                      </h3>
                      <div className="parable-card-gospels">
                        {Object.entries(parable.gospels).map(([gospel, reference]) => (
                          <span key={gospel} className="gospel-badge">
                            {gospel} {reference}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <BookOpen size={20} className="text-white" />
              </div>
              <h3 className="text-3xl font-bold">Parables.io</h3>
            </div>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Helping people at every level of spiritual development become more cohesive
              and engaged parts of the body of Christ.
            </p>
            <div className="flex justify-center items-center space-x-2 text-gray-400">
              <Heart size={16} className="text-red-400" />
              <span>Built with love for the Kingdom</span>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}



