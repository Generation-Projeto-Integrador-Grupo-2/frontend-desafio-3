import { useContext, useEffect, useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Categoria from "../../../models/Categoria";
import { AuthContext } from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { atualizar, buscar, cadastrar } from "../../../service/Service";
import { RotatingLines } from "react-loader-spinner";

export default function CadastroCategorias() {

    const navigate = useNavigate();

    const [categoria, setCategorias] = useState<Categoria>({
      nome: "",
      descricao: "",
      imagemUrl: "",
      saudavel: false
    } as Categoria)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>();

    async function buscarPorId(id: string) {
        try {
            await buscar(`/categorias/${id}`, setCategorias, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', 'erro')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setCategorias({
            ...categoria,
            [name]: name === 'saudavel' ? value === 'true' : value
        });
    }

    function retornar() {
        navigate("/categorias")
    }

    async function novaCategoria(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()
      setIsLoading(true)

      if (id !== undefined) {
        try {
          await atualizar(`/categorias`, categoria, setCategorias, {
            headers: { 'Authorization': token }
          })
          ToastAlerta('Categoria atualizada com sucesso!', 'sucesso')
        } catch (error: any) {
          if (error.toString().includes('403')) {
            handleLogout();
          } else {
            ToastAlerta('Erro ao atualizar a categoria.', 'erro')
          }

        }
      } else {
        try {
          await cadastrar(`/categorias`, categoria, setCategorias, {
            headers: { 'Authorization': token }
          })
          ToastAlerta('Categoria cadastrada com sucesso!', 'sucesso')
        } catch (error: any) {
          if (error.toString().includes('403')) {
            handleLogout();
          } else {
            ToastAlerta('Erro ao cadastrar categoria.', 'erro')
          }

        }
      }

      setIsLoading(false)
      retornar()
    }

    return (
        <div className="container flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl text-center my-8">
                {id === undefined ? 'Cadastrar Categoria' : 'Editar Categoria'}
            </h1>

            <form className="w-1/2 flex flex-col gap-4" onSubmit={novaCategoria}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="nome">Nome da Categoria</label>
                    <input
                        type="text"
                        placeholder="Nome da Categoria"
                        name='nome'
                        className="border-2 border-slate-700 rounded p-2"
                        value={categoria.nome}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                    <label htmlFor="descricao">Descrição do Tema</label>
                    <input
                        type="text"
                        placeholder="Descreva aqui seu tema"
                        name='descricao'
                        className="border-2 border-slate-700 rounded p-2"
                        value={categoria.descricao}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                    <label htmlFor="imagemUrl">Imagem da Categoria</label>
                    <input
                        type="text"
                        placeholder="Imagem da Categoria"
                        name='imagemUrl'
                        className="border-2 border-slate-700 rounded p-2"
                        value={categoria.imagemUrl}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                    <label htmlFor="saudavel">Saudável?</label>
                    <select
                        name="saudavel"
                        className="border-2 border-slate-700 rounded p-2"
                        value={categoria.saudavel ? 'true' : 'false'}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => atualizarEstado(e as any)}
                    >
                        <option value="true">Sim</option>
                        <option value="false">Não</option>
                    </select>
                </div>
                <button
                    className="rounded text-slate-100 bg-indigo-400 
                               hover:bg-indigo-800 w-1/2 py-2 mx-auto flex justify-center"
                    type="submit">
                    {isLoading ?
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                        <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>

                    }
                </button>
            </form>
        </div>
    );
}
