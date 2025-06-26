import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { buscar } from "../../service/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";
import type { Entrega } from "../../models/Entrega";

export default function ListaEntregas() {
  const navigate = useNavigate();
  const [entregas, setEntregas] = useState<Entrega[]>([]);

  const { empresa, tipo, handleLogout } = useContext(AuthContext);
  const token = empresa?.token ?? "";

  useEffect(() => {
    if (!token || tipo !== "empresa") {
      ToastAlerta("Você precisa estar logado como empresa!", "erro");
      navigate("/");
    }
  }, [token, tipo]);

  async function buscarEntregas() {
    try {
      await buscar(`/entregas/empresa/${empresa?.id}`, setEntregas, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao buscar entregas", "erro");
      }
    }
  }

  useEffect(() => {
    if (empresa?.id && token) {
      buscarEntregas();
    }
  }, [empresa, token]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Entregas da Empresa</h2>

      {entregas.length === 0 ? (
        <p className="text-center text-gray-500">Nenhuma entrega cadastrada.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entregas.map((entrega) => (
            <div
              key={entrega.id}
              className="bg-[#F5F5DC] rounded-lg shadow-lg p-4 flex flex-col justify-between border-2"
              style={{ borderColor: "#D4AF37" }}
            >
              <p className="text-sm text-[#3E2C27]">
                <strong>Data:</strong> {new Date(entrega.data).toLocaleString()}
              </p>

              <div className="mt-2 text-[#3E2C27]">
                <p><strong>Produto:</strong> {entrega.produto?.nome}</p>
                <p><strong>Motoboy:</strong> {entrega.motoboy?.nome}</p>
                <p><strong>Cliente:</strong> {entrega.cliente?.name}</p>
              </div>

              <div className="mt-2 text-sm text-gray-500 italic">
                Entrega #{entrega.id}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
