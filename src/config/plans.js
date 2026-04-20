const plans = [
  {
    id: 'starter',
    title: 'Starter',
    description: 'For individuals getting started with AI coding',
    features: [
      'Access to core AI models',
      '500 requests per day',
      'Community support',
      'Basic code completion',
    ],
    limitations: [
      'No priority support',
      'No custom integrations',
      'Limited to 1 workspace',
    ],
    prices: { monthly: 0, yearly: 0 },
    stripePriceIds: { monthly: null, yearly: null },
    highlight: false,
  },
  {
    id: 'pro',
    title: 'Pro',
    description: 'For power users who need more from AI coding',
    features: [
      'Access to all AI models',
      'Unlimited requests',
      'Priority support',
      'Advanced code completion',
      'Multi-workspace support',
      'Custom integrations',
    ],
    limitations: [
      'No team features',
    ],
    prices: { monthly: 15, yearly: 144 },
    stripePriceIds: { monthly: 'price_pro_monthly', yearly: 'price_pro_yearly' },
    highlight: true,
  },
  {
    id: 'enterprise',
    title: 'Enterprise',
    description: 'For teams that need advanced security and control',
    features: [
      'Everything in Pro',
      'SSO & SAML',
      'Dedicated account manager',
      'Custom SLA',
      'Audit logs',
      'On-premise deployment option',
    ],
    limitations: [],
    prices: { monthly: 49, yearly: 480 },
    stripePriceIds: { monthly: 'price_enterprise_monthly', yearly: 'price_enterprise_yearly' },
    highlight: false,
  },
];

export default plans;
