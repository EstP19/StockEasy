import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Inventory from './Inventory';
import { toast } from 'react-toastify';

// Mockear el Supabase
jest.mock('../supabaseConfig', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn().mockResolvedValue({
        data: [
          { id: '1', name: 'Product 1', quantity: 10, price: 50, description: 'Sample product' },
          { id: '2', name: 'Product 2', quantity: 5, price: 20, description: 'Another product' },
        ],
        error: null,
      }),
      insert: jest.fn().mockResolvedValue({
        data: [{ id: '3', name: 'New Product', quantity: 3, price: 15, description: 'Newly added' }],
        error: null,
      }),
      update: jest.fn().mockResolvedValue({ error: null }),
      delete: jest.fn().mockResolvedValue({ error: null }),
    })),
  },
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('Inventory Component', () => {
  const mockOnNavigate = jest.fn();

  beforeEach(() => {
    render(<Inventory onNavigate={mockOnNavigate} />);
  });

  test('renders inventory and shows initial products', async () => {
    expect(await screen.findByText('Inventario')).toBeInTheDocument();
    expect(await screen.findByText('Product 1')).toBeInTheDocument();
    expect(await screen.findByText('Product 2')).toBeInTheDocument();
  });

  test('adds a new product', async () => {
    fireEvent.change(screen.getByPlaceholderText('Nombre'), { target: { value: 'New Product' } });
    fireEvent.change(screen.getByPlaceholderText('Cantidad'), { target: { value: '3' } });
    fireEvent.change(screen.getByPlaceholderText('Precio'), { target: { value: '15' } });
    fireEvent.change(screen.getByPlaceholderText('Descripción'), { target: { value: 'Newly added' } });
    
    fireEvent.click(screen.getByText('Agregar Producto'));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Producto agregado con éxito');
    });
    
    expect(screen.getByText('New Product')).toBeInTheDocument();
  });

  test('edits an existing product', async () => {
    fireEvent.click(screen.getByText('Editar', { selector: 'button' })); // Editar el primer producto
    fireEvent.change(screen.getByPlaceholderText('Nombre'), { target: { value: 'Updated Product' } });
    
    fireEvent.click(screen.getByText('Guardar Cambios'));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Producto actualizado con éxito');
    });

    expect(screen.getByText('Updated Product')).toBeInTheDocument();
  });

  test('deletes a product', async () => {
    const deleteButton = screen.getAllByText('Eliminar')[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Producto eliminado con éxito');
    });

    expect(screen.queryByText('Product 1')).not.toBeInTheDocument();
  });

  test('searches for a product', async () => {
    const searchInput = screen.getByPlaceholderText('Buscar producto');
    fireEvent.change(searchInput, { target: { value: 'Product 1' } });

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.queryByText('Product 2')).not.toBeInTheDocument();
  });
});
