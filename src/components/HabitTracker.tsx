import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, Flame, Calendar } from 'lucide-react';

interface Habit {
  id: string;
  name: string;
  streak: number;
  completedToday: boolean;
  target: number; // days for the 21-day challenge
}

export const HabitTracker = () => {
  const [habits, setHabits] = useState<Habit[]>([
    { id: '1', name: 'Morning Journaling', streak: 7, completedToday: false, target: 21 },
    { id: '2', name: 'Deep Work Session', streak: 12, completedToday: true, target: 21 },
    { id: '3', name: 'No Social Media Before Noon', streak: 5, completedToday: false, target: 21 },
    { id: '4', name: 'Evening Reflection', streak: 3, completedToday: false, target: 21 },
  ]);

  const toggleHabit = (habitId: string) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const newCompleted = !habit.completedToday;
        return {
          ...habit,
          completedToday: newCompleted,
          streak: newCompleted ? habit.streak + 1 : Math.max(0, habit.streak - 1)
        };
      }
      return habit;
    }));
  };

  const completedToday = habits.filter(h => h.completedToday).length;
  const totalHabits = habits.length;
  const overallProgress = (completedToday / totalHabits) * 100;

  return (
    <Card className="border-accent/20 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-accent" />
            21-Day Transformation
          </div>
          <Badge variant={completedToday === totalHabits ? "default" : "outline"}>
            {completedToday}/{totalHabits} today
          </Badge>
        </CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Daily Progress</span>
            <span>{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {habits.map((habit) => (
          <div key={habit.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 h-auto"
                  onClick={() => toggleHabit(habit.id)}
                >
                  {habit.completedToday ? (
                    <CheckCircle2 className="w-6 h-6 text-accent" />
                  ) : (
                    <Circle className="w-6 h-6 text-muted-foreground hover:text-accent" />
                  )}
                </Button>
                <div>
                  <p className={`font-medium ${habit.completedToday ? 'line-through opacity-75' : ''}`}>
                    {habit.name}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Flame className="w-3 h-3" />
                    <span>{habit.streak} day streak</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Progress 
                  value={(habit.streak / habit.target) * 100} 
                  className="w-16 h-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {habit.streak}/{habit.target}
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="pt-4 border-t border-border">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              🏆 Complete all habits for <strong>21 days</strong> to transform your identity
            </p>
            <Badge variant="secondary" className="text-xs">
              Neuroplasticity kicks in around day 14-21
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};