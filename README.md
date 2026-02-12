# 🚀 Smart Bookmark App

A minimal full-stack bookmark manager built with **Next.js 14 (App Router)** and **Supabase**.

Users can sign in using Google OAuth, create private bookmarks, and see real-time updates across multiple tabs.

---

## 🌐 Live Demo

👉 **https://smart-bookmark-app-one.vercel.app/**  
_Test using any Google account_

---

## ✨ Features

- 🔐 Google OAuth login (no email/password)
- ➕ Add bookmarks (Title + URL)
- ❌ Delete your own bookmarks
- 🔒 Private per user (Row Level Security enabled)
- ⚡ Real-time updates across multiple tabs
- 🚀 Fully deployed on Vercel

---

## 🛠 Tech Stack

- Next.js 14 (App Router)
- Supabase (Auth + Database + Realtime)
- PostgreSQL
- Tailwind CSS
- Vercel (Deployment)

---

## 🔐 Security Implementation

Row Level Security (RLS) is enabled on the `bookmarks` table.

Policies ensure:
- Users can only view their own bookmarks
- Users can only insert bookmarks with their own `user_id`
- Users can only delete their own bookmarks

This guarantees strict user-level data isolation.

---

## ⚡ Realtime Functionality

The app subscribes to Supabase Realtime events:

- Listens to INSERT events  
- Listens to DELETE events  
- Updates UI instantly without refresh  

If two tabs are open and a bookmark is added in one, it automatically appears in the other.

---

## 🗄 Database Schema

```sql
create table bookmarks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  url text not null,
  user_id uuid references auth.users(id),
  created_at timestamp default now()
);
```

---

## 🧠 Challenges Faced

### 1️⃣ Google OAuth Redirect Mismatch  
Resolved by correctly configuring:
- Google Cloud Console OAuth credentials  
- Supabase Auth redirect URLs  
- Localhost and Production URLs  

### 2️⃣ Row Level Security Policies  
Carefully implemented policies using `auth.uid()` to maintain strict user isolation.

### 3️⃣ Production Environment Variables  
Configured Supabase keys securely in Vercel dashboard.

---

## ▶ Run Locally

```bash
git clone https://github.com/Rachit141/smart-bookmark-app.git
cd smart-bookmark-app
npm install
npm run dev
```

---

## 📌 Notes

This project was built as part of a Full-Stack Micro Challenge.  
Focus was on correctness, security (RLS), and clean architecture using App Router.
