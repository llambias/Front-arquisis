import React from "react";
import "./Forms.css";

const FormSubmitButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <button type="submit" className="custom-submit-button">
      {children}
    </button>
  );
};

export default FormSubmitButton;
