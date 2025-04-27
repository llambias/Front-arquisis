import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import Inicial from "./pages/Inicial";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/Landing";
import Solicitudes from "./pages/Solicitudes";
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";

const PrivateWrapper = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      // This will trigger a re-render and redirect
    }
  }, [isAuthenticated, location]);

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

function Router() {
  return (
    <Routes>
      <Route path={"/"} element={<LandingPage />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/register"} element={<Register />} />
      <Route element={<PrivateWrapper />}>
        {/* Rutas privadas van aquí */}
        <Route path={"/stocks"} element={<Inicial />} />
        <Route path={"/solicitudes"} element={<Solicitudes />} />
      </Route>
    </Routes>
  );
}

export default Router;
