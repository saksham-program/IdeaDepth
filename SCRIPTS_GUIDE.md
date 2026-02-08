# 🎯 NPM Scripts Guide

Quick reference for all available npm commands in this project.

## 📜 Available Scripts

### Development

#### `npm run dev`
**What it does:** Starts the Next.js development server with hot module replacement

**When to use:** During active development

**Output:** 
```bash
✓ Ready on http://localhost:3000
```

**Features:**
- Hot reload on file changes
- Fast refresh for React components
- Error overlay in browser
- TypeScript type checking
- Tailwind CSS compilation

**Access:** http://localhost:3000

---

### Production

#### `npm run build`
**What it does:** Creates an optimized production build

**When to use:** Before deploying to production

**Process:**
1. Compiles TypeScript to JavaScript
2. Optimizes and minifies code
3. Generates static pages where possible
4. Creates optimized CSS bundles
5. Outputs to `.next/` directory

**Output:**
```bash
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization
```

**Build Time:** ~30-60 seconds (first build)

---

#### `npm start`
**What it does:** Starts the production server

**When to use:** After building, to test production build locally

**Requirements:** Must run `npm run build` first

**Access:** http://localhost:3000

**Note:** This is what runs on production servers like Vercel

---

### Code Quality

#### `npm run lint`
**What it does:** Runs ESLint to check code quality

**When to use:** Before committing code

**Checks:**
- Code style issues
- Potential bugs
- Best practice violations
- React-specific issues
- Next.js-specific issues

**Output:**
```bash
✓ No ESLint warnings or errors
```

**Fix automatically:**
```bash
npm run lint -- --fix
```

---

## 🔧 Custom Scripts You Can Add

Here are some useful scripts you can add to `package.json`:

### Type Checking

```json
"scripts": {
  "type-check": "tsc --noEmit"
}
```

**Usage:** `npm run type-check`

**What it does:** Checks TypeScript types without building

---

### Format Code

```json
"scripts": {
  "format": "prettier --write \"**/*.{js,jsx,ts,tsx,json,css,md}\""
}
```

**Requirements:** Install prettier first
```bash
npm install --save-dev prettier
```

**Usage:** `npm run format`

**What it does:** Auto-formats all code files

---

### Clean Build

```json
"scripts": {
  "clean": "rm -rf .next node_modules",
  "fresh": "npm run clean && npm install && npm run dev"
}
```

**Usage:** `npm run fresh`

**What it does:** Cleans everything and starts fresh

---

### Production Test

```json
"scripts": {
  "prod": "npm run build && npm start"
}
```

**Usage:** `npm run prod`

**What it does:** Build and run production server in one command

---

### Analyze Bundle

```json
"scripts": {
  "analyze": "ANALYZE=true npm run build"
}
```

**Requirements:** Install bundle analyzer
```bash
npm install --save-dev @next/bundle-analyzer
```

**Update next.config.js:**
```javascript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // your config
})
```

**Usage:** `npm run analyze`

**What it does:** Shows bundle size breakdown

---

## 🚀 Common Workflows

### Starting Development

```bash
# First time
npm install
npm run dev

# Subsequent times
npm run dev
```

---

### Before Committing

```bash
npm run lint
npm run type-check  # if you added the script
# Fix any issues
# Then commit
```

---

### Deploying to Production

```bash
# Test build locally first
npm run build
npm start

# If successful, push to Git
# Vercel/Netlify will auto-build on push
```

---

### Fresh Install

```bash
# If something breaks
npm run clean  # if you added the script
npm install
npm run dev
```

---

## 🐛 Troubleshooting Scripts

### Port Already in Use

```bash
# Use different port
npm run dev -- -p 3001
```

### Build Fails

```bash
# Check TypeScript
npm run type-check

# Check ESLint
npm run lint

# Clean and rebuild
rm -rf .next
npm run build
```

### Slow Development Server

```bash
# Clear Next.js cache
rm -rf .next

# Clear npm cache
npm cache clean --force

# Reinstall
npm install
```

---

## 📊 Script Performance

### Development Server
- **Startup:** 3-5 seconds
- **Hot Reload:** <1 second
- **Memory:** ~200-300 MB

### Production Build
- **First Build:** 30-60 seconds
- **Incremental Build:** 10-20 seconds
- **Bundle Size:** ~200-300 KB (gzipped)

### Linting
- **Duration:** 2-5 seconds
- **Memory:** ~50-100 MB

---

## 🔍 Script Debugging

### Verbose Output

```bash
# More detailed output
npm run dev -- --verbose

# Or
DEBUG=* npm run dev
```

### Check Node Version

```bash
node --version
# Should be 18+
```

### Check Dependencies

```bash
npm list
# Shows dependency tree

npm outdated
# Shows outdated packages
```

---

## 📝 Script Best Practices

### Do's ✅
- Run `npm run lint` before committing
- Test `npm run build` before deploying
- Use `npm run dev` for development
- Keep dependencies updated

### Don'ts ❌
- Don't commit `.next/` directory
- Don't commit `node_modules/`
- Don't skip type checking
- Don't ignore lint errors

---

## 🎓 Learning More

### Next.js CLI
- Docs: https://nextjs.org/docs/api-reference/cli
- All available flags and options

### NPM Scripts
- Docs: https://docs.npmjs.com/cli/v9/using-npm/scripts
- Custom script patterns

---

**Quick Reference Card:**

```bash
npm run dev      # Development server
npm run build    # Production build
npm start        # Production server
npm run lint     # Code quality check
```

**Most Used:** `npm run dev` (90% of the time)

**Before Deploy:** `npm run build` + `npm run lint`

**Troubleshooting:** Clear `.next/` directory and rebuild
