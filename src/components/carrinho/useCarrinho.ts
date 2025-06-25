import { useMemo } from "react";
import { useCarrinho } from "./CarrinhoContext";

export default function useCarrinhoHook() {
  const {
    carrinho,
    adicionarAoCarrinho,
    removerDoCarrinho,
    limparCarrinho,
    incrementarQuantidade,
    decrementarQuantidade,
    aplicarCupom,
    frete,
    desconto,
    totalComDesconto,
    finalizarPedido,  
  } = useCarrinho();

  const total = useMemo(() => {
    return carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  }, [carrinho]);

  const totalUnidades = useMemo(() => {
    return carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  }, [carrinho]);

  const totalItens = carrinho.length;

  return {
    itens: carrinho,
    adicionar: adicionarAoCarrinho,
    remover: removerDoCarrinho,
    limpar: limparCarrinho,
    incrementar: incrementarQuantidade,
    decrementar: decrementarQuantidade,
    aplicarCupom,
    frete,
    desconto,
    total,
    totalUnidades,
    totalItens,
    totalComDesconto: totalComDesconto(),
    finalizarPedido, 
  };
}
