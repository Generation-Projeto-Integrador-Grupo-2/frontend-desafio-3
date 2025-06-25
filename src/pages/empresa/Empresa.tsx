import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Produto {
  nomeProduto: string;
  nomeEmpresa: string;
  descricao: string;
  preco: number;
  foto: string;
  categoria: "Saudável" | "Não saudável";
}

export default function Empresa() {
  const [nomeProduto, setNomeProduto] = useState("");
  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState<number>(0);
  const [foto, setFoto] = useState("");
  const [categoria, setCategoria] = useState<"Saudável" | "Não saudável">("Saudável");
  const [filtroCategoria, setFiltroCategoria] = useState<"Todas" | "Saudável" | "Não saudável">("Todas");
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    const produtosSalvos = localStorage.getItem("produtos");
    if (produtosSalvos) {
      try {
        const produtosParse = JSON.parse(produtosSalvos);
        setProdutos(produtosParse);
      } catch (error) {
        console.error("Erro ao parsear localStorage:", error);
        setProdutos([]);
      }
    }
  }, []);

  useEffect(() => {
    if (produtos.length > 0) {
      localStorage.setItem("produtos", JSON.stringify(produtos));
    } else {
      localStorage.removeItem("produtos");
    }
  }, [produtos]);

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nomeProduto || !nomeEmpresa || !descricao || preco <= 0 || !foto) {
      toast.error("Por favor, preencha todos os campos corretamente.");
      return;
    }

    const novoProduto: Produto = {
      nomeProduto,
      nomeEmpresa,
      descricao,
      preco,
      foto,
      categoria,
    };

    setProdutos((prev) => [...prev, novoProduto]);
    toast.success("Produto cadastrado com sucesso!");

    setNomeProduto("");
    setNomeEmpresa("");
    setDescricao("");
    setPreco(0);
    setFoto("");
    setCategoria("Saudável");
  };

  const excluirProduto = (index: number) => {
    const novaLista = [...produtos];
    novaLista.splice(index, 1);
    setProdutos(novaLista);
    toast.success("Produto excluído com sucesso!");
  };

  return (
    <div>
      <div className="relative h-[900px] overflow-hidden rounded-b-2xl">
        <img
          src="./assets/img/home-empresa.jpg"
          alt="Fundo de destaque"
          className="absolute inset-0 w-full h-full object-cover scale-125 filter brightness-75"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="text-white text-6xl md:text-7xl font-extrabold drop-shadow-lg">
            Painel da Empresa
          </h1>
          <p className="text-white text-2xl md:text-3xl mt-6 max-w-3xl drop-shadow">
            Cadastre e gerencie seus produtos com uma experiência visual incrível
          </p>
        </div>
      </div>

      <main className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg -mt-28 relative z-20">
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome do Produto</label>
            <input
              type="text"
              value={nomeProduto}
              onChange={(e) => setNomeProduto(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md focus:outline-green-500 focus:ring-2 focus:ring-green-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Nome da Empresa</label>
            <input
              type="text"
              value={nomeEmpresa}
              onChange={(e) => setNomeEmpresa(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md focus:outline-green-500 focus:ring-2 focus:ring-green-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Descrição</label>
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md focus:outline-green-500 focus:ring-2 focus:ring-green-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Preço</label>
            <input
              type="number"
              value={preco}
              onChange={(e) => setPreco(Number(e.target.value))}
              className="w-full mt-1 p-2 border rounded-md focus:outline-green-500 focus:ring-2 focus:ring-green-300"
              min={1}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Categoria</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value as "Saudável" | "Não saudável")}
              className="w-full mt-1 p-2 border rounded-md focus:outline-green-500 focus:ring-2 focus:ring-green-300"
            >
              <option value="Saudável">Saudável</option>
              <option value="Não saudável">Não saudável</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Foto do Produto</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFotoChange}
              className="mt-1"
              required={!foto}
            />
            {foto && (
              <img
                src={foto}
                alt="Prévia"
                className="mt-2 w-40 h-40 object-cover rounded-lg border shadow-md"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
          >
            Cadastrar
          </button>
        </form>

        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4 text-center text-green-700">Produtos Cadastrados</h3>

          <div className="mb-4 flex justify-center items-center gap-2">
            <label className="font-medium">Filtrar por categoria:</label>
            <select
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value as any)}
              className="border rounded px-3 py-1 focus:outline-green-500 focus:ring-2 focus:ring-green-300"
            >
              <option value="Todas">Todas</option>
              <option value="Saudável">Saudável</option>
              <option value="Não saudável">Não saudável</option>
            </select>
          </div>

          {produtos.length === 0 ? (
            <p className="text-gray-500 text-center">Nenhum produto cadastrado</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {produtos
                .filter((p) => filtroCategoria === "Todas" || p.categoria === filtroCategoria)
                .map((produto, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 flex items-center gap-4 bg-gray-50 relative shadow-md hover:shadow-lg transition-shadow"
                  >
                    <img
                      src={produto.foto}
                      alt={produto.nomeProduto}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <p className="inline-block bg-green-200 text-green-900 font-extrabold text-sm px-3 py-1 rounded-full select-none mb-1">
                        {produto.nomeEmpresa}
                      </p>
                      <h4 className="font-semibold text-lg text-gray-800">{produto.nomeProduto}</h4>
                      <p className="text-gray-600 text-sm">{produto.descricao}</p>
                      <p className="text-gray-800 font-semibold mt-1">R$ {produto.preco.toFixed(2)}</p>
                      <p className="text-xs text-gray-500 mt-1">Categoria: {produto.categoria}</p>
                    </div>
                    <button
                      onClick={() => excluirProduto(index)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm font-bold"
                      title="Excluir produto"
                      aria-label="Excluir produto"
                    >
                      ❌
                    </button>
                  </div>
                ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
