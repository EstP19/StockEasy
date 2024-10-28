import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseConfig'; // Asegúrate de que esté configurado
import { Product } from '../types';
import { ArrowLeft, Plus, Search } from 'lucide-react'; // Íconos opcionales
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Inventory: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    quantity: 0,
    price: 0,
    description: '',
  });
  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activityLog, setActivityLog] = useState<string[]>([]); // Estado para el historial de actividades

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setProducts(data as Product[]);
    }
  };

  const logActivity = (activity: string) => {
    setActivityLog((prevLog) => [...prevLog, activity]); // Registrar actividad en el historial
  };

  const addProduct = async () => {
    const { data, error } = await supabase.from('products').insert([newProduct]);
    if (error) {
      console.error('Error adding product:', error);
      toast.error('Error al agregar producto');
    } else {
      if (data) {
        setProducts([...products, ...data]);
        logActivity(`Producto agregado: ${newProduct.name}`); // Registro de actividad
        resetForm();
        toast.success('Producto agregado con éxito');
      }
    }
  };

  const editProduct = async () => {
    if (editProductId) {
      const { error } = await supabase
        .from('products')
        .update(newProduct)
        .match({ id: editProductId });

      if (error) {
        console.error('Error updating product:', error);
        toast.error('Error al actualizar producto');
      } else {
        fetchProducts();
        logActivity(`Producto editado: ${newProduct.name}`); // Registro de actividad
        resetForm();
        toast.success('Producto actualizado con éxito');
      }
    }
  };

  const deleteProduct = async (id: string) => {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (confirmed) {
      const { error } = await supabase.from('products').delete().match({ id });
      if (error) {
        console.error('Error deleting product:', error);
        toast.error('Error al eliminar producto');
      } else {
        fetchProducts(); // Refresca la lista después de eliminar
        logActivity(`Producto eliminado: ${id}`); // Registro de actividad
        toast.success('Producto eliminado con éxito');
      }
    }
  };

  const handleEditClick = (product: Product) => {
    setNewProduct(product);
    setEditProductId(product.id);
  };

  const resetForm = () => {
    setNewProduct({ name: '', quantity: 0, price: 0, description: '' });
    setEditProductId(null);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex items-center mb-6">
        <button className="btn btn-secondary mr-4" onClick={() => onNavigate('dashboard')}>
          <ArrowLeft className="mr-2" />
        </button>
        <h2 className="text-2xl font-bold">Inventario</h2>
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
        {filteredProducts.map((product) => (
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
                onClick={() => deleteProduct(product.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-4">
          {editProductId ? 'Editar Producto' : 'Agregar Producto'}
        </h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Nombre"
            className="input"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Cantidad"
            className="input"
            value={newProduct.quantity}
            onChange={(e) => setNewProduct({ ...newProduct, quantity: Number(e.target.value) })}
          />
          <input
            type="number"
            placeholder="Precio"
            className="input"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
          />
          <input
            type="text"
            placeholder="Descripción"
            className="input"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          />
        </div>
        <div className="flex justify-end">
          {editProductId ? (
            <>
              <button className="btn btn-secondary mr-2" onClick={resetForm}>
                Cancelar
              </button>
              <button className="btn btn-primary" onClick={editProduct}>
                Guardar Cambios
              </button>
            </>
          ) : (
            <button className="btn btn-primary w-full" onClick={addProduct}>
              <Plus className="inline-block mr-2" /> Agregar Producto
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

      {/* Agregar ToastContainer aquí */}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default Inventory;
