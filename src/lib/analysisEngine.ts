// Type definitions for analysis results

export interface AnalysisResult {
  understanding: {
    userType: string;
    domain: string;
    problem: string;
    constraints: string[];
    emotionalSignals: string[];
    goal: string;
  };
  assumptions: string[];
  realityCheck: {
    belief: string;
    reality: string;
  }[];
  consequences: {
    shortTerm: string[];
    mediumTerm: string[];
    worstCase: string[];
    bestCase: string[];
    mostLikely: string[];
  };
  alternatives: {
    title: string;
    description: string;
    reason: string;
  }[];
  recommendation: {
    conditions: {
      condition: string;
      action: string;
    }[];
  };
  uncertainty: {
    confident: string[];
    uncertain: string[];
    needed: string[];
  };
}

// Deterministic mock analysis generator
// This function extracts context from user input and generates a structured analysis
export function generateMockAnalysis(
  userInput: string,
  experienceLevel?: string,
  riskTolerance?: number,
  timeline?: string
): AnalysisResult {
  // Extract domain and context from input
  const inputLower = userInput.toLowerCase();
  
  // Detect domain
  let domain = 'General Decision';
  let userType = 'Decision Maker';
  
  if (inputLower.includes('startup') || inputLower.includes('business') || inputLower.includes('company')) {
    domain = 'Startup / Entrepreneurship';
    userType = 'Aspiring Founder';
  } else if (inputLower.includes('career') || inputLower.includes('job') || inputLower.includes('quit')) {
    domain = 'Career Development';
    userType = experienceLevel || 'Professional';
  } else if (inputLower.includes('education') || inputLower.includes('master') || inputLower.includes('study') || inputLower.includes('degree')) {
    domain = 'Education';
    userType = 'Student / Career Developer';
  } else if (inputLower.includes('product') || inputLower.includes('app') || inputLower.includes('build')) {
    domain = 'Product Development';
    userType = 'Product Builder';
  }
  
  // Extract emotional signals
  const emotionalSignals = [];
  if (inputLower.includes('unsure') || inputLower.includes('uncertain')) emotionalSignals.push('Uncertainty');
  if (inputLower.includes('afraid') || inputLower.includes('scared') || inputLower.includes('fear')) emotionalSignals.push('Fear');
  if (inputLower.includes('excited') || inputLower.includes('passionate')) emotionalSignals.push('Enthusiasm');
  if (inputLower.includes('need to') || inputLower.includes('must')) emotionalSignals.push('Urgency');
  if (!emotionalSignals.length) emotionalSignals.push('Deliberation');
  
  // Extract constraints
  const constraints = [];
  if (inputLower.includes('money') || inputLower.includes('finance') || inputLower.includes('afford')) {
    constraints.push('Financial resources');
  }
  if (inputLower.includes('time') || inputLower.includes('deadline') || inputLower.includes('soon')) {
    constraints.push('Time constraints');
  }
  if (inputLower.includes('experience') || inputLower.includes('skill')) {
    constraints.push('Skill/Experience level');
  }
  if (inputLower.includes('family') || inputLower.includes('spouse') || inputLower.includes('kids')) {
    constraints.push('Family obligations');
  }
  if (!constraints.length) constraints.push('Standard decision-making environment');
  
  // Generate domain-specific assumptions
  const assumptions = generateAssumptions(domain, userInput);
  
  // Generate reality checks
  const realityCheck = generateRealityChecks(domain);
  
  // Generate consequences
  const consequences = generateConsequences(domain, riskTolerance || 50, timeline);
  
  // Generate alternatives
  const alternatives = generateAlternatives(domain, userInput);
  
  // Generate conditional recommendations
  const recommendation = generateRecommendation(domain, riskTolerance || 50);
  
  // Generate uncertainty disclosure
  const uncertainty = generateUncertainty(domain);
  
  return {
    understanding: {
      userType,
      domain,
      problem: extractProblemStatement(userInput),
      constraints,
      emotionalSignals,
      goal: extractGoal(userInput, domain),
    },
    assumptions,
    realityCheck,
    consequences,
    alternatives,
    recommendation,
    uncertainty,
  };
}

function extractProblemStatement(input: string): string {
  const truncated = input.length > 200 ? input.substring(0, 200) + '...' : input;
  return truncated;
}

