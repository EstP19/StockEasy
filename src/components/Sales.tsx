import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseConfig';
import { Product } from '../types';
import { ArrowLeft, Plus, Search } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Estilos de react-toastify

const Sales: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const [salesProducts, setSalesProducts] = useState<Product[]>([]);
  const [newSaleProduct, setNewSaleProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    quantity: 0,
    price: 0,
    description: '',
  });
  const [editSaleProductId, setEditSaleProductId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activityLog, setActivityLog] = useState<string[]>([]); // Estado para el historial de actividades

  useEffect(() => {
    fetchSalesProducts();
  }, []);

  const fetchSalesProducts = async () => {
    const { data, error } = await supabase.from('sales_products').select('*');
    if (error) {
      console.error('Error fetching sales products:', error);
      toast.error('Error al cargar los productos.');
    } else {
      setSalesProducts(data as Product[]);
    }
  };

  const logActivity = (activity: string) => {
    setActivityLog((prevLog) => [...prevLog, activity]); // Registrar actividad en el historial
  };

  const addSaleProduct = async () => {
    const { data, error } = await supabase.from('sales_products').insert([newSaleProduct]);
    if (error) {
      console.error('Error adding sales product:', error);
      toast.error('Error al agregar el producto.');
    } else {
      setSalesProducts([...salesProducts, ...data!]);
      logActivity(`Producto agregado: ${newSaleProduct.name}`); // Registro de actividad
      resetSaleForm();
      toast.success('Producto agregado con éxito.');
    }
  };

  const editSaleProduct = async () => {
    if (editSaleProductId) {
      const { error } = await supabase
        .from('sales_products')
        .update(newSaleProduct)
        .match({ id: editSaleProductId });

      if (error) {
        console.error('Error updating sales product:', error);
        toast.error('Error al editar el producto.');
      } else {
        fetchSalesProducts();
        logActivity(`Producto editado: ${newSaleProduct.name}`); // Registro de actividad
        resetSaleForm();
        toast.success('Producto editado con éxito.');
      }
    }
  };

  const deleteSaleProduct = async (id: string) => {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (confirmed) {
      const { error } = await supabase.from('sales_products').delete().match({ id });

      if (error) {
        console.error('Error deleting sales product:', error);
        toast.error('Error al eliminar el producto.');
      } else {
        fetchSalesProducts();
        logActivity(`Producto eliminado: ${id}`); // Registro de actividad
        toast.success('Producto eliminado con éxito.');
      }
    }
  };

  const handleEditClick = (product: Product) => {
    setNewSaleProduct(product);
    setEditSaleProductId(product.id);
  };

  const resetSaleForm = () => {
    setNewSaleProduct({ name: '', quantity: 0, price: 0, description: '' });
    setEditSaleProductId(null);
  };

  const filteredSalesProducts = salesProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex items-center mb-6">
        <button className="btn btn-secondary mr-4" onClick={() => onNavigate('dashboard')}>
          <ArrowLeft className="mr-2" /> Volver
        </button>
        <h2 className="text-2xl font-bold">Ventas</h2>
      </div>

      <div className="mb-6 flex items-center">
        <Search className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Buscar producto"
          className="input flex-grow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {filteredSalesProducts.map((product) => (
          <div key={product.id} className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p>Cantidad: {product.quantity}</p>
            <p>Precio: ${product.price.toFixed(2)}</p>
            <p className="mb-4">{product.description}</p>
            <div className="flex justify-between">
              <button className="btn btn-secondary" onClick={() => handleEditClick(product)}>
                Editar
              </button>
              <button
                className="btn bg-red-600 hover:bg-red-700 text-white"
                onClick={() => deleteSaleProduct(product.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-4">
          {editSaleProductId ? 'Editar Producto de Venta' : 'Agregar Producto de Venta'}
        </h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Nombre"
            className="input"
            value={newSaleProduct.name}
            onChange={(e) => setNewSaleProduct({ ...newSaleProduct, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Cantidad"
            className="input"
            value={newSaleProduct.quantity}
            onChange={(e) => setNewSaleProduct({ ...newSaleProduct, quantity: Number(e.target.value) })}
          />
          <input
            type="number"
            placeholder="Precio"
            className="input"
            value={newSaleProduct.price}
            onChange={(e) => setNewSaleProduct({ ...newSaleProduct, price: Number(e.target.value) })}
          />
          <input
            type="text"
            placeholder="Descripción"
            className="input"
            value={newSaleProduct.description}
            onChange={(e) => setNewSaleProduct({ ...newSaleProduct, description: e.target.value })}
          />
        </div>
        <div className="flex justify-end">
          {editSaleProductId ? (
            <>
              <button className="btn btn-secondary mr-2" onClick={resetSaleForm}>
                Cancelar
              </button>
              <button className="btn btn-primary" onClick={editSaleProduct}>
                Guardar Cambios
              </button>
            </>
          ) : (
            <button className="btn btn-primary w-full" onClick={addSaleProduct}>
              <Plus className="inline-block mr-2" /> Agregar Producto de Venta
            </button>
          )}
        </div>
      </div>

      {/* Mostrar Historial de Actividades */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-4">Historial de Actividades</h3>
        <ul>
          {activityLog.map((activity, index) => (
            <li key={index} className="text-gray-400">{activity}</li>
          ))}
        </ul>
      </div>

      {/* Contenedor para las notificaciones Toast */}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default Sales;
