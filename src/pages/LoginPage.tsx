import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Layout } from '../components/layout';
import { Button, Input } from '../components/common';
import { useAuthContext } from '../contexts/AuthContext';
import { ROUTES } from '../constants/routes';
import { validateEmail, validateRequired } from '../utils/validators';

interface LoginForm {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export function LoginPage() {
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const { login, loginLoading, loginError } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirect path from location state
  const from = location.state?.from?.pathname || ROUTES.DASHBOARD;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!validateRequired(form.email)) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!validateRequired(form.password)) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await login(form);
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleChange = (field: keyof LoginForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-140px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link
                to={ROUTES.REGISTER}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                create a new account
              </Link>
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                id="email"
                type="email"
                label="Email address"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange('email')}
                error={errors.email}
                required
              />
              
              <Input
                id="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange('password')}
                error={errors.password}
                required
              />
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <p className="text-sm text-red-600">{loginError.message}</p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              loading={loginLoading}
              disabled={loginLoading}
            >
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
