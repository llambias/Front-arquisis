import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicial from './pages/Inicial';

import Login from './pages/Login';
import Signin from './pages/Signin';


function Router(){
  return (
      <Routes>
        <Route path={"/"} element={<Inicial/>}/>
        <Route path={"/Login"} element={<Login/>}/>
        <Route path={"/Signin"} element={<Signin/>}/>
       
        
      </Routes>
  )
}

export default Router;