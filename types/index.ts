export type Category = 'listening' | 'reading' | 'writing' | 'speaking';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface User {
  id: string;
  email: string;
  username: string;
  total_xp: number;
  level: number;
  streak_count: number;
  streak_freeze_count: number;
  last_activity_date: string | null;
  daily_goal_minutes: number;
  notification_enabled: boolean;
  created_at: string;
}

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  category: Category;
  xp_reward: number;
  difficulty: Difficulty;
  completed: boolean;
  completed_at: string | null;
  created_at: string;
  due_date: string | null;
}

export interface Badge {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  category: string | null;
  requirement_type: string;
  requirement_value: number;
  xp_bonus: number;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
  badge?: Badge;
}

export interface Vocabulary {
  id: string;
  user_id: string;
  word: string;
  definition: string | null;
  example_sentence: string | null;
  category: string | null;
  learned: boolean;
  created_at: string;
}

export interface MockTest {
  id: string;
  user_id: string;
  test_date: string;
  listening_score: number | null;
  reading_score: number | null;
  writing_score: number | null;
  speaking_score: number | null;
  overall_score: number | null;
  notes: string | null;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  activity_date: string;
  listening_minutes: number;
  reading_minutes: number;
  writing_minutes: number;
  speaking_minutes: number;
  xp_earned: number;
  created_at: string;
}

export interface DailyChallenge {
  id: string;
  challenge_date: string;
  category: Category;
  title: string;
  description: string;
  xp_reward: number;
}

export interface CategoryStats {
  listening: number;
  reading: number;
  writing: number;
  speaking: number;
}
