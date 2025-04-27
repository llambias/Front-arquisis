import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Login.css';
import FormInput from "../components/forms/FormInput";
import FormSubmitButton from "../components/forms/FormSubmitButton";
import { useAuth } from "../context/AuthContext";

function LoginBox() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
    const handleSubmit = async (event) => {
      event.preventDefault();
      await login(email, password);
      navigate('/stocks');
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