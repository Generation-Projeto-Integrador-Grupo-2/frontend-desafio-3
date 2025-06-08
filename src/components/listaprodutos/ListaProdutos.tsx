import produtosPorCategoria from "../../data/produtosPorCategoria";
import useCarrinho from "../carrinho/useCarrinho";

interface Props {
  categoria: string;
}

export default function ListaProdutos({ categoria }: Props) {
  const { adicionar } = useCarrinho();
  const produtos = produtosPorCategoria[categoria] || [];

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-red-800 mb-4 text-center">
        {categoria}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition"
          >
            <img
              src={produto.imagem}
              alt={produto.nome}
              className="w-full h-44 object-cover rounded-lg mb-2"
            />
            <h3 className="text-lg font-semibold">{produto.nome}</h3>
            <p className="text-green-600 mb-2">{produto.preco}</p>
            <button
              onClick={() => adicionar(produto)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
