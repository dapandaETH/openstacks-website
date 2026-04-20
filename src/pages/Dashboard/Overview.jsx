import { useAuth } from '../../context/AuthContext'
import './Overview.css'

export default function Overview() {
  const { user } = useAuth()

  return (
    <div className="dashboard-overview">
      <h1>Welcome back{user?.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ''}!</h1>
      <div className="overview-stats">
        <div className="overview-stat-card">
          <h3>API Calls Today</h3>
          <p className="stat-value">0</p>
        </div>
        <div className="overview-stat-card">
          <h3>Total Requests</h3>
          <p className="stat-value">0</p>
        </div>
        <div className="overview-stat-card">
          <h3>Active Keys</h3>
          <p className="stat-value">0</p>
        </div>
      </div>
    </div>
  )
}
