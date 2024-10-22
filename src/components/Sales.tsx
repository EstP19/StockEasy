import React, { useState } from 'react';
import { Product } from '../types';
import { Search, ShoppingCart, ArrowLeft } from 'lucide-react';

interface SalesProps {
  products: Product[];
  onSell: (productId: string, quantity: number) => void;
  onNavigate: (page: string) => void;
}

const Sales: React.FC<SalesProps> = ({ products, onSell, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSell = () => {
    if (selectedProduct) {
      onSell(selectedProduct.id, quantity);
      setSelectedProduct(null);
      setQuantity(1);
    }
  };

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
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className={`bg-gray-800 p-4 rounded-lg cursor-pointer ${
              selectedProduct?.id === product.id ? 'ring-2 ring-accent' : ''
            }`}
            onClick={() => setSelectedProduct(product)}
          >
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p>Cantidad disponible: {product.quantity}</p>
            <p>Precio: ${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Realizar Venta</h3>
          <p className="mb-2">Producto seleccionado: {selectedProduct.name}</p>
          <div className="flex items-center mb-4">
            <label htmlFor="quantity" className="mr-2">
              Cantidad:
            </label>
            <input
              type="number"
              id="quantity"
              className="input w-20"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min={1}
              max={selectedProduct.quantity}
            />
          </div>
          <p className="mb-4">Total: ${(selectedProduct.price * quantity).toFixed(2)}</p>
          <button className="btn btn-primary w-full" onClick={handleSell}>
            <ShoppingCart className="inline-block mr-2" /> Realizar Venta
          </button>
        </div>
      )}
    </div>
  );
};

export default Sales;