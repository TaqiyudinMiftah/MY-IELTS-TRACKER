'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Task } from '@/types';
import { CATEGORY_COLORS } from '@/lib/utils';
import { Check, Circle } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onToggle: (taskId: string) => void;
}

export default function TaskList({ tasks, onToggle }: TaskListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today&apos;s Tasks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {tasks.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No tasks yet. Add your first task to get started!
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent cursor-pointer transition-colors"
              onClick={() => onToggle(task.id)}
            >
              {task.completed ? (
                <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              )}
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={task.completed ? 'line-through text-muted-foreground' : ''}>
                    {task.title}
                  </span>
                </div>
                {task.description && (
                  <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded ${CATEGORY_COLORS[task.category]} text-white`}>
                  {task.category}
                </span>
                <span className="text-sm font-semibold text-yellow-600">
                  +{task.xp_reward} XP
                </span>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
