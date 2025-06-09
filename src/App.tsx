import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import ListaCategorias from './pages/categorias/ListaCategorias'
import CadastroCategorias from './components/categorias/cadastrocategorias/CadastroCategorias'
import Login from './pages/login/Login'
import Cadastro from './pages/cadastro/Cadastro'
import Home from './pages/home/Home'
import Restaurantes from './components/restaurantes/Restaurantes'
import { AuthProvider } from './contexts/AuthContext'
import { ToastContainer } from 'react-toastify'
import ListaProdutos from './pages/produtos/ListaProdutos'
import DeletarProdutos from './components/produtos/deletarprodutos/DeletarProdutos'
import FormProdutos from './components/produtos/formprodutos/FormProdutos'
import DeletarCategorias from './components/categorias/deletarcategorias/DeletarCategorias'
import About from './pages/About'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'

function AppContent() {
  const location = useLocation()
  const hideNavAndFooter = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/cadastro'

  return (
    <>
      {!hideNavAndFooter && <Navbar />}
      <div className="min-h-[80vh]">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/restaurantes" element={<Restaurantes />} />
          <Route path="/produtos" element={<ListaProdutos />} />
          <Route path="/produtos/cadastrar" element={<FormProdutos />} />
          <Route path="/editarprodutos/:id" element={<FormProdutos />} />
          <Route path="/deletarprodutos/:id" element={<DeletarProdutos />} />
          <Route path="/categorias" element={<ListaCategorias />} />
          <Route path="/categorias/cadastrar" element={<CadastroCategorias />} />
          <Route path="/deletarcategorias/:id" element={<DeletarCategorias />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      {!hideNavAndFooter && <Footer />}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
