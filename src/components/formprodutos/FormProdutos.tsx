import { useState, type ChangeEvent, type FormEvent } from "react";
import type Produto from "../../models/Produto";
import { ToastAlerta } from "../../utils/ToastAlerta";

interface FormProdutosProps {
  onSalvar: (produto: Produto) => void;
}

export default function FormProdutos({ onSalvar }: FormProdutosProps) {
  const [produto, setProduto] = useState<Produto>({
    id: 0,
    nome: "",
    descricao: "",
    foto: "",
    preco: 0,
    empresa: "",
  });

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    if (name === "preco") {
      setProduto((prev) => ({ ...prev, preco: Number(value) }));
    } else {
      setProduto((prev) => ({ ...prev, [name]: value }));
    }
  }

  function aoEnviar(e: FormEvent) {
    e.preventDefault();

    if (
      produto.nome &&
      produto.descricao &&
      produto.foto &&
      produto.empresa &&
      produto.preco > 0
    ) {
      onSalvar(produto);
      ToastAlerta("Produto cadastrado com sucesso!", "sucesso");

      setProduto({
        id: 0,
        nome: "",
        descricao: "",
        foto: "",
        preco: 0,
        empresa: "",
      });
    } else {
      ToastAlerta("Por favor, preencha todos os campos corretamente.", "erro");
    }
  }

  return (
    <form onSubmit={aoEnviar} className="flex flex-col gap-4 mb-8">
      <input
        type="text"
        name="nome"
        placeholder="Nome do Produto"
        value={produto.nome}
        onChange={atualizarEstado}
        className="border p-2 rounded"
        required
      />
      <input
        type="text"
        name="descricao"
        placeholder="Descrição do Produto"
        value={produto.descricao}
        onChange={atualizarEstado}
        className="border p-2 rounded"
        required
      />
      <input
        type="text"
        name="foto"
        placeholder="URL da Foto"
        value={produto.foto}
        onChange={atualizarEstado}
        className="border p-2 rounded"
        required
      />
      <input
        type="text"
        name="empresa"
        placeholder="Empresa"
        value={produto.empresa}
        onChange={atualizarEstado}
        className="border p-2 rounded"
        required
      />
      <input
        type="number"
        name="preco"
        placeholder="Preço"
        value={produto.preco}
        onChange={atualizarEstado}
        className="border p-2 rounded"
        required
        min={0.01}
        step={0.01}
      />
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 rounded"
      >
        Cadastrar Produto
      </button>
    </form>
  );
}
