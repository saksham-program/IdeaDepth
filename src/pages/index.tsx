import React from 'react';
import { useApp } from '@/context/AppContext';
import { LandingScreen } from '@/components/screens/LandingScreen';
import { InputScreen } from '@/components/screens/InputScreen';
import { ThinkingScreen } from '@/components/screens/ThinkingScreen';
import { AnalysisScreen } from '@/components/screens/AnalysisScreen';
import { FollowupScreen } from '@/components/screens/FollowupScreen';

export default function Home() {
  const { currentScreen } = useApp();

  return (
    <main className="min-h-screen bg-dark-bg">
      {currentScreen === 'landing' && <LandingScreen />}
      {currentScreen === 'input' && <InputScreen />}
      {currentScreen === 'thinking' && <ThinkingScreen />}
      {currentScreen === 'analysis' && <AnalysisScreen />}
      {currentScreen === 'followup' && <FollowupScreen />}
    </main>
  );
}
