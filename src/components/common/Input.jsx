// components/ui/Input.jsx
import React from "react";

const Input = ({ label, name, type = "text", placeholder, value, onChange }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}   // ✅ add this
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
      />
    </div>
  );
};

export default Input;
