import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from './LoginForm'; // Asegúrate de ajustar la ruta
import { supabase } from '../supabaseConfig.ts';

jest.mock('../supabaseConfig.ts', () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn(),
    },
  },
}));

describe('LoginForm', () => {
  const mockOnLoginSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Limpiar los mocks antes de cada prueba
  });

  test('renders LoginForm correctly', () => {
    render(<LoginForm onLoginSuccess={mockOnLoginSuccess} />);
    expect(screen.getByRole('heading', { name: /stock easy/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('updates email and password input fields', () => {
    render(<LoginForm onLoginSuccess={mockOnLoginSuccess} />);
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: 'mypassword' },
    });

    expect(screen.getByLabelText(/correo electrónico/i)).toHaveValue('test@example.com');
    expect(screen.getByLabelText(/contraseña/i)).toHaveValue('mypassword');
  });

  test('toggles password visibility', () => {
    render(<LoginForm onLoginSuccess={mockOnLoginSuccess} />);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    const toggleButton = screen.getByRole('button', { name: /mostrar/i });

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text'); // La contraseña debería ser visible

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password'); // La contraseña debería estar oculta
  });

  test('disables button when loading', () => {
    render(<LoginForm onLoginSuccess={mockOnLoginSuccess} />);
    const button = screen.getByRole('button', { name: /login/i });
    render(<LoginForm onLoginSuccess={mockOnLoginSuccess} isLoading={true} />);
    expect(screen.getByRole('button', { name: /cargando/i })).toBeDisabled();
    fireEvent.click(button);
    expect(button).toBeDisabled(); // El botón debería estar deshabilitado durante la carga
  });

  test('displays error message when login fails', async () => {
    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
      error: { message: 'Invalid credentials' },
    });

    render(<LoginForm onLoginSuccess={mockOnLoginSuccess} />);

    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: 'wrongpassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/error al iniciar sesión. verifica tus credenciales./i)).toBeInTheDocument();
    });
  });

  test('calls onLoginSuccess on successful login', async () => {
    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
      error: null,
    });

    render(<LoginForm onLoginSuccess={mockOnLoginSuccess} />);

    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: 'mypassword' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockOnLoginSuccess).toHaveBeenCalled();
    });
  });

  test('has aria attributes for accessibility', () => {
    render(<LoginForm onLoginSuccess={mockOnLoginSuccess} />);
    
    expect(screen.getByLabelText(/correo electrónico/i)).toHaveAttribute('aria-required', 'true');
    expect(screen.getByLabelText(/contraseña/i)).toHaveAttribute('aria-required', 'true');
  });

  test('disables submit button if email or password is empty', () => {
    render(<LoginForm onLoginSuccess={mockOnLoginSuccess} />);
    
    const button = screen.getByRole('button', { name: /login/i });
    expect(button).toBeDisabled(); // Inicialmente deshabilitado

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: '' } });
    expect(button).toBeDisabled(); // Aún deshabilitado

    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '' } });
    expect(button).toBeEnabled(); // Ahora debería estar habilitado
  });

  test('submits the form when Enter is pressed', async () => {
    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
      error: null,
    });

    render(<LoginForm onLoginSuccess={mockOnLoginSuccess} />);

    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: 'password' },
    });

    fireEvent.keyDown(screen.getByLabelText(/contraseña/i), { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(mockOnLoginSuccess).toHaveBeenCalled();
    });
  });

  test('clears password field when email changes', () => {
    render(<LoginForm onLoginSuccess={mockOnLoginSuccess} />);

    const emailInput = screen.getByLabelText(/correo electrónico/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'mypassword' } });

    expect(passwordInput).toHaveValue('mypassword');

    fireEvent.change(emailInput, { target: { value: 'newemail@example.com' } });
    expect(passwordInput).toHaveValue(''); // Se espera que se limpie
  });

  test('renders with correct styles', () => {
    render(<LoginForm onLoginSuccess={mockOnLoginSuccess} />);
    
    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toHaveClass('btn btn-primary w-full'); // Verifica las clases aplicadas
  });
});
