import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import { CarrinhoProvider } from './components/carrinho/CarrinhoContext';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Login from './pages/login/Login';
import Cadastro from './pages/cadastro/Cadastro';
import Home from './pages/home/Home';
import About from './pages/About';
import Empresas from './pages/empresas/Empresas';
import Restaurantes from './components/restaurantes/Restaurantes';
import CarrinhoPage from './components/carrinho/Carrinho';
import ListaCategorias from './pages/categorias/ListaCategorias';
import CadastroCategorias from './components/categorias/cadastrocategorias/CadastroCategorias';
import DeletarCategorias from './components/categorias/deletarcategorias/DeletarCategorias';
import FormProdutos from './components/produtos/formprodutos/FormProdutos';
import DeletarProdutos from './components/produtos/deletarprodutos/DeletarProdutos';
import ListaProdutos from './pages/produtos/ListaProdutos';

function AppContent() {
  const location = useLocation();
  const hideNavAndFooter =
    location.pathname === '/' ||
    location.pathname === '/login' ||
    location.pathname === '/cadastro';

  return (
    <>
      {!hideNavAndFooter && <Navbar />}
      <div className="min-h-[80vh]">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/empresas" element={<Empresas />} />
          <Route path="/restaurantes" element={<Restaurantes />} />
          <Route path="/carrinho" element={<CarrinhoPage />} />
          <Route path="/produtos" element={<ListaProdutos />} />
          <Route path="/produtos/cadastrar" element={<FormProdutos />} />
          <Route path="/editarprodutos/:id" element={<FormProdutos />} />
          <Route path="/deletarprodutos/:id" element={<DeletarProdutos />} />
          <Route path="/categorias" element={<ListaCategorias />} />
          <Route path="/produtos/categoria/:id" element={<ListaProdutos />} />
          <Route path="/categorias/cadastrar" element={<CadastroCategorias />} />
          <Route path="/editarcategorias/:id" element={<CadastroCategorias />} />
          <Route path="/deletarcategorias/:id" element={<DeletarCategorias />} />
        </Routes>
      </div>
      {!hideNavAndFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CarrinhoProvider>
          <AppContent />
        </CarrinhoProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
