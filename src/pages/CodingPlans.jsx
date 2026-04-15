import { useState } from 'react';
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

function ProviderRow({ provider }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <tr className="provider-row" onClick={() => setExpanded(!expanded)}>
        <td className="provider-cell">
          <img src={provider.logo} alt={provider.name} className="provider-logo" />
          <span className="provider-name">{provider.name}</span>
        </td>
        <td className="plans-cell">
          {provider.plans.map((plan) => plan.name).join(', ')}
        </td>
        <td className="price-cell">
          {provider.plans[0].price}
          {provider.plans.length > 1 && <span className="price-range"> - {provider.plans[provider.plans.length - 1].price}</span>}
        </td>
        <td className="expand-cell">
          <span className={`expand-icon ${expanded ? 'expanded' : ''}`}>▶</span>
        </td>
      </tr>
      {expanded && (
        <tr className="expanded-row">
          <td colSpan={4}>
            <div className="expanded-content">
              <div className="pricing-tiers">
                <h4>Pricing Tiers</h4>
                <div className="tiers-grid">
                  {provider.plans.map((plan, index) => (
                    <div key={index} className="tier-card">
                      <div className="tier-name">{plan.name}</div>
                      <div className="tier-price">{plan.price}</div>
                      <div className="tier-usage">{plan.usage}</div>
                    </div>
                  ))}
                </div>
              </div>
              <a href={provider.url} target="_blank" rel="noopener noreferrer" className="view-plans-btn">
                View Plans →
              </a>
            </div>
          </td>
        </tr>
      )}
    </>
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
        <div className="table-container">
          <table className="providers-table">
            <thead>
              <tr>
                <th>Provider</th>
                <th>Plans</th>
                <th>Price Range</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {directProviders.map((provider, index) => (
                <ProviderRow key={index} provider={provider} />
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="providers-section">
        <h2>Aggregators</h2>
        <div className="table-container">
          <table className="providers-table">
            <thead>
              <tr>
                <th>Provider</th>
                <th>Plans</th>
                <th>Price Range</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {aggregators.map((provider, index) => (
                <ProviderRow key={index} provider={provider} />
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="page-footer">
        <p>Plan prices verified from official provider pages.</p>
      </footer>
    </div>
  );
}

export default CodingPlans;