import React, { createContext, useContext, useEffect, useState } from 'react';

export type Produto = {
  id: number;
  nome: string;
  preco: number;
  imagem?: string; 
  foto?: string;   
  quantidade: number;
};

type CarrinhoContextType = {
  carrinho: Produto[];
  adicionarAoCarrinho: (produto: Produto) => void;
  removerDoCarrinho: (id: number) => void;
  limparCarrinho: () => void;
  incrementarQuantidade: (id: number) => void;
  decrementarQuantidade: (id: number) => void;
};

const CarrinhoContext = createContext<CarrinhoContextType>({} as CarrinhoContextType);

export const CarrinhoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [carrinho, setCarrinho] = useState<Produto[]>([]);

  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
      setCarrinho(JSON.parse(carrinhoSalvo));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }, [carrinho]);

  const adicionarAoCarrinho = (produto: Produto) => {
    setCarrinho((prev) => {
      const existente = prev.find((p) => p.id === produto.id);
      if (existente) {
        return prev.map((p) =>
          p.id === produto.id ? { ...p, quantidade: p.quantidade + 1 } : p
        );
      }

      return [
        ...prev,
        {
          id: produto.id,
          nome: produto.nome,
          preco: produto.preco,
          imagem: produto.imagem || produto.foto || '',
          quantidade: 1,
        },
      ];
    });
  };

  const removerDoCarrinho = (id: number) => {
    setCarrinho((prev) => prev.filter((p) => p.id !== id));
  };

  const incrementarQuantidade = (id: number) => {
    setCarrinho((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantidade: p.quantidade + 1 } : p
      )
    );
  };

  const decrementarQuantidade = (id: number) => {
    setCarrinho((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, quantidade: p.quantidade - 1 } : p
        )
        .filter((p) => p.quantidade > 0)
    );
  };

  const limparCarrinho = () => {
    setCarrinho([]);
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
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinho = () => useContext(CarrinhoContext);
