import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import moneyIcon from "../assets/money.svg";
import { updateFundsRequest } from "../requests/auth";
const Billetera = () => {
  const { user, setUser } = useAuth();
  const userFunds = user?.funds || 0;
  const [newAmount, setNewAmount] = useState<number>(userFunds);

  const handleUpdate = async (amount: number) => {
    try {
      const response = await updateFundsRequest(amount);
      if (response.status.code === 200) {
        setNewAmount(response.data.funds);
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, funds: response.data.funds })
        );
        if (user) {
          setUser({ ...user, funds: response.data.funds });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUpdate(newAmount);
  };

  return (
    <section className="stocks-container">
      <div
        className="header"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <img
            src={moneyIcon}
            alt="moneyicon"
            style={{ width: "2rem", height: "2rem" }}
          />
          <span
            style={{
              fontFamily: "Courier New",
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
          >
            Dinero disponible: ${userFunds}
          </span>
        </div>

        <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input
              type="number"
              value={newAmount}
              onChange={(e) => setNewAmount(Number(e.target.value))}
              placeholder="Nuevo monto"
              // style={{
              //   padding: "0.5rem",
              //   borderRadius: "4px",
              //   border: "1px solid #ccc",
              //   width: "150px",
              // }}
              className="amount-input"
              style={{ width: "100px" }}
            />
            <button
              type="submit"
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#4f46e5",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Actualizar (es gratis por ahora)
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Billetera;
