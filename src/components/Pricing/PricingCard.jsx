import { Link } from 'react-router-dom';
import './PricingCard.css';

function PricingCard({ plan, isYearly, onSubscribe }) {
  const price = isYearly ? plan.prices.yearly : plan.prices.monthly;
  const priceLabel = price === 0 ? 'Free' : `$${price}`;
  const periodLabel = price === 0 ? '' : isYearly ? '/yr' : '/mo';
  const stripePriceId = isYearly
    ? plan.stripePriceIds.yearly
    : plan.stripePriceIds.monthly;

  return (
    <div className={`pricing-card${plan.highlight ? ' highlighted' : ''}`}>
      <div className="pricing-card__header">
        <h3 className="pricing-card__title">{plan.title}</h3>
        <p className="pricing-card__description">{plan.description}</p>
      </div>

      <div className="pricing-card__price">
        <span className="pricing-card__amount">{priceLabel}</span>
        {periodLabel && <span className="pricing-card__period">{periodLabel}</span>}
      </div>

      <ul className="pricing-card__features">
        {plan.features.map((feature, i) => (
          <li key={i} className="pricing-card__feature">
            <svg className="pricing-card__icon pricing-card__icon--check" viewBox="0 0 16 16" fill="none">
              <path d="M13.354 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" fill="currentColor"/>
            </svg>
            {feature}
          </li>
        ))}
        {plan.limitations.map((limitation, i) => (
          <li key={i} className="pricing-card__feature pricing-card__feature--limitation">
            <svg className="pricing-card__icon pricing-card__icon--minus" viewBox="0 0 16 16" fill="none">
              <path d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8z" fill="currentColor"/>
            </svg>
            {limitation}
          </li>
        ))}
      </ul>

      <div className="pricing-card__action">
        {plan.id === 'starter' ? (
          <Link to="/dashboard" className="pricing-card__btn">
            Get Started
          </Link>
        ) : (
          <button
            className="pricing-card__btn"
            onClick={() => onSubscribe(stripePriceId, plan.id)}
          >
            Subscribe
          </button>
        )}
      </div>
    </div>
  );
}

export default PricingCard;
