/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Package, ShoppingCart, LogOut } from 'lucide-react';
import { supabase } from '../supabaseConfig'; // Importamos Supabase para el logout
import ReactTooltip from 'react-tooltip'; // Asegúrate de que esta línea sea correcta

interface DashboardProps {
  onNavigate: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [totalInventoryProducts, setTotalInventoryProducts] = useState<number>(0);
  const [totalSalesProducts, setTotalSalesProducts] = useState<number>(0);
  const [mostQuantityInventoryProduct, setMostQuantityInventoryProduct] = useState<string>('');
  const [leastQuantityInventoryProduct, setLeastQuantityInventoryProduct] = useState<string>('');
  const [mostQuantitySalesProduct, setMostQuantitySalesProduct] = useState<string>('');
  const [leastQuantitySalesProduct, setLeastQuantitySalesProduct] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error during logout:', error);
    } else {
      onNavigate('login'); // Navega al login después del logout
    }
  };

  // Función para obtener datos de productos en inventario y ventas
  const fetchData = async () => {
    setLoading(true);
    
    // Obtener productos en inventario
    const { data: inventoryData, error: inventoryError } = await supabase
      .from('products')
      .select('*');

    // Obtener productos en ventas
    const { data: salesData, error: salesError } = await supabase
      .from('sales_products') // Cambiar según el nombre de la tabla de ventas
      .select('*');

    if (inventoryError) {
      console.error('Error fetching inventory products:', inventoryError);
    } else {
      const totalInventory = inventoryData.length;
      const mostQuantityProduct = inventoryData.reduce((prev: any, current: any) => {
        return (prev.quantity > current.quantity) ? prev : current;
      });
      const leastQuantityProduct = inventoryData.reduce((prev: any, current: any) => {
        return (prev.quantity < current.quantity) ? prev : current;
      });

      setTotalInventoryProducts(totalInventory);
      setMostQuantityInventoryProduct(mostQuantityProduct.name);
      setLeastQuantityInventoryProduct(leastQuantityProduct.name);
    }

    if (salesError) {
      console.error('Error fetching sales products:', salesError);
    } else {
      const totalSales = salesData.length;
      const mostQuantitySalesProduct = salesData.reduce((prev: any, current: any) => {
        return (prev.quantity > current.quantity) ? prev : current;
      });
      const leastQuantitySalesProduct = salesData.reduce((prev: any, current: any) => {
        return (prev.quantity < current.quantity) ? prev : current;
      });

      setTotalSalesProducts(totalSales);
      setMostQuantitySalesProduct(mostQuantitySalesProduct.name);
      setLeastQuantitySalesProduct(leastQuantitySalesProduct.name);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-center">StockEasy</h1>
        <button className="btn btn-danger flex items-center" onClick={handleLogout}>
          <LogOut className="mr-2" /> Logout
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <button
          className="btn btn-primary flex flex-col items-center justify-center p-8"
          onClick={() => onNavigate('inventory')}
          data-tip="Ver productos en inventario"
        >
          <Package size={48} className="mb-4" />
          <span>Insumos</span>
        </button>
        <button
          className="btn btn-secondary flex flex-col items-center justify-center p-8"
          onClick={() => onNavigate('sales')}
          data-tip="Ver productos en ventas"
        >
          <ShoppingCart size={48} className="mb-4" />
          <span>Ventas</span>
        </button>
      </div>

      {/* Sección del Reporte/Análisis */}
      <div className="mt-8 p-4 bg-gray-800 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Reporte</h2>
        {loading ? (
          <p>Cargando datos...</p>
        ) : (
          <div>
            <p className="mb-2">
              Total de Productos en Inventario: 
              <span className="font-bold"> {totalInventoryProducts}</span>
            </p>
            <p>
              Total de Productos en Ventas: 
              <span className="font-bold"> {totalSalesProducts}</span>
            </p>
            <p>
              Producto con Mayor Cantidad en Inventario: 
              <span className="font-bold"> {mostQuantityInventoryProduct}</span>
            </p>
            <p>
              Producto con Menor Cantidad en Inventario: 
              <span className="font-bold"> {leastQuantityInventoryProduct}</span>
            </p>
            <p>
              Producto con Mayor Cantidad en Ventas: 
              <span className="font-bold"> {mostQuantitySalesProduct}</span>
            </p>
            <p>
              Producto con Menor Cantidad en Ventas: 
              <span className="font-bold"> {leastQuantitySalesProduct}</span>
            </p>
          </div>
        )}
      </div>

      
    </div>
  );
};

export default Dashboard;
