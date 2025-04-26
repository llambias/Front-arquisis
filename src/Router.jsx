import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicial from './pages/Inicial';

import Login from './pages/Login';
import Register from './pages/Register';
import LandingPage from './pages/Landing';
import { useAuth } from './context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function Router(){
  const { isAuthenticated } = useAuth();
  return (
      <Routes>
        <Route path={"/"} element={<LandingPage/>}/>
        <Route path={"/stocks"} element={<Inicial/>}/>
        <Route path={"/Login"} element={<Login/>}/>
        <Route path={"/register"} element={<Register/>}/>
      </Routes>
  )
}

export default Router;