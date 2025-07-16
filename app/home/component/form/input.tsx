// components/FormInput.tsx

import React from 'react';

interface FormInputProps {
  label?: string;
  name: string;
  type?: string;
  value: string | number ; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  icon?: string; // Optional icon class
}

const Input: React.FC<FormInputProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  className = '',
  icon,
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block mb-1 font-semibold">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
            <i className={icon}></i>
          </span>
        )}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`border px-3 py-2 rounded w-full ${icon ? 'pl-10' : ''} ${className}`}
        />
      </div>
    </div>
  );
};

export default Input;