function extractGoal(input: string, domain: string): string {
  const inputLower = input.toLowerCase();
  
  if (domain === 'Startup / Entrepreneurship') {
    return 'Build a sustainable and viable business';
  } else if (domain === 'Career Development') {
    if (inputLower.includes('growth') || inputLower.includes('advance')) {
      return 'Accelerate professional growth and career trajectory';
    }
    return 'Navigate career transition with minimized risk';
  } else if (domain === 'Education') {
    return 'Invest in education that provides tangible ROI';
  } else if (domain === 'Product Development') {
    return 'Build a product that solves real user problems';
  }
  
  return 'Make an informed decision with clarity';
}

function generateAssumptions(domain: string, input: string): string[] {
  const inputLower = input.toLowerCase();
  const assumptions: string[] = [];
  
  if (domain === 'Startup / Entrepreneurship') {
    assumptions.push('Market demand exists for this solution');
    assumptions.push('Early execution provides competitive advantage');
    if (inputLower.includes('unique') || inputLower.includes('innovative')) {
      assumptions.push('Uniqueness translates to adoption');
    }
    assumptions.push('Effort and dedication guarantee success');
  } else if (domain === 'Career Development') {
    assumptions.push('New role will provide better satisfaction');
    assumptions.push('Skills are transferable across domains');
    assumptions.push('Change will reduce current pain points');
    if (inputLower.includes('passion')) {
      assumptions.push('Following passion ensures long-term fulfillment');
    }
  } else if (domain === 'Education') {
    assumptions.push('Advanced degree increases earning potential');
    assumptions.push('Academic credentials signal competence');
    assumptions.push('Theory learned applies directly to practice');
  } else if (domain === 'Product Development') {
    assumptions.push('Good product naturally attracts users');
    assumptions.push('Technical feasibility equals market success');
    assumptions.push('Building fast is more important than validating');
  }
  
  return assumptions;
}

function generateRealityChecks(domain: string): { belief: string; reality: string }[] {
  if (domain === 'Startup / Entrepreneurship') {
    return [
      {
        belief: 'Good product = automatic adoption',
        reality: 'Adoption depends on distribution, timing, and decision-maker incentives, not just product quality',
      },
      {
        belief: 'First mover advantage is critical',
        reality: 'Most successful companies are not first movers; execution and timing matter more',
      },
      {
        belief: 'Passion and dedication ensure success',
        reality: 'Market dynamics, capital efficiency, and problem-solution fit are stronger predictors',
      },
    ];
  } else if (domain === 'Career Development') {
    return [
      {
        belief: 'Changing jobs solves dissatisfaction',
        reality: 'Job satisfaction is often driven by internal factors (autonomy, growth, meaning) that may persist across roles',
      },
      {
        belief: 'Skills are universally transferable',
        reality: 'Skill transferability varies by industry, company stage, and role; some skills depreciate quickly',
      },
      {
        belief: 'Higher title equals better career trajectory',
        reality: 'Learning rate, network quality, and skill compounding often matter more than titles',
      },
    ];
  } else if (domain === 'Education') {
    return [
      {
        belief: 'Advanced degree increases income automatically',
        reality: 'Income increase depends on field, network built, opportunity cost, and career pivot feasibility',
      },
      {
        belief: 'Academic knowledge directly applies to work',
        reality: 'Academic and practical knowledge often diverge; workplace learning may be faster and more relevant',
      },
      {
        belief: 'Credential signals competence universally',
        reality: 'Credential value varies by industry; in some fields, portfolio and experience matter more',
      },
    ];
  } else if (domain === 'Product Development') {
    return [
      {
        belief: 'Building the product is the hardest part',
        reality: 'Distribution, user acquisition, and monetization are often harder than building',
      },
      {
        belief: 'Users want what they say they want',
        reality: 'User stated preferences often differ from revealed preferences and actual behavior',
      },
      {
        belief: 'Feature completeness drives adoption',
        reality: 'Adoption is driven by solving one core problem exceptionally well, not feature breadth',
      },
    ];
  }
  
  return [
    {
      belief: 'Change always leads to improvement',
      reality: 'Change creates both opportunities and new constraints; net benefit depends on specific context',
    },
  ];
}

