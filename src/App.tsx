import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Categorias from "./components/categorias/Categorias";
import Restaurantes from "./components/restaurantes/Restaurantes";
import Footer from "./components/footer/Footer";
import Carrinho from "./components/carrinho/Carrinho";
import Home from "./pages/home/Home";
import { CarrinhoProvider } from "./components/carrinho/CarrinhoContext";
import Pedidos from "./pages/Pedidos";

function App() {
  return (
    <Router>
      <CarrinhoProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pedidos" element={<Pedidos />} />
              <Route path="/categorias" element={<Categorias />} />
              <Route path="/restaurantes" element={<Restaurantes />} />
              <Route path="/carrinho" element={<Carrinho />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CarrinhoProvider>
    </Router>
  );
}

export default App;
