import "./Solicitudes.css";
import React from "react";
import { useState, useEffect } from "react";
import { solicitudesData } from "../constants/constants";
import {
  buyStockRequest,
  createTransbankPaymentRequest,
  getUserTransactionsRequest,
} from "../requests/stocks";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

type TransactionType = {
  request_id: string;
  user_id: number;
  symbol: string;
  group_id: string;
  operation: string;
  quantity: number;
  status: string;
  timestamp: string;
  price: number;
};

const Solicitudes = () => {
  const [solicitudes, setSolicitudes] = useState<TransactionType[]>([]);
  const { user } = useAuth();
  const user_id = user?.id;
  const userFunds = user?.funds;
  const navigate = useNavigate();

  const handleBuy = async (
    request_id: string,
    amount: number,
    price: number,
    symbol: string,
    longName: string
  ) => {
    if (!user_id || !userFunds) {
      throw new Error("User ID or funds are undefined");
    }
    const trade_amount = amount * price;
    const response = await createTransbankPaymentRequest(
      request_id,
      trade_amount
    );
    const url = response?.url;
    const token = response?.token;

    if (url && token) {
      navigate(`/confirm-purchase`, {
        state: {
          url,
          token,
          request_id,
          amount,
          title: symbol,
          name: longName,
          type: "buy",
          price: price,
        },
      });
    }
  };

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
              <th>Price</th>
              <th>Timestamp</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((solicitud) => (
              <tr key={solicitud.request_id}>
                <td className="symbolCell">{solicitud.symbol}</td>
                <td>{solicitud.operation}</td>
                <td>{solicitud.quantity}</td>
                <td className="priceCell">
                  ${solicitud.price.toLocaleString("es-CL")}
                </td>
                <td>{solicitud.timestamp}</td>
                <td>{solicitud.status}</td>
                <td>
                  <button
                    className="buyButton"
                    disabled={
                      solicitud.status === "aceptada" ||
                      solicitud.status === "rechazada"
                    }
                    onClick={() =>
                      handleBuy(
                        solicitud.request_id,
                        solicitud.quantity,
                        solicitud.price,
                        solicitud.symbol,
                        solicitud.symbol
                      )
                    }
                  >
                    Buy
                  </button>
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
