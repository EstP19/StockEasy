/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../supabaseConfig';
import { Product } from '../types';

interface ProductContextProps {
  products: Product[];
  loadProducts: () => Promise<void>;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) console.error('Error loading products:', error);
    else setProducts(data || []);
  };

  const addProduct = async (newProduct: Omit<Product, 'id'>) => {
    const { data, error } = await supabase.from('products').insert([newProduct]);
    if (error) console.error('Error adding product:', error);
    else loadProducts();  // Recargamos los productos después de añadir
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loadProducts, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProductContext must be used within a ProductProvider');
  return context;
};
