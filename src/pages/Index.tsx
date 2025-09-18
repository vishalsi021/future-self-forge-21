import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FocusTimer } from '@/components/FocusTimer';
import { AICoach } from '@/components/AICoach';
import { HabitTracker } from '@/components/HabitTracker';
import { JournalInterface } from '@/components/JournalInterface';
import { Dashboard } from '@/components/Dashboard';
import { Brain, Timer, BookOpen, Calendar, BarChart3 } from 'lucide-react';
import heroBrain from '@/assets/hero-brain.jpg';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero/20 backdrop-blur-sm border-b border-primary/20">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent leading-tight">
                  MindOS
                </h1>
                <p className="text-xl text-muted-foreground mt-4">
                  Your Future Self AI Coach
                </p>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                  Transform distraction into <span className="text-primary">disciplined action</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  MindOS uses AI to make you ruthlessly focused, productive, and unstoppable. 
                  Stop procrastinating. Start becoming your future self today.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="hero" 
                  size="lg"
                  onClick={() => setActiveTab('timer')}
                  className="text-lg px-8 py-6"
                >
                  Start Focus Session
                </Button>
                <Button 
                  variant="future" 
                  size="lg"
                  onClick={() => setActiveTab('coach')}
                  className="text-lg px-8 py-6"
                >
                  Meet Your AI Coach
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img 
                  src={heroBrain} 
                  alt="AI Neural Network representing future self transformation"
                  className="w-full h-auto rounded-2xl shadow-glow"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-primary/20 rounded-2xl blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Main App Interface */}
      <section className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="timer" className="flex items-center gap-2">
              <Timer className="w-4 h-4" />
              Focus
            </TabsTrigger>
            <TabsTrigger value="coach" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              AI Coach
            </TabsTrigger>
            <TabsTrigger value="habits" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Habits
            </TabsTrigger>
            <TabsTrigger value="journal" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Journal
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>

          <TabsContent value="timer">
            <div className="max-w-2xl mx-auto">
              <FocusTimer 
                onSessionComplete={(data) => {
                  console.log('Session completed:', data);
                }}
              />
            </div>
          </TabsContent>

          <TabsContent value="coach">
            <div className="max-w-4xl mx-auto">
              <AICoach 
                onModeSelect={(mode) => {
                  console.log('Coach mode selected:', mode);
                }}
              />
            </div>
          </TabsContent>

          <TabsContent value="habits">
            <div className="max-w-2xl mx-auto">
              <HabitTracker />
            </div>
          </TabsContent>

          <TabsContent value="journal">
            <div className="max-w-2xl mx-auto">
              <JournalInterface />
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default Index;
