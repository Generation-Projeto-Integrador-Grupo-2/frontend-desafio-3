import Categorias from "../components/categorias/Categorias";
import Restaurantes from "../components/restaurantes/Restaurantes";
import ListaProdutos from "./produtos/ListaProdutos";

function Pedidos() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <Categorias />
        <ListaProdutos categoria={""} />
        <Restaurantes />
      </main>
    </div>
  );
}

export default Pedidos;
