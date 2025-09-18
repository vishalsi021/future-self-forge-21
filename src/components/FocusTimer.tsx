import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw, Target } from 'lucide-react';

interface FocusTimerProps {
  onSessionComplete?: (sessionData: { duration: number; type: string }) => void;
}

export const FocusTimer = ({ onSessionComplete }: FocusTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState<'focus' | 'break'>('focus');
  const [completedSessions, setCompletedSessions] = useState(0);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = sessionType === 'focus' 
    ? ((25 * 60 - timeLeft) / (25 * 60)) * 100
    : ((5 * 60 - timeLeft) / (5 * 60)) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Session completed
      onSessionComplete?.({ 
        duration: sessionType === 'focus' ? 25 : 5, 
        type: sessionType 
      });
      
      if (sessionType === 'focus') {
        setCompletedSessions(prev => prev + 1);
        setSessionType('break');
        setTimeLeft(5 * 60);
      } else {
        setSessionType('focus');
        setTimeLeft(25 * 60);
      }
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, sessionType, onSessionComplete]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(sessionType === 'focus' ? 25 * 60 : 5 * 60);
  };

  const switchSession = (type: 'focus' | 'break') => {
    setSessionType(type);
    setTimeLeft(type === 'focus' ? 25 * 60 : 5 * 60);
    setIsActive(false);
  };

  return (
    <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          {sessionType === 'focus' ? 'Deep Focus Session' : 'Recovery Break'}
        </CardTitle>
        <div className="flex justify-center gap-2 mt-4">
          <Badge 
            variant={sessionType === 'focus' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => switchSession('focus')}
          >
            Focus (25m)
          </Badge>
          <Badge 
            variant={sessionType === 'break' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => switchSession('break')}
          >
            Break (5m)
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-6xl font-mono font-bold text-primary mb-4">
            {formatTime(timeLeft)}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="flex justify-center gap-4">
          <Button 
            variant={isActive ? "outline" : "hero"} 
            size="lg"
            onClick={toggleTimer}
          >
            {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isActive ? 'Pause' : 'Start'}
          </Button>
          
          <Button variant="outline" size="lg" onClick={resetTimer}>
            <RotateCcw className="w-5 h-5" />
            Reset
          </Button>
        </div>

        {completedSessions > 0 && (
          <div className="text-center">
            <Badge variant="secondary" className="text-sm">
              🔥 {completedSessions} sessions completed today
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};