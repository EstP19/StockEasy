import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import Sales from './components/Sales';
import { Product } from './types';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogin = () => {
    console.log('Login successful');
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoginForm onLoginSuccess={handleLogin} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text">
      {currentPage === 'dashboard' && <Dashboard onNavigate={setCurrentPage} />}
      {currentPage === 'inventory' && <Inventory onNavigate={setCurrentPage} />}
      {currentPage === 'sales' && <Sales onNavigate={setCurrentPage} />}
    </div>
  );
}

export default App;
