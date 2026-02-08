import React from 'react';
import { Button } from '@/components/ui';
import { useApp } from '@/context/AppContext';

export const LandingScreen: React.FC = () => {
  const { goToScreen } = useApp();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl w-full text-center space-y-8 animate-fade-in">
        {/* Logo/Brand */}
        <div className="mb-12">
          <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-accent-blue via-accent-teal to-accent-blue bg-clip-text text-transparent">
            IdeaDepth
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-accent-blue to-accent-teal mx-auto rounded-full"></div>
        </div>

        {/* Main Hook */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Before you make a big decision—
            <br />
            <span className="bg-gradient-to-r from-accent-blue to-accent-teal bg-clip-text text-transparent">
              think deeper.
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            Career. Startup. Education. Life choices.
          </p>

          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Get structured reasoning, not generic advice. 
            <br />
            Understand your constraints, risks, and alternatives.
          </p>
        </div>

        {/* CTA */}
        <div className="pt-8">
          <Button
            onClick={() => goToScreen('input')}
            className="text-lg px-8 py-4"
          >
            Analyze My Decision →
          </Button>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 max-w-3xl mx-auto">
          <div className="space-y-2">
            <div className="text-3xl">🧠</div>
            <h3 className="font-semibold text-white">Deep Analysis</h3>
            <p className="text-sm text-gray-400">
              Structured reasoning, not surface-level advice
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-3xl">🎯</div>
            <h3 className="font-semibold text-white">Context-Aware</h3>
            <p className="text-sm text-gray-400">
              Tailored to your specific situation and constraints
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-3xl">⚖️</div>
            <h3 className="font-semibold text-white">Trade-off Clarity</h3>
            <p className="text-sm text-gray-400">
              Understand consequences, alternatives, and uncertainties
            </p>
          </div>
        </div>

        {/* Subtle Footer */}
        <div className="pt-16 text-sm text-gray-500">
          No chat bubbles. No generic paragraphs. Just structured thinking.
        </div>
      </div>
    </div>
  );
};
