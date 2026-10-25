import { Routes, Route } from 'react-router-dom';
import HomePage from './agency/pages/HomePage';
import ServicesPage from './agency/pages/ServicesPage';
import WorkPage from './agency/pages/WorkPage';
import CaseStudyPage from './agency/pages/CaseStudyPage';
import AboutPage from './agency/pages/AboutPage';
import ProcessPage from './agency/pages/ProcessPage';
import ContactPage from './agency/pages/ContactPage';
import NotFoundPage from './agency/pages/NotFoundPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './pages/admin/ProtectedRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/work" element={<WorkPage />} />
      <Route path="/work/:slug" element={<CaseStudyPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/process" element={<ProcessPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
