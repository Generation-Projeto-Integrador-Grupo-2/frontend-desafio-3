import { useState } from "react";
import produtosPorCategoria from "../../data/produtosPorCategoria";
import ListaProdutos from "../../pages/produtos/ListaProdutos"; // Corrigir este import

const todasCategorias = Object.keys(produtosPorCategoria);

export default function Categorias() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);

  return (
    <section className="px-4 py-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-red-700"></h1>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          onClick={() => setCategoriaSelecionada(null)}
          className={`px-4 py-2 rounded-full border ${categoriaSelecionada === null
            ? "bg-red-700 text-white"
            : "bg-white text-red-700 border-red-700"
            } hover:bg-red-800 hover:text-white transition`}
        >
          Todas
        </button>

        {todasCategorias.map((categoria) => (
          <button
            key={categoria}
            onClick={() => setCategoriaSelecionada(categoria)}
            className={`px-4 py-2 rounded-full border ${categoriaSelecionada === categoria
              ? "bg-red-700 text-white"
              : "bg-white text-red-700 border-red-700"
              } hover:bg-red-800 hover:text-white transition`}
          >
            {categoria}
          </button>
        ))}
      </div>

      {categoriaSelecionada ? (
        <ListaProdutos categoria={categoriaSelecionada} />
      ) : (
        todasCategorias.map((categoria) => (
          <ListaProdutos key={categoria} categoria={categoria} />
        ))
      )}
    </section>
  );
}