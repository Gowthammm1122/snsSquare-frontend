import React, { useState } from 'react';
import PropTypes from 'prop-types';

const EditText = ({ 
  placeholder = '', 
  value = '', 
  onChange, 
  type = 'text',
  disabled = false,
  leftIcon = null,
  rightIcon = null,
  className = '',
  ...props 
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e) => {
    setInputValue(e?.target?.value);
    if (onChange) {
      onChange(e);
    }
  };

  const baseClasses = 'w-full rounded-[10px] bg-edittext-1 text-edittext-1 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent';
  
  const inputClasses = `
    ${baseClasses}
    ${leftIcon ? 'pl-[70px]' : 'pl-3'}
    ${rightIcon ? 'pr-12' : 'pr-3'}
    py-[24px] text-base sm:text-lg
    ${disabled ? 'cursor-not-allowed opacity-50' : ''}
    ${className}
  `?.trim()?.replace(/\s+/g, ' ');

  return (
    <div className="relative w-full">
      {leftIcon && (
        <div className="absolute left-[24px] top-1/2 transform -translate-y-1/2 w-5 h-5">
          <img src={leftIcon?.src} alt="search icon" className="w-full h-full" />
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        disabled={disabled}
        className={inputClasses}
        {...props}
      />
      {rightIcon && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5">
          <img src={rightIcon?.src} alt="icon" className="w-full h-full" />
        </div>
      )}
    </div>
  );
};

EditText.propTypes = {
  placeholder: PropTypes?.string,
  value: PropTypes?.string,
  onChange: PropTypes?.func,
  type: PropTypes?.string,
  disabled: PropTypes?.bool,
  leftIcon: PropTypes?.shape({
    src: PropTypes?.string,
    width: PropTypes?.number,
    height: PropTypes?.number,
  }),
  rightIcon: PropTypes?.shape({
    src: PropTypes?.string,
    width: PropTypes?.number,
    height: PropTypes?.number,
  }),
  className: PropTypes?.string,
};

export default EditText;