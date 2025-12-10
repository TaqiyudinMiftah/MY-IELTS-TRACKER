'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserBadge } from '@/types';

interface BadgeShowcaseProps {
  badges: UserBadge[];
}

export default function BadgeShowcase({ badges }: BadgeShowcaseProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {badges.length === 0 ? (
            <p className="text-sm text-muted-foreground col-span-full text-center py-4">
              Complete tasks to earn badges!
            </p>
          ) : (
            badges.map((userBadge) => (
              <div
                key={userBadge.id}
                className="flex flex-col items-center gap-2 p-3 rounded-lg border hover:shadow-md transition-shadow"
              >
                <div className="text-4xl">{userBadge.badge?.icon}</div>
                <div className="text-xs text-center font-medium">
                  {userBadge.badge?.name}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
