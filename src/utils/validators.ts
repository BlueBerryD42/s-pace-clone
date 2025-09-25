// Validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength;
};

export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength;
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Form validation messages
export const getValidationMessage = (field: string, rule: string, value?: any): string => {
  const messages: Record<string, string> = {
    required: `${field} is required`,
    email: `Please enter a valid email address`,
    password: `Password must be at least 8 characters with uppercase, lowercase, and number`,
    minLength: `${field} must be at least ${value} characters`,
    maxLength: `${field} must not exceed ${value} characters`,
    phone: `Please enter a valid phone number`,
    url: `Please enter a valid URL`,
    match: `${field} do not match`,
  };
  
  return messages[rule] || `${field} is invalid`;
};

// Comprehensive form validation
export interface ValidationRule {
  required?: boolean;
  email?: boolean;
  password?: boolean;
  minLength?: number;
  maxLength?: number;
  phone?: boolean;
  url?: boolean;
  custom?: (value: string) => boolean;
  customMessage?: string;
}

export const validateField = (value: string, rules: ValidationRule, fieldName: string): string | null => {
  if (rules.required && !validateRequired(value)) {
    return getValidationMessage(fieldName, 'required');
  }
  
  if (value && rules.email && !validateEmail(value)) {
    return getValidationMessage(fieldName, 'email');
  }
  
  if (value && rules.password && !validatePassword(value)) {
    return getValidationMessage(fieldName, 'password');
  }
  
  if (value && rules.minLength && !validateMinLength(value, rules.minLength)) {
    return getValidationMessage(fieldName, 'minLength', rules.minLength);
  }
  
  if (value && rules.maxLength && !validateMaxLength(value, rules.maxLength)) {
    return getValidationMessage(fieldName, 'maxLength', rules.maxLength);
  }
  
  if (value && rules.phone && !validatePhoneNumber(value)) {
    return getValidationMessage(fieldName, 'phone');
  }
  
  if (value && rules.url && !validateUrl(value)) {
    return getValidationMessage(fieldName, 'url');
  }
  
  if (value && rules.custom && !rules.custom(value)) {
    return rules.customMessage || `${fieldName} is invalid`;
  }
  
  return null;
};
