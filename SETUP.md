# Advice Pinterest Setup Guide

## 1. Environment Variables
Copy `.env.local.example` to `.env.local` and fill in your API keys:

```bash
cp .env.local.example .env.local
```

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key  
- `GEMINI_API_KEY`: Your Google Gemini API key

## 2. Supabase Setup
1. Create a new Supabase project
2. Run the SQL from `supabase-schema.sql` in your Supabase SQL editor
3. Get your project URL and anon key from Settings > API

## 3. Gemini API Setup
1. Get an API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add it to your `.env.local` file

## 4. Development
```bash
npm run dev
```

## 5. Deployment
The app is configured for Vercel deployment. Set environment variables in your Vercel dashboard.

## Architecture
- **Components**: Modular, reusable components in `/src/components/`
- **Cards**: Three card types (square, tall, quote) with different color schemes
- **Responsive**: Mobile-first design, centered on desktop
- **API**: `/api/search` endpoint generates advice pins using Gemini AI