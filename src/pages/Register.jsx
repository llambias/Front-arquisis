import React from "react";
import { useState } from "react";
import FormInput from "../components/forms/FormInput";
import FormSubmitButton from "../components/forms/FormSubmitButton";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Register.css";

function Register() {
  const { register, login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
    firstName: "",
    lastName: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await register(
        formData.email,
        formData.password,
        formData.passwordConfirmation,
        formData.firstName,
        formData.lastName
      );
      if (success) {
        const loginSuccess = await login(formData.email, formData.password);
        if (loginSuccess) {
          navigate("/stocks");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="register_card">
        <div className="card_header">
          <h1>Crea una cuenta</h1>
          <h4>Ingresa tus datos para comenzar a invertir</h4>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Nombre</label>
          <FormInput
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            type="text"
          />
          <label>Apellido</label>
          <FormInput
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            type="text"
          />
          <label>Correo</label>
          <FormInput
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
          />
          <label>Contraseña</label>
          <FormInput
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
          />
          <label>Confirmar contraseña</label>
          <FormInput
            name="passwordConfirmation"
            value={formData.passwordConfirmation}
            onChange={handleChange}
            type="password"
          />
          <div className="button-container">
            <FormSubmitButton>Registrarme</FormSubmitButton>
          </div>
        </form>
        <div className="login_link">
          <p>
            ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión Aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
