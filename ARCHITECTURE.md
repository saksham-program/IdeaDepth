# IdeaDepth - Technical Architecture

## Overview

IdeaDepth is a Next.js-based decision analysis web application that provides structured reasoning for complex decisions. It follows a multi-screen flow with progressive disclosure and domain-aware analysis.

## Core Design Principles

### 1. No Chat Interface
- **Structured cards** instead of chat bubbles
- **Progressive reveal** with animation delays
- **Sectioned analysis** for easy scanning

### 2. Context-Specific Analysis
- Analysis adapts to user input
- Domain detection (startup, career, education, product)
- User type inference
- Constraint extraction

### 3. Reasoning-First Layout
- Show reasoning steps during processing
- Transparent about assumptions
- Uncertainty disclosure
- Conditional recommendations (not absolute)

## Screen Flow

```
Landing → Input → Thinking → Analysis → Follow-up
   ↓        ↓        ↓          ↓          ↓
  Hook    Gather   Process   Display    Refine
          Context  Analysis   Results   Options
```

### Screen Details

#### 1. Landing Screen
**Purpose:** Hook user in 3 seconds
- Hero section with strong value proposition
- Feature highlights (Deep Analysis, Context-Aware, Trade-off Clarity)
- Single clear CTA: "Analyze My Decision"

#### 2. Input Screen
**Purpose:** Collect decision details
- Large textarea with rotating placeholder examples
- Optional context fields (collapsed by default):
  - Experience level
  - Risk tolerance (slider)
  - Decision timeline
- Validation: minimum 20 characters
- Error handling

#### 3. Thinking Screen
**Purpose:** Build trust through transparency
- Shows 7 reasoning steps activating progressively:
  1. Identifying decision type
  2. Extracting constraints
  3. Checking assumptions
  4. Evaluating trade-offs
  5. Analyzing consequences
  6. Finding alternatives
  7. Forming recommendation
- Each step animates completion
- No fake typing effects

#### 4. Analysis Screen (Main Experience)
**Purpose:** Display structured reasoning
7 sections:
1. **Understanding Your Situation** - Extracted context
2. **Key Assumptions** - Beliefs to examine
3. **Reality Check** - Belief vs. reality comparison
4. **Consequences** - Short/medium/worst/best/likely scenarios
5. **Alternatives** - Options not considered
6. **Recommendation** - Conditional if-then guidance
7. **Uncertainty** - What's known/unknown/needed

#### 5. Follow-up Screen
**Purpose:** Enable iteration
- Quick action buttons (test scenarios, adjust risk, change timeline)
- Analysis summary card
- Start fresh option
- Tips for better analysis

## State Management

### AppContext Structure

```typescript
interface AppState {
  currentScreen: 'landing' | 'input' | 'thinking' | 'analysis' | 'followup';
  decisionInput: DecisionInput;
  analysis: AnalysisResult | null;
  isAnalyzing: boolean;
  error: string | null;
}
```

### Context Methods

- `goToScreen(screen)` - Navigate between screens
- `updateInput(input)` - Update decision input
- `startAnalysis()` - Trigger analysis (calls API)
- `reset()` - Clear state and return to landing

## Analysis Engine

### Current Implementation: Mock Engine

**File:** `src/lib/analysisEngine.ts`

**Key Function:** `generateMockAnalysis(userInput, experienceLevel, riskTolerance, timeline)`

**How It Works:**
1. **Domain Detection** - Keywords → domain classification
2. **User Type Inference** - Context clues → user profile
3. **Emotional Signal Extraction** - Sentiment analysis
4. **Constraint Identification** - Money, time, skills, etc.
5. **Domain-Specific Generation:**
   - Assumptions tailored to domain
   - Reality checks based on domain knowledge
   - Consequences mapped to user context
   - Alternatives specific to situation
   - Conditional recommendations
   - Uncertainty disclosure

**Output:** Fully typed `AnalysisResult` object

### LLM Integration Path

**File:** `src/pages/api/analyze.ts`

**Current State:** Stub that calls mock engine

**To Integrate LLM:**
1. Add API key to `.env.local`
2. Install LLM client SDK
3. Replace mock call with LLM API call
4. Use provided `SYSTEM_PROMPT`
5. Parse JSON response into `AnalysisResult`

**System Prompt Included:**
- Full reasoning protocol
- Output format specification
- Hard rules for quality
- Anti-template guidance

## UI Component Library

### Core Components (`src/components/ui/index.tsx`)

#### Card
- Glass morphism effect
- Backdrop blur
- Animation delay support
- Rounded corners, soft shadows

#### Button
- **Primary:** Gradient (blue → teal)
- **Secondary:** Glass card style
- Hover effects, focus states
- Disabled state support

#### Tag
- Small badge/chip
- Tooltip support
- Hover effect

#### Textarea
- Glass card styling
- Focus ring
- Placeholder support
- Auto-height option

#### Select
- Dropdown with glass styling
- Custom appearance
- Placeholder support

