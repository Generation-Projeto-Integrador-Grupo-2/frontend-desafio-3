import React, { useState } from "react";
import { ItemCarrinho } from "../components/ItemCarrinho";
import { ResumoCarrinho } from "../components/ResumoCarrinho";
import "../styles/carrinho.css";

interface Produto {
  id: number;
  titulo: string;
  marca: string;
  preco: number;
  imagem: string;
  quantidade: number;
}

export default function PaginaCarrinho() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const adicionarProduto = (produto: Omit<Produto, "quantidade">) => {
    setProdutos((prev) => {
      const existente = prev.find((p) => p.id === produto.id);
      if (existente) {
        return prev.map((p) =>
          p.id === produto.id ? { ...p, quantidade: p.quantidade + 1 } : p
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  };

  const removerProduto = (id: number) => {
    setProdutos((prev) => prev.filter((p) => p.id !== id));
  };

  const aumentarQuantidade = (id: number) => {
    setProdutos((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantidade: p.quantidade + 1 } : p
      )
    );
  };

  const diminuirQuantidade = (id: number) => {
    setProdutos((prev) =>
      prev.map((p) =>
        p.id === id && p.quantidade > 1
          ? { ...p, quantidade: p.quantidade - 1 }
          : p
      )
    );
  };

  const subtotal = produtos.reduce((total, p) => total + p.preco * p.quantidade, 0);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center">Meu Carrinho</h1>
        <p className="text-sm text-gray-600 mb-8 text-center">
          Revise seus itens antes de finalizar o pedido
        </p>
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 space-y-6">
            {produtos.map((produto) => (
              <ItemCarrinho
                key={produto.id}
                titulo={produto.titulo}
                marca={produto.marca}
                preco={produto.preco}
                quantidade={produto.quantidade}
                imagem={produto.imagem}
                aoRemover={() => removerProduto(produto.id)}
                aoAumentar={() => aumentarQuantidade(produto.id)}
                aoDiminuir={() => diminuirQuantidade(produto.id)}
              />
            ))}
          </div>
          <div className="w-full max-w-sm mx-auto lg:mx-0">
            <ResumoCarrinho
              subtotal={subtotal}
              aoLimpar={() => setProdutos([])}
              aoFinalizar={() => alert("Pedido finalizado!")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
