'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import StatsCard from '@/components/features/StatsCard';
import TaskList from '@/components/features/TaskList';
import RadarChart from '@/components/features/RadarChart';
import BadgeShowcase from '@/components/features/BadgeShowcase';
import AddTaskModal from '@/components/features/AddTaskModal';
import { Task, UserBadge, CategoryStats, User } from '@/types';
import { LogOut, Plus, BookOpen, FileText } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user: authUser, loading: authLoading, signOut } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [badges, setBadges] = useState<UserBadge[]>([]);
  const [categoryStats, setCategoryStats] = useState<CategoryStats>({
    listening: 0,
    reading: 0,
    writing: 0,
    speaking: 0,
  });
  const [loading, setLoading] = useState(true);
  const [showAddTask, setShowAddTask] = useState(false);

  useEffect(() => {
    if (!authLoading && !authUser) {
      router.push('/auth/login');
    }
  }, [authUser, authLoading, router]);

  useEffect(() => {
    if (authUser) {
      fetchUserData();
      fetchTasks();
      fetchBadges();
      calculateCategoryStats();
    }
  }, [authUser]);

  const fetchUserData = async () => {
    if (!authUser) return;

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', authUser.id)
      .single();

    if (data) setUser(data);
    setLoading(false);
  };

  const fetchTasks = async () => {
    if (!authUser) return;

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', authUser.id)
      .order('created_at', { ascending: false });

    if (data) setTasks(data);
  };

  const fetchBadges = async () => {
    if (!authUser) return;

    const { data, error } = await supabase
      .from('user_badges')
      .select(`
        *,
        badge:badges(*)
      `)
      .eq('user_id', authUser.id);

    if (data) setBadges(data);
  };

  const calculateCategoryStats = async () => {
    if (!authUser) return;

    const { data, error } = await supabase
      .from('tasks')
      .select('category')
      .eq('user_id', authUser.id)
      .eq('completed', true);

    if (data) {
      const stats: CategoryStats = {
        listening: 0,
        reading: 0,
        writing: 0,
        speaking: 0,
      };

      data.forEach((task) => {
        stats[task.category as keyof CategoryStats]++;
      });

      const total = Object.values(stats).reduce((a, b) => a + b, 0);
      if (total > 0) {
        Object.keys(stats).forEach((key) => {
          stats[key as keyof CategoryStats] = Math.round(
            (stats[key as keyof CategoryStats] / total) * 100
          );
        });
      }

      setCategoryStats(stats);
    }
  };

  const handleToggleTask = async (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task || !authUser) return;

    const newCompletedState = !task.completed;

    const { error } = await supabase
      .from('tasks')
      .update({
        completed: newCompletedState,
        completed_at: newCompletedState ? new Date().toISOString() : null,
      })
      .eq('id', taskId);

    if (!error) {
      if (newCompletedState && user) {
        const newXP = user.total_xp + task.xp_reward;
        const newLevel = Math.floor(newXP / 100) + 1;

        await supabase
          .from('users')
          .update({
            total_xp: newXP,
            level: newLevel,
            last_activity_date: new Date().toISOString().split('T')[0],
          })
          .eq('id', authUser.id);

        await checkAndUnlockBadges();
      }

      fetchTasks();
      fetchUserData();
      calculateCategoryStats();
    }
  };

  const checkAndUnlockBadges = async () => {
    if (!authUser || !user) return;

    const { data: allBadges } = await supabase.from('badges').select('*');
    const { data: userBadges } = await supabase
      .from('user_badges')
      .select('badge_id')
      .eq('user_id', authUser.id);

    const earnedBadgeIds = userBadges?.map((ub) => ub.badge_id) || [];

    for (const badge of allBadges || []) {
      if (earnedBadgeIds.includes(badge.id)) continue;

      let shouldUnlock = false;

      if (badge.requirement_type === 'task_count') {
        const { count } = await supabase
          .from('tasks')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', authUser.id)
          .eq('completed', true)
          .eq('category', badge.category);

        shouldUnlock = (count || 0) >= badge.requirement_value;
      } else if (badge.requirement_type === 'xp_total') {
        shouldUnlock = user.total_xp >= badge.requirement_value;
      } else if (badge.requirement_type === 'streak') {
        shouldUnlock = user.streak_count >= badge.requirement_value;
      }

      if (shouldUnlock) {
        await supabase.from('user_badges').insert({
          user_id: authUser.id,
          badge_id: badge.id,
        });
      }
    }

    fetchBadges();
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto max-w-7xl px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">IELTS Tracker</h1>
          <div className="flex items-center gap-4">
            <Link
              href="/vocabulary"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition"
            >
              <BookOpen size={20} />
              Vocabulary
            </Link>
            <Link
              href="/mock-tests"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition"
            >
              <FileText size={20} />
              Mock Tests
            </Link>
            <button
              onClick={signOut}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto max-w-7xl p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.username}!
          </h2>
          <p className="text-gray-600 mt-1">Keep up the great work!</p>
        </div>

        <StatsCard user={user} />

        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-gray-900">Your Tasks</h3>
            <button
              onClick={() => setShowAddTask(!showAddTask)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Plus size={20} />
              Add Task
            </button>
          </div>
          <TaskList tasks={tasks} onToggle={handleToggleTask} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Skills Balance</h3>
            <RadarChart stats={categoryStats} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Badges</h3>
            <BadgeShowcase badges={badges} />
          </div>
        </div>
      </div>

      {showAddTask && (
        <AddTaskModal
          userId={authUser!.id}
          onClose={() => setShowAddTask(false)}
          onTaskAdded={() => {
            fetchTasks();
            calculateCategoryStats();
          }}
        />
      )}
    </div>
  );
}
