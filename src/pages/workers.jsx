import "./workers.css";
import React from "react";
import { useState, useEffect } from "react";
// import { solicitudesData } from "../constants/constants";
import {
  buyStockRequest,
  getAllWorkersRequest,
  getUserTransactionsRequest,
} from "../requests/stocks";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// type TransactionType = {
//   request_id: string;
//   user_id: number;
//   symbol: string;
//   group_id: string;
//   operation: string;
//   quantity: number;
//   status: string;
//   timestamp: string;
//   price: number;
// };

const Workers= () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const { user } = useAuth();
  const user_id = user?.id;
  const userFunds = user?.funds;
  const navigate = useNavigate();

 

  useEffect(() => {
    const getWorkers = async () => {
      const user_id = user?.id;
      if (!user_id) {
        throw new Error("User ID is undefined");
      }
      const workers = await getAllWorkersRequest(user_id);
      setSolicitudes(workers);
    };
    getWorkers();
  }, []);
  return (
    <section className="stocks-container">
      <div className="solicitudes-header">
        <h1>Calculo de ganancias de Compra y Venta</h1>
      </div>
      <div className="tableContainer">
        <table className="stocksTable">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>New price</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((solicitud) => (
              <tr key={solicitud.request_id}>
                <td className="symbolCell">{solicitud.symbol}</td>
                <td>{solicitud.quantity}</td>
                <td className="priceCell">
                  ${solicitud.price.toLocaleString("es-CL")}
                </td>
                <td className="priceCell">
                  ${solicitud.price.toLocaleString("es-CL")}
                </td>
        
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Workers;
