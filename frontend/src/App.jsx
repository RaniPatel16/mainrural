import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import MainLayout from './components/MainLayout';
import PrivateRoute from './components/PrivateRoute';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateAddress from './pages/CreateAddress';
import AddressList from './pages/AddressList';
import CreateOrder from './pages/CreateOrder';
import OrderHistory from './pages/OrderHistory';
import OrderTracking from './pages/OrderTracking';
import AdminDashboard from './pages/AdminDashboard';
import Forbidden from './pages/Forbidden';
import AdminOrderManagement from './pages/AdminOrderManagement';
import AgentManagement from './pages/AgentManagement';
import SmartLogistics from './pages/SmartLogistics';
import AgentEarnings from './pages/AgentEarnings';
import AgentDashboard from './pages/AgentDashboard';
import Profile from './pages/Profile';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Toaster position="top-center" reverseOrder={false} />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forbidden" element={<Forbidden />} />
          
          {/* Protected Main Routes */}
          <Route element={<PrivateRoute roles={['user', 'admin', 'agent']} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addresses/new" element={<CreateAddress />} />
            <Route path="/addresses" element={<AddressList />} />
            <Route path="/orders/new" element={<CreateOrder />} />
            <Route path="/orders/history" element={<OrderHistory />} />
            <Route path="/orders/:id" element={<OrderTracking />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Logistics Routes */}
          <Route element={<PrivateRoute roles={['admin', 'agent']} />}>
            <Route path="/logistics" element={<SmartLogistics />} />
          </Route>

          <Route element={<PrivateRoute roles={['agent']} />}>
            <Route path="/agent/dashboard" element={<AgentDashboard />} />
            <Route path="/earnings" element={<AgentEarnings />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<PrivateRoute roles={['admin']} />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/orders" element={<AdminOrderManagement />} />
            <Route path="/admin/agents" element={<AgentManagement />} />
          </Route>
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
