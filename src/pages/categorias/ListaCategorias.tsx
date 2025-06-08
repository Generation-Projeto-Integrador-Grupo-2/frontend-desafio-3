import { useContext, useEffect, useState } from "react";
import type Categoria from "../../models/Categoria";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { buscar } from "../../service/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { DNA } from "react-loader-spinner";
export default function ListaCategorias() {
    const navigate = useNavigate();
    const [categorias, setCategorias] = useState<Categoria[]>([])
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarCategorias() {
            try {
                await buscar('/categorias', setCategorias, {
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
                buscarCategorias()
            }, [categorias.length])
    return (
        <>
            {categorias.length === 0 && (
                <DNA
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper mx-auto"
                />
            )}
            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col mx-2">
                    <div className='container mx-auto my-4 
                        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
                    >
                        {categorias.map((categoria) => (
                            <div className='border-slate-900 border 
            flex flex-col rounded overflow-hidden justify-between'>

            <div>
                <div className='p-4 '>
                    <h4 className='text-lg font-semibold uppercase'>{categoria.nome}</h4>
                    <p>{categoria.descricao}</p>
                </div>
            </div>
            <div className="flex">
                <Link to={`/editarcategorias/${categoria.id}`}
                    className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-800 flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>
                <Link to={`/deletarcategorias/${categoria.id}`}
                    className='text-white bg-red-400 hover:bg-red-700 w-full flex items-center justify-center'>
                    <button>Deletar</button>
                </Link>
            </div>
        </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}