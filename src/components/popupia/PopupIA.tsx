import { useState, useRef, useEffect } from "react";
import useCarrinhoHook from "../carrinho/useCarrinho";

const PopupIA = () => {
  const [aberto, setAberto] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [conversa, setConversa] = useState<string[]>([]);
  const mensagensRef = useRef<HTMLDivElement>(null);
  const [baloon, setBaloon] = useState(false);

  const { totalUnidades } = useCarrinhoHook();

  useEffect(() => {
    if (aberto && conversa.length === 0) {
      setConversa([
        "IA: Dá uma canseira procurar comida com tanta fome, né? Eu posso te ajudar com isso, é só me dizer qual o seu desejo e eu te respondo com um produto! 😎",
      ]);
    }
  }, [aberto]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (totalUnidades === 0 && !aberto) {
      interval = setInterval(() => {
        setBaloon(true);
        setTimeout(() => setBaloon(false), 1000);
      }, 3000);
    } else {
      setBaloon(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [totalUnidades, aberto]);


  const handleEnviar = () => {
    if (!mensagem.trim()) return;

    const novaConversa = [...conversa, `Você: ${mensagem}`];
    setConversa(novaConversa);

    const msg = mensagem.toLowerCase();
    let resposta = "Desculpe, ainda estou aprendendo...";

    if (msg.includes("doce")) {
      resposta = "Recomendo nosso Brownie Vegano com cobertura de chocolate amargo! 🍫";
    } else if (msg.includes("lanche")) {
      resposta = "Que tal um X-Tudo artesanal com pernil desfiado? 🍔";
    } else if (msg.includes("salada")) {
      resposta = "Nossa Salada Caesar com frango grelhado é perfeita para você! 🥗";
    } else if (msg.includes("vegano") || msg.includes("vegetariano") || msg.includes("vegetariana") || msg.includes("vegana")) {
      resposta = "Experimente o Strogonoff de grão-de-bico com arroz integral e batata palha. 🌱";
    } else if (msg.includes("bebida") || msg.includes("suco")) {
      resposta = "Temos Suco Detox de abacaxi com hortelã, super refrescante! 🥤";
    } else if (msg.includes("oi") || msg.includes("olá")) {
      resposta = "Olá! Como posso ajudar você hoje?";
    } else if (msg.includes("salgado")) {
      resposta = "Bacana! Você vai adorar nossa coxinha de jaca! 🥟";
    } else if (msg.includes("obrigado") || msg.includes("obrigada")) {
      resposta = "De nada! Bom apetite! Se precisar de mais alguma coisa, é só chamar!";
    }

    setMensagem("");

    setTimeout(() => {
      setConversa((prev) => [...prev, `IA: ${resposta}`]);
    }, 1000);
  };

  useEffect(() => {
    if (mensagensRef.current) {
      mensagensRef.current.scrollTop = mensagensRef.current.scrollHeight;
    }
  }, [conversa]);

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={() => setAberto(!aberto)}
        className={`fixed bottom-6 right-6 bg-[#ff6961] text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-600 transition z-50`}
        style={{
          transform: baloon ? "scale(1.2)" : "scale(1)",
          transition: "transform 0.4s cubic-bezier(.68,-0.55,.27,1.55)",
        }}
      >
        {aberto ? "Fechar IA" : "Falar com a IA"}
      </button>

      {/* Chat no canto */}
      {aberto && (
        <div className="fixed bottom-20 right-6 w-80 bg-white rounded-lg shadow-lg z-40 flex flex-col overflow-hidden border border-gray-200">
          <div className="bg-[#ff6961] text-[#f5f5dc] px-4 py-2 font-bold">Assistente Virtual</div>
          <div
            ref={mensagensRef}
            className="p-4 h-60 overflow-y-auto text-sm text-[#2F3E46] space-y-2"
          >
            {conversa.map((linha, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg ${linha.startsWith("Você")
                  ? "bg-gray-100 text-right"
                  : "bg-green-100 text-left"
                  }`}
              >
                {linha}
              </div>
            ))}
          </div>
          <div className="flex border-t border-gray-300">
            <input
              type="text"
              className="flex-1 p-2 text-sm outline-none"
              placeholder="Digite sua mensagem..."
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleEnviar()}
            />
            <button
              onClick={handleEnviar}
              className="bg-[#ff6961] text-white px-4 hover:bg-green-600 transition text-sm"
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupIA;
