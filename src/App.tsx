import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sobre from "./pages/Sobre";
import PaginaCarrinho from "./pages/PaginaCarrinho";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/carrinho" element={<PaginaCarrinho />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;