# í¾¯ IELTS Tracker

> **Gamified IELTS study tracker with Duolingo-style features**

A comprehensive web application to track your IELTS preparation journey with XP rewards, streaks, badges, and skill analytics. Built with Next.js 16, TypeScript, and Supabase.

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?logo=supabase)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## âœ¨ Features

### í¾® Gamification System
- **XP & Leveling**: Earn XP by completing tasks (Easy: 10 XP, Medium: 20 XP, Hard: 30 XP)
- **Streak Tracking**: Maintain daily study streaks with visual feedback
- **Badge System**: Unlock 9+ achievements based on your progress
- **Level Progression**: Level up every 100 XP

### í³Š Analytics & Tracking
- **Skills Radar Chart**: Visual representation of progress across 4 IELTS skills
- **Mock Test Tracker**: Record and track practice test scores with auto-calculated band scores
- **Activity Logs**: Monitor time spent per category
- **Task Management**: Full CRUD operations for daily study tasks

### í³š Study Tools
- **Vocabulary Bank**: Save and track new words with definitions and examples
- **Daily Challenges**: Auto-generated daily tasks to keep you motivated
- **Category System**: Organize tasks by Listening, Reading, Writing, and Speaking

### í´ User Management
- **Authentication**: Secure login/signup with Supabase Auth
- **Protected Routes**: Dashboard and features require authentication
- **User Profiles**: Personal XP, level, and streak data

---

## íº€ Quick Start

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
   
   c. Copy your credentials from **Settings â†’ API**:
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

Open [http://localhost:3000](http://localhost:3000) in your browser í¾‰

---

## í³ Project Structure

```
my-ielts-tracker/
â”œâ”€â”€ app/
â”‚   â”œâ”€â”€ api/
â”‚   â”‚   â””â”€â”€ daily-challenge/     # Daily challenge generator API
â”‚   â”œâ”€â”€ auth/
â”‚   â”‚   â”œâ”€â”€ login/               # Login page
â”‚   â”‚   â””â”€â”€ signup/              # Signup page
â”‚   â”œâ”€â”€ dashboard/               # Main dashboard
â”‚   â”œâ”€â”€ vocabulary/              # Vocabulary bank page
â”‚   â”œâ”€â”€ mock-tests/              # Mock test tracker
â”‚   â”œâ”€â”€ layout.tsx               # Root layout with AuthProvider
â”‚   â”œâ”€â”€ page.tsx                 # Landing/redirect page
â”‚   â””â”€â”€ globals.css              # Global styles
â”œâ”€â”€ components/
â”‚   â”œâ”€â”€ features/
â”‚   â”‚   â”œâ”€â”€ AddTaskModal.tsx     # Task creation modal
â”‚   â”‚   â”œâ”€â”€ BadgeShowcase.tsx    # Badge display component
â”‚   â”‚   â”œâ”€â”€ RadarChart.tsx       # Skills radar chart
â”‚   â”‚   â”œâ”€â”€ StatsCard.tsx        # Statistics cards
â”‚   â”‚   â””â”€â”€ TaskList.tsx         # Task list component
â”‚   â””â”€â”€ ui/
â”‚       â”œâ”€â”€ card.tsx             # Reusable card component
â”‚       â””â”€â”€ progress.tsx         # Progress bar component
â”œâ”€â”€ contexts/
â”‚   â””â”€â”€ AuthContext.tsx          # Global auth state management
â”œâ”€â”€ lib/
â”‚   â”œâ”€â”€ supabase.ts              # Supabase client configuration
â”‚   â””â”€â”€ utils.ts                 # Utility functions
â”œâ”€â”€ types/
â”‚   â””â”€â”€ index.ts                 # TypeScript type definitions
â”œâ”€â”€ SUPABASE_SETUP.sql           # Complete database schema
â”œâ”€â”€ DEPLOYMENT_GUIDE.md          # Deployment instructions
â””â”€â”€ package.json
```

---

## í·„ï¸ Database Schema

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

## í¿† Badge System

Unlock achievements as you progress:

| Badge | Requirement | XP Bonus |
|-------|-------------|----------|
| í¾¯ First Step | Complete 1 task | +10 XP |
| í³š The Bookworm | Complete 10 Reading tasks | +50 XP |
| í³– Vocab Hunter | Save 50 vocabulary words | +100 XP |
| í´¥ Week Warrior | Maintain 7-day streak | +75 XP |
| í·£ï¸ Speaking Star | Complete 20 Speaking tasks | +50 XP |
| âœï¸ Writing Wizard | Complete 15 Writing tasks | +50 XP |
| í±‚ Listening Legend | Complete 25 Listening tasks | +50 XP |
| â­ XP Master | Earn 1000 total XP | +200 XP |
| í¾“ Band 7 Achiever | Score 7+ in mock test | +150 XP |

---

## í» ï¸ Tech Stack

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

## íº¢ Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub** (already done âœ…)

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

## í³¸ Screenshots

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

## í·ºï¸ Roadmap

### âœ… Phase 1 (Completed)
- [x] Project setup with Next.js & TypeScript
- [x] Database schema design
- [x] Core UI components
- [x] Task list with categories
- [x] XP and level system
- [x] Stats dashboard
- [x] Radar chart for skills

### âœ… Phase 2 (Completed)
- [x] Supabase authentication
- [x] CRUD operations for tasks
- [x] Daily challenge generator API
- [x] Vocabulary feature
- [x] Mock test score tracker
- [x] Badge unlock logic

### íº§ Phase 3 (Future)
- [ ] Streak freeze purchase system
- [ ] Push notifications
- [ ] Data export (CSV/PDF)
- [ ] Dark mode toggle
- [ ] Mobile responsive optimization
- [ ] Word of the Day API integration
- [ ] Task edit/delete functionality
- [ ] Advanced filtering and search

---

## í´ Contributing

This is a personal project, but contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## í³ License

This project is licensed under the **MIT License** - feel free to use it for your own IELTS preparation journey!

---

## í¹ Acknowledgments

- Built with â¤ï¸ by someone who understands the IELTS struggle
- Inspired by Duolingo's gamification approach
- Powered by [Next.js](https://nextjs.org/) and [Supabase](https://supabase.com/)

---

## í³ Contact & Support

- **GitHub**: [@TaqiyudinMiftah](https://github.com/TaqiyudinMiftah)
- **Repository**: [MY-IELTS-TRACKER](https://github.com/TaqiyudinMiftah/MY-IELTS-TRACKER)

---

## í³š Documentation

- [Setup Guide](SETUP_GUIDE.md) - Detailed setup instructions
- [Database Schema](DATABASE_SCHEMA.md) - Complete database documentation
- [Deployment Guide](DEPLOYMENT_GUIDE.md) - How to deploy to production
- [Quick Fix Guide](QUICK_FIX.md) - Troubleshooting common issues

---

**Happy studying! Good luck with your IELTS preparation! í¾“í³š**
