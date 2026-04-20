import { useState } from 'react';
import plans from '../../config/plans';
import PricingCard from './PricingCard';
import './PricingTable.css';

function PricingTable({ onSubscribe }) {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="pricing-table">
      <div className="pricing-table__toggle">
        <button
          className={`pricing-table__toggle-btn${!isYearly ? ' active' : ''}`}
          onClick={() => setIsYearly(false)}
        >
          Monthly
        </button>
        <button
          className={`pricing-table__toggle-btn${isYearly ? ' active' : ''}`}
          onClick={() => setIsYearly(true)}
        >
          Yearly
        </button>
        {isYearly && <span className="pricing-table__badge">Save 20%</span>}
      </div>

      <div className="pricing-table__grid">
        {plans.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            isYearly={isYearly}
            onSubscribe={onSubscribe}
          />
        ))}
      </div>
    </div>
  );
}

export default PricingTable;
