import React, { useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import Sales from './components/Sales';
import { supabase } from './supabaseConfig.ts'; // Asegúrate de que la ruta sea correcta

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  useEffect(() => {
    // Verificar si el usuario ya está logueado
    const checkUserSession = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (user) {
        setIsLoggedIn(true); // Si hay un usuario, se considera que está logueado
      }
    };

    checkUserSession();
  }, []); // Solo se ejecuta una vez al montar el componente

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
