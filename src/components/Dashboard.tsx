import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart3, Clock, Target, TrendingUp, Zap, Trophy } from 'lucide-react';

export const Dashboard = () => {
  const weeklyStats = {
    focusSessions: 12,
    totalFocusTime: 487, // minutes
    habitsCompleted: 23,
    journalEntries: 5,
    weeklyGoal: 15, // sessions
    productivity: 87 // percentage
  };

  const achievements = [
    { name: "Focus Warrior", description: "10 focus sessions this week", icon: "🥇" },
    { name: "Habit Builder", description: "5-day habit streak", icon: "🔥" },
    { name: "Reflection Master", description: "Daily journaling for 3 days", icon: "📝" },
  ];

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="space-y-6">
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-primary/20 bg-gradient-primary/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{weeklyStats.focusSessions}</p>
                <p className="text-sm text-muted-foreground">Focus Sessions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-accent/20 bg-gradient-accent/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-accent" />
              <div>
                <p className="text-2xl font-bold">{formatTime(weeklyStats.totalFocusTime)}</p>
                <p className="text-sm text-muted-foreground">Deep Work</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{weeklyStats.productivity}%</p>
                <p className="text-sm text-muted-foreground">Productivity</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-accent/20 bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-accent" />
              <div>
                <p className="text-2xl font-bold">{weeklyStats.habitsCompleted}</p>
                <p className="text-sm text-muted-foreground">Habits Done</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress */}
      <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Weekly Focus Goal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-sm">
            <span>Progress this week</span>
            <span>{weeklyStats.focusSessions}/{weeklyStats.weeklyGoal} sessions</span>
          </div>
          <Progress 
            value={(weeklyStats.focusSessions / weeklyStats.weeklyGoal) * 100} 
            className="h-3"
          />
          <div className="text-center">
            <Badge 
              variant={weeklyStats.focusSessions >= weeklyStats.weeklyGoal ? "default" : "outline"}
            >
              {weeklyStats.focusSessions >= weeklyStats.weeklyGoal ? "🎯 Goal Achieved!" : `${weeklyStats.weeklyGoal - weeklyStats.focusSessions} sessions to go`}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card className="border-accent/20 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-accent" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                <span className="text-2xl">{achievement.icon}</span>
                <div>
                  <p className="font-semibold">{achievement.name}</p>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Motivational Quote */}
      <Card className="border-primary/20 bg-gradient-hero/10 backdrop-blur-sm">
        <CardContent className="p-6 text-center">
          <p className="text-lg font-semibold mb-2">
            "Your future self is watching. Make them proud."
          </p>
          <p className="text-sm text-muted-foreground">
            — MindOS AI Coach
          </p>
        </CardContent>
      </Card>
    </div>
  );
};