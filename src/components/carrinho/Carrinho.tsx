import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useCarrinhoHook from "./useCarrinho";

const formatarPreco = (valor: number) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const IconPlus = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" viewBox="0 0 24 24">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const IconMinus = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" viewBox="0 0 24 24">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const IconTrash = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" viewBox="0 0 24 24">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-2 14H7L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
);

const ModalConfirm: React.FC<{
  mensagem: string;
  onConfirmar: () => void;
  onCancelar: () => void;
}> = ({ mensagem, onConfirmar, onCancelar }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#f5f1e9cc] z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-sm p-6 text-center">
        <p className="mb-6 text-lg font-semibold">{mensagem}</p>
        <div className="flex justify-center gap-6">
          <button onClick={onConfirmar} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">Sim</button>
          <button onClick={onCancelar} className="bg-[#ff6961] text-white px-6 py-2 rounded hover:bg-red-700 transition">Não</button>
        </div>
      </div>
    </div>
  );
};

const Carrinho: React.FC = () => {
  const {
    itens,
    remover,
    limpar,
    incrementar,
    decrementar,
    aplicarCupom,
    frete,
    desconto,
    totalComDesconto,
  } = useCarrinhoHook();

  const [codigoCupom, setCodigoCupom] = useState("");
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs";
    script.type = "module";
    document.body.appendChild(script);
  }, []);

  const handleFinalizarPedido = () => {
    if (itens.length === 0) {
      toast.warning("Seu carrinho está vazio!");
      return;
    }
    setModalAberto(true);
  };

  const confirmarFinalizar = () => {
    limpar();
    toast.success("Pedido finalizado com sucesso!");
    setModalAberto(false);
  };

  const cancelarFinalizar = () => {
    toast.info("Compra cancelada.");
    setModalAberto(false);
  };

  const handleAplicarCupom = () => {
    if (!codigoCupom.trim()) {
      toast.error("Informe um código de cupom válido");
      return;
    }
    aplicarCupom(codigoCupom.trim());
    setCodigoCupom("");
  };

  return (
  <div className="min-h-screen relative flex items-center justify-center p-6 bg-[#f5f5dc]">
    {itens.length === 0 ? (
      <div className="text-center px-6 flex flex-col items-center gap-2">
        <h1
          className="text-5xl font-extrabold text-[#2F3E46]"
          style={{ fontFamily: "Courgette, cursive" }}
        >
          Seu Carrinho
        </h1>
        <p className="text-xl text-gray-700 max-w-lg mx-auto -mt-2">
          Seu carrinho está vazio. Que tal adicionar alguns itens deliciosos?
        </p>
        <div
          dangerouslySetInnerHTML={{
            __html: `
              <dotlottie-player
                src="https://lottie.host/87c970f8-0688-4a53-94cf-1833980f564c/iuZh8XDg1O.lottie"
                background="transparent"
                speed="1"
                style="width: 300px; height: 300px; margin: 0 auto;"
                loop
                autoplay
              ></dotlottie-player>
            `,
          }}
        />
      </div>
    ) : (
      <div className="relative max-w-5xl w-full bg-[#fafafa] rounded-lg shadow-lg p-8 overflow-auto max-h-[90vh]">
        <h1
          className="text-4xl font-bold mb-8 text-[#2F3E46]"
          style={{ fontFamily: "Courgette, cursive" }}
        >
          Seu Carrinho
        </h1>

          <ul className="space-y-4 mb-8 max-h-96 overflow-y-auto">
            {itens.map((item) => (
              <li key={item.id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-4">
                  <img src={item.imagem} alt={item.nome} className="w-20 h-20 object-cover rounded" />
                  <div>
                    <h3 className="font-semibold text-xl">{item.nome}</h3>
                    <p className="text-gray-600">
                      {formatarPreco(item.preco)} x {item.quantidade} ={" "}
                      <strong>{formatarPreco(item.preco * item.quantidade)}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-[#ff6961] text-white rounded-full px-3 py-1 shadow">
                    <button onClick={() => decrementar(item.id)} className="p-1 hover:bg-[#f5f5dc] rounded-full transition cursor-pointer">
                      <IconMinus />
                    </button>
                    <span className="mx-3 text-lg font-semibold">{item.quantidade}</span>
                    <button onClick={() => incrementar(item.id)} className="p-1 hover:bg-[#f5f5dc] rounded-full transition cursor-pointer">
                      <IconPlus />
                    </button>
                  </div>
                  <button onClick={() => remover(item.id)} className="text-[#ff6961] hover:text-red-800 font-semibold ml-2 cursor-pointer">
                    <IconTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <input
              type="text"
              placeholder="Código do cupom"
              value={codigoCupom}
              onChange={(e) => setCodigoCupom(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <button onClick={handleAplicarCupom} className="bg-[#ff6961] text-white px-4 py-2 rounded-full hover:bg-green-600 cursor-pointer">
              Aplicar Cupom
            </button>
          </div>

          <div className="text-right space-y-2 mb-8 text-[#2F3E46]">
            <p>
              Subtotal:{" "}
              <strong>
                {formatarPreco(itens.reduce((acc, i) => acc + i.preco * i.quantidade, 0))}
              </strong>
            </p>
            <p>Desconto: <strong>{(desconto * 100).toFixed(0)}%</strong></p>
            <p>Frete: <strong>{frete === 0 ? "Grátis" : formatarPreco(frete)}</strong></p>
            <p className="text-2xl font-bold text-green-600">
              Total: <span>{formatarPreco(totalComDesconto)}</span>
            </p>
          </div>

          <button
            onClick={handleFinalizarPedido}
            className="w-full bg-[#eb4d45] hover:bg-red-800 text-white py-3 rounded text-lg font-semibold transition"
          >
            Finalizar Pedido
          </button>
        </div>
      )}

      {modalAberto && (
        <ModalConfirm
          mensagem="Deseja mesmo finalizar a compra?"
          onConfirmar={confirmarFinalizar}
          onCancelar={cancelarFinalizar}
        />
      )}
    </div>
  );
};

export default Carrinho;