function generateConsequences(
  domain: string,
  riskTolerance: number,
  timeline?: string
): AnalysisResult['consequences'] {
  const isHighRisk = riskTolerance > 60;
  
  if (domain === 'Startup / Entrepreneurship') {
    return {
      shortTerm: [
        'Significant time and energy investment required',
        'Financial runway becomes primary constraint',
        isHighRisk ? 'Fast learning curve through direct market feedback' : 'Need to balance exploration with income stability',
      ],
      mediumTerm: [
        'Market validation will clarify product-market fit',
        'Network and reputation effects compound',
        'Opportunity cost of alternative paths becomes more visible',
      ],
      worstCase: [
        'Business fails to achieve product-market fit',
        'Financial resources depleted without sustainable revenue',
        'Re-entry to traditional employment may require rebuilding credibility',
      ],
      bestCase: [
        'Product achieves strong product-market fit',
        'Revenue growth enables team scaling and market expansion',
        'Valuable entrepreneurial experience regardless of outcome',
      ],
      mostLikely: [
        'Partial validation: some traction but not explosive growth',
        'Extended runway needed; may require additional funding or revenue diversification',
        'Decision point in 12-18 months: pivot, persevere, or pause',
      ],
    };
  } else if (domain === 'Career Development') {
    return {
      shortTerm: [
        'Immediate change in daily work environment and responsibilities',
        'Learning curve as you adapt to new role, team, or industry',
        'Potential income change (positive or negative depending on negotiation)',
      ],
      mediumTerm: [
        'Skill compounding from new domain or role',
        'Expanded professional network and opportunities',
        'Clarity on whether change addressed core dissatisfaction',
      ],
      worstCase: [
        'New role does not align with expectations; dissatisfaction persists',
        'Skill gap larger than anticipated; performance suffers',
        'Industry or company downturn affects new position security',
      ],
      bestCase: [
        'Role accelerates growth and aligns with long-term career vision',
        'Higher compensation and better work environment',
        'New opportunities emerge from expanded network',
      ],
      mostLikely: [
        'Moderate improvement in some dimensions, trade-offs in others',
        'Adjustment period of 6-12 months before full productivity',
        'Better understanding of what you want from next career move',
      ],
    };
  } else if (domain === 'Education') {
    return {
      shortTerm: [
        'Significant time commitment (20-40 hours/week depending on program)',
        'Financial cost: tuition, opportunity cost of foregone income',
        'Structured learning environment and expanded peer network',
      ],
      mediumTerm: [
        'Credential obtained; applicable to job market or career pivot',
        'Network effects from cohort and alumni',
        'Debt repayment or ROI timeline becomes primary focus',
      ],
      worstCase: [
        'Degree does not translate to expected career outcomes',
        'High debt burden with limited income increase',
        'Skills learned become outdated or irrelevant to desired field',
      ],
      bestCase: [
        'Degree enables career pivot or significant income increase',
        'Strong network provides ongoing opportunities',
        'Knowledge and credentials compound over career',
      ],
      mostLikely: [
        'Moderate career benefit; degree helps but is not transformative',
        'ROI break-even in 3-7 years depending on field',
        'Value depends on how actively you leverage network and skills',
      ],
    };
  } else if (domain === 'Product Development') {
    return {
      shortTerm: [
        'Building initial version requires focused development time',
        'Early user feedback will test core assumptions',
        'Technical decisions made now will constrain future options',
      ],
      mediumTerm: [
        'User adoption metrics clarify product-market fit',
        'Distribution channels become primary growth constraint',
        'Monetization model validation or need for pivot',
      ],
      worstCase: [
        'Product fails to attract meaningful user base',
        'High development cost with no clear path to monetization',
        'Technical debt or poor architecture requires rebuild',
      ],
      bestCase: [
        'Strong user adoption and organic growth',
        'Clear monetization path or strategic acquisition interest',
        'Product becomes platform for additional opportunities',
      ],
      mostLikely: [
        'Modest initial traction; some users find value',
        'Distribution challenge requires creative solutions',
        'Continuous iteration needed to improve retention and growth',
      ],
    };
  }
  
  return {
    shortTerm: ['Immediate impact on current situation'],
    mediumTerm: ['Effects become clearer over 1-2 years'],
    worstCase: ['Significant negative outcome possible'],
    bestCase: ['Optimal outcome if conditions align'],
    mostLikely: ['Mixed results with both gains and trade-offs'],
  };
}

