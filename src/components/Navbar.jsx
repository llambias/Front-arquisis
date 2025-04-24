import React from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        
            
        <nav className='nav'>
            <Link className='links' to="/Inicial">Legit Broker</Link>
            <Link className='links' to="/Signin">Registrarse</Link>
            
            <Link className='links' to="/Login">Iniciar sesion</Link>
                
            
        </nav>

            
        
    );
}