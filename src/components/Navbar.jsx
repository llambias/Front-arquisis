import React from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <>
            <div className="main-nav-div">
                <nav className='navbar'>
                    <div className='nav-left'>
                        <p className='nav-logo'>Stock Market</p>
                    </div>
                    <div className='nav-right'>
                        <Link className='links' to="/register">Registrarse</Link>
                        
                        <Link className='links' to="/Login">Iniciar Sesión</Link>
                    </div>
                </nav>

            </div>
        </>
    );
}