function generateAlternatives(domain: string, input: string): AnalysisResult['alternatives'] {
  const inputLower = input.toLowerCase();
  
  if (domain === 'Startup / Entrepreneurship') {
    return [
      {
        title: 'Validate before committing full-time',
        description: 'Build MVP while maintaining current income source; transition only after achieving clear validation milestones',
        reason: 'Reduces financial risk while preserving optionality; many successful founders start part-time',
      },
      {
        title: 'Join an early-stage startup first',
        description: 'Gain entrepreneurial experience in a funded environment before starting your own',
        reason: 'Learn startup operations with lower personal financial risk; build relevant network and skills',
      },
      {
        title: 'Niche down aggressively',
        description: 'Focus on a much smaller, highly specific market segment initially',
        reason: 'Easier to dominate a small market than compete broadly; enables faster feedback loops',
      },
    ];
  } else if (domain === 'Career Development') {
    return [
      {
        title: 'Internal transfer or role expansion',
        description: 'Explore growth opportunities within current organization before external move',
        reason: 'Preserves institutional knowledge and relationships; lower transition risk',
      },
      {
        title: 'Freelance/consulting transition',
        description: 'Build independent client base gradually while maintaining stability',
        reason: 'Tests market demand for your skills; provides income diversification',
      },
      {
        title: 'Staged transition with skill-building',
        description: 'Invest 6-12 months in targeted skill development before making career move',
        reason: 'Strengthens position for negotiation; reduces performance risk in new role',
      },
    ];
  } else if (domain === 'Education') {
    return [
      {
        title: 'Part-time or online program',
        description: 'Pursue degree while maintaining income and career momentum',
        reason: 'Reduces financial risk and opportunity cost; tests commitment before full investment',
      },
      {
        title: 'Targeted certifications and boot camps',
        description: 'Invest in shorter, skill-specific programs instead of full degree',
        reason: 'Faster time-to-value; often more practical and directly applicable to job market',
      },
      {
        title: 'Self-directed learning + portfolio',
        description: 'Build demonstrable skills and projects independently; skip formal credential',
        reason: 'Lowest cost; most flexible; increasingly accepted in some fields (tech, design, etc.)',
      },
    ];
  } else if (domain === 'Product Development') {
    return [
      {
        title: 'No-code MVP or concierge test',
        description: 'Validate core value proposition without building full product',
        reason: 'Fastest and cheapest validation; tests demand before supply',
      },
      {
        title: 'Partner with existing platform',
        description: 'Build on top of or integrate with established product ecosystem',
        reason: 'Leverage existing distribution and user base; reduces go-to-market risk',
      },
      {
        title: 'Sell before you build',
        description: 'Pre-sell product or secure commitments from early customers before development',
        reason: 'Validates willingness-to-pay; provides development funding; ensures market pull',
      },
    ];
  }
  
  return [
    {
      title: 'Staged approach',
      description: 'Break decision into smaller, reversible steps',
      reason: 'Reduces commitment; allows for learning and adjustment',
    },
  ];
}

function generateRecommendation(domain: string, riskTolerance: number): AnalysisResult['recommendation'] {
  const isHighRisk = riskTolerance > 60;
  const isLowRisk = riskTolerance < 40;
  
  if (domain === 'Startup / Entrepreneurship') {
    if (isHighRisk) {
      return {
        conditions: [
          {
            condition: 'If you have 12+ months financial runway AND early validation signals',
            action: 'Commit full-time and execute with focus',
          },
          {
            condition: 'If runway is limited OR validation is unclear',
            action: 'Build part-time until clear traction; do not quit prematurely',
          },
          {
            condition: 'If neither condition is met',
            action: 'Validate core assumptions with minimum viable experiments before larger commitment',
          },
        ],
      };
    } else {
      return {
        conditions: [
          {
            condition: 'If you can validate demand without quitting job',
            action: 'Start part-time; preserve income stability during early validation',
          },
          {
            condition: 'If idea requires full-time commitment to test',
            action: 'Delay until runway is sufficient or explore joining existing startup',
          },
          {
            condition: 'If market timing is critical',
            action: 'Seek co-founder or early funding to reduce personal financial risk',
          },
        ],
      };
    }
  } else if (domain === 'Career Development') {
    return {
      conditions: [
        {
          condition: 'If dissatisfaction stems from role/team (not industry)',
          action: 'Explore internal mobility before external move',
        },
        {
          condition: 'If seeking new skills or industry',
          action: 'Ensure target role provides clear learning path; negotiate learning-focused comp structure',
        },
        {
          condition: 'If primary driver is compensation',
          action: 'Negotiate current role first; external move only if gap is significant (>20-30%)',
        },
      ],
    };
  } else if (domain === 'Education') {
    if (isLowRisk) {
      return {
        conditions: [
          {
            condition: 'If program has strong ROI data and career placement',
            action: 'Pursue part-time or online to minimize opportunity cost',
          },
          {
            condition: 'If career pivot requires credential',
            action: 'Ensure target industry actually values credential before committing',
          },
          {
            condition: 'If primarily seeking skills (not credential)',
            action: 'Consider alternative learning paths with faster time-to-value',
          },
        ],
      };
    } else {
      return {
        conditions: [
          {
            condition: 'If program opens doors not accessible otherwise',
            action: 'Commit if network and brand value justify opportunity cost',
          },
          {
            condition: 'If credential is required for field entry',
            action: 'Proceed but optimize for cost and time; avoid prestige premium',
          },
          {
            condition: 'If self-learning is viable alternative',
            action: 'Test self-directed path first; formal program as backup',
          },
        ],
      };
    }
  } else if (domain === 'Product Development') {
    return {
      conditions: [
        {
          condition: 'If you can validate demand without building',
          action: 'Run lean experiments (landing pages, concierge, pre-sales) before development',
        },
        {
          condition: 'If building is required for validation',
          action: 'Build thinnest possible MVP; focus on one core use case',
        },
        {
          condition: 'If distribution is uncertain',
          action: 'Solve distribution first or partner with existing channel before building',
        },
      ],
    };
  }
  
  return {
    conditions: [
      {
        condition: 'If decision is reversible',
        action: 'Proceed with clear evaluation criteria and timeline',
      },
      {
        condition: 'If decision has high switching cost',
        action: 'Gather more information; test assumptions before committing',
      },
      {
        condition: 'If outcome is highly uncertain',
        action: 'Break into smaller decisions; preserve optionality',
      },
    ],
  };
}

