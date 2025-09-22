# Parables.io

A web application that helps people explore the 37 parables of Jesus through the lens of Integral Christianity, discovering their spiritual center of gravity across seven altitudes of consciousness.

## Features

- **37 Parables Grid**: Beautiful tile-based interface showcasing all parables with historical artwork
- **Multi-Gospel Text Display**: View parables across different gospels and Bible versions (ESV, KJV, NIV)
- **Integral Christian Interpretations**: 7 unique perspectives for each parable across developmental altitudes:
  - Magenta (Miracle) - Supernatural & Mystical
  - Red (Warrior) - Power & Action  
  - Amber (Traditional) - Order & Authority
  - Orange (Rational) - Logic & Achievement
  - Green (Pluralistic) - Compassion & Inclusion
  - Teal (Integral) - Integration & Wholeness
  - Turquoise (Holistic) - Cosmic Consciousness
- **Color Score System**: Vote on interpretations to build your personal spiritual profile
- **Community Comments**: Unlock discussions by engaging with all parables
- **User Profiles**: Track your journey and preferences

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Supabase (PostgreSQL, Authentication, Real-time)
- **AI**: OpenAI GPT-4 for generating interpretations
- **Hosting**: Vercel (free tier)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. In your Supabase dashboard, go to Settings > API
3. Copy your Project URL and anon public key
4. Go to SQL Editor and run the contents of `database/setup.sql`

### 3. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`
2. Fill in your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENAI_API_KEY=your_openai_api_key
   ```

### 4. Set up Authentication

1. In Supabase dashboard, go to Authentication > Settings
2. Add your site URL (e.g., `http://localhost:3000` for development)
3. Enable Google OAuth:
   - Go to Authentication > Providers
   - Enable Google provider
   - Add your Google OAuth credentials

### 5. Generate Parable Notes

The app includes one sample parable (The Sower). To generate AI interpretations:

1. Start the development server: `npm run dev`
2. Make a POST request to `/api/generate-notes` with `{ "parableId": "1" }`
3. This will generate 7 interpretations using GPT-4

### 6. Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

## Adding More Parables

To add the remaining 36 parables:

1. Extend the `parables` array in `data/parables.ts`
2. Add the parable text for all three Bible versions
3. Find appropriate historical artwork images
4. Generate notes using the API endpoint

## Future Enhancements

- **Bible API Integration**: Replace hardcoded text with dynamic API calls
- **Advanced Analytics**: Deeper insights into user spiritual development
- **Social Features**: Follow other users, share insights
- **Mobile App**: React Native version
- **Gamification**: Achievements, streaks, challenges
- **AI Spiritual Director**: Personalized guidance based on user profile
- **Group Studies**: Create and join parable study groups
- **Meditation Integration**: Guided contemplative practices

## Contributing

This project is designed to help people at every level of spiritual development become more cohesive and engaged parts of the body of Christ. Contributions that further this mission are welcome!

## License

MIT License - Built with ❤️ for the Kingdom