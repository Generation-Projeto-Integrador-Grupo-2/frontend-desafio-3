import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ListaCategorias from './components/categorias/listacategorias/ListaCategorias'
import CadastroCategorias from './components/categorias/cadastrocategorias/CadastroCategorias'

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="min-h-[80vh]">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/login" element={<Login />} />
            <Route path='/categorias' element={<ListaCategorias />} />
            <Route path='/categorias/cadastrar' element={<CadastroCategorias />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
