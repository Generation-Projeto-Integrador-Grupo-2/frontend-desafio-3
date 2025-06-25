import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { toast } from "react-toastify";

export type Produto = {
  id: number;
  nome: string;
  preco: number;
  imagem?: string;
  quantidade: number;
};

type CarrinhoContextType = {
  carrinho: Produto[];
  adicionarAoCarrinho: (produto: Produto, quantidade?: number) => void;
  removerDoCarrinho: (id: number) => void;
  limparCarrinho: () => void;
  incrementarQuantidade: (id: number) => void;
  decrementarQuantidade: (id: number) => void;
  aplicarCupom: (codigo: string) => void;
  frete: number;
  setFrete: (valor: number) => void;
  desconto: number;
  totalComDesconto: () => number;
  finalizarPedido: () => void; 
};

const CarrinhoContext = createContext<CarrinhoContextType>({} as CarrinhoContextType);

const STORAGE_KEY = "carrinho";
const STORAGE_CUPOM = "cupom";

export const CarrinhoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [carrinho, setCarrinho] = useState<Produto[]>([]);
  const [desconto, setDesconto] = useState<number>(0);
  const [frete, setFrete] = useState<number>(0);

  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem(STORAGE_KEY);
    if (carrinhoSalvo) {
      setCarrinho(JSON.parse(carrinhoSalvo));
    }
    const cupomSalvo = localStorage.getItem(STORAGE_CUPOM);
    if (cupomSalvo) {
      try {
        const parsed = JSON.parse(cupomSalvo);
        setDesconto(parsed.desconto || 0);
        setFrete(parsed.frete || 0);
      } catch {
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(carrinho));
  }, [carrinho]);

  useEffect(() => {
    localStorage.setItem(STORAGE_CUPOM, JSON.stringify({ desconto, frete }));
  }, [desconto, frete]);

  const adicionarAoCarrinho = useCallback((produto: Produto, quantidade = 1) => {
    setCarrinho((prev) => {
      const existente = prev.find((p) => p.id === produto.id);
      if (existente) {
        return prev.map((p) =>
          p.id === produto.id
            ? { ...p, quantidade: p.quantidade + quantidade }
            : p
        );
      }
      return [...prev, { ...produto, quantidade }];
    });
    toast.success(`${produto.nome} adicionado ao carrinho!`);
  }, []);

  const removerDoCarrinho = useCallback((id: number) => {
    setCarrinho((prev) => prev.filter((p) => p.id !== id));
    toast.info("Item removido do carrinho");
  }, []);

  const incrementarQuantidade = useCallback((id: number) => {
    setCarrinho((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantidade: p.quantidade + 1 } : p
      )
    );
  }, []);

  const decrementarQuantidade = useCallback((id: number) => {
    setCarrinho((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, quantidade: p.quantidade - 1 } : p
        )
        .filter((p) => p.quantidade > 0)
    );
  }, []);

  const limparCarrinho = useCallback(() => {
    setCarrinho([]);
    setDesconto(0);
    setFrete(0);
    toast.success("Carrinho limpo com sucesso!");
  }, []);

  const aplicarCupom = useCallback((codigo: string) => {
    const codigoMaiusculo = codigo.toUpperCase();

    if (codigoMaiusculo === "DESCONTO10") {
      setDesconto(0.1);
      toast.success("Cupom de 10% aplicado!");
    } else if (codigoMaiusculo === "FRETEGRATIS") {
      setFrete(0);
      toast.success("Frete grátis aplicado!");
    } else {
      toast.error("Cupom inválido");
    }
  }, []);

  const totalComDesconto = () => {
    const subtotal = carrinho.reduce(
      (acc, item) => acc + item.preco * item.quantidade,
      0
    );
    const valorComDesconto = subtotal * (1 - desconto);
    return valorComDesconto + frete;
  };

  const finalizarPedido = () => {
    const confirmacao = window.confirm("Deseja finalizar o pedido?");
    if (confirmacao) {
      limparCarrinho();
      toast.success("Compra finalizada com sucesso!");
    } else {
      toast.info("Compra cancelada.");
    }
  };

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        adicionarAoCarrinho,
        removerDoCarrinho,
        limparCarrinho,
        incrementarQuantidade,
        decrementarQuantidade,
        aplicarCupom,
        frete,
        setFrete,
        desconto,
        totalComDesconto,
        finalizarPedido,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinho = () => useContext(CarrinhoContext);
