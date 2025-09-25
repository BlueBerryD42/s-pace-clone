import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { ROUTES } from '../constants/routes';
import { 
  HomePage, 
  LoginPage, 
  DashboardPage, 
  UsersPage 
} from '../pages';
import { ProtectedRoute, MainLayout } from '../components/layout';

// 404 Not Found component
function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <p className="text-xl text-gray-600 mt-4">Page not found</p>
        <a 
          href="/" 
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}

// About page placeholder
function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About S-Pace</h1>
      <div className="prose prose-lg">
        <p>
          S-Pace is a modern React application built with cutting-edge technologies 
          to demonstrate best practices in frontend development.
        </p>
        <h2>Technologies Used</h2>
        <ul>
          <li>React 19 with TypeScript</li>
          <li>Vite for fast development</li>
          <li>Tailwind CSS v4 for styling</li>
          <li>React Router for navigation</li>
          <li>Axios for API calls</li>
          <li>Custom hooks for state management</li>
        </ul>
      </div>
    </div>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Main Layout with Navbar */}
          <Route path="/" element={<MainLayout />}>
            {/* Public Routes */}
            <Route index element={<HomePage />} />
            <Route path={ROUTES.ABOUT} element={<AboutPage />} />
            <Route path="/blog" element={<div className="p-8"><h1 className="text-3xl font-bold">Blog - Coming Soon</h1></div>} />
            <Route path="/contact" element={<div className="p-8"><h1 className="text-3xl font-bold">Liên hệ - Coming Soon</h1></div>} />
            
            {/* Category Routes */}
            <Route path="/music" element={<div className="p-8"><h1 className="text-3xl font-bold">Âm nhạc - Coming Soon</h1></div>} />
            <Route path="/fashion" element={<div className="p-8"><h1 className="text-3xl font-bold">Sản khẩu & Nghệ thuật - Coming Soon</h1></div>} />
            <Route path="/sports" element={<div className="p-8"><h1 className="text-3xl font-bold">Thể thao - Coming Soon</h1></div>} />
            <Route path="/entertainment" element={<div className="p-8"><h1 className="text-3xl font-bold">Giải trí - Coming Soon</h1></div>} />
            <Route path="/other" element={<div className="p-8"><h1 className="text-3xl font-bold">Khác - Coming Soon</h1></div>} />
            
            {/* Protected Routes */}
            <Route 
              path={ROUTES.DASHBOARD} 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path={ROUTES.USERS} 
              element={
                <ProtectedRoute>
                  <UsersPage />
                </ProtectedRoute>
              } 
            />
          </Route>
          
          {/* Auth Routes (without main layout) */}
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<Navigate to={ROUTES.LOGIN} replace />} />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
