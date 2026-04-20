import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import supabase from '../lib/supabase';
import './Navigation.css';

function Navigation() {
  const location = useLocation();
  const { user, loading, signOut } = useAuth();
  const supabaseConfigured = !!supabase;

  return (
    <nav className="navigation">
      <div className="nav-logo">
        <Link to="/">OpenStacks</Link>
      </div>
      <div className="nav-links">
        <Link 
          to="/" 
          className={location.pathname === '/' ? 'active' : ''}
        >
          Coding Plans
        </Link>
        <Link 
          to="/about" 
          className={location.pathname === '/about' ? 'active' : ''}
        >
          About
        </Link>
        <Link 
          to="/pricing" 
          className={location.pathname === '/pricing' ? 'active' : ''}
        >
          Pricing
        </Link>
      </div>
      <div className="nav-auth">
        {!supabaseConfigured ? null : loading ? null : user ? (
          <>
            <Link to="/dashboard" className="nav-btn nav-btn-dashboard">Dashboard</Link>
            <button onClick={() => signOut()} className="nav-btn nav-btn-logout">Sign Out</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-btn nav-btn-login">Login</Link>
            <Link to="/signup" className="nav-btn nav-btn-signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
