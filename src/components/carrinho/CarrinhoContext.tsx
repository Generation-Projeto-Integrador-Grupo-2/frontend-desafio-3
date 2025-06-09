import React, { createContext, useContext, useEffect, useState } from 'react';

type Produto = {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
};

type CarrinhoContextType = {
  carrinho: Produto[];
  adicionarAoCarrinho: (produto: Produto) => void;
  removerDoCarrinho: (id: number) => void;
  limparCarrinho: () => void;
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
    setCarrinho((prev) => [...prev, produto]);
  };

  const removerDoCarrinho = (id: number) => {
    setCarrinho((prev) => prev.filter((p) => p.id !== id));
  };

  const limparCarrinho = () => {
    setCarrinho([]);
  };

  return (
    <CarrinhoContext.Provider
      value={{ carrinho, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinho = () => useContext(CarrinhoContext);
