import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Navbar } from "./components/loading";
import HomePage from "./pages/Home";
import Gallery from "./pages/Gallery";
import "./index.css";
import AssociationPage from './pages/Association';

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
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/association" element={<AssociationPage />} />
        <Route path="/extension" element={<HomePage />} />
        <Route path="/pricing" element={<HomePage />} />
        <Route path="/get-started" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}

export default App;
