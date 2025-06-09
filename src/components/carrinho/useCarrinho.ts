import { useCarrinho } from "./CarrinhoContext";

export default function useCarrinhoHook() {
  const { carrinho, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho } = useCarrinho();

  return {
    itens: carrinho,
    adicionar: adicionarAoCarrinho,
    remover: removerDoCarrinho,
    limpar: limparCarrinho,
    total: carrinho.reduce((acc, item) => {
      const valor = parseFloat(item.preco.toString().replace("R$", "").replace(",", "."));
      return acc + valor;
    }, 0),
  };
}
