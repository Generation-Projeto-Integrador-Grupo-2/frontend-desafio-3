import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Produto from "../../models/Produto";
import { AuthContext } from "../../contexts/AuthContext";
import { buscar } from "../../service/Service";
import { useCarrinho } from "../../components/carrinho/CarrinhoContext";
import Sidebar from "../../components/sidebar/Sidebar";
import { toast } from "react-toastify";

export default function ListaProdutos() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const { usuario, handleLogout } = useContext(AuthContext)!;
  const token = usuario.token;

  const { adicionarAoCarrinho } = useCarrinho();

  const [filtros, setFiltros] = useState<{
    categoriaId?: number;
    precoMax?: number;
    saudavel?: boolean;
  }>({
    categoriaId: id ? Number(id) : undefined,
    precoMax: 100,
    saudavel: false,
  });

  async function buscarProdutos() {
    try {
      await buscar("/produtos", setProdutos, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      toast.error("Você precisa estar logado para acessar esta página.");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarProdutos();
  }, []);

  const categoriasUnicas = Array.from(
    new Map(
      produtos
        .filter((p) => p.categoria)
        .map((p) => [p.categoria!.id, p.categoria!])
    ).values()
  );

  const produtosFiltrados = produtos.filter((produto) => {
    const correspondeCategoria = filtros.categoriaId
      ? produto.categoria?.id === filtros.categoriaId
      : true;

    const precoNum = Number(produto.preco);
    const correspondePreco =
      filtros.precoMax !== undefined ? precoNum <= filtros.precoMax : true;

    const correspondeSaudavel = filtros.saudavel
      ? produto.categoria?.saudavel
      : true;

    return correspondeCategoria && correspondePreco && correspondeSaudavel;
  });

  function handleFiltrar(novosFiltros: {
    categoriaId?: number;
    precoMax?: number;
    saudavel?: boolean;
  }) {
    setFiltros(novosFiltros);
  }

  const pastelColors = ["#C9E4C5", "#FCE5C1", "#FFB2AB", "#D6E9C6","#AED9E0", "#D0E6A5"];

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: "#f5f5dc" }}>
      <div className="px-4 py-6 lg:px-12 flex gap-6">
        <Sidebar categorias={categoriasUnicas} onFiltrar={handleFiltrar} />

        <div className="flex-1">
          {produtosFiltrados.length === 0 ? (
            <p className="text-center text-gray-600">Nenhum produto encontrado.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
              {produtosFiltrados.map((produto, index) => {
                const corCard = pastelColors[index % pastelColors.length];

                return (
                  <div
                    key={produto.id}
                    className="rounded-lg shadow-lg overflow-hidden flex flex-col h-full"
                    style={{ backgroundColor: corCard }}
                  >
                    <div className="flex justify-center items-center h-48 bg-white">
                      <img
                        src={produto.foto}
                        alt={produto.nome}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    <div className="p-4 flex flex-col flex-1 justify-between text-[#2F3E46]">
                      <div>
                        
                        <h4 className="text-xl font-bold">{produto.nome}</h4>
                        <p className="mt-2 text-gray-700">{produto.descricao}</p>
                      </div>
                        <p className="font-bold mb-2 text-[#2F3E46] text-2xl">
                        R$ {Number(produto.preco).toFixed(2)}
                        </p>
                    </div>

                    <div className="flex justify-center p-4">
                      <button
                        onClick={() => {
                          adicionarAoCarrinho({ ...produto, quantidade: 1 });
                        }}
                        className="bg-green-600 hover:bg-[#ff6961] text-white px-4 py-2 rounded-full transition duration-300 cursor-pointer"
                      >
                        Adicionar ao Carrinho
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