function generateUncertainty(domain: string): AnalysisResult['uncertainty'] {
  if (domain === 'Startup / Entrepreneurship') {
    return {
      confident: [
        'Starting a business requires significant time and energy investment',
        'Market validation is essential before scaling',
        'Distribution is often harder than building',
      ],
      uncertain: [
        'Exact timing of product-market fit achievement',
        'Your specific skill gaps and how quickly you can address them',
        'Competitor response and market dynamics',
      ],
      needed: [
        'Clear definition of what "validation" means for your specific idea',
        'Honest assessment of financial runway and burn rate',
        'Understanding of target customer decision-making process',
      ],
    };
  } else if (domain === 'Career Development') {
    return {
      confident: [
        'Career satisfaction depends on multiple factors beyond role title',
        'Skill compounding accelerates with focused development',
        'Network quality often matters more than size',
      ],
      uncertain: [
        'Whether new environment will address core dissatisfaction',
        'Exact skill transferability to target role or industry',
        'Long-term trajectory of target company or industry',
      ],
      needed: [
        'Clear understanding of what drives your dissatisfaction',
        'Information about target company culture and growth trajectory',
        'Honest assessment of your skill gaps for target role',
      ],
    };
  } else if (domain === 'Education') {
    return {
      confident: [
        'Educational ROI varies significantly by program and field',
        'Opportunity cost is often larger than tuition cost',
        'Network and career services quality matters as much as curriculum',
      ],
      uncertain: [
        'Actual job placement rates and starting salaries for your profile',
        'How target employers value credential vs. experience',
        'Future relevance of skills learned in program',
      ],
      needed: [
        'Placement data specific to your target role and background',
        'Information on alumni outcomes 5-10 years post-graduation',
        'Clear understanding of alternative paths to same outcome',
      ],
    };
  } else if (domain === 'Product Development') {
    return {
      confident: [
        'User stated preferences often differ from actual behavior',
        'Distribution channels are typically the primary growth constraint',
        'Building fast does not guarantee market success',
      ],
      uncertain: [
        'Exact user acquisition cost and retention rates',
        'Competitive response and market saturation timing',
        'Technical feasibility of scaling solution',
      ],
      needed: [
        'Evidence of user pain severity (willingness to pay)',
        'Clear understanding of distribution channel dynamics',
        'Validation of key technical assumptions',
      ],
    };
  }
  
  return {
    confident: [
      'Decisions involve trade-offs between different outcomes',
      'Information gathering reduces but never eliminates uncertainty',
    ],
    uncertain: [
      'Exact outcomes given your specific context',
      'External factors beyond your control',
    ],
    needed: [
      'More specific details about your constraints',
      'Validation of key assumptions driving your decision',
    ],
  };
}
