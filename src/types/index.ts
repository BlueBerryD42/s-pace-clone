// Re-export all types from different modules
export * from './api';

// Component prop types
export interface ChildrenProps {
  children: React.ReactNode;
}

export interface ClassNameProps {
  className?: string;
}

export interface BaseComponentProps extends ChildrenProps, ClassNameProps {
  id?: string;
}

// Route types
export interface RouteConfig {
  path: string;
  element: React.ComponentType;
  title: string;
  protected?: boolean;
}

// Form types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select';
  placeholder?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
}

// Loading and error states
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}
