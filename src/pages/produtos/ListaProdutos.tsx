import { useContext, useEffect, useState } from "react";
import type Produto from "../../models/Produto";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { buscar } from "../../service/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { useCarrinho } from "../../components/carrinho/CarrinhoContext";

export default function ListaProdutos() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const { adicionarAoCarrinho } = useCarrinho();

  function adicionarProduto(produto: Produto) {
    adicionarAoCarrinho({
      ...produto, quantidade: 1,
      imagem: ""
    });
    ToastAlerta(`"${produto.nome}" adicionado ao carrinho!`, "sucesso");
  }

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

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtos.map((produto) => (
            <div
              key={produto.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden relative"
            >
              <div className="flex justify-center mt-4">
                <img
                  src={produto.foto || "https://via.placeholder.com/100"}
                  alt={produto.nome}
                  className="w-30 h-30 rounded-full border-2 border-gray-200"
                />
              </div>

              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-xl font-bold">{produto.nome}</h4>
                </div>

                <p className="mt-2 text-gray-700">{produto.descricao}</p>

                <p className="mt-2 text-green-600 font-semibold">
                  R$ {produto.preco || "0.00"}
                </p>
              </div>

              <div className="flex justify-center p-4 bg-gray-100">
                <button
                  onClick={() => adicionarProduto(produto)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
