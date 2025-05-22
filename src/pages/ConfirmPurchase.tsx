import "./ConfirmPurchase.css";
import React from "react";
import { Link } from "react-router-dom";

type PurchaseData = {
  url: string;
  token: string;
  amount: number;
  symbol: string;
  name: string;
  price: number;
};

const ConfirmPurchase = () => {
  const { usr: purchaseData }: { usr: PurchaseData } = history.state;

  const totalPrice = purchaseData.price * purchaseData.amount;

  const handleConfirmPurchase = () => {
    console.log("Confirm Purchase");
  };

  return (
    <div className="confirm-purchase-container">
      {/* <div className="confirm-purchase-card"> */}
      <h1 className="confirm-purchase-title">Confirma tu compra</h1>
      <p className="confirm-purchase-description">
        Por favor, revisa los detalles de tu compra antes de confirmar.
      </p>

      <div className="purchase-details">
        <div className="purchase-detail-row">
          <span className="detail-label">Symbol:</span>
          <span className="detail-value">{purchaseData.symbol}</span>
        </div>
        <div className="purchase-detail-row">
          <span className="detail-label">Long Name:</span>
          <span className="detail-value">{purchaseData.name}</span>
        </div>
        <div className="purchase-detail-row">
          <span className="detail-label">Precio por acción:</span>
          <span className="detail-value">${purchaseData.price.toFixed(2)}</span>
        </div>
        <div className="purchase-detail-row">
          <span className="detail-label">Cantidad:</span>
          <span className="detail-value">{purchaseData.amount}</span>
        </div>
        <div className="purchase-detail-row total">
          <span className="detail-label">Precio total:</span>
          <span className="detail-value">${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <div className="button-group">
        <button onClick={handleConfirmPurchase} className="confirm-button">
          Confirmar compra
        </button>
        <Link to="/stocks">
          <button className="cancel-button">Cancelar</button>
        </Link>
      </div>
      {/* </div> */}
    </div>
  );
};

export default ConfirmPurchase;
