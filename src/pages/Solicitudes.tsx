import "./Solicitudes.css";
import React from "react";
import { useState, useEffect } from "react";
import { solicitudesData } from "../constants/constants";

const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState(solicitudesData);

  useEffect(() => {
    // const fetchSolicitudes = async () => {
    //   try {
    //     const response = await fetch("http://localhost:3000/solicitudes");
    //     const data = await response.json();
    //     setSolicitudes(data);
    //   } catch (error) {
    //     console.error("Error fetching solicitudes:", error);
    //   }
    // };
    // fetchSolicitudes();
  }, []); 

  return (
    <section className="stocks-container">
      <div className="solicitudes-header">
        <h1>Solicitudes de Compra y Venta</h1>
      </div>
      <div className="tableContainer">
        <table className="stocksTable">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Name</th>
              <th>Price ($)</th>
              <th>Quantity</th>
              <th>Operation</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((solicitud) => (
              <tr key={solicitud.symbol}>
                <td className="symbolCell">{solicitud.symbol}</td>
                <td>{solicitud.name}</td>
                <td className="priceCell">${solicitud.price.toFixed(2)}</td>
                <td>{solicitud.quantity}</td>
                <td>{solicitud.operation}</td>
                <td>{solicitud.date.toDateString()}</td>
                <td
                  style={{
                    color:
                      solicitud.status === "ACCEPTED"
                        ? "green"
                        : solicitud.status === "error" ||
                          solicitud.status === "REJECTED"
                        ? "red"
                        : "black",
                  }}
                >
                  {solicitud.status === "OK"
                    ? "PENDING"
                    : solicitud.status === "error"
                    ? "ERROR"
                    : solicitud.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Solicitudes;
