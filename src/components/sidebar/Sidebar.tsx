import { useState } from "react";
import { LeafIcon, X, SlidersHorizontal } from "@phosphor-icons/react";

interface SidebarProps {
  categorias: { id: number; nome: string }[];
  onFiltrar: (filtros: {
    categoriaId?: number;
    precoMax?: number;
    saudavel?: boolean;
  }) => void;
}

export default function Sidebar({ categorias, onFiltrar }: SidebarProps) {
  const [aberta, setAberta] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<number | undefined>(undefined);
  const [precoMax, setPrecoMax] = useState<number>(100);
  const [saudavel, setSaudavel] = useState<boolean>(false);

  const aplicarFiltros = () => {
    onFiltrar({ categoriaId: categoriaSelecionada, precoMax, saudavel });
    setAberta(false);
  };

  return (
    <>
      {/* Botão para abrir a sidebar, fixo na esquerda */}
      {!aberta && (
        <button
          onClick={() => setAberta(true)}
          className="fixed top-20 left-4 z-50 p-2 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 transition"
          aria-label="Abrir filtros"
        >
          <SlidersHorizontal size={24} />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-[#f5f5dc] shadow-lg p-6 transform transition-transform z-40
          ${aberta ? "translate-x-0" : "-translate-x-full"}`}
        aria-label="Filtros de produtos"
      >
        {/* Botão X para fechar dentro da sidebar, no canto superior direito */}
        <button
          onClick={() => setAberta(false)}
          className="absolute top-4 right-4 p-1 text-[#2F3E46] hover:text-red-600 transition"
          aria-label="Fechar filtros"
        >
          <X size={24} weight="bold" />
        </button>

        <h2 className="text-xl font-bold text-[#2F3E46] mb-4">Filtrar Produtos</h2>

        {/* Categorias */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-[#2F3E46] mb-1">Categoria</label>
          <select
            value={categoriaSelecionada}
            onChange={(e) => setCategoriaSelecionada(Number(e.target.value) || undefined)}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none"
          >
            <option value="">Todas</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.nome}</option>
            ))}
          </select>
        </div>

        {/* Preço Máximo */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-[#2F3E46] mb-1">
            Preço até: R$ {precoMax.toFixed(2)}
          </label>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={precoMax}
            onChange={(e) => setPrecoMax(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Saudável */}
        <div className="mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={saudavel}
              onChange={() => setSaudavel(!saudavel)}
              className="form-checkbox h-5 w-5 text-green-600"
            />
            <span className="text-[#2F3E46] font-medium flex items-center gap-1">
              <LeafIcon size={18} /> Saudável
            </span>
          </label>
        </div>

        <button
          onClick={aplicarFiltros}
          className="w-full bg-red-600 hover:bg-green-700 text-white py-2 rounded-full font-semibold transition"
        >
          Aplicar Filtros
        </button>
      </div>
    </>
  );
}
