import './Usage.css'

const mockUsage = [
  { date: '2026-04-20', model: 'gpt-4', requests: 45, tokens: 12500 },
  { date: '2026-04-19', model: 'gpt-4', requests: 32, tokens: 9800 },
  { date: '2026-04-18', model: 'claude-3', requests: 28, tokens: 8200 },
  { date: '2026-04-17', model: 'gpt-4', requests: 51, tokens: 15300 },
  { date: '2026-04-16', model: 'llama-3', requests: 19, tokens: 5100 },
]

export default function Usage() {
  const totalRequests = mockUsage.reduce((sum, u) => sum + u.requests, 0)
  const totalTokens = mockUsage.reduce((sum, u) => sum + u.tokens, 0)

  return (
    <div className="usage-page">
      <h1>Usage</h1>
      <p className="usage-description">Track your API usage and token consumption.</p>

      <div className="usage-summary">
        <div className="usage-summary-card">
          <h3>Total Requests (5 days)</h3>
          <p className="usage-value">{totalRequests.toLocaleString()}</p>
        </div>
        <div className="usage-summary-card">
          <h3>Total Tokens (5 days)</h3>
          <p className="usage-value">{totalTokens.toLocaleString()}</p>
        </div>
      </div>

      <div className="usage-table-wrapper">
        <table className="usage-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Model</th>
              <th>Requests</th>
              <th>Tokens</th>
            </tr>
          </thead>
          <tbody>
            {mockUsage.map((row, i) => (
              <tr key={i}>
                <td>{row.date}</td>
                <td>{row.model}</td>
                <td>{row.requests}</td>
                <td>{row.tokens.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
