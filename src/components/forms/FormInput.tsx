import React, { useState } from "react";
import "./Forms.css";
import eyeIcon from "../../assets/eye-open.svg";
import eyeClosedIcon from "../../assets/eye-closed.svg";

type FormInputProps = {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: "text" | "password" | "email";
};

const FormInput = ({
  name,
  value,
  onChange,
  type = "text",
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-input-container">
      <input
        type={showPassword ? "text" : type}
        name={name}
        value={value}
        onChange={onChange}
        className="custom-text-input"
      />
      {type === "password" && (
        <img
          src={showPassword ? eyeClosedIcon : eyeIcon} // Toggle icon
          alt="Toggle password visibility"
          className="eye-icon"
          onClick={() => setShowPassword((prev) => !prev)} // Toggle visibility state
        />
      )}
    </div>
  );
};

export default FormInput;
