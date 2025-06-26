import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { atualizar, buscar, cadastrar } from "../../../service/Service";
import { RotatingLines } from "react-loader-spinner";
import type { Motoboy } from "../../../models/Motoboy";

export default function CadastroMotoboy() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [motoboy, setMotoboy] = useState<Motoboy>({
    nome: "",
    modelo: "",
    placa: "",
    CNH: "",
    endereco: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  const { empresa, tipo, handleLogout } = useContext(AuthContext);
  const token = empresa?.token ?? "";

  useEffect(() => {
    if (!token) {
      ToastAlerta("Você precisa estar logado!", "erro");
      navigate("/");
    } else if (tipo !== "empresa") {
      ToastAlerta("Apenas empresas podem cadastrar motoboys.", "erro");
      navigate("/");
    }
  }, [token, tipo]);

  async function buscarPorId(id: string) {
    try {
      await buscar(`/motoboys/${id}`, setMotoboy, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) handleLogout();
    }
  }

  useEffect(() => {
    if (id) {
      buscarPorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setMotoboy({
      ...motoboy,
      [e.target.name]: e.target.value,
    });
  }

  async function enviarMotoboy(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    const url = id ? "/motoboys" : "/motoboys";
    const metodo = id ? atualizar : cadastrar;
    const mensagemSucesso = id
      ? "Motoboy atualizado com sucesso!"
      : "Motoboy cadastrado com sucesso!";
    const mensagemErro = id
      ? "Erro ao atualizar motoboy."
      : "Erro ao cadastrar motoboy.";

    try {
      await metodo(url, motoboy, setMotoboy, {
        headers: { Authorization: token },
      });
      ToastAlerta(mensagemSucesso, "sucesso");
      navigate("/motoboys");
    } catch (error: any) {
      if (error.toString().includes("403")) handleLogout();
      else ToastAlerta(mensagemErro, "erro");
    }

    setIsLoading(false);
  }

  return (
    <div className="container flex flex-col items-center justify-center mx-auto">
      <h1 className="text-4xl text-center my-8">
        {id ? "Editar Motoboy" : "Cadastrar Motoboy"}
      </h1>

      <form className="w-1/2 flex flex-col gap-4" onSubmit={enviarMotoboy}>
        <div className="flex flex-col gap-2">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            name="nome"
            placeholder="Nome do motoboy"
            className="border-2 border-slate-700 rounded p-2"
            value={motoboy.nome}
            onChange={atualizarEstado}
          />

          <label htmlFor="modelo">Modelo da Moto</label>
          <input
            type="text"
            name="modelo"
            placeholder="Modelo da moto"
            className="border-2 border-slate-700 rounded p-2"
            value={motoboy.modelo}
            onChange={atualizarEstado}
          />

          <label htmlFor="placa">Placa</label>
          <input
            type="text"
            name="placa"
            placeholder="Placa da moto"
            className="border-2 border-slate-700 rounded p-2"
            value={motoboy.placa}
            onChange={atualizarEstado}
          />

          <label htmlFor="CNH">CNH</label>
          <input
            type="text"
            name="CNH"
            placeholder="Número da CNH"
            className="border-2 border-slate-700 rounded p-2"
            value={motoboy.CNH}
            onChange={atualizarEstado}
          />

          <label htmlFor="endereco">Endereço</label>
          <input
            type="text"
            name="endereco"
            placeholder="Endereço do motoboy"
            className="border-2 border-slate-700 rounded p-2"
            value={motoboy.endereco}
            onChange={atualizarEstado}
          />
        </div>

        <button
          className="rounded text-slate-100 bg-indigo-400 hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
          type="submit"
        >
          {isLoading ? (
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="24"
              visible={true}
            />
          ) : (
            <span>{id ? "Atualizar" : "Cadastrar"}</span>
          )}
        </button>
      </form>
    </div>
  );
}
