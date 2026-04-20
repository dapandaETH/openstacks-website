import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import supabase from '../../lib/supabase'
import plans from '../../config/plans'
import './Billing.css'

function getPlanFromStripePriceId(priceId) {
  if (!priceId) return plans[0]
  const match = plans.find(
    (p) => p.stripePriceIds.monthly === priceId || p.stripePriceIds.yearly === priceId
  )
  return match || plans[0]
}

function getStatusBadgeClass(status) {
  switch (status) {
    case 'active':
      return 'billing-badge--active'
    case 'canceled':
      return 'billing-badge--canceled'
    default:
      return 'billing-badge--free'
  }
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const mockInvoices = [
  { id: 'INV-001', date: '2026-03-15', amount: '$15.00', status: 'Paid' },
  { id: 'INV-002', date: '2026-02-15', amount: '$15.00', status: 'Paid' },
  { id: 'INV-003', date: '2026-01-15', amount: '$15.00', status: 'Paid' },
]

export default function Billing() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [subscription, setSubscription] = useState(null)
  const [loading, setLoading] = useState(true)
  const [portalLoading, setPortalLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user || !supabase) return

    async function fetchSubscription() {
      try {
        const { data, error: fetchError } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (fetchError && fetchError.code !== 'PGRST116') {
          throw fetchError
        }

        setSubscription(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchSubscription()
  }, [user])

  const handleManageSubscription = async () => {
    setPortalLoading(true)
    try {
      const res = await fetch('/api/stripe-portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: subscription.stripe_customer_id }),
      })
      const { url } = await res.json()
      window.location.href = url
    } catch (err) {
      setError('Failed to open billing portal')
    } finally {
      setPortalLoading(false)
    }
  }

  const currentPlan = subscription?.stripe_price_id
    ? getPlanFromStripePriceId(subscription.stripe_price_id)
    : plans[0]

  const isFreePlan = !subscription?.stripe_price_id

  if (loading) {
    return (
      <div className="billing-page">
        <div className="billing-loading">
          <div className="billing-spinner" />
          <p>Loading billing information...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="billing-page">
      <div className="billing-container">
        <h1 className="billing-title">Billing</h1>

        {error && <div className="billing-error">{error}</div>}

        <section className="billing-section">
          <h2 className="billing-section-title">Current Plan</h2>
          <div className="billing-plan-card">
            <div className="billing-plan-info">
              <div className="billing-plan-header">
                <h3>{currentPlan.title}</h3>
                <span className={`billing-badge ${getStatusBadgeClass(subscription?.status)}`}>
                  {subscription?.status === 'active'
                    ? 'Active'
                    : subscription?.status === 'canceled'
                      ? 'Canceled'
                      : 'Free'}
                </span>
              </div>
              <p className="billing-plan-price">
                {currentPlan.prices.monthly === 0
                  ? '$0/month'
                  : `$${currentPlan.prices.monthly}/month`}
              </p>
              {!isFreePlan && subscription?.stripe_current_period_end && (
                <p className="billing-plan-renewal">
                  Renews on {formatDate(subscription.stripe_current_period_end)}
                </p>
              )}
            </div>
            <div className="billing-plan-actions">
              {isFreePlan ? (
                <button className="billing-btn billing-btn--primary" onClick={() => navigate('/pricing')}>
                  Choose a Plan
                </button>
              ) : subscription?.stripe_customer_id ? (
                <button
                  className="billing-btn billing-btn--secondary"
                  onClick={handleManageSubscription}
                  disabled={portalLoading}
                >
                  {portalLoading ? 'Opening...' : 'Manage Subscription'}
                </button>
              ) : null}
            </div>
          </div>
        </section>

        <section className="billing-section">
          <h2 className="billing-section-title">Invoices</h2>
          <div className="billing-table-wrapper">
            <table className="billing-table">
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {mockInvoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td>{invoice.id}</td>
                    <td>{invoice.date}</td>
                    <td>{invoice.amount}</td>
                    <td>
                      <span className="billing-badge billing-badge--active">{invoice.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}
