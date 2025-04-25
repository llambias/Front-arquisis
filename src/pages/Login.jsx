import React from "react";
import { useState, useContext } from "react";
import { IconButton } from "rsuite";
import { Unvisible} from '@rsuite/icons';
import { Link, useNavigate } from "react-router-dom";
import './Login.css';
import axios from "axios";

import  URL_BACK   from "../../config";
//const navigate = useNavigate();

function LoginBox() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState("password");
    const togglePasswordVisibility = () => {
        setPasswordVisibility(passwordVisibility === "password" ? "text" : "password");
    };
    const navigate = useNavigate();
    const handleSubmit = (event) => {
      event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
      // Aquí puedes añadir la lógica para enviar los datos a tu backend o API
      console.log(URL_BACK,"email" ,email,password);
      
    };

  return (
    <>
    <div className="card" align=" center">
  <h4 className="title">Log In!</h4>
  <form>
    <div className="field">
      
      <input  id="logemail" placeholder="Email" className="input-field" name="logemail" type="email"></input>
    </div>
    <div className="field">
      
      <input autocomplete="off" id="logpass" placeholder="Password" className="input-field" name="logpass" type="password"></input>
    </div>
    <button  type="submit">Login</button>
    <Link to="/Singin" className="btn-link">Sin cuenta?</Link>
  </form>
</div>
      
    </>
  )
}

export default LoginBox