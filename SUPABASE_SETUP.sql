-- IELTS Tracker - Complete Database Schema
-- Run this in Supabase SQL Editor

-- 1. Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Users table (links to auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  
  -- Gamification
  total_xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak_count INTEGER DEFAULT 0,
  streak_freeze_count INTEGER DEFAULT 1,
  last_activity_date DATE,
  
  -- Settings
  daily_goal_minutes INTEGER DEFAULT 30,
  notification_enabled BOOLEAN DEFAULT true
);

-- 3. Tasks table
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('listening', 'reading', 'writing', 'speaking')),
  
  -- XP & Difficulty
  xp_reward INTEGER NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  
  -- Status
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  due_date DATE
);

-- 4. Badges table
CREATE TABLE IF NOT EXISTS public.badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  category TEXT,
  requirement_type TEXT,
  requirement_value INTEGER,
  xp_bonus INTEGER DEFAULT 0
);

-- 5. User badges table
CREATE TABLE IF NOT EXISTS public.user_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES public.badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- 6. Vocabulary table
CREATE TABLE IF NOT EXISTS public.vocabulary (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  word TEXT NOT NULL,
  definition TEXT,
  example_sentence TEXT,
  category TEXT,
  learned BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 7. Mock tests table
CREATE TABLE IF NOT EXISTS public.mock_tests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  test_date DATE NOT NULL,
  
  -- Scores (0-9 scale)
  listening_score DECIMAL(3,1),
  reading_score DECIMAL(3,1),
  writing_score DECIMAL(3,1),
  speaking_score DECIMAL(3,1),
  overall_score DECIMAL(3,1),
  
  -- Notes
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 8. Daily challenges table
CREATE TABLE IF NOT EXISTS public.daily_challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  challenge_date DATE UNIQUE NOT NULL,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  xp_reward INTEGER DEFAULT 50
);

-- 9. Activity log table
CREATE TABLE IF NOT EXISTS public.activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  activity_date DATE NOT NULL,
  
  -- Time spent per category (in minutes)
  listening_minutes INTEGER DEFAULT 0,
  reading_minutes INTEGER DEFAULT 0,
  writing_minutes INTEGER DEFAULT 0,
  speaking_minutes INTEGER DEFAULT 0,
  
  -- Daily XP earned
  xp_earned INTEGER DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, activity_date)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON public.tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_category ON public.tasks(category);
CREATE INDEX IF NOT EXISTS idx_activity_log_user_date ON public.activity_log(user_id, activity_date);
CREATE INDEX IF NOT EXISTS idx_mock_tests_user_id ON public.mock_tests(user_id);
CREATE INDEX IF NOT EXISTS idx_vocabulary_user_id ON public.vocabulary(user_id);

-- Insert sample badges
INSERT INTO public.badges (name, description, icon, category, requirement_type, requirement_value, xp_bonus) VALUES
('First Step', 'Complete your first task', '���', 'general', 'task_count', 1, 10),
('The Bookworm', 'Complete 10 Reading tasks', '���', 'reading', 'task_count', 10, 50),
('Vocab Hunter', 'Save 50 vocabulary words', '���', 'vocabulary', 'vocab_count', 50, 100),
('Week Warrior', '7-day streak', '���', 'streak', 'streak', 7, 75),
('Speaking Star', 'Complete 20 Speaking tasks', '���', 'speaking', 'task_count', 20, 50),
('Writing Wizard', 'Complete 15 Writing tasks', '✍️', 'writing', 'task_count', 15, 50),
('Listening Legend', 'Complete 25 Listening tasks', '���', 'listening', 'task_count', 25, 50),
('XP Master', 'Earn 1000 total XP', '⭐', 'general', 'xp_total', 1000, 200),
('Band 7 Achiever', 'Get Band 7+ in mock test', '���', 'test', 'mock_score', 7, 150)
ON CONFLICT (name) DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vocabulary ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mock_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Allow authenticated users to insert their profile" ON public.users
  FOR INSERT WITH CHECK (true);

-- Create policies for tasks table
CREATE POLICY "Users can view own tasks" ON public.tasks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tasks" ON public.tasks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks" ON public.tasks
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tasks" ON public.tasks
  FOR DELETE USING (auth.uid() = user_id);

-- Create policies for user_badges table
CREATE POLICY "Users can view own badges" ON public.user_badges
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own badges" ON public.user_badges
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policies for vocabulary table
CREATE POLICY "Users can view own vocabulary" ON public.vocabulary
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own vocabulary" ON public.vocabulary
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own vocabulary" ON public.vocabulary
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own vocabulary" ON public.vocabulary
  FOR DELETE USING (auth.uid() = user_id);

-- Create policies for mock_tests table
CREATE POLICY "Users can view own mock tests" ON public.mock_tests
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own mock tests" ON public.mock_tests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own mock tests" ON public.mock_tests
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own mock tests" ON public.mock_tests
  FOR DELETE USING (auth.uid() = user_id);

-- Create policies for activity_log table
CREATE POLICY "Users can view own activity log" ON public.activity_log
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activity log" ON public.activity_log
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own activity log" ON public.activity_log
  FOR UPDATE USING (auth.uid() = user_id);

-- Badges table is readable by all authenticated users
CREATE POLICY "Authenticated users can view badges" ON public.badges
  FOR SELECT USING (auth.role() = 'authenticated');

-- Daily challenges table is readable by all authenticated users
CREATE POLICY "Authenticated users can view daily challenges" ON public.daily_challenges
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow service role to insert daily challenges
CREATE POLICY "Service role can manage daily challenges" ON public.daily_challenges
  FOR ALL USING (auth.role() = 'service_role');
