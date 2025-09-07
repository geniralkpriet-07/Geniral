import { useState, useEffect } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { LoadComponent, Navbar } from "./components/loading";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import HomePage from "./pages/Home";
import Gallery from "./pages/Gallery";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/admin/AdminDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Association from "./pages/Association";
import UpcomingEvents from "./pages/upcomingevents";
import "./index.css";

const Layout = () => (
  <div className="site-layout">
    <div className="fixed inset-0 bg-radial-gradient z-[-1]"></div>
    <Navbar transparent={true} />
    <div className="page-content">
      <Outlet />
    </div>
  </div>
);

function App() {
  const [loading, setLoading] = useState(() => {
    return !sessionStorage.getItem("hasLoaded");
  });

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("hasLoaded", "true");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (loading) {
    return <LoadComponent />;
  }

  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/features" element={<HomePage />} />
          <Route path="/association" element={<Association />} />
          <Route path="/upcoming-events" element={<UpcomingEvents />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute adminOnly={true}>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/panel/*" 
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminPanel />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/pricing" element={<HomePage />} />
          <Route path="/get-started" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
