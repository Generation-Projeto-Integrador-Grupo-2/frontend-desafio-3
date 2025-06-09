import React from "react";

interface ResumoCarrinhoProps {
  subtotal: number;
  aoLimpar: () => void;
  aoFinalizar: () => void;
}

export const ResumoCarrinho: React.FC<ResumoCarrinhoProps> = ({
  subtotal,
  aoLimpar,
  aoFinalizar,
}) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm w-full max-w-xs">
      <h3 className="text-lg font-semibold mb-4">Resumo do Pedido</h3>
      <div className="flex justify-between text-sm mb-2">
        <span>Subtotal</span>
        <span>R$ {subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm mb-2">
        <span>Taxa de entrega</span>
        <span className="text-green-600">Grátis</span>
      </div>
      <div className="flex justify-between font-bold text-red-600 text-sm mb-4">
        <span>Total</span>
        <span>R$ {subtotal.toFixed(2)}</span>
      </div>
      <button className="bg-red-600 text-white w-full py-2 rounded mb-2" onClick={aoFinalizar}>
        Finalizar Pedido
      </button>
      <button className="border w-full py-2 rounded" onClick={aoLimpar}>
        Limpar Carrinho
      </button>
      <p className="text-xs text-green-600 mt-4">
        ✓ 100% do valor vai para produtores
      </p>
    </div>
  );
};
