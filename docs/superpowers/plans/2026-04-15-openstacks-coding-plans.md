# OpenStacks Coding Plans Website Implementation Plan

**Goal:** Build a new homepage with AI coding plans comparison table and move current hero page to /about route.

**Architecture:** React SPA with Vite, React Router DOM for client-side routing, Cloudflare Pages deployment. Clean separation of pages (CodingPlans, About) and shared components (Navigation).

**Tech Stack:** React 19, Vite, react-router-dom, existing CSS/styling

---

## Task 1: Install React Router

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install react-router-dom**

Run: `npm install react-router-dom`

- [ ] **Step 2: Verify package.json updated**

Expected: `"react-router-dom": "^7.x.x"` added to dependencies

---

## Task 2: Create Navigation Component

**Files:**
- Create: `src/components/Navigation.jsx`
- Create: `src/components/Navigation.css`

- [ ] **Step 1: Create Navigation.jsx**

```jsx
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="navigation">
      <div className="nav-logo">
        <Link to="/">OpenStacks</Link>
      </div>
      <div className="nav-links">
        <Link 
          to="/" 
          className={location.pathname === '/' ? 'active' : ''}
        >
          Coding Plans
        </Link>
        <Link 
          to="/about" 
          className={location.pathname === '/about' ? 'active' : ''}
        >
          About
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;
```

- [ ] **Step 2: Create Navigation.css**

```css
.navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #0a0a0f;
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-logo a {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.2s ease;
}

.nav-links a:hover,
.nav-links a.active {
  color: #fff;
}
```

---

## Task 3: Create About Page

**Files:**
- Create: `src/pages/About.jsx`
- Modify: `src/components/HeroSection.jsx` (update import)

- [ ] **Step 1: Create About.jsx**

```jsx
import HeroSection from '../components/HeroSection';

function About() {
  return <HeroSection />;
}

export default About;
```

- [ ] **Step 2: Verify HeroSection import works**

Expected: HeroSection renders correctly

---

## Task 4: Create CodingPlans Page

**Files:**
- Create: `src/pages/CodingPlans.jsx`
- Create: `src/pages/CodingPlans.css`

- [ ] **Step 1: Create CodingPlans.jsx**

