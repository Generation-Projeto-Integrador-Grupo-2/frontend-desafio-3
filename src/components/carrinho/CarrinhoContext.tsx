import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface Produto {
  id: number;
  nome: string;
  preco: string;
  imagem: string;
}

interface CarrinhoContextType {
  itens: Produto[];
  adicionar: (produto: Produto) => void;
  remover: (produtoId: number) => void;
  limpar: () => void;
}

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<Produto[]>([]);

  // Carregar carrinho do localStorage ao iniciar
  useEffect(() => {
    const salvo = localStorage.getItem("carrinho");
    if (salvo) setItens(JSON.parse(salvo));
  }, []);

  // Atualizar localStorage sempre que o carrinho mudar
  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(itens));
  }, [itens]);

  const adicionar = (produto: Produto) => {
    setItens((prev) => [...prev, produto]);
  };

  const remover = (produtoId: number) => {
    setItens((prev) => prev.filter((item) => item.id !== produtoId));
  };

  const limpar = () => {
    setItens([]);
  };

  return (
    <CarrinhoContext.Provider value={{ itens, adicionar, remover, limpar }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinhoContext() {
  const context = useContext(CarrinhoContext);
  if (!context) {
    throw new Error("useCarrinhoContext deve ser usado dentro do CarrinhoProvider");
  }
  return context;
}
