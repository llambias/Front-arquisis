import React, { useEffect, useState } from "react";
import "./PurchaseCompleted.css";
import { commitTransbankPaymentRequest } from "../requests/stocks";
import { useAuth } from "../context/AuthContext";

import { Link } from "react-router-dom";

type commitTransbankPaymentResponse = {
  amount: number;
  buy_order: string;
  response_code: number;
  status: string;
};

export default function PurchaseCompletedPage() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [transaction, setTransaction] =
    useState<commitTransbankPaymentResponse | null>(null);
  const { user } = useAuth();
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token_ws");
    if (token) {
      commitTransbankPaymentRequest(token, user?.id || 0)
        .then((res: commitTransbankPaymentResponse) => {
          if (res.response_code === 0) {
            setTransaction({
              amount: res.amount,
              buy_order: res.buy_order,
              response_code: res.response_code,
              status: res.status,
            });
          }
          setToken(token);
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="purchase-completed-container">
        <div className="purchase-completed-card">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="purchase-completed-container">
      <div className="purchase-completed-card">
        <span className="completed-emoji">
          {token ? (transaction ? "✅" : "❌") : "❌"}
        </span>
        <h1 className="completed-title">
          {token
            ? transaction
              ? "Compra Finalizada"
              : "Compra Rechazada"
            : "Compra Anulada"}
        </h1>
        <p className="completed-reference">
          <span className="reference-number">
            {token
              ? transaction
                ? "Compra realizada con éxito!"
                : "Su compra ha sido rechazada por el sistema"
              : "Compra anulada por usuario"}
          </span>
        </p>
        <Link to="/stocks">
          <button className="cancel-button">Volver a inicio</button>
        </Link>
      </div>
    </div>
  );
}
