import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Sales from './Sales';
import { supabase } from '../supabaseConfig';
import { ToastContainer } from 'react-toastify';

jest.mock('../supabaseConfig', () => ({
    supabase: {
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockResolvedValue({ data: [{ id: '1', name: 'Product 1', quantity: 10, price: 50, description: 'Sample product' }], error: null }),
        insert: jest.fn().mockResolvedValue({ data: [{ id: '2', name: 'New Product', quantity: 5, price: 20, description: 'Newly added' }], error: null }),
        update: jest.fn().mockResolvedValue({ error: null }),
        delete: jest.fn().mockResolvedValue({ error: null }),
    },
}));

describe('Sales Component', () => {
    const mockOnNavigate = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render without crashing', () => {
        render(<Sales onNavigate={mockOnNavigate} />);
        expect(screen.getByText('Ventas')).toBeInTheDocument();
    });

    it('should fetch and display sales products', async () => {
        render(<Sales onNavigate={mockOnNavigate} />);
        await waitFor(() => expect(screen.getByText('Product 1')).toBeInTheDocument());
    });

    it('should add a new sale product', async () => {
        render(<Sales onNavigate={mockOnNavigate} />);

        // Simula llenar el formulario para agregar un nuevo producto
        fireEvent.change(screen.getByPlaceholderText('Nombre'), { target: { value: 'New Product' } });
        fireEvent.change(screen.getByPlaceholderText('Cantidad'), { target: { value: '5' } });
        fireEvent.change(screen.getByPlaceholderText('Precio'), { target: { value: '20' } });
        fireEvent.change(screen.getByPlaceholderText('Descripción'), { target: { value: 'Newly added' } });

        // Simula hacer clic en el botón para agregar el producto
        fireEvent.click(screen.getByText('Agregar Producto de Venta'));

        await waitFor(() => expect(screen.getByText('Producto agregado con éxito.')).toBeInTheDocument());
        expect(screen.getByText('New Product')).toBeInTheDocument();
    });

    it('should edit an existing sale product', async () => {
        render(<Sales onNavigate={mockOnNavigate} />);

        await waitFor(() => expect(screen.getByText('Product 1')).toBeInTheDocument());

        // Simula hacer clic en el botón de editar
        fireEvent.click(screen.getByText('Editar'));

        // Cambia los valores en el formulario
        fireEvent.change(screen.getByPlaceholderText('Nombre'), { target: { value: 'Updated Product' } });
        fireEvent.click(screen.getByText('Guardar Cambios'));

        await waitFor(() => expect(screen.getByText('Producto editado con éxito.')).toBeInTheDocument());
    });

    it('should delete a sale product', async () => {
        render(<Sales onNavigate={mockOnNavigate} />);

        await waitFor(() => expect(screen.getByText('Product 1')).toBeInTheDocument());

        // Simula hacer clic en el botón de eliminar
        window.confirm = jest.fn(() => true); // Simula la confirmación
        fireEvent.click(screen.getByText('Eliminar'));

        await waitFor(() => expect(screen.getByText('Producto eliminado con éxito.')).toBeInTheDocument());
        expect(screen.queryByText('Product 1')).not.toBeInTheDocument();
    });
});
