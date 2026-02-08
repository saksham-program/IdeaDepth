import React from 'react';
import { Card, SectionTitle, Tag, Accordion, Button } from '@/components/ui';
import { useApp } from '@/context/AppContext';
import { AnalysisResult } from '@/lib/analysisEngine';

export const AnalysisScreen: React.FC = () => {
  const { analysis, goToScreen } = useApp();

  if (!analysis) {
    return null;
  }

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl font-bold text-white">
            Your Decision Analysis
          </h1>
          <p className="text-gray-400">
            Structured reasoning based on your specific context
          </p>
        </div>

        {/* Section 1: Understanding Your Situation */}
        <Section1Understanding data={analysis.understanding} />

        {/* Section 2: Key Assumptions Detected */}
        <Section2Assumptions assumptions={analysis.assumptions} />

        {/* Section 3: Reality Check */}
        <Section3RealityCheck realityCheck={analysis.realityCheck} />

        {/* Section 4: Consequences Map */}
        <Section4Consequences consequences={analysis.consequences} />

        {/* Section 5: Alternatives */}
        <Section5Alternatives alternatives={analysis.alternatives} />

        {/* Section 6: Final Recommendation */}
        <Section6Recommendation recommendation={analysis.recommendation} />

        {/* Section 7: Uncertainty Disclosure */}
        <Section7Uncertainty uncertainty={analysis.uncertainty} />

        {/* Action Buttons */}
        <Card className="text-center space-y-4" delay={700}>
          <h3 className="text-xl font-semibold text-white">
            What would you like to do next?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => goToScreen('followup')} variant="primary">
              Refine Analysis
            </Button>
            <Button onClick={() => goToScreen('input')} variant="secondary">
              New Decision
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Section 1: Understanding Your Situation
const Section1Understanding: React.FC<{ data: AnalysisResult['understanding'] }> = ({ data }) => {
  return (
    <Card delay={0}>
      <SectionTitle>Understanding Your Situation</SectionTitle>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-semibold text-accent-blue mb-1">Profile</h4>
            <p className="text-white">{data.userType}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-accent-blue mb-1">Domain</h4>
            <p className="text-white">{data.domain}</p>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-accent-blue mb-2">Your Decision</h4>
          <p className="text-gray-300 italic">"{data.problem}"</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-accent-blue mb-2">Key Constraints</h4>
          <div className="flex flex-wrap gap-2">
            {data.constraints.map((constraint, i) => (
              <Tag key={i}>{constraint}</Tag>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-accent-blue mb-2">Emotional Signals</h4>
          <div className="flex flex-wrap gap-2">
            {data.emotionalSignals.map((signal, i) => (
              <Tag key={i} className="bg-opacity-50">{signal}</Tag>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-accent-blue mb-1">Core Goal</h4>
          <p className="text-white">{data.goal}</p>
        </div>
      </div>
    </Card>
  );
};

// Section 2: Key Assumptions Detected
const Section2Assumptions: React.FC<{ assumptions: string[] }> = ({ assumptions }) => {
  return (
    <Card delay={100}>
      <SectionTitle>Key Assumptions Identified</SectionTitle>
      <p className="text-gray-400 mb-4">
        These are beliefs embedded in your decision that may need examination:
      </p>
      <div className="space-y-3">
        {assumptions.map((assumption, i) => (
          <div key={i} className="flex items-start space-x-3 p-3 glass-card rounded-lg">
            <div className="flex-shrink-0 mt-1">
              <svg className="w-5 h-5 text-warning" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-white">{assumption}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

// Section 3: Reality Check
const Section3RealityCheck: React.FC<{ realityCheck: AnalysisResult['realityCheck'] }> = ({ realityCheck }) => {
  return (
    <Card delay={200}>
      <SectionTitle>Reality Check (Domain-Aware)</SectionTitle>
      <p className="text-gray-400 mb-4">
        How your beliefs compare to real-world constraints:
      </p>
      <div className="space-y-4">
        {realityCheck.map((check, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 glass-card rounded-lg">
            <div>
              <h4 className="text-sm font-semibold text-accent-blue mb-2">Your Belief</h4>
              <p className="text-gray-300">{check.belief}</p>
            </div>
            <div className="border-l border-dark-border pl-4">
              <h4 className="text-sm font-semibold text-accent-teal mb-2">Reality</h4>
              <p className="text-white">{check.reality}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

// Section 4: Consequences Map
const Section4Consequences: React.FC<{ consequences: AnalysisResult['consequences'] }> = ({ consequences }) => {
  const scenarios = [
    { title: 'Short Term (0-6 months)', items: consequences.shortTerm, color: 'text-accent-blue' },
    { title: 'Medium Term (1-3 years)', items: consequences.mediumTerm, color: 'text-accent-teal' },
    { title: 'Worst Case', items: consequences.worstCase, color: 'text-warning' },
    { title: 'Best Case', items: consequences.bestCase, color: 'text-success' },
    { title: 'Most Likely', items: consequences.mostLikely, color: 'text-white' },
  ];

  return (
    <Card delay={300}>
      <SectionTitle>Consequences & Trade-offs</SectionTitle>
      <p className="text-gray-400 mb-4">
        Understanding potential outcomes across different timeframes:
      </p>
      <div className="space-y-3">
        {scenarios.map((scenario, i) => (
          <Accordion key={i} title={scenario.title} defaultOpen={i === 4}>
            <ul className="space-y-2 mt-2">
              {scenario.items.map((item, j) => (
                <li key={j} className="flex items-start space-x-2">
                  <span className={`${scenario.color} mt-1`}>•</span>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </Accordion>
        ))}
      </div>
    </Card>
  );
};

// Section 5: Alternatives
const Section5Alternatives: React.FC<{ alternatives: AnalysisResult['alternatives'] }> = ({ alternatives }) => {
  return (
    <Card delay={400}>
      <SectionTitle>Alternatives You Should Consider</SectionTitle>
      <p className="text-gray-400 mb-4">
        Options you may not have considered:
      </p>
      <div className="space-y-4">
        {alternatives.map((alt, i) => (
          <div key={i} className="p-4 glass-card rounded-lg space-y-2">
            <h4 className="text-lg font-semibold text-white">{alt.title}</h4>
            <p className="text-gray-300">{alt.description}</p>
            <div className="pt-2 border-t border-dark-border">
              <p className="text-sm text-accent-blue">
                <span className="font-semibold">Why: </span>
                {alt.reason}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

// Section 6: Final Recommendation
const Section6Recommendation: React.FC<{ recommendation: AnalysisResult['recommendation'] }> = ({ recommendation }) => {
  return (
    <Card delay={500}>
      <SectionTitle>Recommendation (Conditional)</SectionTitle>
      <div className="bg-gradient-to-r from-accent-blue/20 to-accent-teal/20 p-4 rounded-lg mb-4">
        <p className="text-gray-300">
          There is no single "right" answer. Your best path depends on your specific circumstances:
        </p>
      </div>
      <div className="space-y-4">
        {recommendation.conditions.map((cond, i) => (
          <div key={i} className="p-4 glass-card rounded-lg space-y-2">
            <div className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-blue text-white flex items-center justify-center text-sm font-bold">
                {i + 1}
              </span>
              <div className="space-y-2 flex-1">
                <p className="text-white font-medium">
                  <span className="text-accent-blue">If: </span>
                  {cond.condition}
                </p>
                <p className="text-gray-300 pl-4 border-l-2 border-accent-teal">
                  <span className="text-accent-teal font-semibold">Then: </span>
                  {cond.action}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

// Section 7: Uncertainty Disclosure
const Section7Uncertainty: React.FC<{ uncertainty: AnalysisResult['uncertainty'] }> = ({ uncertainty }) => {
  return (
    <Card delay={600}>
      <SectionTitle>What Remains Uncertain</SectionTitle>
      <p className="text-gray-400 mb-4">
        Being transparent about confidence and limitations:
      </p>
      <div className="space-y-4">
        <div className="p-4 glass-card rounded-lg">
          <h4 className="text-sm font-semibold text-success mb-2 flex items-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Confident About</span>
          </h4>
          <ul className="space-y-1">
            {uncertainty.confident.map((item, i) => (
              <li key={i} className="text-gray-300 ml-7">• {item}</li>
            ))}
          </ul>
        </div>

        <div className="p-4 glass-card rounded-lg">
          <h4 className="text-sm font-semibold text-warning mb-2 flex items-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>Uncertain About</span>
          </h4>
          <ul className="space-y-1">
            {uncertainty.uncertain.map((item, i) => (
              <li key={i} className="text-gray-300 ml-7">• {item}</li>
            ))}
          </ul>
        </div>

        <div className="p-4 glass-card rounded-lg">
          <h4 className="text-sm font-semibold text-accent-blue mb-2 flex items-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            <span>Would Help to Know</span>
          </h4>
          <ul className="space-y-1">
            {uncertainty.needed.map((item, i) => (
              <li key={i} className="text-gray-300 ml-7">• {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};
