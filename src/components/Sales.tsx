import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseConfig'; // Asegúrate de que esto esté correctamente configurado
import { Product } from '../types';

const Sales: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const [salesProducts, setSalesProducts] = useState<Product[]>([]);
  const [newSaleProduct, setNewSaleProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    quantity: 0,
    price: 0,
    description: ''
  });
  const [editSaleProductId, setEditSaleProductId] = useState<string | null>(null);

  useEffect(() => {
    fetchSalesProducts();
  }, []);

  const fetchSalesProducts = async () => {
    const { data, error } = await supabase
      .from('sales_products')
      .select('*');

    if (error) {
      console.error('Error fetching sales products:', error);
    } else {
      setSalesProducts(data as Product[]);
    }
  };

  const addSaleProduct = async () => {
    const { data, error } = await supabase
      .from('sales_products')
      .insert([{ ...newSaleProduct }]);

    if (error) {
      console.error('Error adding sales product:', error);
    } else {
      if (data) {
        setSalesProducts([...salesProducts, ...data]);
      }
      resetSaleForm();
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
      } else {
        fetchSalesProducts(); // Refresca la lista de productos
        resetSaleForm();
      }
    }
  };

  const deleteSaleProduct = async (id: string) => {
    const { error } = await supabase
      .from('sales_products')
      .delete()
      .match({ id });

    if (error) {
      console.error('Error deleting sales product:', error);
    } else {
      fetchSalesProducts(); // Refresca la lista de productos
    }
  };

  const handleEditClick = (product: Product) => {
    setNewSaleProduct(product);
    setEditSaleProductId(product.id); // Guardar el ID del producto que se va a editar
  };

  const resetSaleForm = () => {
    setNewSaleProduct({ name: '', quantity: 0, price: 0, description: '' });
    setEditSaleProductId(null); // Reiniciar el ID del producto en edición
  };

  return (
    <div>
      <h2>Ventas</h2>
      <button onClick={() => onNavigate('dashboard')}>Volver</button>
      <div>
        <h3>{editSaleProductId ? 'Editar Producto de Venta' : 'Añadir Producto de Venta'}</h3>
        <input
          type="text"
          placeholder="Nombre"
          value={newSaleProduct.name}
          onChange={(e) => setNewSaleProduct({ ...newSaleProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={newSaleProduct.quantity}
          onChange={(e) => setNewSaleProduct({ ...newSaleProduct, quantity: Number(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Precio"
          value={newSaleProduct.price}
          onChange={(e) => setNewSaleProduct({ ...newSaleProduct, price: Number(e.target.value) })}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={newSaleProduct.description}
          onChange={(e) => setNewSaleProduct({ ...newSaleProduct, description: e.target.value })}
        />
        <button onClick={editSaleProductId ? editSaleProduct : addSaleProduct}>
          {editSaleProductId ? 'Actualizar Producto de Venta' : 'Añadir Producto de Venta'}
        </button>
      </div>
      <h3>Lista de Productos de Ventas</h3>
      <ul>
        {salesProducts.map((product) => (
          <li key={product.id}>
            {product.name} - {product.quantity} - ${product.price}
            <button onClick={() => handleEditClick(product)}>Editar</button>
            <button onClick={() => deleteSaleProduct(product.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sales;
