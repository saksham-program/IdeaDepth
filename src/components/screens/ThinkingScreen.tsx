import React, { useState, useEffect } from 'react';
import { LoadingStep } from '@/components/ui';

const REASONING_STEPS = [
  'Identifying your decision type',
  'Extracting constraints and context',
  'Checking assumptions',
  'Evaluating trade-offs',
  'Analyzing consequences',
  'Finding alternatives',
  'Forming recommendation',
];

export const ThinkingScreen: React.FC = () => {
  const [completedSteps, setCompletedSteps] = useState<number>(0);

  useEffect(() => {
    // Simulate progressive step completion
    const interval = setInterval(() => {
      setCompletedSteps((prev) => {
        if (prev < REASONING_STEPS.length) {
          return prev + 1;
        }
        return prev;
      });
    }, 400); // Each step completes every 400ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="inline-block">
            <div className="w-16 h-16 border-4 border-accent-blue border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-3xl font-bold text-white">
            Analyzing your decision...
          </h2>
          <p className="text-gray-400">
            Running structured reasoning protocol
          </p>
        </div>

        {/* Reasoning Steps */}
        <div className="glass-card p-8 space-y-4">
          {REASONING_STEPS.map((step, index) => (
            <LoadingStep
              key={index}
              text={step}
              completed={index < completedSteps}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center text-sm text-gray-500 animate-fade-in" style={{ animationDelay: '700ms' }}>
          <p>
            This process analyzes your input through multiple reasoning layers
            <br />
            to provide context-specific insights.
          </p>
        </div>
      </div>
    </div>
  );
};
