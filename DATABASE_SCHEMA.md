# IELTS Tracker Database Schema

## Tables

### 1. users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
```

### 2. tasks
```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
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
```

### 3. badges
```sql
CREATE TABLE badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  category TEXT,
  requirement_type TEXT, -- 'task_count', 'streak', 'xp_total', 'vocab_count'
  requirement_value INTEGER,
  xp_bonus INTEGER DEFAULT 0
);
```

### 4. user_badges
```sql
CREATE TABLE user_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);
```

### 5. vocabulary
```sql
CREATE TABLE vocabulary (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  word TEXT NOT NULL,
  definition TEXT,
  example_sentence TEXT,
  category TEXT,
  learned BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 6. mock_tests
```sql
CREATE TABLE mock_tests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
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
```

### 7. daily_challenges
```sql
CREATE TABLE daily_challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  challenge_date DATE UNIQUE NOT NULL,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  xp_reward INTEGER DEFAULT 50
);
```

### 8. activity_log
```sql
CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
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
```

## Indexes
```sql
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_category ON tasks(category);
CREATE INDEX idx_activity_log_user_date ON activity_log(user_id, activity_date);
CREATE INDEX idx_mock_tests_user_id ON mock_tests(user_id);
CREATE INDEX idx_vocabulary_user_id ON vocabulary(user_id);
```

## Sample Badge Data
```sql
INSERT INTO badges (name, description, icon, category, requirement_type, requirement_value, xp_bonus) VALUES
('First Step', 'Complete your first task', 'ÌæØ', 'general', 'task_count', 1, 10),
('The Bookworm', 'Complete 10 Reading tasks', 'Ì≥ö', 'reading', 'task_count', 10, 50),
('Vocab Hunter', 'Save 50 vocabulary words', 'Ì¥§', 'vocabulary', 'vocab_count', 50, 100),
('Week Warrior', '7-day streak', 'Ì¥•', 'streak', 'streak', 7, 75),
('Speaking Star', 'Complete 20 Speaking tasks', 'Ìæ§', 'speaking', 'task_count', 20, 50),
('Writing Wizard', 'Complete 15 Writing tasks', '‚úçÔ∏è', 'writing', 'task_count', 15, 50),
('Listening Legend', 'Complete 25 Listening tasks', 'Ì±Ç', 'listening', 'task_count', 25, 50),
('XP Master', 'Earn 1000 total XP', '‚≠ê', 'general', 'xp_total', 1000, 200),
('Band 7 Achiever', 'Get Band 7+ in mock test', 'ÌøÜ', 'test', 'mock_score', 7, 150);
```
