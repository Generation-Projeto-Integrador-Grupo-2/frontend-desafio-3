import React, { useState } from "react";
import type Categoria from "../../../models/Categoria";

function CadastroCategorias() {
  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    nome: "",
    descricao: "",
    saudavel: false,
    imagemUrl: "",
    produto: undefined,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMensagem("");
    try {
      const response = await fetch("/categorias/cadastrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoria),
      });
      if (response.ok) {
        setMensagem("Categoria cadastrada com sucesso!");
        setCategoria({
          id: 0,
          nome: "",
          descricao: "",
          saudavel: false,
          imagemUrl: "",
          produto: undefined,
        });
      } else {
        setMensagem("Erro ao cadastrar categoria.");
      }
    } catch (error) {
      setMensagem("Erro ao cadastrar categoria.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] py-8 px-4">
      <div className="mx-auto max-w-xl transition-all duration-300">
        <div className="flex flex-col gap-8">
          {/* Formulário */}
          <div className="bg-white p-8 rounded-lg shadow w-full">
            <h1 className="text-3xl font-bold text-[#374151] mb-6 text-center">
              Cadastro de Categoria
            </h1>

            <div className="text-center mb-8">
              <p className="text-[#6b7280]">
                Preencha os dados abaixo para cadastrar uma nova categoria
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  className="block text-[#374151] font-medium mb-2"
                  htmlFor="nome"
                >
                  Nome da Categoria
                </label>
                <input
                  type="text"
                  id="nome"
                  value={categoria.nome}
                  onChange={(e) =>
                    setCategoria({ ...categoria, nome: e.target.value })
                  }
                  className="w-full p-3 border border-[#6b7280] rounded-md focus:outline-none focus:ring-2 focus:ring-[#84cc16]"
                  placeholder="Digite o nome da categoria"
                  required
                />
              </div>

              <div>
                <label
                  className="block text-[#374151] font-medium mb-2"
                  htmlFor="descricao"
                >
                  Descrição
                </label>
                <textarea
                  id="descricao"
                  value={categoria.descricao}
                  onChange={(e) =>
                    setCategoria({ ...categoria, descricao: e.target.value })
                  }
                  className="w-full p-3 border border-[#6b7280] rounded-md focus:outline-none focus:ring-2 focus:ring-[#84cc16]"
                  placeholder="Digite uma descrição para a categoria"
                  required
                />
              </div>
                <div className="flex items-center mb-4">
                    <input
                    type="checkbox"
                    id="saudavel"
                    checked={categoria.saudavel}
                    onChange={(e) =>
                        setCategoria({
                        ...categoria,
                        saudavel: e.target.checked,
                        })
                    }
                    className="h-4 w-4 text-[#84cc16] border-gray-300 rounded focus:ring-[#84cc16]"
                    />
                    <label
                    htmlFor="saudavel"
                    className="ml-2 text-[#374151] font-medium"
                    >
                    Categoria Saudável
                    </label>
                </div>
                <div>
                <label
                  className="block text-[#374151] font-medium mb-2"
                  htmlFor="imagemUrl"
                >
                    URL da Imagem
                </label>
                <input
                  type="text"
                  id="imagemUrl"
                  value={categoria.imagemUrl}
                  onChange={(e) =>
                    setCategoria({ ...categoria, imagemUrl: e.target.value })
                  }
                  className="w-full p-3 border border-[#6b7280] rounded-md focus:outline-none focus:ring-2 focus:ring-[#84cc16]"
                  placeholder="Digite a URL da imagem da categoria"
                    required
                />
                </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#84cc16] text-white py-3 px-4 rounded-md hover:bg-opacity-90 
                transition-colors disabled:bg-opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin mr-2">⟳</span>
                    Cadastrando...
                  </>
                ) : (
                  "Cadastrar Categoria"
                )}
              </button>
              {mensagem && (
                <div
                  className={`mt-4 text-center ${
                    mensagem.includes("sucesso")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {mensagem}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadastroCategorias;