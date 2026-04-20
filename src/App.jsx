import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import Navigation from './components/Navigation';
import AuthGate from './components/Billing/AuthGate';
import CodingPlans from './pages/CodingPlans';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DashboardLayout from './pages/Dashboard/DashboardLayout';
import Overview from './pages/Dashboard/Overview';
import GenApiKey from './pages/Dashboard/GenApiKey';
import Usage from './pages/Dashboard/Usage';
import Billing from './pages/Dashboard/Billing';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<CodingPlans />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <AuthGate>
                <DashboardLayout />
              </AuthGate>
            }
          >
            <Route index element={<Overview />} />
            <Route path="keys" element={<GenApiKey />} />
            <Route path="usage" element={<Usage />} />
            <Route path="billing" element={<Billing />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App