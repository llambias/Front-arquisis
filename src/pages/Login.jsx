import React from "react";
import { useState, useContext } from "react";
import { IconButton } from "rsuite";
import { Unvisible} from '@rsuite/icons';
import { Link, useNavigate } from "react-router-dom";
import './Login.css';
import axios from "axios";
import FormInput from "../components/forms/FormInput";
import FormSubmitButton from "../components/forms/FormSubmitButton";

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
      axios.post(`${URL_BACK}/login`, {
        "email": email,
        "password": password
        
      },{
        headers : {
          "Content-Type": "application/json"} 
      }).then((response) => {
        console.log('Login successful', email);
        console.log(response);
        // Recibimos el token y lo procesamos
        const access_token = response.data.access_token;
        setToken(access_token);
        console.log("Se seteo el token: ", access_token);
        navigate('/Principal');
      }).catch((error) => {
        console.error('An error occurred while trying to login:', error);
        //setError(true);// aquí puede haber más lógica para tratar los errores
      })
    };

  return (
    <>
    <div className="container">
      <div className="login_card">
        <div className="card_header">
          <h1>Bienvenido de nuevo</h1>
          <h4>Ingresa tus credenciales para acceder a tu cuenta</h4>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Correo</label>
          <FormInput
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <label>Contraseña</label>
          <FormInput
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <div className="button-container">
            <FormSubmitButton>Iniciar sesión</FormSubmitButton>
          </div>
        </form>
        <div className="register_link">
          <p>¿No tienes una cuenta? <Link to="/register">Regístrate Aquí</Link></p>
        </div>
      </div>
    </div>
      
    </>
  )
}

export default LoginBox