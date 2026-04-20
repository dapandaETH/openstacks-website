# Plan: Embed next-saas-stripe-starter into OpenStacks Website

## Goal

Port the pricing page, billing dashboard, and Stripe checkout flow from `mickasmt/next-saas-stripe-starter` (Next.js) into the existing `[0xos]openstacks-website` (React + Vite + Cloudflare Pages).

## Architecture

```
openstacks-website/
├── src/
│   ├── components/
│   │   ├── Pricing/
│   │   │   ├── PricingTable.jsx      ← pricing cards (monthly/yearly toggle)
│   │   │   ├── PricingCard.jsx       ← single plan card
│   │   │   ├── PricingTable.css
│   │   │   └── PricingCard.css
│   │   └── Billing/
│   │       ├── BillingInfo.jsx       ← current plan card + manage button
│   │       ├── BillingInfo.css
│   │       └── AuthGate.jsx          ← wraps protected pages
│   ├── pages/
│   │   ├── Dashboard/
│   │   │   └── Billing.jsx           ← updated to show Stripe billing info
│   │   └── Pricing.jsx               ← new pricing landing page
│   ├── lib/
│   │   ├── supabase.js               ← Supabase client init
│   │   └── stripe.js                 ← Stripe client init
│   ├── context/
│   │   └── AuthContext.jsx           ← Supabase auth context (provider/hook)
│   └── config/
│       └── plans.js                  ← plan definitions (prices, features, stripe price IDs)
├── functions/
│   └── api/
│   ├── stripe-checkout.js            ← create Stripe Checkout Session
│   ├── stripe-portal.js              ← create Stripe Customer Portal Session
│   └── stripe-webhook.js             ← handle Stripe webhooks (subscription status)
└── wrangler.toml                     ← Cloudflare Pages config (optional)
```

## Tech Stack Changes

| Current | Adding |
|---------|--------|
| React 19 + Vite 6 | — |
| React Router DOM v7 | — |
| Plain CSS | — |
| — | `@supabase/supabase-js` (auth + DB) |
| — | `@stripe/stripe-js` (client) |
| — | `stripe` (server, for Pages Functions) |

## Database Schema (Supabase)

```sql
-- Run in Supabase SQL Editor
create table subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  stripe_price_id text,
  stripe_current_period_end timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table subscriptions enable row level security;

create policy "Users can view own subscription"
  on subscriptions for select
  using (auth.uid() = user_id);

create policy "Service role can manage all subscriptions"
  on subscriptions for all
  using (auth.role() = 'service_role');
```

## Environment Variables

