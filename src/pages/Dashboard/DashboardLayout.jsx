import { Outlet, NavLink } from 'react-router-dom'
import './DashboardLayout.css'

export default function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <h2 className="dashboard-sidebar-title">Dashboard</h2>
        <nav className="dashboard-nav">
          <NavLink to="/dashboard" end className={({ isActive }) => isActive ? 'active' : ''}>
            Overview
          </NavLink>
          <NavLink to="/dashboard/keys" className={({ isActive }) => isActive ? 'active' : ''}>
            API Keys
          </NavLink>
          <NavLink to="/dashboard/usage" className={({ isActive }) => isActive ? 'active' : ''}>
            Usage
          </NavLink>
          <NavLink to="/dashboard/models" className={({ isActive }) => isActive ? 'active' : ''}>
            Models
          </NavLink>
          <NavLink to="/dashboard/billing" className={({ isActive }) => isActive ? 'active' : ''}>
            Billing
          </NavLink>
        </nav>
      </aside>
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  )
}
