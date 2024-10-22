// src/types.ts

export interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
  description: string;
}

export interface InventoryProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  onEditProduct: (updatedProduct: Product) => Promise<void>;
  onDeleteProduct: (id: string) => Promise<void>;
  onNavigate: (page: string) => void;
}

export interface SalesProps {
  products: Product[];
  onSell: (productId: string, quantity: number) => Promise<void>;
  onNavigate: (page: string) => void;
}
