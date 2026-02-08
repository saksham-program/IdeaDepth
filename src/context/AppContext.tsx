import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AnalysisResult } from '@/lib/analysisEngine';

interface DecisionInput {
  userInput: string;
  experienceLevel: string;
  riskTolerance: number;
  timeline: string;
}

interface AppState {
  // Current screen
  currentScreen: 'landing' | 'input' | 'thinking' | 'analysis' | 'followup';
  
  // User input
  decisionInput: DecisionInput;
  
  // Analysis result
  analysis: AnalysisResult | null;
  
  // Loading state
  isAnalyzing: boolean;
  
  // Error state
  error: string | null;
}

interface AppContextType extends AppState {
  // Navigation
  goToScreen: (screen: AppState['currentScreen']) => void;
  
  // Input management
  updateInput: (input: Partial<DecisionInput>) => void;
  
  // Analysis
  startAnalysis: () => Promise<void>;
  
  // Reset
  reset: () => void;
}

const defaultInput: DecisionInput = {
  userInput: '',
  experienceLevel: '',
  riskTolerance: 50,
  timeline: '',
};

const defaultState: AppState = {
  currentScreen: 'landing',
  decisionInput: defaultInput,
  analysis: null,
  isAnalyzing: false,
  error: null,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState);

  const goToScreen = (screen: AppState['currentScreen']) => {
    setState(prev => ({ ...prev, currentScreen: screen, error: null }));
  };

  const updateInput = (input: Partial<DecisionInput>) => {
    setState(prev => ({
      ...prev,
      decisionInput: { ...prev.decisionInput, ...input },
    }));
  };

  const startAnalysis = async () => {
    setState(prev => ({ ...prev, isAnalyzing: true, error: null, currentScreen: 'thinking' }));

    try {
      // Call API endpoint
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state.decisionInput),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Analysis failed');
      }

      setState(prev => ({
        ...prev,
        analysis: result.data,
        isAnalyzing: false,
        currentScreen: 'analysis',
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isAnalyzing: false,
        error: error instanceof Error ? error.message : 'An error occurred',
        currentScreen: 'input',
      }));
    }
  };

  const reset = () => {
    setState(defaultState);
  };

  const value: AppContextType = {
    ...state,
    goToScreen,
    updateInput,
    startAnalysis,
    reset,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
