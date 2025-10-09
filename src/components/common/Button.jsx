// components/ui/Button.jsx
import React from "react";

const Button = ({ children, onClick, type = "button", disabled }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-2 rounded-lg bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50`}
    >
      {children}
    </button>
  );
};

export default Button;
