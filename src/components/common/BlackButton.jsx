import React from 'react';
import PropTypes from 'prop-types';

const BlackButton = ({ 
  children, 
  onClick, 
  variant = 'black', 
  size = 'medium', 
  disabled = false, 
  type = 'button',
  fullWidth = false,
  className = '',
  ...props   
}) => {
  const baseClasses = ' rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer';
  
  const variants = {
    black: 'bg-black text-white hover:bg-gray-800 focus:ring-gray-500',
    'black-outline': 'border border-black text-black hover:bg-black hover:text-white focus:ring-gray-500',
    'black-outline2': 'border border-gray-400 text-gray-400 hover:bg-black hover:text-white focus:ring-gray-400',
    'black-secondary': 'bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-500',
  };
  
  const sizes = {
    small: 'px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm',
    medium: 'px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base',
    large: 'px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg',
  };
  
  const buttonClasses = `
    ${baseClasses} 
    ${variants?.[variant]} 
    ${sizes?.[size]} 
    ${fullWidth ? 'w-full' : ''} 
    ${disabled ? 'cursor-not-allowed opacity-50' : ''}
    ${className}
  `?.trim()?.replace(/\s+/g, ' ');
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
};

BlackButton.propTypes = {
  children: PropTypes?.node,
  onClick: PropTypes?.func,
  variant: PropTypes?.oneOf(['black', 'black-outline', 'black-secondary']),
  size: PropTypes?.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes?.bool,
  type: PropTypes?.oneOf(['button', 'submit', 'reset']),
  fullWidth: PropTypes?.bool,
  className: PropTypes?.string,
};

export default BlackButton;
