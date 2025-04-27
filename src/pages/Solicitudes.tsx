import "./Solicitudes.css";
import React from "react";
import { useState, useEffect } from "react";
import { solicitudesData } from "../constants/constants";
import { getUserTransactionsRequest } from "../requests/stocks";
import { useAuth } from "../context/AuthContext";

type TransactionType = {
  request_id: string;
  user_id: number;
  symbol: string;
  group_id: string;
  operation: string;
  quantity: number;
  status: string;
  timestamp: string;
};

const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState<TransactionType[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const getTransactions = async () => {
      const user_id = user?.id;
      if (!user_id) {
        throw new Error("User ID is undefined");
      }
      const transactions = await getUserTransactionsRequest(user_id);
      setSolicitudes(transactions);
    };
    getTransactions();
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
              <th>Operation</th>
              <th>Quantity</th>
              <th>Timestamp</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((solicitud) => (
              <tr key={solicitud.symbol}>
                <td className="symbolCell">{solicitud.symbol}</td>
                <td>{solicitud.operation}</td>
                <td>{solicitud.quantity}</td>
                <td>{solicitud.timestamp}</td>
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
