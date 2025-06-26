import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar, deletar } from "../../../service/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import type { Motoboy } from "../../../models/Motoboy";

export default function DeletarMotoboy() {
  const navigate = useNavigate();
  const [motoboy, setMotoboy] = useState<Motoboy>({} as Motoboy);

  const { usuario, empresa, tipo, handleLogout } = useContext(AuthContext);
  const token = empresa?.token ?? usuario?.token ?? "";
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!token) {
      ToastAlerta("Você precisa estar logado!", "erro");
      navigate("/");
    } else if (tipo !== "empresa") {
      ToastAlerta("Apenas empresas podem excluir motoboys.", "erro");
      navigate("/");
    }
  }, [token, tipo]);

  async function buscarPorId(id: string) {
    try {
      await buscar(`/motoboys/${id}`, setMotoboy, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) handleLogout();
    }
  }

  useEffect(() => {
    if (id) buscarPorId(id);
  }, [id]);

  async function confirmarExclusao() {
    try {
      await deletar(`/motoboys/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      ToastAlerta("Motoboy deletado com sucesso!", "sucesso");
      navigate("/motoboys");
    } catch (error: any) {
      if (error.toString().includes("403")) handleLogout();
      else ToastAlerta("Erro ao deletar motoboy.", "erro");
    }
  }

  function cancelar() {
    navigate("/motoboys");
  }

  return (
    <div className="container flex flex-col items-center justify-center mx-auto">
      <h1 className="text-4xl text-center my-8 text-red-600">
        Deseja excluir o motoboy abaixo?
      </h1>

      <div className="border-2 border-red-600 rounded p-6 w-1/2 bg-white shadow">
        <p className="text-lg text-center mb-4">
          <strong>Nome:</strong> {motoboy.nome}
        </p>
        <p className="text-center text-gray-700">Placa: {motoboy.placa}</p>
        <p className="text-center text-gray-700">Modelo: {motoboy.modelo}</p>
        <p className="text-center text-gray-700">Endereço: {motoboy.endereco}</p>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={confirmarExclusao}
          className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
        >
          Confirmar
        </button>
        <button
          onClick={cancelar}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
