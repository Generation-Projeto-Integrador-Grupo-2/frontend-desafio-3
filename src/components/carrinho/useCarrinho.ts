import { useCarrinhoContext } from "./CarrinhoContext";

export default function useCarrinho() {
  const { itens, adicionar, remover, limpar } = useCarrinhoContext();

  return {
    itens,
    adicionar,
    remover,
    limpar,
    total: itens.reduce((acc, item) => {
      const valor = parseFloat(item.preco.replace("R$", "").replace(",", "."));
      return acc + valor;
    }, 0),
  };
}
