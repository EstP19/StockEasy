import React from 'react';
import { Package, ShoppingCart } from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">StockEasy</h1>
      <div className="grid grid-cols-2 gap-6">
        <button
          className="btn btn-primary flex flex-col items-center justify-center p-8"
          onClick={() => onNavigate('inventory')}
        >
          <Package size={48} className="mb-4" />
          <span>Inventario</span>
        </button>
        <button
          className="btn btn-secondary flex flex-col items-center justify-center p-8"
          onClick={() => onNavigate('sales')}
        >
          <ShoppingCart size={48} className="mb-4" />
          <span>Ventas</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;