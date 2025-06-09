import { useContext, useEffect, useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Categoria from "../../../models/Categoria";
import type Produto from "../../../models/Produto";
import { AuthContext } from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { atualizar, buscar } from "../../../service/Service";
import { RotatingLines } from "react-loader-spinner";

export default function EditarProdutos() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [categoria, setCategoria] = useState<Categoria>({ id: 0, nome: '', descricao: '', imagemUrl: '', saudavel: false })
    const [produto, setProduto] = useState<Produto>({} as Produto);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', 'erro');
            navigate('/');
        }
    }, [token]);

    async function buscarCategorias() {
        try {
            await buscar('/categorias', setCategorias, {
                headers: { Authorization: token }
            });
        } catch (error: any) {
            if (error.toString().includes('403')) handleLogout();
        }
    }

    async function buscarCategoriaPorId(id: string) {
        try {
            await buscar(`/categorias/${id}`, setCategoria, {
                headers: { Authorization: token }
            });
        } catch (error: any) {
            if (error.toString().includes('403')) handleLogout();
        }
    }

    async function buscarProdutoPorId(id: string) {
        try {
            await buscar(`/produtos/${id}`, setProduto, {
                headers: { Authorization: token }
            });
        } catch (error: any) {
            if (error.toString().includes('403')) handleLogout();
        }
    }

    useEffect(() => {
        if (id) buscarProdutoPorId(id);
        buscarCategorias();
    }, [id]);

    useEffect(() => {
        setProduto({
            ...produto,
            categoria: categoria,
        });
    }, [categoria]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setProduto({
            ...produto,
            [e.target.name]: e.target.value,
            categoria: categoria,
        });
    }

    async function atualizarProduto(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        try {
            await atualizar(`/produtos`, produto, setProduto, {
                headers: { Authorization: token },
            });

            ToastAlerta('Produto atualizado com sucesso', 'sucesso');
            navigate('/produtos');
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout();
            } else {
                ToastAlerta('Erro ao atualizar o Produto', 'erro');
            }
        }

        setIsLoading(false);
        
    }
     function retornar() {
        navigate("/produtos")
    }

    const carregandoCategoria = categoria.nome === '';

    return (
        <div className="container flex flex-col mx-auto items-center">
            <h1 className="text-4xl text-center my-8">Editar Produto</h1>

            <form className="flex flex-col w-1/2 gap-4" onSubmit={atualizarProduto}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="nome">Nome do Produto</label>
                    <input
                        type="text"
                        placeholder="{produto.nome}"
                        name="nome"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={produto.nome}
                        onChange={atualizarEstado}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="descricao">Descrição do Produto</label>
                    <input
                        type="text"
                        placeholder="{produto.descricao}"
                        name="descricao"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={produto.descricao}
                        onChange={atualizarEstado}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="preco">Preço do Produto</label>
                    <input
                        type="number"
                        placeholder="{produto.preco}"
                        name="preco"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={produto.preco}
                        onChange={atualizarEstado}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="foto">Foto do Produto</label>
                    <input
                        type="text"
                        placeholder="{produto.foto}"
                        name="foto"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={produto.foto}
                        onChange={atualizarEstado}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <p>Categoria do Produto</p>
                    <select
                        name="categoria"
                        id="categoria"
                        className="border p-2 border-slate-800 rounded"
                        onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
                        required
                    >
                        <option value="" disabled selected>Selecione uma Categoria</option>
                        {categorias.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.nome}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto py-2 flex justify-center"
                    disabled={carregandoCategoria}
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
                        <span>Atualizar</span>
                    )}
                </button>
            </form>
        </div>
    );
}