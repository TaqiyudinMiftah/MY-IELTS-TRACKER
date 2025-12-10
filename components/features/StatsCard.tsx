'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Flame, Star, Target } from 'lucide-react';

interface StatsCardProps {
  user: {
    total_xp: number;
    level: number;
    streak_count: number;
  };
}

export default function StatsCard({ user }: StatsCardProps) {
  const xpForNextLevel = user.level * 100;
  const currentLevelXp = user.total_xp - ((user.level - 1) * 100);
  const progress = (currentLevelXp / 100) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Level</CardTitle>
          <Trophy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{user.level}</div>
          <p className="text-xs text-muted-foreground">
            {currentLevelXp}/{100} XP
          </p>
          <Progress value={progress} className="mt-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total XP</CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{user.total_xp}</div>
          <p className="text-xs text-muted-foreground">
            Experience Points
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Streak</CardTitle>
          <Flame className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{user.streak_count}</div>
          <p className="text-xs text-muted-foreground">
            Days in a row
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Next Level</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{100 - currentLevelXp}</div>
          <p className="text-xs text-muted-foreground">
            XP needed
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
