import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="main-nav-div">
      <nav className="navbar">
        <div className="nav-left">
          <p className="nav-logo">Stock Market</p>
        </div>
        {isAuthenticated && (
          <div className="nav-right">
            <Link className="links" to="/stocks">
              Comprar
            </Link>
            <Link className="links" to="/solicitudes">
              Solicitudes
            </Link>
          </div>
        )}
        <div className="nav-right">
          {isAuthenticated ? (
            <a className="logout-button" onClick={handleLogout}>
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