#### Slider
- Range input
- Custom accent color
- Label with current value

#### Accordion
- Collapsible section
- Animated expand/collapse
- Toggle icon

#### LoadingStep
- Animated checkmark on completion
- Spinner during processing
- Progressive reveal

### Styling System

**Framework:** Tailwind CSS

**Custom Classes:**
- `.glass-card` - Glassmorphism card
- `.btn-primary` - Gradient button
- `.btn-secondary` - Glass button
- `.section-title` - Gradient text heading
- `.tag` - Badge/chip style

**Animations:**
- `animate-fade-in` - Fade in from below
- `animate-pulse-subtle` - Subtle pulse
- `animate-spin` - Spinner rotation

## Data Flow

```
User Input → AppContext.updateInput()
          ↓
AppContext.startAnalysis()
          ↓
API Route (/api/analyze)
          ↓
Mock Engine (or LLM)
          ↓
AnalysisResult
          ↓
AppContext.setState()
          ↓
AnalysisScreen renders
```

## Type System

### Key Types

```typescript
interface DecisionInput {
  userInput: string;
  experienceLevel: string;
  riskTolerance: number;
  timeline: string;
}

interface AnalysisResult {
  understanding: { ... };
  assumptions: string[];
  realityCheck: Array<{ belief: string; reality: string }>;
  consequences: { ... };
  alternatives: Array<{ title, description, reason }>;
  recommendation: { conditions: Array<{ condition, action }> };
  uncertainty: { confident, uncertain, needed };
}
```

## Performance Considerations

### Optimization Strategies

1. **Code Splitting:**
   - Next.js automatic code splitting
   - Screens loaded on demand

2. **Animation Performance:**
   - CSS animations (GPU accelerated)
   - Staggered delays for progressive reveal
   - RequestAnimationFrame for smooth transitions

3. **State Updates:**
   - Minimal re-renders
   - Context only updates when necessary
   - Memoization for expensive computations

4. **API Calls:**
   - Single API call per analysis
   - No unnecessary re-fetching
   - Error handling and retry logic

## Accessibility

### Features

- **Semantic HTML** - Proper heading hierarchy
- **Focus Management** - Keyboard navigation
- **ARIA Labels** - Screen reader support
- **Color Contrast** - WCAG AA compliant
- **Responsive Design** - Mobile-first approach

### Keyboard Navigation

- Tab through interactive elements
- Enter to submit forms
- Escape to close modals
- Arrow keys for accordions

## Browser Support

- **Modern browsers:** Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile browsers:** iOS Safari, Chrome Android
- **JavaScript:** Required (React app)

## Security Considerations

### API Routes

- Input validation
- Rate limiting (not implemented, but recommended)
- Error handling
- No sensitive data in responses

### Environment Variables

- API keys in `.env.local` (never committed)
- Server-side only (not exposed to client)

### Data Privacy

- No data persistence
- No cookies or tracking
- No third-party analytics
- Client-side processing option (mock engine)

## Testing Strategy

### Recommended Tests

1. **Unit Tests:**
   - Analysis engine logic
   - UI component rendering
   - State management

2. **Integration Tests:**
   - Screen navigation flow
   - API route responses
   - Form validation

3. **E2E Tests:**
   - Complete user journey
   - Error scenarios
   - Mobile responsiveness

### Tools (Not Included)

- Jest for unit tests
- React Testing Library for component tests
- Playwright/Cypress for E2E tests

## Deployment

### Build Process

```bash
npm run build   # Creates optimized production build
```

**Output:**
- Static HTML for each route
- Optimized JavaScript bundles
- CSS extracted and minified
- Images optimized

### Environment Variables

Production requires:
- `OPENAI_API_KEY` (if using LLM)
- Other API keys as needed

### Platforms

- **Vercel:** Zero-config deployment (recommended)
- **Netlify:** Supports Next.js
- **AWS Amplify:** Full Next.js support
- **Self-hosted:** Node.js server required

## Future Enhancements

### Potential Features

1. **Analysis History** - Save past analyses (requires DB)
2. **Export to PDF** - Download analysis as document
3. **Comparison Mode** - Compare multiple scenarios
4. **Collaboration** - Share analysis with others
5. **Advanced Filtering** - Filter alternatives by criteria
6. **Mobile App** - React Native version
7. **Multi-language** - i18n support

### Technical Improvements

1. **Testing** - Comprehensive test suite
2. **Analytics** - Privacy-respecting usage metrics
3. **Performance** - Advanced code splitting
4. **SEO** - Metadata and structured data
5. **PWA** - Offline support
6. **A/B Testing** - Experiment framework

## Maintenance

### Regular Updates

- Dependency updates (monthly)
- Security patches (as needed)
- Next.js version upgrades (quarterly)
- Content updates (placeholders, examples)

### Monitoring

- Error tracking (Sentry recommended)
- Performance monitoring (Vercel Analytics)
- User feedback collection

---

**Document Version:** 1.0  
**Last Updated:** 2024  
**Maintainer:** Project team