```env
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## Implementation Tasks

### Task 1: Supabase Auth Setup

**Files:**
- `src/lib/supabase.js` — createSupabaseClient()
- `src/context/AuthContext.jsx` — AuthProvider, useAuth hook
- `src/components/Billing/AuthGate.jsx` — redirect to login if not authenticated

**Requirements:**
- Initialize Supabase client with env vars
- AuthContext provides: user, session, signIn, signUp, signOut, loading
- AuthGate wraps protected dashboard routes, redirects to `/login` if not authed
- Add `/login` and `/signup` routes to App.jsx

**Context:** Supabase auth is client-side — `supabase.auth.signInWithPassword()`, `supabase.auth.onAuthStateChange()` for session management. No server needed.

### Task 2: Stripe Config + Plan Definitions

**Files:**
- `src/config/plans.js` — plan data (name, price, features, stripePriceId)
- `src/lib/stripe.js` — Stripe.js client init

**Requirements:**
- Port plan definitions from `next-saas-stripe-starter/config/subscriptions.ts`
- Adapt to OpenStacks plans (Lite $10/mo, etc.)
- Include monthly/yearly toggle with 20% yearly discount
- Stripe.js initialized with publishable key

### Task 3: Pricing Page

**Files:**
- `src/pages/Pricing.jsx` — pricing landing page
- `src/pages/Pricing.css` — styles
- `src/components/Pricing/PricingTable.jsx` — monthly/yearly toggle + grid
- `src/components/Pricing/PricingCard.jsx` — single plan card (name, price, features list, CTA)
- CSS for both components

**Requirements:**
- Monthly/yearly toggle (yearly = 20% off)
- 3 pricing cards: Starter (free), Pro ($15/mo), Business ($30/mo) — or adapt to OpenStacks
- Starter plan: "Go to dashboard" link
- Paid plans: "Subscribe" button → triggers Stripe Checkout
- If not logged in: "Sign in" button → redirect to /login
- Feature list with check/cross icons per card
- Pro plan highlighted (border accent)
- Route `/pricing` in App.jsx

**Adapted from:** `next-saas-stripe-starter/components/pricing/pricing-cards.tsx`

### Task 4: Stripe Checkout + Portal Functions

**Files:**
- `functions/api/stripe-checkout.js` — POST, creates Stripe Checkout Session
- `functions/api/stripe-portal.js` — POST, creates Stripe Customer Portal session
- `functions/api/stripe-webhook.js` — POST, handles Stripe webhooks

**Requirements:**

**stripe-checkout.js:**
- Accepts: `{ priceId, userId, email }`
- Creates/finds Stripe customer
- Creates Checkout Session with `mode: 'subscription'`
- Returns `{ url: session.url }` for client redirect

**stripe-portal.js:**
- Accepts: `{ customerId }`
- Creates Billing Portal session
- Returns `{ url: portal.url }` for client redirect

**stripe-webhook.js:**
- Verifies webhook signature
- Handles: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
- On checkout complete: creates subscription record in Supabase
- On update/cancel: updates subscription record in Supabase

**Note:** Cloudflare Pages Functions use `/functions/` directory. Files export `onRequestPost` handlers. Access env via `context.env`.

### Task 5: Billing Page (Dashboard)

**Files:**
- Update `src/pages/Dashboard/Billing.jsx` — integrate with Supabase + Stripe
- Update `src/pages/Dashboard/Billing.css` — adjust styles

**Requirements:**
- Fetch user's subscription from Supabase
- Show current plan name, price, renewal date, status
- If paid plan: show "Manage Subscription" button → opens Stripe Customer Portal
- If free plan: show "Choose a Plan" button → link to /pricing
- Invoice history (optional, from Stripe API or mock data initially)

**Adapted from:** `next-saas-stripe-starter/components/pricing/billing-info.tsx`

### Task 6: Update App.jsx + Navigation

**Files:**
- `src/App.jsx` — add routes: /pricing, /login, /signup
- `src/components/Navigation.jsx` — add Pricing link, Login/Signup buttons (conditional on auth state)
- `src/components/Navigation.css` — styles for auth buttons

**Requirements:**
- `/pricing` → Pricing page
- `/login` → Login page (Supabase auth UI)
- `/signup` → Signup page
- Nav shows: Dashboard link + Pricing link
- If logged in: show user avatar/dropdown with sign out
- If not logged in: show Login + Sign Up buttons
- Wrap DashboardLayout in AuthGate

## Dependencies to Add

```json
{
  "@supabase/supabase-js": "^2",
  "@stripe/stripe-js": "^2"
}
```

Dev dependencies (for testing functions locally):
```json
{
  "wrangler": "^3",
  "stripe": "^14"
}
```

## Deployment

1. **Supabase:** Create project, run SQL, get keys
2. **Stripe:** Create products/prices, get keys, set webhook URL
3. **Cloudflare Pages:** Connect repo, add env vars in dashboard
4. **Build:** `npm run build` → deploy to Cloudflare Pages

## Checklist

- [ ] Task 1: Supabase Auth Setup (lib, context, auth gate, login/signup routes)
- [ ] Task 2: Stripe Config + Plan Definitions
- [ ] Task 3: Pricing Page (toggle, cards, checkout trigger)
- [ ] Task 4: Stripe Functions (checkout, portal, webhook)
- [ ] Task 5: Billing Page (subscription info, portal link)
- [ ] Task 6: App.jsx + Navigation updates (routes, auth state in nav)