```jsx
import './CodingPlans.css';

const directProviders = [
  {
    name: 'Xiaomi MiMo',
    logo: 'https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/xiaomimimo.svg',
    plans: [
      { name: 'Lite', price: '$6/mo', usage: '60 million credits' },
      { name: 'Standard', price: '$16/mo', usage: '200 million credits' },
      { name: 'Pro', price: '$50/mo', usage: '700 million credits' },
    ],
    url: 'https://platform.xiaomimimo.com/#/token-plan',
  },
  {
    name: 'StepFun',
    logo: 'https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/stepfun-color.svg',
    plans: [
      { name: 'Mini', price: '$7/mo', usage: '100 prompts/hr' },
      { name: 'Plus', price: '$10/mo', usage: '400 prompts/hr' },
      { name: 'Pro', price: '$29/mo', usage: '1,500 prompts/hr' },
    ],
    url: 'https://platform.stepfun.ai/step-plan',
  },
  {
    name: 'MiniMax',
    logo: 'https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/minimax-color.svg',
    plans: [
      { name: 'Starter', price: '$10/mo', usage: '1,500 req/hr' },
      { name: 'Plus', price: '$20/mo', usage: '4,500 req/hr' },
      { name: 'Max', price: '$50/mo', usage: '15,000 req/hr' },
    ],
    url: 'https://platform.minimax.io/subscribe/token-plan',
  },
  {
    name: 'Z.AI GLM',
    logo: 'https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/zai.svg',
    plans: [
      { name: 'Lite', price: '$18/mo', usage: '3x Claude Pro usage' },
      { name: 'Pro', price: '$72/mo', usage: '5x Lite Plan usage' },
      { name: 'Max', price: '$160/mo', usage: '4x Pro Plan usage' },
    ],
    url: 'https://z.ai/subscribe?ic=UZU3EY63I5',
  },
  {
    name: 'Kimi',
    logo: 'https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/kimi-color.svg',
    plans: [
      { name: 'Moderato', price: '$19/mo', usage: 'Basic usage' },
      { name: 'Allegretto', price: '$39/mo', usage: '2x more requests than Moderato' },
      { name: 'Allegro', price: '$99/mo', usage: '5x more requests than Moderato' },
    ],
    url: 'https://www.kimi.com/code',
  },
  {
    name: 'Mistral',
    logo: 'https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/mistral-color.svg',
    plans: [
      { name: 'Pro', price: '$15/mo', usage: 'Standard usage' },
    ],
    url: 'https://mistral.ai/pricing',
  },
  {
    name: 'Claude',
    logo: 'https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/claude-color.svg',
    plans: [
      { name: 'Pro', price: '$20/mo', usage: 'Standard usage' },
      { name: 'Max', price: '$100-200/mo', usage: '5x to 20x Pro usage' },
    ],
    url: 'https://claude.com/pricing',
  },
  {
    name: 'ChatGPT',
    logo: 'https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/openai.svg',
    plans: [
      { name: 'Plus', price: '$20/mo', usage: 'Standard usage' },
      { name: 'Pro', price: '$200/mo', usage: '5x or 20x more usage than Plus' },
    ],
    url: 'https://openai.com/chatgpt/pricing/',
  },
  {
    name: 'Gemini',
    logo: 'https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/gemini-color.svg',
    plans: [
      { name: 'AI Pro', price: '$20/mo', usage: 'Standard AI access' },
      { name: 'AI Ultra', price: '$250/mo', usage: 'Max usage + all Gemini models' },
    ],
    url: 'https://gemini.google/us/subscriptions/?hl=en',
  },
];

const aggregators = [
  {
    name: 'Crof',
    logo: 'https://files.nahcrof.com/file/crofai-black.png',
    plans: [
      { name: 'Hobby', price: '$5/mo', usage: '500 daily requests' },
      { name: 'Pro', price: '$10/mo', usage: '1,000 daily requests' },
      { name: 'Intermediate', price: '$20/mo', usage: '2,500 daily requests' },
    ],
    url: 'https://crof.ai/pricing',
  },
  {
    name: 'Baidu Cloud',
    logo: 'https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/baiducloud-color.svg',
    plans: [
      { name: 'Lite', price: '¥40/mo', usage: '18,000 req/mo' },
      { name: 'Pro', price: '¥200/mo', usage: '90,000 req/mo' },
    ],
    url: 'https://cloud.baidu.com/product/codingplan.html',
  },
  {
    name: 'Hugging Face Pro',
    logo: 'https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/huggingface-color.svg',
    plans: [
      { name: 'Pro', price: '$9/mo', usage: '20x inference usage' },
    ],
    url: 'https://huggingface.co/pro',
  },
  {
    name: 'routing.run',
    logo: 'https://routing.run/transparent_white_logo.PNG',
    plans: [
      { name: 'Lite', price: '$10/mo', usage: '400 req/day' },
      { name: 'Premium', price: '$20/mo', usage: '1,000 req/day' },
      { name: 'Max', price: '$50/mo', usage: '2,500 req/day' },
    ],
    url: 'https://routing.run/pricing',
  },
  {
    name: 'GitHub Copilot',
    logo: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/github-light.svg',
    plans: [
      { name: 'Pro', price: '$10/mo', usage: '300 premium req/mo' },
      { name: 'Pro+', price: '$39/mo', usage: '1,500 premium req/mo' },
    ],
    url: 'https://github.com/features/copilot/plans',
  },
  {
    name: 'BytePlus',
    logo: 'https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/bytedance-color.svg',
    plans: [
      { name: 'Lite', price: '$10/mo', usage: '3x Claude Pro usage' },
      { name: 'Pro', price: '$50/mo', usage: '5x Lite Plan usage' },
    ],
    url: 'https://www.byteplus.com/activity/codingplan?ac=MMAUCIS9NT1S&rc=3AKVTTXA',
  },
  {
    name: 'OpenCode Go',
    logo: 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27%23FFFFFF%27%3E%3Cpath d=%27M16 6H8v12h8V6zm4 16H4V2h16v20z%27/%3E%3C/svg%3E',
    plans: [
      { name: 'Standard', price: '$10/mo', usage: 'Varies on model' },
    ],
    url: 'https://opencode.ai/go',
  },
  {
    name: 'Kilo Pass',
    logo: 'https://cdn.brandfetch.io/idIfMjJnlR/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1769155863219',
    plans: [
      { name: 'Starter', price: '$19/mo', usage: '~$26.6/mo in credits' },
      { name: 'Pro', price: '$49/mo', usage: '~$68.6/mo in credits' },
      { name: 'Expert', price: '$199/mo', usage: '~$278.6/mo in credits' },
    ],
    url: 'https://kilo.ai/pricing',
  },
  {
    name: 'LLM Gateway',
    logo: 'https://llmgateway.io/brand/logo-white.svg',
    plans: [
      { name: 'Lite', price: '$29/mo', usage: '$87 in model usage' },
      { name: 'Pro', price: '$79/mo', usage: '$237 in model usage' },
      { name: 'Max', price: '$179/mo', usage: '$537 in model usage' },
    ],
    url: 'https://code.llmgateway.io/',
  },
  {
    name: 'Ollama Cloud',
    logo: 'https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/ollama.svg',
    plans: [
      { name: 'Pro', price: '$20/mo', usage: '50x Starter usage' },
      { name: 'Max', price: '$100/mo', usage: '5x Pro usage' },
    ],
    url: 'https://ollama.com/pricing',
  },
  {
    name: 'Alibaba Cloud',
    logo: 'https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/alibabacloud-color.svg',
    plans: [
      { name: 'Pro', price: '~$49/mo', usage: '90,000 requests/mo' },
    ],
    url: 'https://www.alibabacloud.com/en/campaign/ai-scene-coding',
  },
  {
    name: 'Cerebras',
    logo: 'https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/cerebras-color.svg',
    plans: [
      { name: 'Pro', price: '$50/mo', usage: '24M tokens/day' },
      { name: 'Max', price: '$200/mo', usage: '120M tokens/day' },
    ],
    url: 'https://www.cerebras.ai/pricing',
  },
];

function ProviderCard({ provider }) {
  return (
    <div className="provider-card">
      <div className="provider-header">
        <img src={provider.logo} alt={provider.name} className="provider-logo" />
        <h3 className="provider-name">{provider.name}</h3>
      </div>
      <div className="provider-plans">
        {provider.plans.map((plan, index) => (
          <div key={index} className="plan-item">
            <span className="plan-name">{plan.name} — {plan.price}</span>
            <span className="plan-usage">{plan.usage}</span>
          </div>
        ))}
      </div>
      <a href={provider.url} target="_blank" rel="noopener noreferrer" className="view-plans-btn">
        View Plans
      </a>
    </div>
  );
}

function CodingPlans() {
  return (
    <div className="coding-plans">
      <header className="page-header">
        <h1>Compare AI Coding Plans</h1>
        <p>Find the best-value subscription for AI coding agents and CLI tools. All prices and rate limits are verified from official provider pages.</p>
      </header>

      <section className="providers-section">
        <h2>Direct Providers</h2>
        <div className="providers-grid">
          {directProviders.map((provider, index) => (
            <ProviderCard key={index} provider={provider} />
          ))}
        </div>
      </section>

      <section className="providers-section">
        <h2>Aggregators</h2>
        <div className="providers-grid">
          {aggregators.map((provider, index) => (
            <ProviderCard key={index} provider={provider} />
          ))}
        </div>
      </section>

      <footer className="page-footer">
        <p>Plan prices verified from official provider pages.</p>
      </footer>
    </div>
  );
}

export default CodingPlans;
```

