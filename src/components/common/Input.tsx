import React, { forwardRef } from 'react';
import type { BaseComponentProps } from '../../types';

interface InputProps extends Omit<BaseComponentProps, 'children'> {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  label?: string;
  hint?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  type = 'text',
  placeholder,
  value,
  defaultValue,
  disabled = false,
  required = false,
  error,
  label,
  hint,
  className = '',
  onChange,
  onBlur,
  onFocus,
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const baseClasses = 'block w-full rounded-lg border px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm transition-colors';
  const normalClasses = 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';
  const errorClasses = 'border-red-300 focus:border-red-500 focus:ring-red-500';
  const disabledClasses = 'bg-gray-50 text-gray-500 cursor-not-allowed';
  
  const inputClasses = [
    baseClasses,
    error ? errorClasses : normalClasses,
    disabled ? disabledClasses : '',
    className,
  ].join(' ');

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        ref={ref}
        id={inputId}
        type={type}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        required={required}
        className={inputClasses}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        {...props}
      />
      
      {hint && !error && (
        <p className="mt-1 text-sm text-gray-500">{hint}</p>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
