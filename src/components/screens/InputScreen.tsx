import React, { useState, useEffect } from 'react';
import { Button, Textarea, Select, Slider, Accordion } from '@/components/ui';
import { useApp } from '@/context/AppContext';

const PLACEHOLDER_EXAMPLES = [
  "I want to quit my job and start a startup…",
  "Should I pursue a master's degree or work?",
  "I have this app idea but I'm unsure if it's worth building…",
  "I'm considering a career change to a different industry…",
  "Should I move to a new city for better opportunities?",
];

const EXPERIENCE_OPTIONS = [
  { value: '', label: 'Select experience level' },
  { value: 'Student', label: 'Student' },
  { value: 'Early Career (0-3 years)', label: 'Early Career (0-3 years)' },
  { value: 'Mid-Career (3-8 years)', label: 'Mid-Career (3-8 years)' },
  { value: 'Senior (8+ years)', label: 'Senior (8+ years)' },
  { value: 'Founder/Entrepreneur', label: 'Founder/Entrepreneur' },
];

const TIMELINE_OPTIONS = [
  { value: '', label: 'Select decision timeline' },
  { value: 'Immediate (within 1 month)', label: 'Immediate (within 1 month)' },
  { value: 'Short-term (1-6 months)', label: 'Short-term (1-6 months)' },
  { value: 'Medium-term (6-12 months)', label: 'Medium-term (6-12 months)' },
  { value: 'Long-term (1+ years)', label: 'Long-term (1+ years)' },
];

export const InputScreen: React.FC = () => {
  const { decisionInput, updateInput, startAnalysis, goToScreen, error } = useApp();
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);

  // Rotate placeholder examples
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % PLACEHOLDER_EXAMPLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (decisionInput.userInput.trim().length < 20) {
      alert('Please provide more details about your decision (at least 20 characters)');
      return;
    }
    
    startAnalysis();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-3xl w-full space-y-8">
        {/* Back button */}
        <button
          onClick={() => goToScreen('landing')}
          className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back</span>
        </button>

        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl font-bold text-white">
            Tell us about your decision
          </h1>
          <p className="text-gray-400 text-lg">
            The more context you provide, the better the analysis
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Input */}
          <div className="space-y-3 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <label className="block text-white font-medium text-lg">
              What decision or idea are you thinking about?
            </label>
            <Textarea
              value={decisionInput.userInput}
              onChange={(value) => updateInput({ userInput: value })}
              placeholder={PLACEHOLDER_EXAMPLES[currentPlaceholder]}
              rows={8}
              className="text-lg"
            />
            <p className="text-sm text-gray-500">
              {decisionInput.userInput.length} characters
              {decisionInput.userInput.length < 20 && ' (minimum 20 required)'}
            </p>
          </div>

          {/* Optional Context */}
          <Accordion 
            title="Optional Context (improves accuracy)" 
            className="animate-fade-in"
            style={{ animationDelay: '200ms' } as any}
          >
            <div className="space-y-6 mt-4">
              {/* Experience Level */}
              <div className="space-y-2">
                <label className="block text-white font-medium">
                  Experience Level
                </label>
                <Select
                  value={decisionInput.experienceLevel}
                  onChange={(value) => updateInput({ experienceLevel: value })}
                  options={EXPERIENCE_OPTIONS}
                  className="w-full"
                />
              </div>

              {/* Risk Tolerance */}
              <div className="space-y-2">
                <Slider
                  value={decisionInput.riskTolerance}
                  onChange={(value) => updateInput({ riskTolerance: value })}
                  min={0}
                  max={100}
                  step={10}
                  label="Risk Tolerance"
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Conservative</span>
                  <span>Moderate</span>
                  <span>Aggressive</span>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-2">
                <label className="block text-white font-medium">
                  Decision Timeline
                </label>
                <Select
                  value={decisionInput.timeline}
                  onChange={(value) => updateInput({ timeline: value })}
                  options={TIMELINE_OPTIONS}
                  className="w-full"
                />
              </div>
            </div>
          </Accordion>

          {/* Error Message */}
          {error && (
            <div className="glass-card p-4 border-warning animate-fade-in">
              <p className="text-warning">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <Button
              type="submit"
              className="w-full text-lg py-4"
              disabled={decisionInput.userInput.trim().length < 20}
            >
              Analyze This Idea
            </Button>
          </div>
        </form>

        {/* Help Text */}
        <div className="text-center text-sm text-gray-500 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <p>
            This analysis uses structured reasoning principles to evaluate your decision.
            <br />
            No data is stored or shared.
          </p>
        </div>
      </div>
    </div>
  );
};
