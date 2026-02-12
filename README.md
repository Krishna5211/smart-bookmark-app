📌 Smart Bookmark App

A simple full-stack bookmark manager built using Next.js (App Router) and Supabase.

Users can sign in with Google, create private bookmarks, and see real-time updates across tabs.

🚀 Live Demo

🔗 https://smart-bookmark-app.vercel.app

(Replace with your actual deployed URL)

🛠 Tech Stack

Next.js (App Router)

Supabase

Google OAuth Authentication

PostgreSQL Database

Row Level Security (RLS)

Realtime subscriptions

Tailwind CSS

Vercel (Deployment)

✅ Features

Google OAuth login (no email/password)

Add bookmarks (Title + URL)

Delete your own bookmarks

Bookmarks are private per user

Real-time updates across tabs

Fully deployed on Vercel

🔐 Authentication & Security

Authentication is handled using Supabase Google OAuth.

Row Level Security (RLS) is enabled on the bookmarks table to ensure:

Users can only view their own bookmarks

Users can only insert bookmarks linked to their own user_id

Users can only delete their own bookmarks

This guarantees proper data isolation between accounts.

🧩 Database Schema

Table: bookmarks

Column	Type
id	uuid (PK)
title	text
url	text
user_id	uuid
created_at	timestamp
⚡ Realtime Implementation

Supabase Realtime subscriptions are used to:

Listen for INSERT events

Listen for DELETE events

Automatically update UI without refresh

If two tabs are open and a bookmark is added in one, it appears instantly in the other.

🧠 Challenges Faced
1️⃣ Google OAuth Redirect URI Mismatch

Initially faced redirect_uri_mismatch errors due to incorrect callback URLs between:

Supabase

Google Cloud Console

Localhost

Vercel production URL

Resolved by carefully aligning:

Authorized redirect URIs

Supabase Auth callback URL

Vercel production domain

2️⃣ Row Level Security Configuration

Ensuring that:

Users could not access other users’ bookmarks

Realtime still worked properly

Insert/delete policies remained secure

Proper policies were written using auth.uid() to enforce ownership.

3️⃣ Environment Variables in Vercel

Had to properly configure:

NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY


in Vercel dashboard to make production authentication work correctly.

📦 Local Setup

Clone the repository

git clone https://github.com/Rachit141/smart-bookmark-app.git


Install dependencies

npm install


Create .env.local

NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key


Run the project

npm run dev

🌍 Deployment

Deployed using Vercel.
Production environment variables were configured in the Vercel dashboard.

🔮 Improvements (Future Scope)

Bookmark editing feature

URL validation

Loading and error states

UI polish and animations

Basic testing setup

👤 Author

Rachit Jain
GitHub: https://github.com/Rachit141
