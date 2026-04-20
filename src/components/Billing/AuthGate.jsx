import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import supabase from '../../lib/supabase'

export default function AuthGate({ children }) {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  if (!supabase) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#0a0a0f',
        color: '#fff',
        textAlign: 'center',
        padding: '2rem'
      }}>
        <div>
          <h2>Supabase Not Configured</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '1rem' }}>
            Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.
          </p>
        </div>
      </div>
    )
  }

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login', { replace: true })
    }
  }, [user, loading, navigate])

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#0a0a0f'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid rgba(255,255,255,0.1)',
          borderTopColor: '#6366f1',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (!user) return null

  return children
}
