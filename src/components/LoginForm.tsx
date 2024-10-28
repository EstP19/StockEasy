
import React, { useState } from 'react';
import { LaughIcon } from 'lucide-react';
import { supabase } from '../supabaseConfig.ts'; // Importa el cliente de Supabase

interface LoginFormProps {
  onLoginSuccess: () => void; // Cambiamos el prop para indicar éxito en login
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null); // Para mostrar errores
  const [loading, setLoading] = useState(false); // Indicador de carga

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Resetear error antes de intentar login

    // Lógica de autenticación con Supabase
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Error al iniciar sesión. Verifica tus credenciales.');
      setLoading(false);
      return;
    }

    setLoading(false);
    onLoginSuccess(); // Notificamos al componente padre que el login fue exitoso
  };

  return (
    <div>
    <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
      <h2 className="text-5xl font-bold mb-6 text-center text-white">Stock<span className='text-[#00a1e7]'>Easy</span></h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            className="input w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
            Contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="input w-full pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading ? 'Cargando...' : 'Login'}
        </button>
      </form>
      <div className="mt-4 text-center">
        <LaughIcon className="inline-block text-accent mr-2" />
        <span className="text-gray-300 text-sm">¡Nos satisface tenerte con nosotros!</span>
      </div>
     
    </div>
    <div>
    <footer>
      <div className="text-center  mt-4 text-gray-400 text-sm">
        
        <p>&copy;  StockEasy 2024</p>
        <p>Todos los derechos reservados</p>
      </div>
    </footer>
    </div>
    </div>
  );
};

export default LoginForm; 