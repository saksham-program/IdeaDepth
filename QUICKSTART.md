# 🚀 Quick Start Guide - IdeaDepth

Get IdeaDepth running locally in under 5 minutes!

## ✅ Prerequisites Check

Before you begin, make sure you have:

```bash
# Check Node.js version (should be 18+)
node --version

# Check npm version
npm --version
```

If you don't have Node.js, download it from: https://nodejs.org/

## 📦 Installation Steps

### 1. Navigate to Project Directory

```bash
cd ideadepth
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages (~1-2 minutes).

### 3. Start Development Server

```bash
npm run dev
```

Wait for the message:
```
✓ Ready on http://localhost:3000
```

### 4. Open in Browser

Navigate to: **http://localhost:3000**

🎉 You're done! The app is running.

## 🎮 Using the App

### Basic Flow

1. **Landing Page** → Click "Analyze My Decision"
2. **Input Screen** → Type your decision (at least 20 characters)
3. **Optional:** Expand "Optional Context" to set:
   - Experience level
   - Risk tolerance
   - Timeline
4. **Click:** "Analyze This Idea"
5. **Thinking Screen** → Watch reasoning steps (builds trust)
6. **Analysis Screen** → Read structured analysis
7. **Follow-up** → Refine or start new analysis

### Example Inputs

Try these to see how the analysis adapts:

**Startup Decision:**
```
I want to quit my job and build a SaaS product for project management. 
I have 6 months of savings and some coding experience. The market seems 
crowded but I think I have a unique angle.
```

**Career Decision:**
```
Should I accept a job offer with 20% higher pay but in a different city? 
I'm mid-career with a family, and the new role is less technical and 
more management-focused.
```

**Education Decision:**
```
I'm considering a master's degree in data science. I'm 3 years into my 
career and self-taught. The program costs $50k and takes 2 years part-time.
```

## 🔧 Common Issues

### Port 3000 Already in Use

If you see "Port 3000 is already in use":

```bash
# Use a different port
npm run dev -- -p 3001
```

Then open: http://localhost:3001

### Installation Fails

If `npm install` fails:

```bash
# Clear npm cache
npm cache clean --force

# Try again
npm install
```

### Page Not Loading

1. Check terminal for errors
2. Make sure dev server is running
3. Try refreshing browser (Ctrl/Cmd + R)
4. Check browser console (F12) for errors

## 🎨 Customization Quick Tips

### Change Theme Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  accent: {
    blue: '#3b82f6',  // Change this!
    teal: '#14b8a6',  // And this!
  },
}
```

Restart dev server to see changes.

### Modify Placeholder Examples

Edit `src/components/screens/InputScreen.tsx`:

```typescript
const PLACEHOLDER_EXAMPLES = [
  "Your custom example 1...",
  "Your custom example 2...",
  // Add more...
];
```

### Update Landing Page Text

Edit `src/components/screens/LandingScreen.tsx`:

```typescript
<h2>Your custom headline</h2>
```

## 🧪 Testing the Analysis

### What to Test

1. **Domain Detection:**
   - Try startup, career, education, product keywords
   - See how analysis changes

2. **Context Extraction:**
   - Include constraints (money, time, skills)
   - Mention emotional signals (fear, excitement)
   - See how these appear in "Understanding Your Situation"

3. **Optional Fields:**
   - Change risk tolerance slider
   - Select different experience levels
   - Notice how recommendations adapt

4. **Short vs. Long Input:**
   - Try minimum (20 chars) vs. detailed (500+ chars)
   - More detail = better analysis

## 🚀 Building for Production

When you're ready to deploy:

```bash
# Create optimized build
npm run build

# Test production build locally
npm start
```

Then deploy to Vercel, Netlify, or your preferred platform.

## 🔌 Adding LLM Integration (Optional)

The app works great with the mock engine, but to add real AI:

### 1. Get API Key

- **OpenAI:** https://platform.openai.com/api-keys
- **Anthropic:** https://console.anthropic.com/

### 2. Create Environment File

```bash
# Copy example file
cp .env.example .env.local

# Edit and add your key
# .env.local:
OPENAI_API_KEY=sk-your-actual-key-here
```

### 3. Install LLM Client

```bash
npm install openai
```

### 4. Update API Route

Open `src/pages/api/analyze.ts` and follow the comments.

The system prompt is already included!

## 📚 Next Steps

### Learn the Architecture

Read `ARCHITECTURE.md` for deep dive into:
- Screen flow
- State management
- Analysis engine
- UI components

### Explore the Code

- **Screens:** `src/components/screens/`
- **UI Components:** `src/components/ui/`
- **Analysis Logic:** `src/lib/analysisEngine.ts`
- **API Routes:** `src/pages/api/`

### Make It Your Own

1. Customize theme and branding
2. Add new domains or use cases
3. Extend analysis sections
4. Integrate with your LLM

## 💡 Pro Tips

### Development Workflow

1. Keep dev server running
2. Edit files in `src/`
3. Changes auto-reload in browser
4. Check terminal for errors

### Debugging

1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Use React DevTools extension
4. Add `console.log()` in code

### Code Style

- Use TypeScript types
- Follow existing naming conventions
- Keep components small and focused
- Comment complex logic

## 🆘 Getting Help

### Resources

- **README.md** - Full documentation
- **ARCHITECTURE.md** - Technical details
- **Code comments** - Inline documentation
- **TypeScript types** - Self-documenting

### Common Questions

**Q: Why is the analysis so detailed?**  
A: The mock engine generates realistic output to simulate a real LLM.

**Q: Can I use this without an API key?**  
A: Yes! The mock engine works great offline.

**Q: How do I deploy this?**  
A: See README.md → Deployment section.

**Q: Can I customize the analysis format?**  
A: Yes! Edit `src/lib/analysisEngine.ts`.

## ✅ Checklist

Before you start developing:

- [ ] Node.js 18+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] Dev server running (`npm run dev`)
- [ ] App loads in browser
- [ ] Test input and analysis flow
- [ ] Read README.md and ARCHITECTURE.md

---

**Ready to build?** Start exploring the code and make it your own! 🚀
