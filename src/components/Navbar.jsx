import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="main-nav-div">
      <nav className="navbar">
        <div className="nav-left">
          <p className="nav-logo">Stock Market</p>
        </div>
        {true && (
          <div className="nav-right">
            <Link className="links" to="/stocks">
              Comprar
            </Link>
            <Link className="links" to="/stocks">
              Solicitudes
            </Link>
          </div>
        )}
        <div className="nav-right">
          {true ? (
            <a className="links" onClick={handleLogout}>
              Cerrar Sesión
            </a>
          ) : (
            <>
              <Link className="links" to="/register">
                Registrarse
              </Link>

              <Link className="links" to="/login">
                Iniciar Sesión
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
