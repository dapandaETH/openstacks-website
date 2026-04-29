import './CodingPlans.css';

const directProviders = [
  {
    name: 'Xiaomi MiMo',
    logo: 'https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/xiaomimimo.svg',
    lite: { name: 'Lite', price: '$6/mo', usage: '60 million credits' },
    plus: { name: 'Standard', price: '$16/mo', usage: '200 million credits' },
    pro: { name: 'Pro', price: '$50/mo', usage: '700 million credits' },
    url: 'https://platform.xiaomimimo.com/#/token-plan',
  },
  {
    name: 'StepFun',
    logo: 'https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/stepfun-color.svg',
    lite: { name: 'Mini', price: '$7/mo', usage: '100 prompts/hr' },
    plus: { name: 'Plus', price: '$10/mo', usage: '400 prompts/hr' },
    pro: { name: 'Pro', price: '$29/mo', usage: '1,500 prompts/hr' },
    url: 'https://platform.stepfun.ai/step-plan',
  },
  {
    name: 'Codex (OpenAI)',
    logo: 'https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/codex-color.svg',
    lite: { name: 'Go', price: '$8/mo', usage: 'Lightweight usage' },
    plus: { name: 'Plus', price: '$20/mo', usage: 'Standard usage' },
    pro: { name: 'Pro', price: '$100-$200/mo', usage: '10x or 20x more usage than Plus' },
    url: 'https://openai.com/chatgpt/pricing/',
  },
  {
    name: 'MiniMax',
    logo: 'https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/minimax-color.svg',
    lite: { name: 'Starter', price: '$10/mo', usage: '1,500 req/hr' },
    plus: { name: 'Plus', price: '$20/mo', usage: '4,500 req/hr' },
    pro: { name: 'Max', price: '$50/mo', usage: '15,000 req/hr' },
    url: 'https://platform.minimax.io/subscribe/token-plan',
  },
  {
    name: 'Z.AI GLM',
    logo: 'https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/zai.svg',
    lite: { name: 'Lite', price: '$18/mo', usage: '3x Claude Pro usage' },
    plus: { name: 'Pro', price: '$72/mo', usage: '5x Lite Plan usage' },
    pro: { name: 'Max', price: '$160/mo', usage: '4x Pro Plan usage' },
    url: 'https://z.ai/subscribe?ic=UZU3EY63I5',
  },
  {
    name: 'Kimi',
    logo: 'https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/kimi-color.svg',
    lite: { name: 'Moderato', price: '$19/mo', usage: 'Basic usage' },
    plus: { name: 'Allegretto', price: '$39/mo', usage: '2x more requests than Moderato' },
    pro: { name: 'Allegro', price: '$99/mo', usage: '5x more requests than Moderato' },
    url: 'https://www.kimi.com/code',
  },
  {
    name: 'Mistral',
    logo: 'https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/mistral-color.svg',
    lite: null,
    plus: { name: 'Pro', price: '$15/mo', usage: 'Standard usage' },
    pro: null,
    url: 'https://mistral.ai/pricing',
  },
  {
    name: 'Claude',
    logo: 'https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/claude-color.svg',
    lite: null,
    plus: { name: 'Pro', price: '$20/mo', usage: 'Standard usage' },
    pro: { name: 'Max', price: '$100-200/mo', usage: '5x to 20x Pro usage' },
    url: 'https://claude.com/pricing',
  },
  {
    name: 'Gemini',
    logo: 'https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/gemini-color.svg',
    lite: null,
    plus: { name: 'AI Pro', price: '$20/mo', usage: 'Standard AI access' },
    pro: { name: 'AI Ultra', price: '$250/mo', usage: 'Max usage + all Gemini models' },
    url: 'https://gemini.google/us/subscriptions/?hl=en',
  },
];

