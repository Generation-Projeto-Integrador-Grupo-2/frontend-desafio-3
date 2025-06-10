import { useCarrinho } from "./CarrinhoContext";

export default function useCarrinhoHook() {
  const { carrinho, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho } = useCarrinho();

  return {
    itens: carrinho,
    adicionar: adicionarAoCarrinho,
    remover: removerDoCarrinho,
    limpar: limparCarrinho,
    total: carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0),
  };
}
