import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { Button } from '../common';

export function Navbar() {
  const location = useLocation();

  const navigationItems = [
    { path: ROUTES.HOME, label: 'Trang chủ' },
    { path: ROUTES.ABOUT, label: 'Về chúng tôi' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Liên hệ' },
  ];

  const categories = [
    { path: '/music', label: 'Âm nhạc' },
    { path: '/fashion', label: 'Sản khẩu & Nghệ thuật' },
    { path: '/sports', label: 'Thể thao' },
    { path: '/entertainment', label: 'Giải trí' },
    { path: '/other', label: 'Khác' },
  ];

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="relative">
      {/* Main Navigation Bar */}
      <div 
        className="relative px-6 py-4"
        style={{
          background: '#0A0926'
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to={ROUTES.HOME} className="flex items-center">
              <img 
                src="/Logo_White.svg" 
                alt="S-PACE Logo" 
                className="h-10 w-auto"
              />
            </Link>

            {/* Main Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative text-white transition-colors duration-200 hover:text-purple-200 ${
                    isActiveLink(item.path) ? 'text-purple-200' : ''
                  }`}
                >
                  {item.label}
                  {isActiveLink(item.path) && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-300 rounded-full"></div>
                  )}
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              <Link to={ROUTES.LOGIN}>
                <Button
                  variant="ghost"
                  size="sm"
                   className="text-white border-white/20 hover:bg-white/10 hover:border-white/40"
                >
                  Đăng ký
                </Button>
              </Link>
              <Link to={ROUTES.LOGIN}>
                <Button
                  variant="primary"
                  size="sm"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0"
                >
                  Đăng nhập
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Navigation (Categories) */}
      <div 
        className="backdrop-blur-sm border-b border-white/10"
        style={{
          background: 'linear-gradient(90deg, rgba(5, 4, 30, 0.6) 0%, rgba(177, 174, 255, 0.33) 100%)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Categories */}
            <div className="hidden lg:flex items-center space-x-8">
              {categories.map((category) => (
                <Link
                  key={category.path}
                  to={category.path}
                  className="text-white/80 text-sm hover:text-white transition-colors duration-200"
                >
                  {category.label}
                </Link>
              ))}
            </div>

            {/* Search Bar */}
            <div className="flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm"
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 pr-10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent w-80"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="w-4 h-4 text-white/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden absolute top-4 right-6">
        <button className="text-white p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
