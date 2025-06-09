import { useCarrinho } from "./CarrinhoContext";

const CarrinhoPage: React.FC = () => {
  const { carrinho, removerDoCarrinho, limparCarrinho } = useCarrinho();

  const total = carrinho.reduce((soma, item) => soma + item.preco, 0);

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
                  <img src={item.imagem} alt={item.nome} className="w-16 h-16 object-cover" />
                  <span>{item.nome}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span>R$ {item.preco.toFixed(2)}</span>
                  <button onClick={() => removerDoCarrinho(item.id)} className="text-red-500">
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Total: R$ {total.toFixed(2)}</h2>
            <button
              onClick={limparCarrinho}
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
