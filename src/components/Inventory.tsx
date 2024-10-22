import React, { useState } from 'react';
import { Product } from '../types';
import { Plus, Search, ArrowLeft } from 'lucide-react';

interface InventoryProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onNavigate: (page: string) => void;
}

const Inventory: React.FC<InventoryProps> = ({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onNavigate,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    quantity: 0,
    price: 0,
    description: '',
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    onAddProduct(newProduct);
    setNewProduct({ name: '', quantity: 0, price: 0, description: '' });
  };

  const handleEditProduct = () => {
    if (editingProduct) {
      onEditProduct(editingProduct);
      setEditingProduct(null);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center mb-6">
        <button className="btn btn-secondary mr-4" onClick={() => onNavigate('dashboard')}>
          <ArrowLeft className="mr-2" /> Volver
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
              <button
                className="btn btn-secondary"
                onClick={() => setEditingProduct(product)}
              >
                Editar
              </button>
              <button
                className="btn bg-red-600 hover:bg-red-700 text-white"
                onClick={() => onDeleteProduct(product.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
      {editingProduct ? (
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-4">Editar Producto</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Nombre"
              className="input"
              value={editingProduct.name}
              onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Cantidad"
              className="input"
              value={editingProduct.quantity}
              onChange={(e) => setEditingProduct({ ...editingProduct, quantity: Number(e.target.value) })}
            />
            <input
              type="number"
              placeholder="Precio"
              className="input"
              value={editingProduct.price}
              onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
            />
            <input
              type="text"
              placeholder="Descripción"
              className="input"
              value={editingProduct.description}
              onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
            />
          </div>
          <div className="flex justify-end">
            <button className="btn btn-secondary mr-2" onClick={() => setEditingProduct(null)}>
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={handleEditProduct}>
              Guardar Cambios
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Agregar Producto</h3>
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
          <button className="btn btn-primary w-full" onClick={handleAddProduct}>
            <Plus className="inline-block mr-2" /> Agregar Producto
          </button>
        </div>
      )}
    </div>
  );
};

export default Inventory; 