import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext';
import type { UsuarioLogin } from '../../models/UsuarioLogin';
import { RotatingLines } from 'react-loader-spinner';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import './Login.css';

function Login() {

    const navigate = useNavigate();

    const {usuario, handleLogin, isLoading } = useContext(AuthContext)

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {id:0,nome:'',email:'',senha:'',token:''} 
    )

    useEffect(() => {
        if (usuario.token !== "") {
            navigate('/home')
        }
    }, [usuario])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        })
    }

    function login(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        handleLogin(usuarioLogin)
    }

        return (
            <>
                <div className='grid grid-cols-1 lg:grid-cols-2 
                    h-screen place-items-center font-bold '
                    style={{
    backgroundImage: "url('/assets/img/salada.jpg')",}}>
        <div className="flex justify-start items-center pl-10"></div>
                    <form className='max-w-md bg-gray-200 p-8 rounded-3xl shadow-xl  flex justify-center items-center flex-col gap-4' onSubmit={login}>
                        <h2 className='font-bold text-2xl m-2 flex flex-col items-center'>Login</h2>
                        <div className='flex flex-col w-full relative'>
                            <label htmlFor="email">Email</label>
                            <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute left-3 top-11 transform -translate-y-1/2" />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder=""
                                className="pl-10 w-full  bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
                                value={usuarioLogin.email}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                        </div>
                        <div className="flex flex-col w-full relative">
                            <label htmlFor="senha">Senha</label>
                            <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-3 top-11 transform -translate-y-1/2" />
                            <input
                                type="password"
                                id="senha"
                                name="senha"
                                placeholder=""
                                className="pl-10 w-full  bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-orange-400"
                                value={usuarioLogin.senha}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                        </div>
                        <button type='submit' className='bg-green-400 hover:bg-green-500 font-medium text-sm py-2 rounded-lg p-4 text-black  mt-5 flex items-center justify-center '>
                            {isLoading ? (
                                <RotatingLines
                                    strokeColor="white"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="24"
                                    visible={true}
                                />
                            ) : (
                                <span>Entrar</span>
                            )}
                        </button>
                        <p>
                            Ainda não tem uma conta?{' '}
                            <Link to="/cadastro" className='text-blue-500 hover:underline '>
                                Cadastre-se
                            </Link>
                        </p>
                    </form>
                </div>
            </>
        )
    }

export default Login