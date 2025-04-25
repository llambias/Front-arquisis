import React from "react";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './Login.css';
import  URL_BACK   from "../../config";
//const navigate = useNavigate();

function Signin() {
    console.log("login")
  return (
    <div className="card" align="center">
      <h4 className="title">Crea una cuenta!</h4>
      <form>
        <div className="field">
          
          <input  id="logemail" placeholder="Email" className="input-field" name="logemail" type="email"></input>
        </div>
        <div className="field">
          
          <input  id="logname" placeholder="Nombre" className="input-field" name="logename" type="text"></input>
        </div>
        <div className="field">
          
          <input autocomplete="off" id="logpass" placeholder="Password" className="input-field" name="logpass" type="password"></input>
        </div>
        <div className="field">
          
          <input autocomplete="off" id="logpass2" placeholder="Repeat Password" className="input-field" name="logpass2" type="password"></input>
        </div>
        <button  type="submit">Registrar</button>
        
      </form>
    </div>
  )
}

export default Signin