import React from "react";

interface ItemCarrinhoProps {
  titulo: string;
  marca: string;
  preco: number;
  quantidade: number;
  imagem: string;
  aoRemover: () => void;
  aoAumentar: () => void;
  aoDiminuir: () => void;
}

export const ItemCarrinho: React.FC<ItemCarrinhoProps> = ({
  titulo,
  marca,
  preco,
  quantidade,
  imagem,
  aoRemover,
  aoAumentar,
  aoDiminuir,
}) => {
  return (
    <div className="flex items-center justify-between border p-4 rounded-xl bg-white shadow-sm">
      <div className="flex items-center gap-4">
        <img src={imagem} alt={titulo} className="w-16 h-16 rounded-lg object-cover" />
        <div>
          <h4 className="font-semibold text-sm">{titulo}</h4>
          <p className="text-gray-500 text-xs">{marca}</p>
          <p className="text-red-600 font-bold text-sm">R$ {preco.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={aoDiminuir} className="border px-2 py-1 rounded">-</button>
        <span className="px-2">{quantidade}</span>
        <button onClick={aoAumentar} className="border px-2 py-1 rounded">+</button>
        <button onClick={aoRemover} className="text-red-500 ml-2">🗑️</button>
      </div>
    </div>
  );
};
