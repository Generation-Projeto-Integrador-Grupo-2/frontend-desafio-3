import { useContext, useEffect, useState } from "react";
import type Produto from "../../models/Produto";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { buscar } from "../../service/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { DNA } from "react-loader-spinner";

export default function ListaProdutos() {
    const navigate = useNavigate();
    const [produtos, setProdutos] = useState<Produto[]>([])
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarProdutos() {
        try {
            await buscar('/produtos', setProdutos, {
                headers: {
                    Authorization: token,
                },
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado', 'erro')
            navigate('/');
        }
    }, [token])

    useEffect(() => {
        buscarProdutos()
    }, [produtos.length])

    return (
        <>
            {produtos.length === 0 && (
                <DNA
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="dna-loading"
                />
            )}
            <div>
                <div>
                    <div>
                        {produtos.map((produto) => (
                            <div key={produto.id}>
                                <div>
                                    <div>
                                        <h4>{produto.nome}</h4>
                                        <p>{produto.descricao}</p>
                                        <p>Categoria: {produto.categoria?.descricao}</p>
                                    </div>
                                </div>
                                <div>
                                    <Link to={`/editarprodutos/${produto.id}`}>
                                        <button>Editar</button>
                                    </Link>
                                    <Link to={`/deletarprodutos/${produto.id}`}>
                                        <button>Deletar</button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}