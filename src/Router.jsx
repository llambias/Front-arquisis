import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicial from './pages/Inicial';
// import Instrucciones from './Paginas/Instrucciones';
// import AboutUs from './Paginas/AboutUs';
// import Principal from './Paginas/Principal';
// import Login from './Paginas/Login';
// import Register from './Paginas/Register';
// import AdminCheck from './protected/AdminCheck'
// import UserCheck from './protected/UserCheck'

function Router(){
  return (
      <Routes>
        <Route path={"/"} element={<Inicial/>}/>
        {/*<Route path={"/Instructions"} element={<Instrucciones/>}/>
        <Route path={"/AboutUs"} element={<AboutUs/>}/>
        <Route path={"/Login"} element={<Login/>}/>
        <Route path={"/Principal"} element={<Principal/>}/>
        <Route path={"/Register"} element={<Register/>}/>
        <Route path={"/admin"} element={<AdminCheck/>}/>
        <Route path={"/user"} element={<UserCheck/>}/> */}
      </Routes>
  )
}

export default Router;