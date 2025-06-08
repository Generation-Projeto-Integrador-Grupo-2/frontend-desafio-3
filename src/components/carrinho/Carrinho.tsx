import { Link } from "react-router-dom";
import useCarrinho from "./useCarrinho";

export default function Carrinho() {
  const { itens } = useCarrinho();
  const totalItens = itens.length;

  return (
    <Link
      to="/carrinho"
      className="relative flex items-center gap-2 text-green-700 hover:text-green-900 font-semibold"
    >
      <span className="text-xl">🛒</span>
      {totalItens > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {totalItens}
        </span>
      )}
      <span className="hidden sm:inline">Carrinho</span>
    </Link>
  );
}