const aggregators = [
  {
    name: 'Crof',
    logo: 'https://files.nahcrof.com/file/crofai-black.png',
    lite: { name: 'Hobby', price: '$5/mo', usage: '500 daily requests' },
    plus: { name: 'Pro', price: '$10/mo', usage: '1,000 daily requests' },
    pro: { name: 'Intermediate', price: '$20/mo', usage: '2,500 daily requests' },
    url: 'https://crof.ai/pricing',
  },
  {
    name: 'Baidu Cloud',
    logo: 'https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/baiducloud-color.svg',
    lite: { name: 'Lite', price: '¥40/mo', usage: '18,000 req/mo' },
    plus: { name: 'Pro', price: '¥200/mo', usage: '90,000 req/mo' },
    pro: null,
    url: 'https://cloud.baidu.com/product/codingplan.html',
  },
  {
    name: 'Hugging Face Pro',
    logo: 'https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/huggingface-color.svg',
    lite: { name: 'Pro', price: '$9/mo', usage: '20x inference usage' },
    plus: null,
    pro: null,
    url: 'https://huggingface.co/pro',
  },

  {
    name: 'GitHub Copilot',
    logo: 'https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/github-light.svg',
    lite: { name: 'Pro', price: '$10/mo', usage: '300 premium req/mo' },
    plus: { name: 'Pro+', price: '$39/mo', usage: '1,500 premium req/mo' },
    pro: null,
    url: 'https://github.com/features/copilot/plans',
  },
  {
    name: 'BytePlus',
    logo: 'https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/bytedance-color.svg',
    lite: { name: 'Lite', price: '$10/mo', usage: '3x Claude Pro usage' },
    plus: { name: 'Pro', price: '$50/mo', usage: '5x Lite Plan usage' },
    pro: null,
    url: 'https://www.byteplus.com/activity/codingplan?ac=MMAUCIS9NT1S&rc=3AKVTTXA',
  },
  {
    name: 'OpenCode Go',
    logo: 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27%23FFFFFF%27%3E%3Cpath d=%27M16 6H8v12h8V6zm4 16H4V2h16v20z%27/%3E%3C/svg%3E',
    lite: { name: 'Standard', price: '$10/mo', usage: 'Varies on model' },
    plus: null,
    pro: null,
    url: 'https://opencode.ai/go',
  },
  {
    name: 'Kilo Pass',
    logo: 'https://cdn.brandfetch.io/idIfMjJnlR/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1769155863219',
    lite: { name: 'Starter', price: '$19/mo', usage: '~$26.6/mo in credits' },
    plus: { name: 'Pro', price: '$49/mo', usage: '~$68.6/mo in credits' },
    pro: { name: 'Expert', price: '$199/mo', usage: '~$278.6/mo in credits' },
    url: 'https://kilo.ai/pricing',
  },
  {
    name: 'LLM Gateway',
    logo: 'https://llmgateway.io/brand/logo-white.svg',
    lite: { name: 'Lite', price: '$29/mo', usage: '$87 in model usage' },
    plus: { name: 'Pro', price: '$79/mo', usage: '$237 in model usage' },
    pro: { name: 'Max', price: '$179/mo', usage: '$537 in model usage' },
    url: 'https://code.llmgateway.io/',
  },
  {
    name: 'Ollama Cloud',
    logo: 'https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/ollama.svg',
    lite: null,
    plus: { name: 'Pro', price: '$20/mo', usage: '50x Starter usage' },
    pro: { name: 'Max', price: '$100/mo', usage: '5x Pro usage' },
    url: 'https://ollama.com/pricing',
  },
  {
    name: 'Alibaba Cloud',
    logo: 'https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/alibabacloud-color.svg',
    lite: null,
    plus: { name: 'Pro', price: '~$49/mo', usage: '90,000 requests/mo' },
    pro: null,
    url: 'https://www.alibabacloud.com/en/campaign/ai-scene-coding',
  },
  {
    name: 'Cerebras',
    logo: 'https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/cerebras-color.svg',
    lite: null,
    plus: { name: 'Pro', price: '$50/mo', usage: '24M tokens/day' },
    pro: { name: 'Max', price: '$200/mo', usage: '120M tokens/day' },
    url: 'https://www.cerebras.ai/pricing',
  },
];

function TierCell({ tier }) {
  if (!tier) {
    return <td className="tier-cell empty">—</td>;
  }
  return (
    <td className="tier-cell">
      <div className="tier-name">{tier.name} — {tier.price}</div>
      <div className="tier-usage">{tier.usage}</div>
    </td>
  );
}

function ProviderTableRow({ provider }) {
  const isWhiteLogo = ['Xiaomi MiMo', 'Z.AI GLM', 'Ollama Cloud'].includes(provider.name);
  return (
    <tr className="provider-row">
      <td className="brand-cell">
        <img src={provider.logo} alt={provider.name} className={`provider-logo${isWhiteLogo ? ' logo-white' : ''}`} />
        <span className="provider-name">{provider.name}</span>
      </td>
      <TierCell tier={provider.lite} />
      <TierCell tier={provider.plus} />
      <TierCell tier={provider.pro} />
      <td className="action-cell">
        <a href={provider.url} target="_blank" rel="noopener noreferrer" className="view-plans-btn">
          View Plans →
        </a>
      </td>
    </tr>
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
        <div className="table-wrapper">
          <table className="providers-table">
            <thead>
              <tr>
                <th className="sticky-col">Brand</th>
                <th>Lite</th>
                <th>Plus</th>
                <th>Pro</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {directProviders.map((provider, index) => (
                <ProviderTableRow key={index} provider={provider} />
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="providers-section">
        <h2>Aggregators</h2>
        <div className="table-wrapper">
          <table className="providers-table">
            <thead>
              <tr>
                <th className="sticky-col">Brand</th>
                <th>Lite</th>
                <th>Plus</th>
                <th>Pro</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {aggregators.map((provider, index) => (
                <ProviderTableRow key={index} provider={provider} />
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="page-footer">
        <p>Plan prices verified from official provider pages.</p>
        <a href="https://x.com/openstacksio" target="_blank" rel="noopener noreferrer" className="x-link">
          <svg className="x-logo" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          <span>@openstacksio</span>
        </a>
      </footer>
    </div>
  );
}

export default CodingPlans;