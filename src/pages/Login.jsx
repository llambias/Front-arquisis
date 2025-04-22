import React from "react";
import { useState, useContext } from "react";
import { IconButton } from "rsuite";
import { Unvisible} from '@rsuite/icons';
import { Link, useNavigate } from "react-router-dom";
import './LoginBox.css';
import axios from "axios";
import icono_usuario from "../assets/icono_usuario.png";

import { AuthContext } from "../auth/AuthContext";
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
        // setError(false);
        // setMsg("Login exitoso!");
        // Recibimos el token y lo procesamos
        const access_token = response.data.access_token;
        //localStorage.setItem('token', access_token);
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
        <form onSubmit={handleSubmit}>
        <div className="top_card">
            <div className='ingresas_datos'>
                <h4>Ingrese sus datos</h4>
                <img src={icono_usuario}></img>

            </div>
            
            <label className='label_nombre_usuario'>
            Email de Usuario:
                <input type='text' className='input_' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}></input>
            </label>
            <label className='label_contrasena'>
            Contraseña:
                <IconButton icon={<Unvisible />} 
                appearance="primary" className="eye_icon" onClick={togglePasswordVisibility} />
                <input type={passwordVisibility} className='input_' 
                value={password}
                onChange={(e) => setPassword(e.target.value)}></input>
            </label>
        </div>
        <div className="bottom_card">
          <button className="button" onClick={e=>handleSubmit(e)} >Iniciar sesión</button>
          <Link className="clean" to="/Register">¿No tienes cuenta? Regístrate</Link>
        </div>  
        </form>      
      </div>
    </div>
      
    </>
  )
}

export default LoginBox