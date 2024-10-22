import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import Sales from './components/Sales';
import { Product } from './types';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Producto 1', quantity: 10, price: 9.99, description: 'Descripción del producto 1' },
    { id: '2', name: 'Producto 2', quantity: 5, price: 19.99, description: 'Descripción del producto 2' },
  ]);

  const handleLogin = (email: string, password: string) => {
    // Aquí se implementaría la lógica de autenticación real
    console.log('Login attempt:', email, password);
    setIsLoggedIn(true);
  };

  const handleAddProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: Date.now().toString() };
    setProducts([...products, newProduct]);
  };

  const handleEditProduct = (updatedProduct: Product) => {
    setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleSell = (productId: string, quantity: number) => {
    setProducts(
      products.map((p) =>
        p.id === productId ? { ...p, quantity: p.quantity - quantity } : p
      )
    );
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoginForm onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-text">
      {currentPage === 'dashboard' && (
        <Dashboard onNavigate={setCurrentPage} />
      )}
      {currentPage === 'inventory' && (
        <Inventory
          products={products}
          onAddProduct={handleAddProduct}
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteProduct}
          onNavigate={setCurrentPage}
        />
      )}
      {currentPage === 'sales' && (
        <Sales products={products} onSell={handleSell} onNavigate={setCurrentPage} />
      )}
    </div>
  );
}

export default App;