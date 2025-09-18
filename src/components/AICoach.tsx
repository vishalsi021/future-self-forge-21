import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Zap, Eye, Heart, Users } from 'lucide-react';

interface AICoachProps {
  onModeSelect?: (mode: string) => void;
}

export const AICoach = ({ onModeSelect }: AICoachProps) => {
  const [selectedMode, setSelectedMode] = useState<string>('clarity');

  const coachModes = [
    {
      id: 'clarity',
      name: 'Clarity',
      icon: Eye,
      description: 'Get a crystal-clear 3-hour action plan',
      prompt: "What's your 3 today? Let's build ruthless focus.",
      color: 'text-blue-400'
    },
    {
      id: 'discipline',
      name: 'Discipline',
      icon: Zap,
      description: 'Stop excuses. Start now.',
      prompt: "No more delays. What's the ONE thing you'll do in the next 5 minutes?",
      color: 'text-red-400'
    },
    {
      id: 'vision',
      name: 'Vision',
      icon: Brain,
      description: 'See your future self in vivid detail',
      prompt: "Imagine yourself 12 months from now, completely transformed...",
      color: 'text-purple-400'
    },
    {
      id: 'recovery',
      name: 'Recovery',
      icon: Heart,
      description: 'Reset and recharge with gentle guidance',
      prompt: "Let's reset. Take 3 deep breaths and start with one tiny step.",
      color: 'text-green-400'
    },
    {
      id: 'social',
      name: 'Social',
      icon: Users,
      description: 'Join focus rooms and compete',
      prompt: "Ready to focus with others? Let's build momentum together.",
      color: 'text-orange-400'
    }
  ];

  const handleModeSelect = (mode: string) => {
    setSelectedMode(mode);
    onModeSelect?.(mode);
  };

  const selectedModeData = coachModes.find(mode => mode.id === selectedMode);

  return (
    <div className="space-y-6">
      <Card className="border-primary/20 bg-gradient-primary/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            Your Future Self Coach
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Choose Your Mode</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {coachModes.map((mode) => {
                const Icon = mode.icon;
                return (
                  <Button
                    key={mode.id}
                    variant={selectedMode === mode.id ? "hero" : "outline"}
                    className="h-auto p-4 flex flex-col items-start gap-2"
                    onClick={() => handleModeSelect(mode.id)}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${mode.color}`} />
                      <span className="font-semibold">{mode.name}</span>
                    </div>
                    <p className="text-xs text-left opacity-80">{mode.description}</p>
                  </Button>
                );
              })}
            </div>
          </div>

          {selectedModeData && (
            <div className="bg-background/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <selectedModeData.icon className={`w-5 h-5 ${selectedModeData.color}`} />
                <Badge variant="outline">{selectedModeData.name} Mode</Badge>
              </div>
              <p className="text-foreground/90 mb-4">"{selectedModeData.prompt}"</p>
              <Button variant="future" className="w-full">
                Activate {selectedModeData.name} Mode
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-accent/20 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              🎯 <strong>Your Mission Today:</strong>
            </p>
            <p className="text-foreground">
              Transform distraction into disciplined action. Become the future version of yourself.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};