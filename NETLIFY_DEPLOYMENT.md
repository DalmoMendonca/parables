# Netlify Deployment Guide

This guide will help you deploy and configure the Parables app on Netlify.

## Prerequisites

1. A Netlify account (sign up at [netlify.com](https://www.netlify.com/))
2. Your Supabase project URL and service role key
3. Your OpenAI API key

## Deployment Steps

1. **Connect your repository**
   - Log in to your Netlify account
   - Click on "Add new site" > "Import an existing project"
   - Connect to your Git provider and select the repository

2. **Configure build settings**
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Functions directory:** `.next/serverless/functions`

3. **Set up environment variables**
   Go to Site settings > Build & deploy > Environment and add the following variables:
   
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   OPENAI_API_KEY=your_openai_api_key
   # Optional overrides to stay within Netlify function limits
   OPENAI_NOTES_MODEL=gpt-5-nano
   OPENAI_NOTES_MAX_TOKENS=500
   OPENAI_NOTES_TIMEOUT_MS=8500
   OPENAI_NOTES_MAX_ATTEMPTS=3
   OPENAI_NOTES_TEMPERATURE=0.7
   ```

4. **Deploy site**
   - Click "Deploy site" to trigger the first deployment
   - Netlify will automatically deploy new changes when you push to your repository

## Troubleshooting

### 504 Gateway Timeout Errors

If you encounter 504 errors when generating notes:

1. The app is now designed to process one altitude at a time to avoid timeouts
2. The function timeout is set to the maximum allowed (10 seconds for standard Netlify plans)
3. If you're still experiencing timeouts:
   - The API defaults to 'gpt-5-nano' with a conservative token budget; adjust the OPENAI_NOTES_* variables if you need different settings
   - When running on Netlify the function automatically uses an ~8.5s OpenAI timeout; locally it waits up to 60s unless you override it
   - Upgrade to Netlify Pro or Enterprise for longer timeouts (up to 28 seconds)
   - Consider using a background function or queue system for longer operations
   - Check the function logs in the Netlify dashboard for specific errors

### Environment Variables

Make sure all required environment variables are set correctly in the Netlify dashboard. Missing or incorrect variables can cause the app to fail.

### Function Logs

You can view detailed function logs in the Netlify dashboard under "Functions" > "api/generate-notes" to help diagnose any issues.

## Local Development

To run the app locally:

```bash
# Install dependencies
npm install

# Set up environment variables in a .env.local file
cp .env.example .env.local
# Edit .env.local with your actual keys

# Run the development server
npm run dev
```

## Support

If you need further assistance, please refer to the [Netlify documentation](https://docs.netlify.com/) or open an issue in the repository.
