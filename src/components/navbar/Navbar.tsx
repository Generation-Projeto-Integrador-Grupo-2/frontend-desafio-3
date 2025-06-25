import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { ShoppingCartSimpleIcon } from '@phosphor-icons/react';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { handleLogout } = useContext(AuthContext);

  const onLogoutClick = () => {
    handleLogout();
    navigate('/login');
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Courgette&display=swap"
        rel="stylesheet"
      />

      <nav
        className="w-full border-b border-[#f5f5dc]/30"
        style={{ backgroundColor: '#ff6961' }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 text-[#F5F5DC]">

          <span
            className="text-3xl font-bold"
            style={{
              fontFamily: 'Courgette, cursive',
              color: '#F5F5DC',
              textDecoration: 'underline',
            }}
          >
            <Link to="/home" className="hover:text-green-300 transition-colors">
              rebU Eats
            </Link>
          </span>

          <div className="flex-1 flex justify-center gap-6 text-lg">
            <Link to="/home" className="hover:text-green-300 transition-colors">
              Início
            </Link>
            <Link to="/produtos" className="hover:text-green-300 transition-colors">
              Produtos
            </Link>
            <Link to="/restaurantes" className="hover:text-green-300 transition-colors">
              Restaurantes Parceiros
            </Link>
            <Link to="/empresa" className="hover:text-green-300 transition-colors">
              Empresas Parceiras
            </Link>
            <Link to="/sobre" className="hover:text-green-300 transition-colors">
              Sobre
            </Link>
          </div>

          <div className="ml-auto flex items-center gap-4">
            <Link
              to="/carrinho"
              className="hover:text-green-300 transition-colors"
              title="Carrinho"
            >
              <ShoppingCartSimpleIcon size={24} />
            </Link>

            <button
              onClick={onLogoutClick}
              className="hover:text-green-300 transition-colors text-lg"
            >
              Sair
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
