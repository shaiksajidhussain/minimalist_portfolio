import { Routes, Route } from 'react-router-dom';
import PortfolioHome from './pages/PortfolioHome';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './pages/admin/ProtectedRoute';

const App = () => {
  return (
    <Routes>
      {/* Portfolio Routes */}
      <Route path="/" element={<PortfolioHome />} />
      
      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      
      {/* 404 Fallback */}
      <Route path="*" element={<PortfolioHome />} />
    </Routes>
  );
};

export default App;
