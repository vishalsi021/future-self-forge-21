import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Brain, Sparkles, Save } from 'lucide-react';

export const JournalInterface = () => {
  const [entry, setEntry] = useState('');
  const [mood, setMood] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<{
    mood: string;
    themes: string[];
    recommendation: string;
  } | null>(null);

  const moodOptions = [
    { emoji: '🔥', label: 'Motivated', value: 'motivated' },
    { emoji: '😌', label: 'Calm', value: 'calm' },
    { emoji: '😤', label: 'Frustrated', value: 'frustrated' },
    { emoji: '🎯', label: 'Focused', value: 'focused' },
    { emoji: '😴', label: 'Tired', value: 'tired' },
    { emoji: '🤔', label: 'Confused', value: 'confused' },
  ];

  const handleAnalyze = async () => {
    if (!entry.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis (in real app, this would call your AI service)
    setTimeout(() => {
      setAnalysis({
        mood: mood || 'focused',
        themes: ['Goal Planning', 'Time Management', 'Self Discipline'],
        recommendation: 'Start with one small win to build momentum. Focus on the process, not just outcomes.'
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleSave = () => {
    // In real app, save to database
    console.log('Saving journal entry:', { entry, mood, analysis });
    setEntry('');
    setMood('');
    setAnalysis(null);
  };

  return (
    <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Daily Reflection Journal
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
          <label className="text-sm font-medium mb-2 block">
            How are you feeling right now?
          </label>
          <div className="flex flex-wrap gap-2">
            {moodOptions.map((option) => (
              <Button
                key={option.value}
                variant={mood === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => setMood(option.value)}
                className="text-sm"
              >
                {option.emoji} {option.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            What's on your mind? What did you learn today?
          </label>
          <Textarea
            placeholder="Write about your day, challenges, wins, or anything that's on your mind. Your future self AI will analyze this to help you grow..."
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            className="min-h-[120px] resize-none"
          />
        </div>

        <div className="flex gap-3">
          <Button 
            variant="hero" 
            onClick={handleAnalyze}
            disabled={!entry.trim() || isAnalyzing}
            className="flex-1"
          >
            <Brain className="w-4 h-4" />
            {isAnalyzing ? 'Analyzing...' : 'AI Analysis'}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleSave}
            disabled={!entry.trim()}
          >
            <Save className="w-4 h-4" />
            Save
          </Button>
        </div>

        {analysis && (
          <div className="bg-gradient-primary/10 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="font-semibold">AI Insights</span>
            </div>
            
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium">Detected Mood: </span>
                <Badge variant="outline">{analysis.mood}</Badge>
              </div>
              
              <div>
                <span className="text-sm font-medium">Key Themes: </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {analysis.themes.map((theme, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {theme}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <span className="text-sm font-medium">Recommendation: </span>
                <p className="text-sm text-foreground/90 mt-1">
                  {analysis.recommendation}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};