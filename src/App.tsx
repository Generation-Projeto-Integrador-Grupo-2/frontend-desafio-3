import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ListaCategorias from './pages/categorias/ListaCategorias'
import CadastroCategorias from './components/categorias/cadastrocategorias/CadastroCategorias'
import Login from './pages/login/Login'
import Cadastro from './pages/cadastro/Cadastro'
import { AuthProvider } from './contexts/AuthContext'
import { ToastContainer } from 'react-toastify'


function App() {
  return (
    <>
      <BrowserRouter>
      <AuthProvider> 
              <div className="min-h-[80vh]">
        <ToastContainer/>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/login" element={<Login />} />
            <Route path='/categorias' element={<ListaCategorias />} />
            <Route path='/categorias/cadastrar' element={<CadastroCategorias />} />
          </Routes>
        </div>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
