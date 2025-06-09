import Categorias from "../components/categorias/Categorias";
import ListaProdutos from "../components/formprodutos/FormProdutos";
import Restaurantes from "../components/restaurantes/Restaurantes";

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
