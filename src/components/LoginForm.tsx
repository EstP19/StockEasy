import React, { useState } from 'react';
import { User } from 'lucide-react';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">StockEasy</h2>
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
        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>
      </form>
      <div className="mt-4 text-center">
        <User className="inline-block text-accent mr-2" />
        <span className="text-gray-400">StockEasy todos los derechos reservados</span>
      </div>
    </div>
  );
};

export default LoginForm;