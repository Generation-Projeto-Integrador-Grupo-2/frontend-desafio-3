import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-red-800 text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <span className="text-2xl font-bold  text-white">rebU Eats</span>

        <div className="flex gap-6 text-lg">
          <Link to="/" className="hover:text-pink-400 transition-colors">
            Início
          </Link>
          <Link to="/categorias" className="hover:text-pink-400 transition-colors">
            Categorias
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
          <Link to="/sair" className="hover:text-pink-400 transition-colors">
            Sair
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
