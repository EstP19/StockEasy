import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseConfig'; // Asegúrate de que esto esté correctamente configurado
import { Product } from '../types';

const Inventory: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    quantity: 0,
    price: 0,
    description: ''
  });
  const [editProductId, setEditProductId] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*');

    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setProducts(data as Product[]);
    }
  };

  const addProduct = async () => {
    const { data, error } = await supabase
      .from('products')
      .insert([{ ...newProduct }]);

    if (error) {
      console.error('Error adding product:', error);
    } else {
      if (data) {
        setProducts([...products, ...data]);
      }
      resetForm();
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
      } else {
        fetchProducts(); // Refresca la lista de productos
        resetForm();
      }
    }
  };

  const deleteProduct = async (id: string) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .match({ id });

    if (error) {
      console.error('Error deleting product:', error);
    } else {
      fetchProducts(); // Refresca la lista de productos
    }
  };

  const handleEditClick = (product: Product) => {
    setNewProduct(product);
    setEditProductId(product.id); // Guardar el ID del producto que se va a editar
  };

  const resetForm = () => {
    setNewProduct({ name: '', quantity: 0, price: 0, description: '' });
    setEditProductId(null); // Reiniciar el ID del producto en edición
  };

  return (
    <div>
      <h2>Inventario</h2>
      <button onClick={() => onNavigate('dashboard')}>Volver</button>
      <div>
        <h3>{editProductId ? 'Editar Producto' : 'Añadir Producto'}</h3>
        <input
          type="text"
          placeholder="Nombre"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={newProduct.quantity}
          onChange={(e) => setNewProduct({ ...newProduct, quantity: Number(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Precio"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <button onClick={editProductId ? editProduct : addProduct}>
          {editProductId ? 'Actualizar Producto' : 'Añadir Producto'}
        </button>
      </div>
      <h3>Lista de Productos</h3>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.quantity} - ${product.price}
            <button onClick={() => handleEditClick(product)}>Editar</button>
            <button onClick={() => deleteProduct(product.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;
