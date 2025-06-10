import { useCarrinho } from "./CarrinhoContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CarrinhoPage: React.FC = () => {
  const {
    carrinho,
    removerDoCarrinho,
    limparCarrinho,
    incrementarQuantidade,
    decrementarQuantidade,
  } = useCarrinho();

  const total = carrinho.reduce((soma, item) => soma + item.preco * item.quantidade, 0);

  const handleDecrementar = (id: number, quantidade: number) => {
    if (quantidade === 1) {
      toast.info("Item removido do carrinho");
    }
    decrementarQuantidade(id);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Carrinho</h1>

      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {carrinho.map((item) => (
              <li key={item.id} className="flex justify-between items-center border-b pb-2">
                <div className="flex items-center gap-4">
                  <img
                    src={item.imagem}
                    alt={item.nome}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <span className="font-medium">{item.nome}</span>
                    <div className="text-sm text-gray-500">
                      R$ {item.preco.toFixed(2)} x {item.quantidade} = {" "}
                      <strong className="text-black">
                        R$ {(item.preco * item.quantidade).toFixed(2)}
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDecrementar(item.id, item.quantidade)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    –
                  </button>
                  <span>{item.quantidade}</span>
                  <button
                    onClick={() => incrementarQuantidade(item.id)}
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removerDoCarrinho(item.id)}
                    className="text-red-500 ml-2"
                  >
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Total: R$ {total.toFixed(2)}</h2>
            <button
              onClick={() => {
                limparCarrinho();
                toast.success("Pedido finalizado com sucesso!");
              }}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Finalizar Pedido
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CarrinhoPage;
