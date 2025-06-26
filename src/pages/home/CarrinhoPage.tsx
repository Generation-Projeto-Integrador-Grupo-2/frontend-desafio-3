import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { buscar, cadastrar } from "../../service/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";
import useCarrinho from "../../components/carrinho/useCarrinho";
import type { Motoboy } from "../../models/Motoboy";

export default function CarrinhoPage() {
  const { itens, remover, limpar, total } = useCarrinho();
  const { usuario } = useContext(AuthContext);
  const token = usuario.token;

  const finalizarPedido = async () => {
    try {
      const motoboysDisponiveis = await buscarMotoboysDisponiveis();

      for (const item of itens) {
        const motoboy = escolherMotoboyAleatorio(motoboysDisponiveis);
        const novaEntrega = {
          produto: item,
          cliente: usuario,
          empresa: item.empresa,
          motoboy: motoboy || null,
          data: new Date()
        };

        await cadastrar("/entregas", novaEntrega, () => {}, {
          headers: { Authorization: token }
        });
      }

      ToastAlerta("Pedido finalizado com sucesso!", "sucesso");
      limpar();
    } catch (error: any) {
      ToastAlerta("Erro ao finalizar pedido!", "erro");
    }
  };

  async function buscarMotoboysDisponiveis() {
    const lista: any[] = [];

    await buscar("/motoboys", (res: Motoboy[]) => lista.push(...res), {
      headers: { Authorization: token }
    });

    const hoje = new Date().toDateString();

    return lista.filter((motoboy) => {
      const entregas = Array.isArray(motoboy.entregas)
        ? motoboy.entregas
        : motoboy.entregas
        ? [motoboy.entregas]
        : [];

      return !entregas.some((entrega: any) =>
        new Date(entrega.data).toDateString() === hoje
      );
    });
  }

  function escolherMotoboyAleatorio(motoboys: any[]) {
    if (motoboys.length === 0) return null;
    const index = Math.floor(Math.random() * motoboys.length);
    return motoboys[index];
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={finalizarPedido}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Finalizar Pedido
      </button>
    </div>
  );
}