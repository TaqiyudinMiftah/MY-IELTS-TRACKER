# IELTS Tracker - Setup Guide

## Quick Start (5 Minutes)

### 1. Install Dependencies (Already Done)
```bash
npm install
```

### 2. Setup Supabase Database

#### A. Create Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new organization (if needed)
4. Click "New Project"
5. Fill in:
   - Project name: `ielts-tracker`
   - Region: Choose closest to you
6. Click "Create new project" (wait 2-3 minutes)

#### B. Run Database Schema
1. In your Supabase project dashboard, click "SQL Editor" in the left sidebar
2. Click "New query"
3. Open the file `DATABASE_SCHEMA.md` in this project
4. Copy ALL the SQL code (users table, tasks table, badges table, etc.)
5. Paste into the Supabase SQL editor
6. Click "Run" button
7. You should see "Success. No rows returned" - this is good!

#### C. Get API Keys
1. In Supabase, click "Settings" (gear icon) in left sidebar
2. Click "API" under Project Settings
3. You'll see two important values:
   - **Project URL**: Something like `https://xxxxx.supabase.co`
   - **anon/public key**: A long string starting with `eyJ...`

#### D. Configure Environment Variables
1. Open the file `.env.local` in this project
2. Replace the placeholders:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 3. Run the App
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

## Features Checklist

### ✅ Completed (MVP - Phase 1)
- [x] Project setup with Next.js + TypeScript
- [x] Tailwind CSS styling
- [x] Database schema design
- [x] Core UI components (Card, Progress)
- [x] Stats dashboard with XP, Level, Streak display
- [x] Task list component with 4 category tags
- [x] Radar chart for skills balance
- [x] Badge showcase component
- [x] Daily challenge API endpoint
- [x] Weighted XP system (Easy: 10, Medium: 20, Hard: 30)

### ⏳ Next Steps (Phase 2 - Week 2-3)
- [ ] Connect Supabase to frontend
- [ ] User authentication (sign up/login)
- [ ] Add new task form
- [ ] Complete task and earn XP
- [ ] Streak calculation logic
- [ ] Badge unlock system
- [ ] Vocabulary feature with word bank
- [ ] Mock test score tracker
- [ ] Activity log with time tracking

### � Future Features (Phase 3)
- [ ] Streak freeze purchase system
- [ ] Push notifications
- [ ] Data export (CSV/PDF)
- [ ] Social sharing (share achievements)
- [ ] Dark mode toggle
- [ ] Mobile app (React Native)

## Project Structure

```
my-ielts-tracker/
├── app/
│   ├── api/daily-challenge/    # API for generating daily tasks
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page with demo data
├── components/
│   ├── features/                # Feature-specific components
│   │   ├── StatsCard.tsx        # XP, Level, Streak display
│   │   ├── TaskList.tsx         # Task list with category tags
│   │   ├── RadarChart.tsx       # Skills balance chart
│   │   └── BadgeShowcase.tsx    # Achievement badges
│   └── ui/                      # Reusable UI components
│       ├── card.tsx
│       └── progress.tsx
├── lib/
│   ├── supabase.ts             # Supabase client
│   └── utils.ts                # Utility functions (XP calc, etc)
├── types/
│   └── index.ts                # TypeScript interfaces
├── DATABASE_SCHEMA.md          # Complete SQL schema
└── .env.local                  # Environment variables
```

## Gamification System

### XP & Levels
- Easy tasks: 10 XP
- Medium tasks: 20 XP
- Hard tasks: 30 XP
- 100 XP = 1 Level up

### Streaks
- Complete minimum 1 task per day
- Consecutive days build streak
- Streak freeze: Coming soon!

### Badges
Pre-configured badges in database:
- First Step (1 task)
- The Bookworm (10 Reading)
- Vocab Hunter (50 words)
- Week Warrior (7-day streak)
- Speaking Star (20 Speaking)
- Writing Wizard (15 Writing)
- Listening Legend (25 Listening)
- XP Master (1000 XP)
- Band 7 Achiever (Mock test 7+)

## Development Timeline

**Week 1**: MVP Setup ✅ DONE!
- [x] Project initialization
- [x] Database design
- [x] Core components
- [x] Demo with fake data

**Week 2-3**: Core Features
- [ ] Database integration
- [ ] CRUD operations
- [ ] User auth
- [ ] Real-time updates

**Week 4+**: Polish & Features
- [ ] Advanced features
- [ ] Mobile optimization
- [ ] Performance tuning

## Troubleshooting

### Build errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Supabase connection issues
1. Check `.env.local` has correct values
2. Verify URL starts with `https://`
3. Ensure anon key is complete (very long string)
4. Restart dev server after changing .env.local

### TypeScript errors
```bash
# Check types
npx tsc --noEmit
```

## Next Session Checklist

Before coding in next weekend:
1. [ ] Test all demo features work
2. [ ] Read Supabase Auth docs
3. [ ] Plan first real feature to implement
4. [ ] Commit current progress to git

---

**Remember**: Weekdays = Study IELTS, Weekends = Build tracker!
