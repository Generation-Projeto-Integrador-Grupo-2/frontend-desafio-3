import ListaCategorias from './pages/categorias/ListaCategorias'
import CadastroCategorias from './components/categorias/cadastrocategorias/CadastroCategorias'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import Cadastro from './pages/cadastro/Cadastro'
import { AuthProvider } from './contexts/AuthContext'
import { ToastContainer } from 'react-toastify'
import ListaProdutos from './pages/produtos/ListaProdutos'
import DeletarProdutos from './components/produtos/deletarprodutos/DeletarProdutos'
import FormProdutos from './components/produtos/formprodutos/FormProdutos'
import DeletarCategorias from './components/categorias/deletarcategorias/DeletarCategorias'
import About from './pages/About'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'


function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <div className="min-h-[80vh]">
            <ToastContainer />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path='/produtos' element={<ListaProdutos />} />
              <Route path='/produtos/cadastrar' element={<FormProdutos />} />
              <Route path='/editarprodutos/:id' element={<FormProdutos />} />
              <Route path='/deletarprodutos/:id' element={<DeletarProdutos />} />
              <Route path='/categorias' element={<ListaCategorias />} />
              <Route path='/categorias/cadastrar' element={<CadastroCategorias />} />
              <Route path='/editarcategorias/:id' element={<CadastroCategorias />} />
              <Route path='/deletarcategorias/:id' element={<DeletarCategorias />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App