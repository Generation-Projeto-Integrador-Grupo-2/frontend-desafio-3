import { useContext, useEffect, useState } from "react";
import type Produto from "../../models/Produto";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { buscar } from "../../service/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { LeafIcon } from "@phosphor-icons/react";

export default function ListaProdutos() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const { usuario, handleLogout } = useContext(AuthContext)!;
  const token = usuario.token;

  const [mostrarSaudaveis, setMostrarSaudaveis] = useState(false);

  function adicionarAoCarrinho(produto: Produto) {
    const carrinhoString = localStorage.getItem('carrinho');
    let carrinho: any[] = carrinhoString ? JSON.parse(carrinhoString) : [];

    const itemExistente = carrinho.find((item) => item.id === produto.id);

    if (itemExistente) {
      itemExistente.quantidade += 1;
    } else {
      carrinho.push({ ...produto, quantidade: 1 });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    ToastAlerta(`"${produto.nome}" adicionado ao carrinho!`, 'sucesso');
  }

  async function buscarProdutos() {
    try {
      await buscar('/produtos', setProdutos, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes('403')) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado', 'erro');
      navigate('/');
    }
  }, [token]);

  useEffect(() => {
    buscarProdutos();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-6 items-start">

        <div className="w-full lg:w-auto">
          <button
            onClick={() => setMostrarSaudaveis(!mostrarSaudaveis)}
            className={`px-3 py-2 text-sm rounded 
      ${mostrarSaudaveis ? 'bg-gray-400' : 'bg-green-500'} 
      text-white hover:opacity-90 min-w-[140px] flex items-center gap-2`}
          >
            <LeafIcon weight="bold" size={18} />
            {mostrarSaudaveis ? 'Mostrar Todos' : 'Saudáveis'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1 auto-rows-fr">
          {produtos
            .filter((produto) => !mostrarSaudaveis || produto.categoria?.saudavel)
            .map((produto) => (
              <div
                key={produto.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden relative flex flex-col h-full"
              >
                <div className="p-4 flex-1 flex flex-col">
                  <p className="mt-2 text-gray-700">{produto.categoria?.nome}</p>
                  <div className="flex justify-center mt-4">
                    <img
                      src={produto.foto}
                      alt={produto.nome}
                      className="w-50 h-50 rounded-full border-2 border-gray-200"
                    />
                  </div>

                  <div className="flex flex-col flex-1 justify-between">
                    <div>
                      <h4 className="text-xl font-bold">{produto.nome}</h4>
                      <p className="mt-2 text-gray-700">{produto.descricao}</p>
                    </div>
                    <p className="mt-2 text-green-600 font-semibold">
                      R$ {produto.preco || "0.00"}
                    </p>
                  </div>
                </div>

                <div className="flex justify-center p-4">
                  <button
                    onClick={() => adicionarAoCarrinho(produto)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
