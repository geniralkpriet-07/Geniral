import { useState, useEffect } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { LoadComponent, Navbar } from "./components/loading";
import HomePage from "./pages/Home";
import Gallery from "./pages/Gallery";
import "./index.css";

const Layout = () => {
  return (
    <div className="site-layout">
      <div className="fixed inset-0 bg-radial-gradient z-[-1]"></div>
      
      <Navbar transparent={true} />
      
      <div className="page-content">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadComponent />;
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/features" element={<HomePage />} />
        <Route path="/extension" element={<HomePage />} />
        <Route path="/pricing" element={<HomePage />} />
        <Route path="/get-started" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;
