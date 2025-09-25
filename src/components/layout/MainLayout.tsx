import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function MainLayout() {
  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <Navbar />
      
      {/* Main Content */}
      <main>
        <Outlet />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
