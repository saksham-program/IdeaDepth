import React from 'react';
import { Button, Card } from '@/components/ui';
import { useApp } from '@/context/AppContext';

const FOLLOWUP_OPTIONS = [
  {
    title: 'Test a different scenario',
    description: 'Modify your inputs to explore alternative paths',
    action: 'input',
  },
  {
    title: 'Adjust risk tolerance',
    description: 'See how different risk levels affect the recommendation',
    action: 'input',
  },
  {
    title: 'Change timeline',
    description: 'Explore how urgency impacts your decision',
    action: 'input',
  },
];

export const FollowupScreen: React.FC = () => {
  const { goToScreen, reset, analysis } = useApp();

  if (!analysis) {
    return null;
  }

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl font-bold text-white">
            Refine Your Analysis
          </h1>
          <p className="text-gray-400">
            Explore different scenarios or start a new analysis
          </p>
        </div>

        {/* Quick Actions */}
        <Card delay={100}>
          <h3 className="text-xl font-semibold text-white mb-4">
            What would you like to do?
          </h3>
          <div className="space-y-3">
            {FOLLOWUP_OPTIONS.map((option, i) => (
              <button
                key={i}
                onClick={() => goToScreen(option.action as any)}
                className="w-full p-4 glass-card text-left hover:bg-opacity-80 transition-all rounded-lg group"
              >
                <h4 className="text-lg font-semibold text-white group-hover:text-accent-blue transition-colors">
                  {option.title}
                </h4>
                <p className="text-gray-400 text-sm mt-1">
                  {option.description}
                </p>
              </button>
            ))}
          </div>
        </Card>

        {/* Analysis Summary Card */}
        <Card delay={200}>
          <h3 className="text-xl font-semibold text-white mb-4">
            Your Current Analysis
          </h3>
          <div className="space-y-3 text-gray-300">
            <div>
              <span className="text-accent-blue font-medium">Domain: </span>
              {analysis.understanding.domain}
            </div>
            <div>
              <span className="text-accent-blue font-medium">Profile: </span>
              {analysis.understanding.userType}
            </div>
            <div>
              <span className="text-accent-blue font-medium">Key Goal: </span>
              {analysis.understanding.goal}
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <Button
              onClick={() => goToScreen('analysis')}
              variant="secondary"
              className="flex-1"
            >
              View Full Analysis
            </Button>
          </div>
        </Card>

        {/* Start Over */}
        <Card delay={300} className="text-center">
          <h3 className="text-xl font-semibold text-white mb-2">
            Start Fresh
          </h3>
          <p className="text-gray-400 mb-4">
            Analyze a completely different decision
          </p>
          <Button
            onClick={() => reset()}
            variant="secondary"
          >
            New Decision Analysis
          </Button>
        </Card>

        {/* Additional Tips */}
        <Card delay={400}>
          <h3 className="text-lg font-semibold text-white mb-3">
            Tips for Better Analysis
          </h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-start space-x-2">
              <span className="text-accent-blue mt-1">→</span>
              <span>Provide specific constraints (financial, time, skills) for more targeted insights</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-accent-blue mt-1">→</span>
              <span>Include context about your current situation and what's driving the decision</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-accent-blue mt-1">→</span>
              <span>Be honest about uncertainties and concerns—analysis quality depends on input quality</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-accent-blue mt-1">→</span>
              <span>Use the optional context fields to fine-tune the analysis to your situation</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};
