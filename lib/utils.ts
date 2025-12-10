import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateLevel(xp: number): number {
  return Math.floor(xp / 100) + 1;
}

export function xpForNextLevel(currentXp: number): number {
  const currentLevel = calculateLevel(currentXp);
  return currentLevel * 100;
}

export const XP_REWARDS = {
  easy: 10,
  medium: 20,
  hard: 30,
} as const;

export const CATEGORY_COLORS = {
  listening: 'bg-blue-500',
  reading: 'bg-green-500',
  writing: 'bg-purple-500',
  speaking: 'bg-orange-500',
} as const;

export const CATEGORY_ICONS = {
  listening: 'EAR',
  reading: 'BOOK',
  writing: 'PEN',
  speaking: 'MIC',
} as const;

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function isStreakActive(lastActivityDate: string | null): boolean {
  if (lastActivityDate === null) return false;
  const last = new Date(lastActivityDate);
  const today = new Date();
  const diffTime = today.getTime() - last.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 1;
}
