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
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Courgette&display=swap"
        rel="stylesheet"
      />

      <nav className="w-full" style={{ backgroundColor: '#FF6961' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 text-white">
          
          <span
            className="text-3xl font-bold"
            style={{
              fontFamily: 'Courgette, cursive',
              color: '#F5F5DC',
              textDecoration: 'underline',
            }}
          >
            rebU Eats
          </span>

          <div className="flex-1 flex justify-center gap-6 text-lg">
            <Link to="/home" className="hover:text-green-300 transition-colors">
              Início
            </Link>
            <Link to="/restaurantes" className="hover:text-green-300 transition-colors">
              Restaurantes Parceiros
            </Link>
            <Link to="/empresas" className="hover:text-green-300 transition-colors">
              Empresas Parceiras
            </Link>
            <Link to="/carrinho" className="hover:text-green-300 transition-colors">
              Carrinho
            </Link>
            <Link to="/sobre" className="hover:text-green-300 transition-colors">
              Sobre Nós
            </Link>
          </div>

          <div className="ml-auto">
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
