import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthContext);

  const onLogoutClick = () => {
    handleLogout();
    navigate('/login');
  };

  return (
    <nav className="w-full bg-red-800 text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo alinhado à esquerda */}
        <span className="text-2xl font-bold text-white">rebU Eats</span>

        {/* Menu centralizado */}
        <div className="flex-1 flex justify-center gap-6 text-lg">
          <Link to="/home" className="hover:text-pink-400 transition-colors">
            Início
          </Link>
          <Link to="/restaurantes" className="hover:text-pink-400 transition-colors">
            Restaurantes Parceiros
          </Link>
          <Link to="/carrinho" className="hover:text-pink-400 transition-colors">
            Carrinho
          </Link>
          <Link to="/sobre" className="hover:text-pink-400 transition-colors">
            Sobre Nós
          </Link>
        </div>

        <div className="ml-auto">
          <button
            onClick={onLogoutClick}
            className="hover:text-pink-400 transition-colors text-lg"
          >
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
