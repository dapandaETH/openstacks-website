import PricingTable from '../components/Pricing/PricingTable';
import './Pricing.css';

function handleSubscribe(priceId, planId) {
  alert(`Stripe checkout coming soon — Price ID: ${priceId}`);
}

function Pricing() {
  return (
    <div className="pricing-page">
      <div className="pricing-page__container">
        <header className="pricing-page__header">
          <h1>Choose Your Plan</h1>
          <p>Start for free, upgrade as you grow</p>
        </header>
        <PricingTable onSubscribe={handleSubscribe} />
      </div>
    </div>
  );
}

export default Pricing;
