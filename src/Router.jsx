import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Inicial from "./pages/Inicial";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/Landing";
import Solicitudes from "./pages/Solicitudes";
import { useAuth } from "./context/AuthContext";

const PrivateWrapper = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

function Router() {
  return (
    <Routes>
      <Route path={"/"} element={<LandingPage />} />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/register"} element={<Register />} />
      <Route path={"/stocks"} element={<Inicial />} />
      <Route path={"/solicitudes"} element={<Solicitudes />} />
      <Route element={<PrivateWrapper />}>
        {/* Rutas privadas van aquí */}
        {/* <Route path={"/stocks"} element={<Inicial />} /> */}
      </Route>
    </Routes>
  );
}

export default Router;
