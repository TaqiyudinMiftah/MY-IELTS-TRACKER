# IELTS Tracker

> **Gamified IELTS study tracker with Duolingo-style features**

A comprehensive web application to track your IELTS preparation journey with XP rewards, streaks, badges, and skill analytics. Built with Next.js 16, TypeScript, and Supabase.

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?logo=supabase)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## ✨ Features

###  Gamification System
- **XP & Leveling**: Earn XP by completing tasks (Easy: 10 XP, Medium: 20 XP, Hard: 30 XP)
- **Streak Tracking**: Maintain daily study streaks with visual feedback
- **Badge System**: Unlock 9+ achievements based on your progress
- **Level Progression**: Level up every 100 XP

###  Analytics & Tracking
- **Skills Radar Chart**: Visual representation of progress across 4 IELTS skills
- **Mock Test Tracker**: Record and track practice test scores with auto-calculated band scores
- **Activity Logs**: Monitor time spent per category
- **Task Management**: Full CRUD operations for daily study tasks

###  Study Tools
- **Vocabulary Bank**: Save and track new words with definitions and examples
- **Daily Challenges**: Auto-generated daily tasks to keep you motivated
- **Category System**: Organize tasks by Listening, Reading, Writing, and Speaking

###  User Management
- **Authentication**: Secure login/signup with Supabase Auth
- **Protected Routes**: Dashboard and features require authentication
- **User Profiles**: Personal XP, level, and streak data

---

##  Quick Start

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** or **yarn**
- **Supabase account** (free tier available at [supabase.com](https://supabase.com))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/TaqiyudinMiftah/MY-IELTS-TRACKER.git
cd MY-IELTS-TRACKER
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup Supabase**

   a. Create a new project at [supabase.com](https://supabase.com)
   
   b. Go to **SQL Editor** and run the complete schema from `SUPABASE_SETUP.sql`
   
   c. Copy your credentials from **Settings → API**:
      - Project URL
      - Anon/Public key

4. **Configure environment variables**

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

5. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser 

---

##  Project Structure

```
my-ielts-tracker/
├── app/
│   ├── api/
│   │   └── daily-challenge/     # Daily challenge generator API
│   ├── auth/
│   │   ├── login/               # Login page
│   │   └── signup/              # Signup page
│   ├── dashboard/               # Main dashboard
│   ├── vocabulary/              # Vocabulary bank page
│   ├── mock-tests/              # Mock test tracker
│   ├── layout.tsx               # Root layout with AuthProvider
│   ├── page.tsx                 # Landing/redirect page
│   └── globals.css              # Global styles
├── components/
│   ├── features/
│   │   ├── AddTaskModal.tsx     # Task creation modal
│   │   ├── BadgeShowcase.tsx    # Badge display component
│   │   ├── RadarChart.tsx       # Skills radar chart
│   │   ├── StatsCard.tsx        # Statistics cards
│   │   └── TaskList.tsx         # Task list component
│   └── ui/
│       ├── card.tsx             # Reusable card component
│       └── progress.tsx         # Progress bar component
├── contexts/
│   └── AuthContext.tsx          # Global auth state management
├── lib/
│   ├── supabase.ts              # Supabase client configuration
│   └── utils.ts                 # Utility functions
├── types/
│   └── index.ts                 # TypeScript type definitions
├── SUPABASE_SETUP.sql           # Complete database schema
├── DEPLOYMENT_GUIDE.md          # Deployment instructions
└── package.json
```

---

## ️ Database Schema

The application uses **8 PostgreSQL tables** with Row Level Security (RLS):

| Table | Description |
|-------|-------------|
| `users` | User profiles with XP, level, and streak data |
| `tasks` | Daily study tasks with categories and XP rewards |
| `badges` | Achievement definitions and requirements |
| `user_badges` | Earned achievements per user |
| `vocabulary` | Word bank with definitions and examples |
| `mock_tests` | IELTS practice test scores (4 skills + overall) |
| `daily_challenges` | Auto-generated daily tasks |
| `activity_log` | Time tracking per skill category |

See `SUPABASE_SETUP.sql` for the complete schema with RLS policies.

---

##  Badge System

Unlock achievements as you progress:

| Badge | Requirement | XP Bonus |
|-------|-------------|----------|
|  First Step | Complete 1 task | +10 XP |
|  The Bookworm | Complete 10 Reading tasks | +50 XP |
|  Vocab Hunter | Save 50 vocabulary words | +100 XP |
|  Week Warrior | Maintain 7-day streak | +75 XP |
| ️ Speaking Star | Complete 20 Speaking tasks | +50 XP |
| ✍️ Writing Wizard | Complete 15 Writing tasks | +50 XP |
|  Listening Legend | Complete 25 Listening tasks | +50 XP |
| ⭐ XP Master | Earn 1000 total XP | +200 XP |
|  Band 7 Achiever | Score 7+ in mock test | +150 XP |

---

## ️ Tech Stack

### Frontend
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Charts**: Recharts
- **Icons**: Lucide React

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Security**: Row Level Security (RLS)

### Development
- **Linting**: ESLint
- **Package Manager**: npm
- **Runtime**: Node.js 18+

---

##  Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub** (already done ✅)

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Add environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Click "Deploy"

3. **Done!** Your app will be live in ~2 minutes

See `DEPLOYMENT_GUIDE.md` for detailed instructions.

---

##  Screenshots

### Dashboard
- XP progress bars
- Task list with categories
- Badge showcase
- Skills radar chart

### Vocabulary Bank
- Word cards with definitions
- Mark as "learned" feature
- Category filtering

### Mock Tests
- Score input for 4 skills
- Auto-calculated overall band
- Historical test tracking

---

## ️ Roadmap

### ✅ Phase 1 (Completed)
- [x] Project setup with Next.js & TypeScript
- [x] Database schema design
- [x] Core UI components
- [x] Task list with categories
- [x] XP and level system
- [x] Stats dashboard
- [x] Radar chart for skills

### ✅ Phase 2 (Completed)
- [x] Supabase authentication
- [x] CRUD operations for tasks
- [x] Daily challenge generator API
- [x] Vocabulary feature
- [x] Mock test score tracker
- [x] Badge unlock logic

###  Phase 3 (Future)
- [ ] Streak freeze purchase system
- [ ] Push notifications
- [ ] Data export (CSV/PDF)
- [ ] Dark mode toggle
- [ ] Mobile responsive optimization
- [ ] Word of the Day API integration
- [ ] Task edit/delete functionality
- [ ] Advanced filtering and search

---

##  Contributing

This is a personal project, but contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

##  License

This project is licensed under the **MIT License** - feel free to use it for your own IELTS preparation journey!

---

##  Acknowledgments

- Built with ❤️ by someone who understands the IELTS struggle
- Inspired by Duolingo's gamification approach
- Powered by [Next.js](https://nextjs.org/) and [Supabase](https://supabase.com/)

---

##  Contact & Support

- **GitHub**: [@TaqiyudinMiftah](https://github.com/TaqiyudinMiftah)
- **Repository**: [MY-IELTS-TRACKER](https://github.com/TaqiyudinMiftah/MY-IELTS-TRACKER)

---

##  Documentation

- [Setup Guide](SETUP_GUIDE.md) - Detailed setup instructions
- [Database Schema](DATABASE_SCHEMA.md) - Complete database documentation
- [Deployment Guide](DEPLOYMENT_GUIDE.md) - How to deploy to production
- [Quick Fix Guide](QUICK_FIX.md) - Troubleshooting common issues

---

**Happy studying! Good luck with your IELTS preparation! **
