import React from 'react';
import { Header } from './Header';
import { ChildrenProps } from '../../types';

interface LayoutProps extends ChildrenProps {
  showHeader?: boolean;
  className?: string;
}

export function Layout({ children, showHeader = true, className = '' }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {showHeader && <Header />}
      
      <main className={`flex-1 ${className}`}>
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 S-Pace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
