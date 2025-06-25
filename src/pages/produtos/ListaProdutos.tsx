import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Produto from "../../models/Produto";
import { AuthContext } from "../../contexts/AuthContext";
import { buscar } from "../../service/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { useCarrinho } from "../../components/carrinho/CarrinhoContext";// ajuste o caminho se necessário
import Sidebar from "../../components/sidebar/Sidebar";

export default function ListaProdutos() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const { usuario, handleLogout } = useContext(AuthContext)!;
  const token = usuario.token;

  const { adicionarAoCarrinho } = useCarrinho();

  // Estados para os filtros
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
      ToastAlerta("Você precisa estar logado", "erro");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarProdutos();
  }, []);

  // Extrair categorias únicas dos produtos para passar na Sidebar
  const categoriasUnicas = Array.from(
    new Map(
      produtos
        .filter((p) => p.categoria)
        .map((p) => [p.categoria!.id, p.categoria!])
    ).values()
  );

  // Aplica os filtros na lista de produtos
  const produtosFiltrados = produtos.filter((produto) => {
    // filtro categoria pelo id da url ou filtro da sidebar
    const correspondeCategoria = filtros.categoriaId
      ? produto.categoria?.id === filtros.categoriaId
      : true;

    // filtro preço máximo
    const precoNum = Number(produto.preco);
    const correspondePreco =
      filtros.precoMax !== undefined ? precoNum <= filtros.precoMax : true;

    // filtro saudável
    const correspondeSaudavel = filtros.saudavel
      ? produto.categoria?.saudavel
      : true;

    return correspondeCategoria && correspondePreco && correspondeSaudavel;
  });

  // Atualiza os filtros a partir da sidebar
  function handleFiltrar(novosFiltros: {
    categoriaId?: number;
    precoMax?: number;
    saudavel?: boolean;
  }) {
    setFiltros(novosFiltros);
  }

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: "#f5f5dc" }}>
      <div className="px-4 py-6 lg:px-12 flex gap-6">
        {/* Sidebar */}
        <Sidebar categorias={categoriasUnicas} onFiltrar={handleFiltrar} />

        {/* Conteúdo dos produtos */}
        <div className="flex-1">
          {produtosFiltrados.length === 0 ? (
            <p className="text-center text-gray-600">Nenhum produto encontrado.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
              {produtosFiltrados.map((produto) => (
                <div
                  key={produto.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full"
                >
                  <div className="flex justify-center items-center h-48 bg-gray-100">
                    <img
                      src={produto.foto}
                      alt={produto.nome}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div>
                      <h4 className="text-xl font-bold">{produto.nome}</h4>
                      <p className="mt-2 text-gray-700">{produto.descricao}</p>
                    </div>
                    <p className="mt-2 text-green-600 font-semibold">
                      R$ {Number(produto.preco).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex justify-center p-4">
                    <button
                      onClick={() => {
                        adicionarAoCarrinho({ ...produto, quantidade: 1 });
                        ToastAlerta(
                          `"${produto.nome}" adicionado ao carrinho!`,
                          "sucesso"
                        );
                      }}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
                    >
                      Adicionar ao Carrinho
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}