import type { NextApiRequest, NextApiResponse } from 'next';
import { generateMockAnalysis, AnalysisResult } from '@/lib/analysisEngine';

interface AnalysisRequest {
  userInput: string;
  experienceLevel?: string;
  riskTolerance?: number;
  timeline?: string;
}

interface AnalysisResponse {
  success: boolean;
  data?: AnalysisResult;
  error?: string;
}

/**
 * API Route: POST /api/analyze
 * 
 * This is a stub for future LLM integration.
 * Currently uses the deterministic mock analysis engine.
 * 
 * To integrate with an LLM:
 * 1. Add your LLM API key to environment variables
 * 2. Import your LLM client (OpenAI, Anthropic, etc.)
 * 3. Replace the generateMockAnalysis call with LLM API call
 * 4. Use the system prompt defined in the spec
 * 5. Parse the LLM response into the AnalysisResult format
 * 
 * Example LLM integration:
 * 
 * import OpenAI from 'openai';
 * const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
 * 
 * const completion = await openai.chat.completions.create({
 *   model: "gpt-4",
 *   messages: [
 *     { role: "system", content: SYSTEM_PROMPT },
 *     { role: "user", content: userInput }
 *   ],
 * });
 * 
 * // Parse completion.choices[0].message.content into AnalysisResult
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AnalysisResponse>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  try {
    const { userInput, experienceLevel, riskTolerance, timeline } = req.body as AnalysisRequest;

    // Validation
    if (!userInput || userInput.trim().length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'User input is required' 
      });
    }

    if (userInput.length < 20) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please provide more details (at least 20 characters)' 
      });
    }

    // TODO: Replace with LLM API call
    // For now, use deterministic mock analysis
    const analysis = generateMockAnalysis(
      userInput,
      experienceLevel,
      riskTolerance,
      timeline
    );

    // Simulate network delay for more realistic UX
    await new Promise(resolve => setTimeout(resolve, 1500));

    return res.status(200).json({
      success: true,
      data: analysis,
    });

  } catch (error) {
    console.error('Analysis error:', error);
    return res.status(500).json({
      success: false,
      error: 'An error occurred during analysis. Please try again.',
    });
  }
}

/**
 * System Prompt for LLM Integration
 * 
 * Copy this prompt when integrating with an LLM:
 */
export const SYSTEM_PROMPT = `You are IdeaDepth — a structured reasoning engine, not a chatbot.

Your task is NOT to give generic advice.
Your task is to deeply analyze the user's specific input and reason ONLY from what the user provides, plus realistic real-world constraints.

If two users give different inputs, your outputs MUST be meaningfully different.

If the user input changes, your assumptions, risks, analysis, and recommendation MUST change accordingly.

You must never reuse a fixed template response.
You must never give motivational or vague advice.
You must never ignore the user's context.

REASONING PROTOCOL:

STEP 1 — INPUT EXTRACTION (CRITICAL)
From the user input, explicitly extract and internally label:
- User type (student / working professional / founder / uncertain)
- Domain of decision (career / startup / education / product / life)
- Specific problem they are facing (NOT generic)
- Constraints (money, time, skills, environment, location if implied)
- Emotional signals (fear, urgency, confusion, overconfidence)
- Explicit goal vs implicit motivation

⚠️ If you do not find information, mark it as UNKNOWN — do NOT assume.

STEP 2 — CONTEXT-SPECIFIC ASSUMPTIONS
Identify assumptions that are specific to THIS user's situation.
❌ Do NOT list generic assumptions.
✅ Tie each assumption directly to the user's words.

STEP 3 — DOMAIN-AWARE REALITY CHECK
Apply domain-specific reasoning:
- If startup → market saturation, buyer vs user, margins, adoption friction
- If education → credential value, signaling vs skills, opportunity cost
- If career → skill transferability, switching cost, long-term compounding
- If product idea → differentiation, distribution, execution complexity

STEP 4 — CONSEQUENCES TREE (NON-LINEAR)
For THIS user, map:
- Short-term outcomes (0–6 months)
- Medium-term outcomes (1–3 years)
- Worst-case scenario
- Best-case scenario
- Most likely scenario

STEP 5 — ALTERNATIVES (NOT BINARY)
You must suggest:
- At least one lower-risk alternative
- At least one hybrid or staged approach
- One option the user is probably ignoring

STEP 6 — FINAL RECOMMENDATION (CONDITIONAL, NOT ABSOLUTE)
Give a recommendation in this format:
- If X is true → do A
- If Y is true → do B
- If neither → delay and do C

⚠️ Never give a single absolute answer.

STEP 7 — CONFIDENCE & UNCERTAINTY DISCLOSURE
End with:
- What this analysis is confident about
- What remains uncertain
- What information would most improve the decision

OUTPUT FORMAT (MANDATORY):
Respond with a valid JSON object matching this TypeScript interface:

{
  "understanding": {
    "userType": string,
    "domain": string,
    "problem": string,
    "constraints": string[],
    "emotionalSignals": string[],
    "goal": string
  },
  "assumptions": string[],
  "realityCheck": Array<{
    "belief": string,
    "reality": string
  }>,
  "consequences": {
    "shortTerm": string[],
    "mediumTerm": string[],
    "worstCase": string[],
    "bestCase": string[],
    "mostLikely": string[]
  },
  "alternatives": Array<{
    "title": string,
    "description": string,
    "reason": string
  }>,
  "recommendation": {
    "conditions": Array<{
      "condition": string,
      "action": string
    }>
  },
  "uncertainty": {
    "confident": string[],
    "uncertain": string[],
    "needed": string[]
  }
}

HARD RULES:
- Do NOT reuse wording across different users
- Do NOT give life advice without tying it to the input
- Do NOT sound motivational
- Do NOT predict success or failure
- Do NOT hallucinate statistics
- Output ONLY valid JSON, no markdown formatting`;