- [ ] **Step 2: Create CodingPlans.css**

```css
.coding-plans {
  padding: 6rem 2rem 2rem;
  min-height: 100vh;
  background: #0a0a0f;
  color: #fff;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
  padding-top: 2rem;
}

.page-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.page-header p {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  max-width: 600px;
  margin: 0 auto;
}

.providers-section {
  margin-bottom: 4rem;
}

.providers-section h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding-left: 0.5rem;
  border-left: 3px solid #6366f1;
}

.providers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.provider-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.provider-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.provider-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.provider-logo {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.provider-name {
  font-size: 1.1rem;
  font-weight: 600;
}

.provider-plans {
  margin-bottom: 1rem;
}

.plan-item {
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.plan-item:last-child {
  border-bottom: none;
}

.plan-name {
  font-weight: 500;
  color: #fff;
}

.plan-usage {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
}

.view-plans-btn {
  display: inline-block;
  width: 100%;
  padding: 0.75rem 1rem;
  background: #6366f1;
  color: #fff;
  text-align: center;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.2s ease;
}

.view-plans-btn:hover {
  background: #4f46e5;
}

.page-footer {
  text-align: center;
  padding: 2rem 0;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .coding-plans {
    padding: 5rem 1rem 1rem;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .providers-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## Task 5: Update App.jsx with Routing

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Update App.jsx**

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import CodingPlans from './pages/CodingPlans';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<CodingPlans />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

---

## Task 6: Update index.html SEO for CodingPlans

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Update meta tags for homepage (CodingPlans)**

```html
<title>OpenStacks — Compare AI Coding Plans & Subscriptions</title>
<meta name="description" content="Compare AI coding agent subscriptions and plans. Find the best-value pricing for Claude, ChatGPT, Gemini, and other AI coding tools." />
```

- [ ] **Step 2: Update Open Graph tags**

```html
<meta property="og:title" content="OpenStacks — Compare AI Coding Plans" />
<meta property="og:description" content="Compare AI coding agent subscriptions and plans. Find the best-value pricing for Claude, ChatGPT, Gemini, and more." />
```

---

## Task 7: Build and Test

- [ ] **Step 1: Run build**

Run: `npm run build`
Expected: Successful build with no errors

- [ ] **Step 2: Test locally**

Run: `npm run preview`
Expected: Site loads at localhost:4173 with navigation working between pages

- [ ] **Step 3: Test routing**

Navigate between Home and About pages, verify correct content loads

---

## Task 8: Cloudflare Deployment Config

**Files:**
- Create: `public/_headers` (for SPA routing)

- [ ] **Step 1: Create _headers file for Cloudflare**

```
/*  
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```

- [ ] **Step 2: Create _redirects for SPA routing** (if needed)

```
/*    /index.html   200
```

Note: Cloudflare Pages handles SPA routing automatically with the default 200 fallback.

---

## Task 9: Final Verification

- [ ] **Step 1: Verify build output**

Check: `dist/` folder contains `index.html` and bundled assets

- [ ] **Step 2: Verify SEO meta tags**

Check: Index.html has correct title, description, OG tags

- [ ] **Step 3: Verify navigation works**

Check: Both routes load correctly

- [ ] **Step 4: Commit changes**

Run: `git add -A && git commit -m "feat: add coding plans comparison page with routing"`

---

## Implementation Complete

After completing all tasks:
1. Build passes successfully
2. Both routes work (/ and /about)
3. SEO meta tags are present
4. Navigation is functional
5. Deploy to Cloudflare Pages