import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import type { Usuario } from '../../models/Usuario';
import { cadastrarUsuario } from '../../service/Service';
import { RotatingLines } from 'react-loader-spinner';
import { UserIcon, EnvelopeIcon, LockClosedIcon, MapPinIcon, HashtagIcon } from '@heroicons/react/24/outline'
import './Cadastro.css';


function Cadastro() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [confirmaSenha, setConfirmaSenha] = useState<string>("");

    const [usuario, setUsuario] = useState<Usuario>({ name: '', email: '', senha: '', endereco: '', numero: '' })

    function retornar() {
        navigate('/login')
    }

    useEffect(() => {
        if (usuario.id !== undefined) {
            retornar()
        }
    }, [usuario])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
        setConfirmaSenha(e.target.value)
    }

    async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {

            setIsLoading(true)

            try {
                await cadastrarUsuario("/usuarios/cadastrar", usuario, setUsuario);
                alert('Usuario cadastrado com sucesso!')
            } catch (error) {
                alert('Erro ao cadastrar o usuario!')
            }
        } else {
            alert('Dados do usuario incorretos! Verifique as informaçoes do cadastro')
            setUsuario({ ...usuario, senha: '' })
            setConfirmaSenha('')
        }

        setIsLoading(false)
    }

    return (
        <>
            <div className=' grid grid-cols-1 lg:grid-cols-2 h-screen 
            place-items-center font-bold bg-gray-100'>
                <div className="fundoCadastro hidden lg:block h-screen "></div>
                <div className='p-2 w-full max-w-md font-semibold'>
                    <form className=' max-w-md ml-15  bg-gray-300 p-4 rounded-3xl shadow-xl  flex  flex-col gap-3' onSubmit={cadastrarNovoUsuario}>
                        <h2 className='font-bold text-black text-2xl m-2 flex flex-col items-center'>Cadastrar</h2>
                        <div className="flex flex-col w-full relative ">
                            <label htmlFor="name" >Nome</label>
                            <UserIcon className="w-5 h-5 text-gray-400 absolute left-3 top-11 transform -translate-y-1/2 pointer-events-none" />
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder=""
                                className=" pl-10 w-full bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-red-400"
                                value={usuario.name}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                        </div>
                        <div className="flex flex-col w-full relative">
                            <label htmlFor="email">Email</label>
                            <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute left-3 top-11 transform -translate-y-1/2 pointer-events-none" />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder=""
                                className="pl-10 w-full bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-red-400"
                                value={usuario.email}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                        </div>
                        <div className='flex flex-col w-full relative'>
                            <label htmlFor="senha">Senha</label>
                            <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-3 top-11 transform -translate-y-1/2 pointer-events-none" />
                            <input
                                type="password"
                                id="senha"
                                name="senha"
                                placeholder=""
                                className="pl-10 w-full bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-red-400"
                                value={usuario.senha}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                        </div>
                        <div className='flex flex-col w-full relative'>
                            <label htmlFor="confirmaSenha">Confirma Senha</label>
                            <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-3 top-11 transform -translate-y-1/2 pointer-events-none" />
                            <input
                                type="password"
                                id="confirmaSenha"
                                name="confrimaSenha"
                                placeholder=""
                                className="pl-10 w-full bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-red-400"
                                value={confirmaSenha}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
                            />
                        </div>
                        <div className='flex flex-col w-full relative'>
                            <label htmlFor="endereco">Endereço</label>
                            <MapPinIcon className="w-5 h-5 text-gray-400 absolute left-3 top-11 transform -translate-y-1/2 pointer-events-none" />
                            <input
                                type="endereco"
                                id="endereco"
                                name="endereco"
                                placeholder=""
                                className=" pl-10 w-full bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-red-400"
                                value={usuario.endereco}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                        </div>
                        <div className='flex flex-col w-full relative'>
                            <label htmlFor="numero">Numero</label>
                            <HashtagIcon className="w-5 h-5 text-gray-400 absolute left-3 top-11 transform -translate-y-1/2 pointer-events-none" />
                            <input
                                type="numero"
                                id="numero"
                                name="numero"
                                placeholder=""
                                className="pl-10 w-full bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-red-400 "
                                value={usuario.numero}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                        </div>
                        <div className="flex justify-center w-full m-4">
                            <button
                                type='submit'
                                className='bg-green-400 hover:bg-green-500 font-medium text-sm py-2 rounded-lg p-4 text-black'
                            >
                                {isLoading ? (
                                    <RotatingLines
                                        strokeColor='white'
                                        strokeWidth='5'
                                        animationDuration='0.75'
                                        width='24'
                                        visible={true}
                                    />
                                ) : (
                                    <span>Cadastrar</span>
                                )}
                            </button>
                        </div>

                    </form>
                    <div className='mt-5 font-bold text-center'>
                        <Link to="/login" className='text-blue-500 hover:underline'>
                            Já tem uma conta? Faça login
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cadastro